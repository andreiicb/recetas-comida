-- Crear la base de datos
CREATE DATABASE IF NOT EXISTS crud_app;

-- Usar la base de datos
USE crud_app;

-- Crear la tabla de usuarios
CREATE TABLE IF NOT EXISTS users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    username VARCHAR(255) NOT NULL,
    password VARCHAR(255) NOT NULL,
    role VARCHAR(50) NOT NULL
);

-- Crear la tabla de recetas
CREATE TABLE IF NOT EXISTS recipes (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nombre VARCHAR(255) NOT NULL,
    descripcion TEXT,
    imagen TEXT,
    pais VARCHAR(255),
    ingredientes TEXT,
    preparacion TEXT
);

CREATE USER 'Andrei'@'localhost' IDENTIFIED BY 'Maza123';

SHOW GRANTS FOR 'Andrei'@'localhost';

GRANT ALL PRIVILEGES ON crud_app.* TO 'Andrei'@'localhost';
FLUSH PRIVILEGES;

DROP USER 'Andrei'@'localhost';

