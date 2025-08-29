var postModel = require("../models/postModel");

function postar(req, res) {

    const { descPost, idUsuario } = req.body;

    // Caminho da imagem salva (pelo multer)
    const imagem = req.file ? req.file.filename : null;

    if (!descPost || !idUsuario) {
        return res.status(400).json({ erro: "Descrição e ID do usuário são obrigatórios." });
    }


    postModel.postar(descPost, imagem, idUsuario)
        .then(resultado => {
            res.status(201).json({ mensagem: "Post criado com sucesso!", resultado });
        })
        .catch(erro => {
            console.error("Erro ao postar:", erro);
            res.status(500).json({ erro: "Erro ao criar o post." });

        });

}

function listarPosts(req, res) {

    postModel.listarPosts()
        .then(
            function (resultado) {

                res.json(resultado)

            }).catch(function (erro) {
                console.log(erro);
                console.log(
                    "\nHouve um erro ao puxar os posts! Erro: ",
                    erro.sqlMessage
                );
                res.status(500).json(erro.sqlMessage);
            });

}

function comentar(req, res) {

    const descComentario = req.body.descComentario;
    const idUsuario = req.body.idUsuario;
    var idPost = req.params.id

    if (!idPost) {
        return res.status(400).json({ erro: "Descrição e ID do usuário são obrigatórios." });
    }


    postModel.comentar(idPost, descComentario, idUsuario)
        .then(resultado => {
            res.status(201).json({ mensagem: "comentario criado com sucesso!", resultado });
        })
        .catch(erro => {
            console.error("Erro ao postar:", erro);
            res.status(500).json({ erro: "Erro ao comentar." });

        });

}

function curtir(req, res) {

    const idUsuario = req.body.idUsuario;
    var idPost = req.params.id

    if (!idPost) {
        return res.status(400).json({ erro: "Descrição e ID do usuário são obrigatórios." });
    }


    postModel.curtir(idPost, idUsuario)
        .then(resultado => {
            res.status(201).json({ mensagem: "curtida feita com sucesso!", resultado });
        })
        .catch(erro => {
            console.error("Erro ao curtir:", erro);
            res.status(500).json({ erro: "Erro ao curtir." });

        });

}

function descurtir(req, res) {

    const idUsuario = req.body.idUsuario;
    var idPost = req.params.id

    if (!idPost) {
        return res.status(400).json({ erro: "Descrição e ID do usuário são obrigatórios." });
    }


    postModel.descurtir(idPost, idUsuario)
        .then(resultado => {
            res.status(201).json({ mensagem: "descurtida feita com sucesso!", resultado });
        })
        .catch(erro => {
            console.error("Erro ao descurtir:", erro);
            res.status(500).json({ erro: "Erro ao descurtir." });

        });
}

function contarCurtida(req, res) {

    const idPost = req.params.id

    postModel.contarCurtida(idPost)
        .then(
            function (resultado) {

                res.json(resultado)

            }).catch(function (erro) {
                console.log(erro);
                console.log(
                    "\nHouve um erro ao contar curtidads dos posts! Erro: ",
                    erro.sqlMessage
                );
                res.status(500).json(erro.sqlMessage);
            });

}


function listarComentarios(req, res) {

    const idPost = req.params.id

    postModel.listarComentarios(idPost)
        .then(
            function (resultado) {

                res.json(resultado)

            }).catch(function (erro) {
                console.log(erro);
                console.log(
                    "\nHouve um erro ao puxar os comentarios! Erro: ",
                    erro.sqlMessage
                );
                res.status(500).json(erro.sqlMessage);
            });

}



module.exports = {
    postar,
    listarPosts,
    comentar,
    listarComentarios,
    curtir,
    descurtir,
    contarCurtida
}








// idPost: resultado[0].idPost,
// descPost: resultado[0].descPost,
// curtidasPost: resultado[0].curtidasPost,
// imgPost: resultado[0].imgPost,
// idUsuario: resultado[0].idUsuario,
// nomeUsuario: resultado[0].nomeUsuario,
// userUsuario: resultado[0].userUsuario,
// emailUser: resultado[0].emailUser,