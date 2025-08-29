const express = require("express");
const upload = require('../config/configPerfilUpload'); 
const router = express.Router();

const usuarioController = require("../controllers/usuarioController");

router.get("/dashPostMaisCurtido/:id", function (req, res) {
    usuarioController.dashPostMaisCurtido(req, res);
});

router.get("/verificarUser", function (req, res) {
    usuarioController.verificarUser(req, res);
});

router.get("/dashPostMaisCurtidosCurtidas/:id", function (req,res){
    usuarioController.dashPostMaisCurtidosCurtidas(req, res);
});

router.get("/dashTotalCurtidas/:id", function (req, res) {
    usuarioController.dashTotalCurtidas(req, res);
});

router.get("/listarPessoasOnline/:id", function (req, res) {
    usuarioController.listarPessoasOnline(req, res);
});

router.get("/dashTotalComentarios/:id", function (req, res) {
    usuarioController.dashTotalComentarios(req, res);
});

router.get("/dashTotalPosts/:id", function (req, res) {
    usuarioController.dashTotalPosts(req, res);
});

router.get("/dashTotaCurtidasSemana/:id", function (req, res) {
    usuarioController.dashTotaCurtidasSemana(req, res);
});

router.get("/dashTotaComentariosSemana/:id", function (req, res) {
    usuarioController.dashTotaComentariosSemana(req, res);
});

router.get("/dashTotaPostsSemana/:id", function (req, res) {
    usuarioController.dashTotaPostsSemana(req, res);
});

router.post("/cadastrar", function (req, res) {
    usuarioController.cadastrar(req, res);
})

router.post("/status/:id", function (req, res) {
    usuarioController.status(req, res);
})

router.post("/autenticar", function (req, res) {
    usuarioController.autenticar(req, res);
});

router.get("/listarAmigos", function (req, res) {
    usuarioController.listarAmigos(req, res);
});

router.get("/:id", function (req, res) {
    usuarioController.listarPostsUsuario(req, res);
});

router.post("/editar", function (req, res) {
    usuarioController.editarUsuario(req, res);
});

router.get("/convidado/:id", function (req, res) {
    usuarioController.convidado(req, res);
});

router.post("/enviarPfp", upload.single('foto'), (req, res) => {
    usuarioController.enviarPfp(req, res);
});

router.post("/enviarBanner", upload.single('foto'), (req, res) => {
    usuarioController.enviarBanner(req, res);
});

router.post("/trocarCor/:id", upload.single('foto'), (req, res) => {
    usuarioController.trocarCor(req, res);
});


router.get("/atualizarUser/:id", function (req, res) {
    usuarioController.atualizarUser(req, res);
});


module.exports = router;