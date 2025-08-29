-- 1) Criar DB
DROP DATABASE rede_social;

CREATE DATABASE rede_social;

USE rede_social;




-- 2) tbUsuario
CREATE TABLE tbUsuario (
    idUsuario INT NOT NULL AUTO_INCREMENT,
    nomeUsuario VARCHAR(20) NOT NULL,
    userUsuario VARCHAR(20) NOT NULL UNIQUE,
    dataInscricao datetime default current_timestamp,
    emailUsuario VARCHAR(100) NOT NULL UNIQUE,
    senhaUsuario VARCHAR(10) NOT NULL,
    bioUsuario VARCHAR(100) NULL,
    fkSeguidor INT NULL,
    pfpUsuario TEXT NULL,
    bannerUsuario TEXT NULL,
    corUsuario varchar(20),
    statusUsuario boolean default false,
    PRIMARY KEY (idUsuario),
    CONSTRAINT FK_Usuario_Seguidor FOREIGN KEY (fkSeguidor) REFERENCES tbUsuario (idUsuario)
);


select * from tbUsuario;

-- 3) tbPost
CREATE TABLE tbPost (
    idPost INT NOT NULL AUTO_INCREMENT,
    descPost VARCHAR(300) NULL,
    dataPosts datetime default current_timestamp ,
    imagensPost TEXT NULL,
    fkUsuario INT NOT NULL,
    PRIMARY KEY (idPost, fkUsuario),
    CONSTRAINT FK_Post_Usuario FOREIGN KEY (fkUsuario) REFERENCES tbUsuario (idUsuario)
);



-- 4) tbComentario
CREATE TABLE tbComentario (
    idComentario INT NOT NULL AUTO_INCREMENT,
    fkPost INT NOT NULL,
    fkSubComentario INT NULL,
    descComentario VARCHAR(300) NULL,
    dataComentario datetime default current_timestamp,
    fkUsuario INT NOT NULL,
    PRIMARY KEY (idComentario),
    CONSTRAINT FK_Comentario_Post FOREIGN KEY (fkPost) REFERENCES tbPost (idPost),
    CONSTRAINT FK_Comentario_Usuario FOREIGN KEY (fkUsuario) REFERENCES tbUsuario (idUsuario),
    CONSTRAINT FK_Comentario_Sub FOREIGN KEY (fkSubComentario) REFERENCES tbComentario (idComentario)
);


-- 5) tbCurtidas
CREATE TABLE tbCurtidas (
    fkUsuario INT NOT NULL,
    fkPost INT NOT NULL,
    dataCurtida DATETIME DEFAULT CURRENT_TIMESTAMP,
    constraint pkCurtidas primary key(fkUsuario,fkPost),
    CONSTRAINT FK_Curtida_Usuario FOREIGN KEY (fkUsuario) REFERENCES tbUsuario (idUsuario),
    CONSTRAINT FK_Curtida_Post FOREIGN KEY (fkPost) REFERENCES tbPost (idPost)
);

select * from tbUsuario;


show tables;

use rede_social;



(SELECT 
    DATE(dataPosts) AS dia,
    'posts' AS tipo,
    COUNT(idPost) AS total
FROM tbPost
WHERE fkUsuario = 1
  AND dataPosts >= NOW() - INTERVAL 7 DAY
GROUP BY dia)

UNION ALL

(SELECT 
    DATE(c.dataCurtida) AS dia,
    'curtidas' AS tipo,
    COUNT(c.fkPost) AS total
FROM tbCurtidas c
JOIN tbPost p ON c.fkPost = p.idPost
WHERE p.fkUsuario = 1
  AND c.dataCurtida >= NOW() - INTERVAL 7 DAY
GROUP BY dia)

UNION ALL

(SELECT 
    DATE(dataComentario) AS dia,
    'comentarios' AS tipo,
    COUNT(idComentario) AS total
FROM tbComentario
WHERE fkUsuario = 1
  AND dataComentario >= NOW() - INTERVAL 7 DAY
GROUP BY dia)

ORDER BY dia DESC, tipo;





SELECT
    s.idUsuario as idSeguidor,
    s.userUsuario as userSeguidor,
    s.pfpUsuario as pfpSeguidor
FROM tbUsuario as u
    JOIN tbUsuario as s ON u.fkSeguidor = s.idUsuario;

show tables;

select * from tbPost;


show databases;


          SELECT
            COUNT(c.fkPost) AS total_cur,
            COUNT(co.fkPost) AS total_com,
            COUNT(p.idPost) AS total_post,
            DAY(co.dataComentario) AS dia
        FROM tbUsuario u
        LEFT JOIN tbPost p ON u.idUsuario = p.fkUsuario
        LEFT JOIN tbCurtidas c ON p.idPost = c.fkPost
        LEFT JOIN tbComentario co ON p.idPost = co.fkPost
        WHERE u.idUsuario = 1
        
        union
        
		SELECT
            COUNT(c.fkPost) AS total_cur,
            COUNT(co.fkPost) AS total_com,
            COUNT(p.idPost) AS total_post,
            DAY(c.dataCurtida) AS dia
        FROM tbUsuario u
        LEFT JOIN tbPost p ON u.idUsuario = p.fkUsuario
        LEFT JOIN tbCurtidas c ON p.idPost = c.fkPost
        LEFT JOIN tbComentario co ON p.idPost = co.fkPost
        WHERE u.idUsuario = 1
        
        group by dia;
        
SELECT 
    DAY(dataPosts) AS dia,
    COUNT(idPost) AS total_post
FROM tbPost
WHERE fkUsuario = 1
  AND dataPosts >= CURDATE() - INTERVAL 7 DAY
GROUP BY DAY(dataPosts)
ORDER BY dia DESC;

SELECT 
	DAY(c.dataComentario) AS dia,
	COUNT(c.fkPost) AS total_com
FROM tbComentario c
JOIN tbPost p ON c.fkPost = p.idPost
WHERE p.fkUsuario = 1
	AND c.dataComentario >= CURDATE() - INTERVAL 7 DAY
GROUP BY DAY(c.dataComentario)
ORDER BY dia DESC;

select * from tbCurtidas;

SELECT 
    DAY(c.dataCurtida) AS dia,
    COUNT(c.fkPost) AS total_cur
FROM tbCurtidas c
JOIN tbPost p ON c.fkPost = p.idPost
WHERE p.fkUsuario = 1
  AND c.dataCurtida >= CURDATE() - INTERVAL 7 DAY
GROUP BY DAY(c.dataCurtida)
ORDER BY dia DESC;

SELECT 
    DAY(dataComentario) AS dia,
    COUNT(idComentario) AS total_com
FROM tbComentario
WHERE fkUsuario = 1
  AND dataComentario >= CURDATE() - INTERVAL 7 DAY
GROUP BY DAY(dataComentario)
ORDER BY dia DESC;

select * from tbPost;

SELECT 
    p.idPost,
    p.descPost,
    p.imagensPost,
    COUNT(c.fkUsuario) AS totalCurtidas
FROM tbPost p
LEFT JOIN tbCurtidas c ON p.idPost = c.fkPost
WHERE p.fkUsuario = 1
GROUP BY p.idPost
ORDER BY totalCurtidas DESC
LIMIT 1;

SELECT 
    u.idUsuario AS idQuemCurtiu,
    u.nomeUsuario AS nomeQuemCurtiu,
    u.userUsuario AS userQuemCurtiu,
    u.pfpUsuario,
    date(c.dataCurtida) as diaQuemCurtiu
FROM tbCurtidas c
JOIN tbUsuario u ON c.fkUsuario = u.idUsuario
WHERE c.fkPost = 1;


select * from tbCurtidas;

alter table tbComentario;

select * from tbComentario;

    SELECT 
        DAY(c.dataCurtida) AS dia,
        COUNT(c.fkPost) AS total_cur
    FROM tbCurtidas c
    LEFT JOIN tbPost p ON c.fkPost = p.idPost
    WHERE p.fkUsuario = 1
      AND c.dataCurtida >= CURDATE() - INTERVAL 7 DAY
    GROUP BY DAY(c.dataCurtida)
    ORDER BY dia ASC;
    
     SELECT 
	DAY(c.dataComentario) AS dia,
	COUNT(c.fkPost) AS total_com
FROM tbComentario c
JOIN tbPost p ON c.fkPost = p.idPost
WHERE p.fkUsuario = 1
	AND c.dataComentario >= CURDATE() - INTERVAL 7 DAY
GROUP BY DAY(c.dataComentario)
ORDER BY dia ASC;



select dataCurtida from tbCurtidas;