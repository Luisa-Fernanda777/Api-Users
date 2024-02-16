create database users_jwt;
use users_jwt;

create table users (
	ID bigint (20) UNSIGNED NOT NULL AUTO_INCREMENT,
	username varchar(50) not null,
    password text not null,
    name varchar (50) not null,
    email varchar (50),
    primary key(ID),
    unique key ID (ID)
);

INSERT INTO users (username, password, name, email) VALUES 
('serenalynn', '1234', 'luisa', 'correo@ejemplo.com'),
('gatito', '8888', 'maria', 'correo@ejemplo.com'),
('luifer', '2222', 'jose', 'correo@ejemplo.com'),
('rayito', '1212', 'andres', 'correo@ejemplo.com');

