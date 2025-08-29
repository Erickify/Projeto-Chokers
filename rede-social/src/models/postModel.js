var database = require("../database/config")

// Coloque os mesmos parâmetros aqui. Vá para a var instrucaoSql
function postar(descPost, imagem, idUsuario) {
    console.log("ACESSEI O post MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function cadastrar():", descPost, idUsuario, imagem);

    // Insira exatamente a query do banco aqui, lembrando da nomenclatura exata nos valores
    //  e na ordem de inserção dos dados.
    var instrucaoSql = `
        INSERT INTO tbPost (descPost, imagensPost, fkUsuario) VALUES ("${descPost}","${imagem}", "${idUsuario}" );    `;
    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

function listarPosts() {
    console.log("ok")
    var instrucaoSql = `
    SELECT 
        p.idPost as idPost,
        p.descPost as descPost,
        p.imagensPost as imgPost,
        u.idUsuario as idUsuario,
        u.pfpUsuario as pfpUsuario,
        u.nomeUsuario as nomeUsuario,
        u.userUsuario as userUsuario,
        u.emailUsuario as emailUser
    FROM tbPost as p
    JOIN tbUsuario as u ON p.fkUsuario = u.idUsuario 
    ORDER BY p.idPost DESC;
    `;
    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);

}

function comentar(idPost, descComentario, idUsuario) {

    var instrucaoSql = `
    
        INSERT INTO tbComentario (fkPost, descComentario, fkUsuario) VALUES
	        (${idPost}, "${descComentario}", ${idUsuario});
    
    `;

    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);

}

function curtir(idPost, idUsuario) {

    var instrucaoSql = `
    
        INSERT INTO tbCurtidas (fkPost, fkUsuario) VALUES
	        (${idPost}, ${idUsuario});
    
    `;

    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);

}

function descurtir(idPost, idUsuario) {

    var instrucaoSql = `

    DELETE FROM tbCurtidas WHERE fkUsuario = ${idUsuario}
    
    `;

    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);

}

function contarCurtida(idPost) {
    console.log("ok")
    var instrucaoSql = `
SELECT 
    COUNT(*) as qtdCurtidas from tbCurtidas 
WHERE fkPost = ${idPost}


`;
    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);

}


function listarComentarios(idPost) {
    console.log("ok")
    var instrucaoSql = `
SELECT 
    c.idComentario,
    c.fkPost,
    c.descComentario,
    c.fkUsuario,
    u.nomeUsuario,
    u.userUsuario,
    u.pfpUsuario,
    u.emailUsuario
FROM tbComentario AS c
JOIN tbUsuario AS u ON c.fkUsuario = u.idUsuario
WHERE c.fkPost = ${idPost}
ORDER BY c.idComentario DESC;`;
    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);

}



module.exports = {
    postar,
    listarPosts,
    comentar,
    listarComentarios,
    curtir,
    descurtir,
    contarCurtida
};