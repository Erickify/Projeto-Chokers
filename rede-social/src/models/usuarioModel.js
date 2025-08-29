var database = require("../database/config");

function autenticar(email, senha) {
	console.log(
		"ACESSEI O USUARIO MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function entrar(): ",
		email,
		senha
	);
	var instrucaoSql = `
        SELECT  * FROM tbUsuario WHERE emailUsuario = "${email}" AND senhaUsuario = "${senha}";
    `;
	console.log("Executando a instrução SQL: \n" + instrucaoSql);
	return database.executar(instrucaoSql);
}

function cadastrar(nome, email, senha, user) {
	console.log(
		"ACESSEI O USUARIO MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function cadastrar():",
		nome,
		email,
		senha,
		user
	);

	var instrucaoSql = `
        INSERT INTO tbUsuario (nomeUsuario, emailUsuario, senhaUsuario, userUsuario, bioUsuario, pfpUsuario, bannerUsuario, corUsuario) VALUES ("${nome}", "${email}", "${senha}", "${user}", " ", "imagem_perfil_default.svg", "imagem_banner_default.svg", "#cb1c1c");
    `;
	console.log("Executando a instrução SQL: \n" + instrucaoSql);
	return database.executar(instrucaoSql);
}

function status(idUsuario, status) {
	console.log(
		"ACESSEI O USUARIO MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function status():",
	);

	var instrucaoSql = `
        update tbUsuario set statusUsuario = ${status} where idUsuario = ${idUsuario}; 
    `;
	console.log("Executando a instrução SQL: \n" + instrucaoSql);
	return database.executar(instrucaoSql);
}

function listarAmigos() {
	console.log("ok");
	var instrucaoSql = `
    SELECT 

        s.idUsuario as idSeguidor,
        s.userUsuario as userSeguidor,
        s.pfpUsuario as pfpSeguidor

    FROM tbUsuario as u
    JOIN tbUsuario as s ON u.fkSeguidor = s.idUsuario
    ;
    `;
	console.log("Executando a instrução SQL: \n" + instrucaoSql);
	return database.executar(instrucaoSql);
}

function listarPostsUsuario(idUsuario) {
	console.log("ok");
	var instrucaoSql = `
    SELECT 
        p.idPost as idPost,
        p.descPost as descPost,
        p.imagensPost as imgPost,
        u.pfpUsuario as pfpUsuario,
        u.idUsuario as idUsuario,
        u.nomeUsuario as nomeUsuario,
        u.userUsuario as userUsuario,
        u.emailUsuario as emailUser
    FROM tbPost as p
    JOIN tbUsuario as u ON p.fkUsuario = u.idUsuario
    WHERE u.idUsuario = ${idUsuario}
    ORDER BY p.idPost DESC;
    `;
	console.log("Executando a instrução SQL: \n" + instrucaoSql);
	return database.executar(instrucaoSql);
}

function convidado(idConvidado) {
	console.log("ok");
	var instrucaoSql = `
    SELECT *
    FROM tbUsuario
    WHERE idUsuario = ${idConvidado};
    `;
	console.log("Executando a instrução SQL: \n" + instrucaoSql);
	return database.executar(instrucaoSql);
}

function verificarUser() {
	console.log("ok");
	var instrucaoSql = `
    SELECT userUsuario, emailUsuario
    FROM tbUsuario;
    `;
	console.log("Executando a instrução SQL: \n" + instrucaoSql);
	return database.executar(instrucaoSql);
}

function editarUsuario(idUsuario, nomeUsuario, bioUsuario) {
	console.log("ok");
	var instrucaoSql = `
    UPDATE tbUsuario
    SET nomeUsuario = "${nomeUsuario}",
    bioUsuario =  "${bioUsuario}"
    WHERE idUsuario = ${idUsuario};
    `;
	console.log("Executando a instrução SQL: \n" + instrucaoSql);
	return database.executar(instrucaoSql);
}

function trocarCor(idUsuario, corPri) {
	console.log("ok");
	var instrucaoSql = `
    UPDATE tbUsuario
    SET corUsuario = "${corPri}"
    WHERE idUsuario = ${idUsuario};
    `;
	console.log("Executando a instrução SQL: \n" + instrucaoSql);
	return database.executar(instrucaoSql);
}

function enviarPfp(idUsuario, imagem) {
	var instrucaoSql = `
    UPDATE tbUsuario
    SET pfpUsuario = "${imagem}"
    WHERE idUsuario = ${idUsuario};
    `;
	console.log("Executando a instrução SQL: \n" + instrucaoSql);

	return database.executar(instrucaoSql);
}

function enviarBanner(idUsuario, imagem) {
	var instrucaoSql = `
    UPDATE tbUsuario
    SET bannerUsuario = "${imagem}"
    WHERE idUsuario = ${idUsuario};
    `;
	console.log("Executando a instrução SQL: \n" + instrucaoSql);

	return database.executar(instrucaoSql);
}

function atualizarUser(idUsuario) {
	var instrucaoSql = `
    SELECT * FROM tbUsuario WHERE idUsuario = ${idUsuario}`;
	console.log("Executando a instrução SQL: \n" + instrucaoSql);

	return database.executar(instrucaoSql);
}

function dashPostMaisCurtido(idUsuario) {
	console.log("ok");
	var instrucaoSql = `
SELECT 
    p.idPost,
    p.descPost,
    p.imagensPost,
    COUNT(c.fkUsuario) AS totalCurtidas
FROM tbPost p
LEFT JOIN tbCurtidas c ON p.idPost = c.fkPost
WHERE p.fkUsuario = ${idUsuario}
GROUP BY p.idPost
ORDER BY totalCurtidas DESC
LIMIT 1;

    `;
	console.log("Executando a instrução SQL: \n" + instrucaoSql);
	return database.executar(instrucaoSql);
}

function dashPostMaisCurtidosCurtidas(idPost) {
	console.log("ok");
	var instrucaoSql = `
SELECT 
    u.idUsuario AS idQuemCurtiu,
    u.nomeUsuario AS nomeQuemCurtiu,
    u.userUsuario AS userQuemCurtiu,
    u.pfpUsuario,
    DATE_FORMAT(c.dataCurtida, '%d-%m-%Y') as diaQuemCurtiu
FROM tbCurtidas c
JOIN tbUsuario u ON c.fkUsuario = u.idUsuario
WHERE c.fkPost = ${idPost};

    `;
	console.log("Executando a instrução SQL: \n" + instrucaoSql);
	return database.executar(instrucaoSql);
}


function listarPessoasOnline(idUsuario) {
	console.log("ok");
	var instrucaoSql = `
SELECT 
    idUsuario AS idOnline,
    nomeUsuario AS nomeOnline,
    userUsuario AS userOnline,
    pfpUsuario as pfpQuemOnline,
	bannerUsuario as bannerQuemOnline
FROM tbUsuario
WHERE idUsuario != ${idUsuario} AND statusUsuario = 1
ORDER BY RAND()
LIMIT 3;;

    `;
	console.log("Executando a instrução SQL: \n" + instrucaoSql);
	return database.executar(instrucaoSql);
}


function dashTotalCurtidas(idUsuario) {
	console.log("ok");
	var instrucaoSql = `
      SELECT 
        COUNT(c.fkPost) AS total_curtidas
    FROM tbUsuario u
    LEFT JOIN tbPost p ON u.idUsuario = p.fkUsuario
    LEFT JOIN tbCurtidas c ON p.idPost = c.fkPost
    WHERE u.idUsuario = ${idUsuario};

    `;
	console.log("Executando a instrução SQL: \n" + instrucaoSql);
	return database.executar(instrucaoSql);
}

function dashTotaCurtidasSemana(idUsuario) {
	console.log("ok");
	var instrucaoSql = `
    SELECT 
        DAY(c.dataCurtida) AS dia,
        COUNT(c.fkPost) AS total_cur
    FROM tbCurtidas c
    JOIN tbPost p ON c.fkPost = p.idPost
    WHERE p.fkUsuario = ${idUsuario}
      AND c.dataCurtida >= CURDATE() - INTERVAL 7 DAY
    GROUP BY DAY(c.dataCurtida)
    ORDER BY dia ASC;

    `;
	console.log("Executando a instrução SQL: \n" + instrucaoSql);
	return database.executar(instrucaoSql);
}

function dashTotaPostsSemana(idUsuario) {
	console.log("ok");
	var instrucaoSql = `
   SELECT 
    DAY(dataPosts) AS dia,
    COUNT(idPost) AS total_post
FROM tbPost
WHERE fkUsuario = ${idUsuario}
  AND dataPosts >= CURDATE() - INTERVAL 7 DAY
GROUP BY DAY(dataPosts)
ORDER BY dia ASC;

    `;
	console.log("Executando a instrução SQL: \n" + instrucaoSql);
	return database.executar(instrucaoSql);
}

function dashTotaComentariosSemana(idUsuario) {
	console.log("ok");
	var instrucaoSql = `
 SELECT 
	DAY(c.dataComentario) AS dia,
	COUNT(c.fkPost) AS total_com
FROM tbComentario c
JOIN tbPost p ON c.fkPost = p.idPost
WHERE p.fkUsuario = ${idUsuario}
	AND c.dataComentario >= CURDATE() - INTERVAL 7 DAY
GROUP BY DAY(c.dataComentario)
ORDER BY dia ASC;

    `;
	console.log("Executando a instrução SQL: \n" + instrucaoSql);
	return database.executar(instrucaoSql);
}

function dashTotalComentarios(idUsuario) {
	console.log("ok");
	var instrucaoSql = `
      SELECT COUNT(idComentario) AS total_com
        FROM tbComentario
        WHERE fkUsuario = ${idUsuario}; 

    `;
	console.log("Executando a instrução SQL: \n" + instrucaoSql);
	return database.executar(instrucaoSql);
}

function dashTotalPosts(idUsuario) {
	console.log("ok");
	var instrucaoSql = `
    SELECT COUNT(idPost) AS total_posts
    FROM tbPost
    WHERE fkUsuario = ${idUsuario};

    `;
	console.log("Executando a instrução SQL: \n" + instrucaoSql);
	return database.executar(instrucaoSql);
}

module.exports = {
	autenticar,
	cadastrar,
	listarAmigos,
	listarPostsUsuario,
	convidado,
	editarUsuario,
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
	listarPessoasOnline,
};
