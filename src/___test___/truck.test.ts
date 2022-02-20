Here is the bare mysql code to create empty tables:

drop database testdatabase;

create database testdatabase;

use testdatabase;

CREATE TABLE `trucks` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(100) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `id_UNIQUE` (`id`)
);

CREATE TABLE `parcels` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(45) NOT NULL,
  `weight` double NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `id_UNIQUE` (`id`)
);

CREATE TABLE `loads` (
  `id` int NOT NULL AUTO_INCREMENT,
  `truck_id` int NOT NULL,
  `parcel_id` int NOT NULL,
  `status` int NOT NULL,
  PRIMARY KEY (`id`),
  KEY `truck_id` (`truck_id`),
  KEY `parcel_id` (`parcel_id`),
  CONSTRAINT `loads_ibfk_1` FOREIGN KEY (`truck_id`) REFERENCES `trucks` (`id`),
  CONSTRAINT `loads_ibfk_2` FOREIGN KEY (`parcel_id`) REFERENCES `parcels` (`id`)
);


select *  from trucks;
select * from parcels;
select * from loads;