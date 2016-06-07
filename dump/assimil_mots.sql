-- MySQL dump 10.13  Distrib 5.7.9, for Win64 (x86_64)
--
-- Host: localhost    Database: assimil
-- ------------------------------------------------------
-- Server version	5.7.10-log

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
-- Table structure for table `mots`
--

DROP TABLE IF EXISTS `mots`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `mots` (
  `idtrad` int(11) NOT NULL AUTO_INCREMENT,
  `mot` varchar(40) NOT NULL,
  `trad` varchar(40) NOT NULL,
  `numoppitunti` int(11) DEFAULT NULL,
  `codetypemot` varchar(40) DEFAULT NULL,
  `commentaire` varchar(400) DEFAULT NULL,
  PRIMARY KEY (`idtrad`)
) ENGINE=InnoDB AUTO_INCREMENT=49 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `mots`
--

LOCK TABLES `mots` WRITE;
/*!40000 ALTER TABLE `mots` DISABLE KEYS */;
INSERT INTO `mots` VALUES (26,'ilta','soir',0,'NOM',NULL),(27,'yötä','nuit',0,'NOM',NULL),(28,'matkalaukkua','valise',0,'NOM',NULL),(29,'koskaan','jamais',0,'ADV',NULL),(30,'helppo','facile',0,'ADJ',NULL),(31,'helposti','facilement',0,'ADV',NULL),(32,'kuu','lune',0,'NOM',NULL),(33,'tänään','aujourd\'hui',0,'ADV',NULL),(34,'liian','trop',0,'ADV',NULL),(35,'iso','grand',0,'ADJ',NULL),(36,'koira','chien',0,'NOM',NULL),(37,'kissa','chat',0,'NOM',NULL),(38,'sade','pleuvoir',0,'VERBE',NULL),(39,'sataa','il tombe (pleut)',0,'VERBE',NULL),(40,'lunta','neige',0,'NOM',''),(41,'tutka','radar',0,'NOM',''),(42,'valitettavasti','malheureusement',0,'ADV',''),(43,'orkesteri','orchestre',0,'NOM',''),(47,'aamuna','matin',0,'NOM',''),(48,'kesä','été',0,'NOM','');
/*!40000 ALTER TABLE `mots` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2016-06-06 14:27:48
