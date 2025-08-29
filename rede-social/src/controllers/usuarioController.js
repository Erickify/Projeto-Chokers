var usuarioModel = require("../models/usuarioModel");

function dashPostMaisCurtido(req, res) {

	var idUsuario = req.params.id;

	usuarioModel
		.dashPostMaisCurtido(idUsuario)
		.then(function (resultado) {
			res.json(resultado);
		})
		.catch(function (erro) {
			console.log(erro);
			res.status(500).json(erro.sqlMessage);
		});
}

function dashPostMaisCurtidosCurtidas(req, res) {

	var idPost = req.params.id;

	usuarioModel
		.dashPostMaisCurtidosCurtidas(idPost)
		.then(function (resultado) {
			res.json(resultado);
		})
		.catch(function (erro) {
			console.log(erro);
			res.status(500).json(erro.sqlMessage);
		});
}

function listarPessoasOnline(req, res) {

	var idUsuario = req.params.id;

	usuarioModel
		.listarPessoasOnline(idUsuario)
		.then(function (resultado) {
			res.json(resultado);
		})
		.catch(function (erro) {
			console.log(erro);
			res.status(500).json(erro.sqlMessage);
		});
}


function dashTotalCurtidas(req, res) {

	var idUsuario = req.params.id;
	
	console.log(idUsuario)

	usuarioModel
		.dashTotalCurtidas(idUsuario)
		.then(function (resultado) {
			res.json(resultado);
		})
		.catch(function (erro) {
			console.log(erro);
			res.status(500).json(erro.sqlMessage);
		});
}

function verificarUser(req, res) {
	

	usuarioModel
		.verificarUser()
		.then(function (resultado) {
			res.json(resultado);
		})
		.catch(function (erro) {
			console.log(erro);
			res.status(500).json(erro.sqlMessage);
		});
}

function dashTotalComentarios(req, res) {

	var idUsuario = req.params.id;

	console.log(idUsuario)

	usuarioModel
		.dashTotalComentarios(idUsuario)
		.then(function (resultado) {
			res.json(resultado);
		})
		.catch(function (erro) {
			console.log(erro);
			res.status(500).json(erro.sqlMessage);
		});
}

function dashTotalPosts(req, res) {

	var idUsuario = req.params.id;

	console.log(idUsuario)

	usuarioModel
		.dashTotalPosts(idUsuario)
		.then(function (resultado) {
			res.json(resultado);
		})
		.catch(function (erro) {
			console.log(erro);
			res.status(500).json(erro.sqlMessage);
		});
}

function dashTotaCurtidasSemana(req, res) {

	var idUsuario = req.params.id;

	console.log(idUsuario)

	usuarioModel
		.dashTotaCurtidasSemana(idUsuario)
		.then(function (resultado) {
			res.json(resultado);
		})
		.catch(function (erro) {
			console.log(erro);
			res.status(500).json(erro.sqlMessage);
		});
}

function dashTotaComentariosSemana(req, res) {

	var idUsuario = req.params.id;

	console.log(idUsuario)

	usuarioModel
		.dashTotaComentariosSemana(idUsuario)
		.then(function (resultado) {
			res.json(resultado);
		})
		.catch(function (erro) {
			console.log(erro);
			res.status(500).json(erro.sqlMessage);
		});
}

function dashTotaPostsSemana(req, res) {

	var idUsuario = req.params.id;

	console.log(idUsuario)

	usuarioModel
		.dashTotaPostsSemana(idUsuario)
		.then(function (resultado) {
			res.json(resultado);
		})
		.catch(function (erro) {
			console.log(erro);
			res.status(500).json(erro.sqlMessage);
		});
}

function autenticar(req, res) {
	var email = req.body.emailServer;
	var senha = req.body.senhaServer;

	if (!email || !senha) {
		return res.status(400).json({
			erro: "Preencha todos os campos!",
		});
	}

	usuarioModel
		.autenticar(email, senha)
		.then(function (resultado) {
			if (resultado.length == 1) {
				res.json({
					idUsuario: resultado[0].idUsuario,
					nome: resultado[0].nomeUsuario,
					user: resultado[0].userUsuario,
					email: resultado[0].emailUsuario,
					senha: resultado[0].senhaUsuario,
					pfp: resultado[0].pfpUsuario,
					banner: resultado[0].bannerUsuario,
					bio: resultado[0].bioUsuario,
					dataInscricao: resultado[0].dataInscricao,
					corpri: resultado[0].corUsuario,
				});
			} else {
				res.status(403).json({
					erro: "Email e/ou senha inválidos!",
				});
			}
		})
		.catch(function (erro) {
			console.error("Erro ao autenticar:", erro);
			res.status(500).json({
				erro: "Erro interno no servidor.",
			});
		});
}

function cadastrar(req, res) {
	// Crie uma variável que vá recuperar os valores do arquivo cadastro.html
	var nome = req.body.nomeServer;
	var email = req.body.emailServer;
	var senha = req.body.senhaServer;
	var user = req.body.userServer;

	// Faça as validações dos valores
	if (nome == undefined) {
		res.status(400).send("Seu nome está undefined!");
	} else if (email == undefined) {
		res.status(400).send("Seu email está undefined!");
	} else if (senha == undefined) {
		res.status(400).send("Sua senha está undefined!");
	} else {
		// Passe os valores como parâmetro e vá para o arquivo usuarioModel.js
		usuarioModel
			.cadastrar(nome, email, senha, user)
			.then(function (resultado) {
				res.json(resultado);
			})
			.catch(function (erro) {
				console.log(erro);
				console.log(
					"\nHouve um erro ao realizar o cadastro! Erro: ",
					erro.sqlMessage
				);
				res.status(500).json(erro.sqlMessage);
			});
	}
}

function status(req, res) {

	var status = req.body.statusUsuario;
	var idUsuario = req.params.id


		usuarioModel
			.status(idUsuario, status)
			.then(function (resultado) {
				res.json(resultado);
			})
			.catch(function (erro) {
				console.log(erro);
				console.log(
					"\nHouve um erro ao realizar o status! Erro: ",
					erro.sqlMessage
				);
				res.status(500).json(erro.sqlMessage);
			});
	
}

function listarAmigos(req, res) {
	usuarioModel
		.listarAmigos()
		.then(function (resultado) {
			res.json(resultado);
		})
		.catch(function (erro) {
			console.log(erro);
			console.log(
				"\nHouve um erro ao puxar os seguidores! Erro: ",
				erro.sqlMessage
			);
			res.status(500).json(erro.sqlMessage);
		});
}

function listarPostsUsuario(req, res) {
    var idUsuario = req.params.id;

    usuarioModel.listarPostsUsuario(idUsuario)
        .then(function (resultado) {
            res.json(resultado);
        })
        .catch(function (erro) {
            console.log(erro);
            res.status(500).json({ 
                erro: "Erro ao listar posts",
                detalhes: erro.sqlMessage 
            });
        });
}

function convidado(req, res) {
	var idConvidado = req.params.id;

	usuarioModel
		.convidado(idConvidado)
		.then(function (resultado) {
			res.json(resultado);
		})
		.catch(function (erro) {
			console.log(erro);
			res.status(500).json(erro.sqlMessage);
		});
}

function editarUsuario(req, res) {
	var nomeUsuario = req.body.nomeUsuarioServer;
	var bioUsuario = req.body.bioUsuarioServer;
	var idUsuario = req.body.idUsuarioServer;

	usuarioModel
		.editarUsuario(idUsuario, nomeUsuario, bioUsuario)

		.then((resultado) => {
			res.status(201).json({
				mensagem: "edição feita com sucesso!",
				resultado,
			});
		})
		.catch((erro) => {
			console.log(erro);
			res.status(500).json(erro.sqlMessage);
		});
}

function trocarCor(req, res) {
	var idUsuario = req.params.id
	var corPri = req.body.cor;

	usuarioModel
		.trocarCor(idUsuario, corPri)

		.then((resultado) => {
			res.status(201).json({
				mensagem: "edição de cor feita com sucesso!",
				resultado,
			});
		})
		.catch((erro) => {
			console.log(erro);
			res.status(500).json(erro.sqlMessage);
		});
}

function enviarPfp(req, res) {
	const imagem = req.file.filename;
	const idUsuario = req.body.idUsuario;

	if (imagem === undefined) {
		console.log("Imagem indefinida");
	} else {
		usuarioModel
			.enviarPfp(idUsuario, imagem)
			.then((resultado) => {
				res.status(201).json({
					mensagem: "Post criado com sucesso!",
					resultado,
				});
			})
			.catch((erro) => {
				console.error("Erro ao postar:", erro);
				res.status(500).json({
					erro: "Erro ao criar o post.",
				});
			});
	}
}

function enviarBanner(req, res) {
	const imagem = req.file.filename;
	const idUsuario = req.body.idUsuario;

	if (imagem === undefined) {
		console.log("Imagem indefinida");
	} else {
		usuarioModel
			.enviarBanner(idUsuario, imagem)
			.then((resultado) => {
				res.status(201).json({
					mensagem: "edição criada com sucesso!",
					resultado,
				});
			})
			.catch((erro) => {
				console.error("Erro ao postar:", erro);
				res.status(500).json({
					erro: "Erro ao efetuar edição.",
				});
			});
	}
}

function atualizarUser(req, res) {
	var idUsuario = req.params.id;

	usuarioModel
		.atualizarUser(idUsuario)
		.then(function (resultado) {
			res.json(resultado);
		})
		.catch(function (erro) {
			console.log(erro);
			res.status(500).json(erro.sqlMessage);
		});
}

module.exports = {
	autenticar,
	cadastrar,
	listarAmigos,
	listarPostsUsuario,
	editarUsuario,
	convidado,
	enviarPfp,
	enviarBanner,
	atualizarUser,
	dashPostMaisCurtido,
	dashTotalCurtidas,
	dashTotalComentarios,
	dashTotalPosts,
	dashTotaCurtidasSemana,
	dashTotaComentariosSemana,
	dashTotaPostsSemana,
	dashPostMaisCurtidosCurtidas,
	verificarUser,
	trocarCor,
	status,
	listarPessoasOnline
};
