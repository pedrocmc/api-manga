CREATE DATABASE  `manga`;

USE `manga`;

CREATE TABLE capitulo (
  id INT PRIMARY KEY,
  nome_manga VARCHAR(255),
  num_cap INT,
  mangaId INT

);
CREATE TABLE manga (
  id INT PRIMARY KEY,
  nome VARCHAR(255),
  tipo varchar(255),
  descricao varchar(255)
   
);

CREATE TABLE pagina (
  id INT PRIMARY KEY,
  npagina INT,
  manga VARCHAR(255),
  capitulo INT

);