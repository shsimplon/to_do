const { response } = require("express");
const express = require("express");

const tacheController = require("../controllers/listConroller");

const router = express.Router();
//1consulter la liste des listes de tâches
router.get("/", tacheController.findAll);
// pour rendre le lien dynamique
// :id genre une variable
//2consulter une liste des tâches en particulier pour afficher les différentes tâches

router.get('/taches/:id', tacheController.findOne);


// on précise au router que c'est le controller qui prend en charge la requette
//3créer une nouvelle liste de tâches
// rajoute une route vers le controller pour utilisé la fonnction addOne
router.post("/taches", tacheController.addOne);

//4: le détail d'une tâche (date de création, description)
router.get("/taskDetail/:id", tacheController.findTaskDetail);

// /créer une nouvelle tâches dans une liste de tâches donnée
router.post("/addTask/:list_id", tacheController.addTask);

//modifier la description d'une tâche
router.post("/updateTask/:list_id", tacheController.updateTask);
// //supprimer une tâche d'une liste
router.get("/deleteTask/:id/:list_id", tacheController.deleteTask);

// //modifier la status d'une tâche
router.post("/updateStatus/:id/:list_id", tacheController.updateStatus);







module.exports = router;