const db = require("../db");

exports.getAll = (callback) => {
    db.query("SELECT * FROM liste_des_taches", (error, result) => {
        if (error) {
            console.log("error: ", error);
            callback(error, null);
            return;
        }

        // si ya pas d'erreur me donne le resultat
        callback(null, result);
    })
}
exports.getOne = (id, callback) => {

    // id= signifie le parametre que je cherche =>sera précisé comme une variable dan sle controlleur 
    db.query(`SELECT * FROM liste_des_taches INNER JOIN taches ON  liste_des_taches.id_liste= taches.id_liste WHERE liste_des_taches.id_liste =${id}`, (error, result) => {
        if (error) {
            console.log("error: ", error);
            callback(error, null);
            return;
        }

        callback(null, result);

    })
}

// créer une nouvelle tâches dans une liste de tâches donnée
exports.create = (tache, callback) => {
    console.log(tache.name)
    db.query(` insert into data_list.liste_des_taches (name) values ("${tache.name }") `, (error, result) => {
        if (error) {
            console.log(error);
            callback(error, null);
            return;
        }
        console.log(result);
        callback(null, result);
    });
}

// le détail d'une tâche (date de création, description)
exports.getTaskDetail = (id, callback) => {
    console.log("id task=" + id);
    db.query(`SELECT * FROM taches where id_liste=${id} `, (error, result) => {
        if (error) {
            console.log(error);
            callback(error, null);
            return;
        }
        console.log(result);
        callback(null, result);
    });
}


//modifier la description d'une tâche
exports.updateTask = (requestBody, id, callback) => {
    let etat = 0;
    if (requestBody.etat == 1) {
        etat = 1;
    }
    var queryUpdate = ` update taches set description="${requestBody.description}" ,etat="${etat}"  where id=${requestBody.task_id} `;
    console.log(queryUpdate);
    db.query(queryUpdate, (error, result) => {
        if (error) {
            console.log(error);
            callback(error, null);
            return;
        }

        callback(null, result);
    });
}

// créer une nouvelle tâches dans une liste de tâches donnée
exports.addTask = (requestBody, list_id, callback) => {

    var query = ` insert into data_list.taches (name,date,etat,id_liste) values ("${requestBody.name}",CURDATE(),false,${list_id}) `;
    console.log(query);
    db.query(query, (error, result) => {
        if (error) {
            console.log(error);
            callback(error, null);
            return;
        }
        console.log(result);
        callback(null, result);
    });
}

//supprimer une tâche d'une liste
exports.deleteTask = (requestBody, id, callback) => {
    var queryUpdate = ` delete  from taches  where id=${id} `;
    console.log(queryUpdate);
    db.query(queryUpdate, (error, result) => {
        if (error) {
            console.log(error);
            callback(error, null);
            return;
        }

        callback(null, result);
    });
}

exports.updateStatus = (requestBody, id, callback) => {
    let etat = 0;
    if (requestBody.etat == 1) {
        etat = 1;
    }
    var queryUpdate = ` update taches set etat=${etat}  where id=${id} `;
    console.log(queryUpdate);
    db.query(queryUpdate, (error, result) => {
        if (error) {
            console.log(error);
            callback(error, null);
            return;
        }

        callback(null, result);
    });
}