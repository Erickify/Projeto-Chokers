var express = require("express");
var router = express.Router();
const upload = require('../config/configUpload'); // ARQUIVO COM A CONFIGURAÇÃO DO UPLOAD

var postController = require("../controllers/postController");

//Recebendo os dados do html e direcionando para a função cadastrar de usuarioController.js
router.post("/postar", upload.single('foto'), (req, res) => {
    postController.postar(req, res);
})

router.post("/comentar/:id", function (req, res) {
    postController.comentar(req, res);
})

router.post("/curtir/:id", function (req, res) {
    postController.curtir(req, res);
})

router.post("/descurtir/:id", function (req, res) {
    postController.descurtir(req, res);
})

router.get("/contarCurtida/:id", function (req, res) {
    postController.contarCurtida(req, res);
})

router.get("/listarPosts", function (req, res) {
    postController.listarPosts(req, res);
})

router.get("/listarComentarios/:id", function (req, res) {
    postController.listarComentarios(req, res);
})

module.exports = router;