-- MySQL dump 10.13  Distrib 5.7.17, for Win64 (x86_64)
--
-- Host: 127.0.0.1    Database: hr_application
-- ------------------------------------------------------
-- Server version	5.7.17

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `candidate`
--

DROP TABLE IF EXISTS `candidate`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `candidate` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `first_name` varchar(100) NOT NULL,
  `last_name` varchar(100) NOT NULL,
  `salary` int(11) NOT NULL,
  `image_url` varchar(200) DEFAULT NULL,
  `job_title` varchar(100) NOT NULL,
  `phone` varchar(45) DEFAULT NULL,
  `email` varchar(100) DEFAULT NULL,
  `address` varchar(200) DEFAULT NULL,
  `date_publishing` date NOT NULL,
  `status_id` int(11) NOT NULL,
  PRIMARY KEY (`id`,`status_id`),
  UNIQUE KEY `id_UNIQUE` (`id`),
  KEY `fk_candidate_status1_idx` (`status_id`),
  CONSTRAINT `fk_candidate_status1` FOREIGN KEY (`status_id`) REFERENCES `status` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB AUTO_INCREMENT=14 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `candidate`
--

LOCK TABLES `candidate` WRITE;
/*!40000 ALTER TABLE `candidate` DISABLE KEYS */;
INSERT INTO `candidate` VALUES (1,'Ivan','Ivanov',1000,'http://via.placeholder.com/500x350/66bfff','Java Developer','+375(25)739-00-02','ivanov@gmail.com','27 Old Gloucester Street, London','2018-03-01',1),(2,'Ward','Jayme',500,'http://via.placeholder.com/500x350/66bfff','.Net Developer','+375(25)859-25-87','ward@gmail.com','123 6th St.Melbourne, FL 32904 ','2018-03-02',2),(3,'Augustine','Gaetana',450,'http://via.placeholder.com/500x350/66bfff','JavaScript Developer','+375(33)154-85-96','aug@gmail.com','71 Pilgrim Avenue, Chevy Chase, MD 20815','2018-03-03',3),(4,'Colombina','Marty',1000,'http://via.placeholder.com/500x350/66bfff','Java Developer','+375(29)200-85-96','gae@gmail.com','70 Bowman St. South Windsor, CT 06074','2018-03-03',4),(5,'Arseni','Balfour',400,'http://via.placeholder.com/500x350/66bfff','.Net Developer','+375(33)154-90-90','balf@gmail.com','4 Goldfield Rd. Honolulu, HI 96815','2018-03-01',1),(6,'Dove','Lexia',700,'http://via.placeholder.com/500x350/66bfff','Java Developer','+375(44)300-85-96','lex@gmail.com','44 Shirley Ave.,West Chicago, IL 60185','2018-03-03',2),(7,'Arianna','Venceslao',850,'http://via.placeholder.com/500x350/66bfff','JavaScript Developer','+375(33)154-85-96','vansen@gmail.com','514 S. Magnolia St., Orlando, FL 32806','2018-03-02',3),(8,'Star','Dorofey',2000,'http://via.placeholder.com/500x350/66bfff','.Net Developer','+375(29)200-85-96','dorof@gmail.com','71 Pilgrim Avenue, Chevy Chase, MD 20815','2018-03-01',4),(9,'Drina','Vladlen',300,'http://via.placeholder.com/500x350/66bfff','JavaScript Developer','+375(33)154-85-96','vladlen@gmail.com','123 6th St.Melbourne, FL 32904 ','2018-03-03',1),(10,'Dafne','Nellie',650,'http://via.placeholder.com/500x350/66bfff','Java Developer','+375(33)154-85-96','nellie@gmail.com','44 Shirley Ave.,West Chicago, IL 60185','2018-03-01',2),(11,'Meade','Corrine',1000,'http://via.placeholder.com/500x350/66bfff','JavaScript Developer','+375(29)200-85-96','corrine@gmail.com','71 Pilgrim Avenue, Chevy Chase, MD 20815','2018-03-01',3),(12,'Costanzo','Aydan',850,'http://via.placeholder.com/500x350/66bfff','Java Developer','+375(33)154-85-96','avdan@gmail.com','123 6th St.Melbourne, FL 32904 ','2018-03-03',4),(13,'Ustinya','Zinoviy',900,'http://via.placeholder.com/500x350/66bfff','.Net Developer','+375(29)200-85-96','zinoviv@gmail.com','70 Bowman St. South Windsor, CT 06074','2018-03-01',4);
/*!40000 ALTER TABLE `candidate` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `experience`
--

DROP TABLE IF EXISTS `experience`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `experience` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL,
  `period` varchar(100) NOT NULL,
  `position` varchar(100) DEFAULT NULL,
  `location` varchar(100) DEFAULT NULL,
  `company` varchar(100) NOT NULL,
  `description` varchar(700) DEFAULT NULL,
  `candidate_id` int(11) NOT NULL,
  PRIMARY KEY (`id`,`candidate_id`),
  KEY `fk_experience_candidate1_idx` (`candidate_id`),
  CONSTRAINT `fk_experience_candidate1` FOREIGN KEY (`candidate_id`) REFERENCES `candidate` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `experience`
--

LOCK TABLES `experience` WRITE;
/*!40000 ALTER TABLE `experience` DISABLE KEYS */;
/*!40000 ALTER TABLE `experience` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `skill`
--

DROP TABLE IF EXISTS `skill`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `skill` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL,
  `candidate_id` int(11) NOT NULL,
  PRIMARY KEY (`id`,`candidate_id`),
  KEY `fk_skill_candidate1_idx` (`candidate_id`),
  CONSTRAINT `fk_skill_candidate1` FOREIGN KEY (`candidate_id`) REFERENCES `candidate` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `skill`
--

LOCK TABLES `skill` WRITE;
/*!40000 ALTER TABLE `skill` DISABLE KEYS */;
/*!40000 ALTER TABLE `skill` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `status`
--

DROP TABLE IF EXISTS `status`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `status` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `status`
--

LOCK TABLES `status` WRITE;
/*!40000 ALTER TABLE `status` DISABLE KEYS */;
INSERT INTO `status` VALUES (1,'New'),(2,'Accepted for Interview'),(3,'CV-Rejected'),(4,'CV-Accepted');
/*!40000 ALTER TABLE `status` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `vacancy`
--

DROP TABLE IF EXISTS `vacancy`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `vacancy` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `position` varchar(255) NOT NULL,
  `salary` int(11) DEFAULT NULL,
  `description` varchar(700) DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `id_UNIQUE` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=20 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `vacancy`
--

LOCK TABLES `vacancy` WRITE;
/*!40000 ALTER TABLE `vacancy` DISABLE KEYS */;
INSERT INTO `vacancy` VALUES (1,'Big Data Developer',1500,'Extensive experience with Hadoop v2, MapReduce, HDFS, Hive, Ambari'),(2,'Senior Java Developer',1000,'Significant Java, Javascript & AWS experience'),(3,'Full Stack Developer',2000,'Working knowledge of at least one JavaScript web application framework (E.g. Angular, React,'),(4,'React Native Developer',1000,'Extensive native mobile application development experience'),(5,'JavaScript Developer',1300,'Commercial Javascript development experience.'),(6,'Big Data Developer',1000,'Extensive experience with Hadoop v2, MapReduce, HDFS, Hive, Ambari'),(7,'Senior Java Developer',1500,'Significant Java, Javascript & AWS experience'),(8,'React Native Developer',800,'Experience with MySQL is preferable'),(9,'Big Data Developer',450,'Extensive experience with Hadoop v2, MapReduce, HDFS, Hive, Ambari'),(10,'Senior Java Developer',2000,'Experience with MySQL is preferable'),(11,'Full Stack Developer',850,'Experience with designing and maintaining web-enabled business reporting tools and portals.'),(12,'React Native Developer',900,'Experience with designing and maintaining web-enabled business reporting tools and portals.'),(13,'Senior Java Developer',1000,'Significant Java, Javascript & AWS experience'),(14,'Full Stack Developer',1000,'Experience with MySQL is preferable'),(15,'React Native Developer',950,'Experience with designing and maintaining web-enabled business reporting tools and portals.'),(16,'JavaScript Developer',1000,'Commercial Javascript development experience.'),(17,'Full Stack Developer',400,'Experience with designing and maintaining web-enabled business reporting tools and portals.'),(18,'JavaScript Developer',450,'Commercial Javascript development experience.'),(19,'Senior .NET Developer',1000,'10+ years experience  & a solid understanding of .NET (both Visual Basic and C#) ');
/*!40000 ALTER TABLE `vacancy` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `vacancy_has_candidate`
--

DROP TABLE IF EXISTS `vacancy_has_candidate`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `vacancy_has_candidate` (
  `vacancy_id` int(11) NOT NULL,
  `candidate_id` int(11) NOT NULL,
  PRIMARY KEY (`vacancy_id`,`candidate_id`),
  KEY `fk_vacancy_has_candidate_candidate1_idx` (`candidate_id`),
  KEY `fk_vacancy_has_candidate_vacancy_idx` (`vacancy_id`),
  CONSTRAINT `fk_vacancy_has_candidate_candidate1` FOREIGN KEY (`candidate_id`) REFERENCES `candidate` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  CONSTRAINT `fk_vacancy_has_candidate_vacancy` FOREIGN KEY (`vacancy_id`) REFERENCES `vacancy` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `vacancy_has_candidate`
--

LOCK TABLES `vacancy_has_candidate` WRITE;
/*!40000 ALTER TABLE `vacancy_has_candidate` DISABLE KEYS */;
/*!40000 ALTER TABLE `vacancy_has_candidate` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2018-03-10 22:26:29
