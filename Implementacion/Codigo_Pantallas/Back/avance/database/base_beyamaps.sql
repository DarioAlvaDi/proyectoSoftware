CREATE DATABASE AD_SISTEMAS
USE AD_SISTEMAS
drop database AD_SISTEMAS

drop table Persona

---Tabla Usuario---
CREATE TABLE Turista(
	Id_Turista INT IDENTITY (1,1) NOT NULL PRIMARY KEY,
	Nombre VARCHAR(50) NOT NULL,
	A_Paterno VARCHAR(50) NOT NULL,
	A_Materno VARCHAR(50) NOT NULL,
	Correo VARCHAR(50) NOT NULL, 
	Telefono VARCHAR(50) NOT NULL
	Usuario VARCHAR(50) NOT NULL,
	Contraseña VARCHAR(50) NOT NULL,
	Id_Historial INT NOT NULL
)
ALTER TABLE Turista
ADD Nombre VARCHAR(50);

ALTER TABLE Turista
ADD A_Paterno VARCHAR(50);

ALTER TABLE Turista
ADD A_Materno VARCHAR(50);

ALTER TABLE Turista
ADD Correo VARCHAR(50);

ALTER TABLE Turista
ADD Telefono VARCHAR(50);

ALTER TABLE Turista ADD FOREIGN KEY (Id_Historial) references Historial_busqueda(Id_Historial) 

--Tabla Preferencias---
CREATE TABLE Preferencias(
	Id_Preferencia INT IDENTITY(1,1) NOT NULL PRIMARY KEY,
	Nombre VARCHAR(50) NOT NULL,
	Id_Turista INT NOT NULL
)
ALTER TABLE Preferencias ADD FOREIGN KEY (Id_Turista) references Turista(Id_Turista) 
ON DELETE CASCADE ON UPDATE CASCADE

---Tabla Itinerario---
CREATE TABLE Itinerario(
	Id_Itinerario INT IDENTITY(1,1) NOT NULL PRIMARY KEY,
	Id_Lugar INT NOT NULL,
	Fecha_Itinerario DATETIME NOT NULL,
	Hora_Itinerario TIME NOT NULL,
	Id_Turista INT NOT NULL
)
ALTER TABLE Itinerario ADD FOREIGN KEY (Id_Turista) references Turista(Id_Turista) 
ON DELETE CASCADE ON UPDATE CASCADE
ALTER TABLE Itinerario ADD FOREIGN KEY (Id_Lugar) references Lugar(Id_Lugar) 
ON DELETE CASCADE ON UPDATE CASCADE

----Tabla Favoritos---
CREATE TABLE Favoritos(
	Id_Favoritos INT IDENTITY(1,1) NOT NULL  PRIMARY KEY,
	Id_Lugar INT NOT NULL,
	Id_Turista INT NOT NULL
)
ALTER TABLE Favoritos ADD FOREIGN KEY (Id_Turista) references Turista(Id_Turista) 
ON DELETE CASCADE ON UPDATE CASCADE
ALTER TABLE Favoritos ADD FOREIGN KEY (Id_Lugar) references Lugar(Id_Lugar) 
ON DELETE CASCADE ON UPDATE CASCADE

---Tabla Lugar---
CREATE TABLE Lugar(
	Id_Lugar INT IDENTITY(1,1) NOT NULL PRIMARY KEY,
	Nombre VARCHAR(50) NOT NULL
)

---Historial de busqueda---
CREATE TABLE Historial_busqueda(
	Id_Historial INT IDENTITY(1,1) NOT NULL PRIMARY KEY,
	Id_Lugar INT NOT NULL
)
ALTER TABLE Historial_busqueda ADD FOREIGN KEY (Id_Lugar) references Lugar(Id_Lugar) 
ON DELETE CASCADE ON UPDATE CASCADE


-------------------------------LLENADO DE TABLAS-----------------------------

INSERT INTO Turista(Usuario, Contraseña, Id_Historial, Nombre, A_Paterno, A_Materno, Correo, Telefono)
VALUES 
    ('usuario1', 'contraseña1',1, 'Juan', 'Perez', 'Gomez', 'correo1@gmail.com', '123456789'),
    ('usuario2', 'contraseña2',2, 'Maria', 'Lopez', 'Martinez', 'correo2@outlook.com', '987654321'),
    ('usuario3', 'contraseña3',3, 'Carlos', 'Garcia', 'Rodriguez', 'correo3@hotmail.com', '555555555');


DELETE FROM Turista

INSERT INTO Lugar (Nombre)
VALUES 
    ('Lugar1'),
    ('Lugar2'),
    ('Lugar3');


INSERT INTO Historial_busqueda (Id_Lugar)
VALUES 
    (1),
    (2),
    (3);
DBCC CHECKIDENT (Historial_busqueda, RESEED, 0)
DELETE FROM Historial_busqueda

INSERT INTO Preferencias (Nombre, Id_Turista)
VALUES 
    ('Preferencia1', 4),
    ('Preferencia2', 5),
    ('Preferencia3', 6);

DBCC CHECKIDENT (Preferencias, RESEED, 0)
DELETE FROM Preferencias

INSERT INTO Itinerario (Id_Lugar, Fecha_Itinerario, Hora_Itinerario, Id_Turista)
VALUES 
    (1, '2023-11-07 00:00:00', '14:30:00', 4),
    (2, '2023-11-08 00:00:00', '09:00:00', 5),
    (3, '2023-11-09 00:00:00', '16:45:00', 6);

DBCC CHECKIDENT (Itinerario, RESEED, 0)
DELETE FROM Itinerario

INSERT INTO Favoritos (Id_Lugar, Id_Turista)
VALUES 
    (1, 4),
    (2, 5),
    (3, 6);

SELECT * FROM Turista
SELECT * FROM Historial_busqueda
SELECT * FROM Lugar
SELECT * FROM Favoritos
SELECT * FROM Preferencias
SELECT * FROM Itinerario

