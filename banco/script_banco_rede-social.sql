-- 1) Criar DB
CREATE DATABASE rede_social;
USE rede_social;

-- 2) tbUsuario
CREATE TABLE tbUsuario (
  idUsuario       INT            NOT NULL AUTO_INCREMENT,
  nomeUsuario     VARCHAR(20)    NOT NULL,
  userUsuario     VARCHAR(20)    NOT NULL UNIQUE,
  emailUsuario    VARCHAR(100)   NOT NULL UNIQUE,
  senhaUsuario    VARCHAR(10)    NOT NULL,
  bioUsuario      VARCHAR(100)   NULL,
  fkSeguidor      INT            NULL,
  pfpUsuario      LONGBLOB       NULL,
  bannerUsuario   LONGBLOB       NULL,
  PRIMARY KEY (idUsuario),
  CONSTRAINT FK_Usuario_Seguidor
    FOREIGN KEY (fkSeguidor)
    REFERENCES tbUsuario(idUsuario)
);

-- 3) tbPost
CREATE TABLE tbPost (
  idPost         INT          NOT NULL AUTO_INCREMENT,
  curtidasPost   INT          NOT NULL DEFAULT 0,
  descPost       VARCHAR(300) NULL,
  imagensPost    LONGBLOB     NULL,
  fkUsuario      INT          NOT NULL,
  PRIMARY KEY (idPost),
  CONSTRAINT FK_Post_Usuario
    FOREIGN KEY (fkUsuario)
    REFERENCES tbUsuario(idUsuario)
);

-- 4) tbComentario
CREATE TABLE tbComentario (
  idComentario      INT          NOT NULL AUTO_INCREMENT,
  fkPost            INT          NOT NULL,
  fkSubComentario   INT          NULL,
  descComentario    VARCHAR(300) NULL,
  fkUsuario         INT          NOT NULL,
  PRIMARY KEY (idComentario),
  CONSTRAINT FK_Comentario_Post
    FOREIGN KEY (fkPost)
    REFERENCES tbPost(idPost),
  CONSTRAINT FK_Comentario_Usuario
    FOREIGN KEY (fkUsuario)
    REFERENCES tbUsuario(idUsuario),
  CONSTRAINT FK_Comentario_Sub
    FOREIGN KEY (fkSubComentario)
    REFERENCES tbComentario(idComentario)
);

-- 5) tbCurtidas
CREATE TABLE tbCurtidas (
  fkCurtidas         INT    NOT NULL AUTO_INCREMENT,
  tbUsuario_idUsuario  INT  NOT NULL,
  fkPost             INT    NOT NULL,
  PRIMARY KEY (fkCurtidas),
  CONSTRAINT FK_Curtida_Usuario
    FOREIGN KEY (tbUsuario_idUsuario)
    REFERENCES tbUsuario(idUsuario),
  CONSTRAINT FK_Curtida_Post
    FOREIGN KEY (fkPost)
    REFERENCES tbPost(idPost)
);

select * from tbUsuario;

show tables;