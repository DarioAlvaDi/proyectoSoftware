CREATE DATABASE AD_SISTEMAS;
USE AD_SISTEMAS;


CREATE TABLE Turista (
    Id_Turista INT AUTO_INCREMENT PRIMARY KEY,
    Nombre VARCHAR(50) NOT NULL,
    A_Paterno VARCHAR(50) NOT NULL,
    A_Materno VARCHAR(50) NOT NULL,
    Correo VARCHAR(50) NOT NULL, 
    Telefono VARCHAR(50) NOT NULL,
    Usuario VARCHAR(50) NOT NULL,
    pass VARCHAR(60) NOT NULL
);

CREATE TABLE Preferencias(
	Id_Preferencia INT AUTO_INCREMENT PRIMARY KEY,
	Nombre VARCHAR(50) NOT NULL,
	Id_Turista INT NOT NULL
);
ALTER TABLE Preferencias ADD FOREIGN KEY (Id_Turista) references Turista(Id_Turista)
ON DELETE CASCADE ON UPDATE CASCADE;

CREATE TABLE Itinerario(
	Id_Itinerario INT AUTO_INCREMENT PRIMARY KEY,
	Id_Lugar INT NOT NULL,
	Fecha_Itinerario DATETIME NOT NULL,
	Hora_Itinerario TIME NOT NULL,
	Id_Turista INT NOT NULL
);
ALTER TABLE Itinerario ADD FOREIGN KEY (Id_Turista) references Turista(Id_Turista) 
ON DELETE CASCADE ON UPDATE CASCADE;


CREATE TABLE Favoritos(
	Id_Favoritos INT AUTO_INCREMENT PRIMARY KEY,
	Id_Lugar VARCHAR(50) NOT NULL,
	Id_Turista INT NOT NULL
);
ALTER TABLE Favoritos ADD FOREIGN KEY (Id_Turista) references Turista(Id_Turista) 
ON DELETE CASCADE ON UPDATE CASCADE;


CREATE TABLE Lugar(
	Id_Lugar INT AUTO_INCREMENT PRIMARY KEY,
    Id_google VARCHAR(50),
	Nombre VARCHAR(50) NOT NULL
);
ALTER TABLE Itinerario ADD FOREIGN KEY (Id_Lugar) references Lugar(Id_Lugar) 
ON DELETE CASCADE ON UPDATE CASCADE;

CREATE TABLE Historial_busqueda(
	Id_Historial INT AUTO_INCREMENT PRIMARY KEY,
	Id_google VARCHAR(50) NOT NULL,
    Fecha VARCHAR(20),
    Hora VARCHAR(20),
    Id_Turista INT NOT NULL
);
ALTER TABLE Historial_busqueda ADD FOREIGN KEY (Id_Turista) references Turista(Id_Turista) 
ON DELETE CASCADE ON UPDATE CASCADE;

INSERT INTO Turista (Nombre, A_Paterno, A_Materno, Correo, Telefono, Usuario, pass) 
VALUES 
    ('Juan', 'Perez', 'Gomez', 'correo1@gmail.com', '123456789', 'usuario1', 'contraseña1'),
    ('Maria', 'Lopez', 'Martinez', 'correo2@outlook.com', '987654321', 'usuario2', 'contraseña2'),
    ('Carlos', 'Garcia', 'Rodriguez', 'correo3@hotmail.com', '555555555', 'usuario3', 'contraseña3');

INSERT INTO Preferencias (Nombre, Id_Turista) VALUES 
    ('Preferencia1', 1),
    ('Preferencia2', 2),
    ('Preferencia3', 3);
    
INSERT INTO Lugar (Nombre) VALUES 
    ('Lugar1'),
    ('Lugar2'),
    ('Lugar3');

INSERT INTO Itinerario (Id_Lugar, Fecha_Itinerario, Hora_Itinerario, Id_Turista) 
VALUES 
    (1, '2023-11-07 00:00:00', '14:30:00', 1),
    (2, '2023-11-08 00:00:00', '09:00:00', 2),
    (3, '2023-11-09 00:00:00', '16:45:00', 3);

INSERT INTO Favoritos (Id_Lugar, Id_Turista) VALUES 
    (1, 1),
    (2, 2),
    (3, 3);

SELECT * FROM Turista;
SELECT * FROM Historial_busqueda;
SELECT * FROM Lugar;
SELECT * FROM Favoritos;
SELECT * FROM Preferencias;
SELECT * FROM Itinerario;

DELETE FROM Turista WHERE Id_Turista = 4;


INSERT INTO Historial_busqueda (Id_Lugar, Id_Turista) VALUES 
    (1, 1),
    (2, 2),
    (3, 3);