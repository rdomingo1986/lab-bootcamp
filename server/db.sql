CREATE DATABASE `lab-bootcamp` DEFAULT CHARSET=utf8 COLLATE utf8_unicode_ci;

USE `lab-bootcamp`;

CREATE TABLE `authors` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `first_name` varchar(255) NOT NULL,
  `last_name` varchar(255) NOT NULL,
  `bio` text NULL,
  PRIMARY KEY (`id`) 
) ENGINE=InnoDB;