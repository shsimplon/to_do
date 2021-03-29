const { response, request } = require("express");
const tache = require("../models/taches");

exports.findAll = (request, response) => {
    // recuperer la liste des taches
    tache.getAll((error, taches) => {
        if (error) {
            response.send(error.message);
        }

        console.log("tache ", taches);

        response.render("home.ejs", { taches });
    });
}




exports.findOne = (request, response) => {

    // on cree un lien
    // on rajoute id dans le paramettre car on veut le rajouter pour mettre le lien
    const { id } = request.params;
    console.log('hhhh')

    tache.getOne(id, (error, result) => {
        if (error) {
            response.send(error.message);
        }
        const tacheList = result[0].name;
        const taches = result;


        response.render('tache.ejs', { tacheList, taches });
        // crrer dynamiquement en utilsant un parametre tache
        // c'est la meme variable qu'on affiche dans le code 
    });


}


exports.addOne = (request, response) => {

    tache.create(request.body, (error, result) => {
        if (error) {
            response.send(error.message)
        }
        // recharger la page directement aprés l'ajout d'une donnée

        response.redirect('/');
    })
}


// le détail d'une tâche (date de création, description)
exports.findTaskDetail = (request, response) => {
    // des taches
    const { id } = request.params;
    tache.getTaskDetail(id, (error, result) => {
        if (error) {
            response.send(error.message);
        }
        taskDetail = result[0];
        response.render("taskDetail.ejs", { taskDetail });


    });

}

//modifier la description d'une tâche
exports.updateTask = (request, response) => {


        const { list_id } = request.params;
        console.log("list_id=" + list_id);
        tache.updateTask(request.body, list_id, (error, taches) => {
            if (error) {
                response.send(error.message);
            }

            response.redirect("/task/" + list_id);

        });

    }
    // créer une nouvelle tâches dans une liste de tâches donnée
exports.addTask = (request, response) => {
        // des taches
        const { list_id } = request.params;

        todolist.addTask(request.body, list_id, (error, tasks) => {
            if (error) {
                response.send(error.message);
            }

            response.redirect("/task/" + list_id);

        })


    }
    //supprimer une tâche d'une liste
exports.deleteTask = (request, response) => {


    const { id } = request.params;

    todolist.deleteTask(request.body, id, (error, tasks) => {
        if (error) {
            response.send(error.message);
        }

        response.redirect("/task/" + request.params.list_id);

    });

}

exports.updateStatus = (request, response) => {


    const { id } = request.params;

    console.log("listid:" + request.params.list_id + "id" + request.params.id);

    todolist.updateStatus(request.body, id, (error, tasks) => {
        if (error) {
            response.send(error.message);
        }


        response.redirect("/task/" + request.params.list_id);

    });

}