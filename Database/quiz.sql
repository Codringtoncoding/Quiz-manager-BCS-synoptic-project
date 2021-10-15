-- MySQL dump 10.13  Distrib 8.0.26, for macos11 (x86_64)
--
-- Host: 127.0.0.1    Database: quiz_manager
-- ------------------------------------------------------
-- Server version	8.0.26

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `answers`
--

DROP TABLE IF EXISTS `answers`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `answers` (
  `id` bigint unsigned NOT NULL AUTO_INCREMENT,
  `answer` varchar(140) NOT NULL,
  `correct` varchar(130) NOT NULL,
  `questionid` int NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `id` (`id`),
  KEY `questionid` (`questionid`),
  CONSTRAINT `answers_ibfk_1` FOREIGN KEY (`questionid`) REFERENCES `questions` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=27 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `answers`
--

LOCK TABLES `answers` WRITE;
/*!40000 ALTER TABLE `answers` DISABLE KEYS */;
INSERT INTO `answers` VALUES (1,'A. Paris \n B. London\n C. Lisbon','A',1),(2,'A. Paris \n B. Madird\n C. Lisbon','B',1),(3,'A. London \n B. Madird\n C. Lisbon','1',1),(4,'A. Paris \n B. Madird\n C. Edinburgh\n D. Glasgow','C',1),(5,'A. Paris \n B. Madird\n C. Lisbon\n D. Glasgow','C',1),(6,'A. Messi \n B. Ronaldo\n C. Salah\n D. Foden','D',2),(7,'A. Messi \n B. Ronaldo\n C. Salah\n D. Foden','B',2),(8,'A. England \n B. Germany\n C. Spain\n D. Italy','A',2),(9,'A. England \n B. Germany\n C. Italy\n D. Spain','A',2),(10,'A. England \n B. Germany\n C. Italy\n D. Spain','A',2),(11,'A. Pizza \n B. Pasta\n C. Chips\n D. Fish','A',2),(12,'A. Rome \n B. London\n C. Naples\n D. Paris','A',2),(13,'A. Boats \n B. Pompeii\n C. Vatican\n D. Collesium','D',3),(14,'A. Julius Ceasar \n B. Emperor Claudius\n C. Commadus\n D. Nero','B',3),(15,'A. Mt Etna, \n B. Pompeii\n C. Monseratt\n D. Aso','B',3),(16,'A. Hastings, \n B. Britain\n C. Agincourt\n D. Stamford Bridge','A',4),(17,'A. Henry 8th, \n B. Henry 7th\n C. Edward III\n D. William II','A',4),(18,'A. 1967, \n B. 1943\n C. 1915\n D. 1945','D',4),(19,'A. Elizbath I, \n B. Victoria\n C. Henry 8th\n D. William III\n E. Elizabeth II','E',4),(20,'A. Tesla, \n B. Edison\n C. Musk\n D. Gates\n E. Bond','B',4),(21,'A. Whitby, \n B. Scarborough\n C. Norfolk\n D. Bristol\n E. London','A',5),(22,'A. Egg, \n B. Chicken','A',5),(23,'A. Puppets, \n B. Clowns','A',5),(24,'A. T-Rrex, \n B. Dipladocus\n C. Velocraptors\n D. titanosaur','D',5),(25,'A. Lion, \n B. Great White Shark\n C. Blue whale\n D. Elephant','C',5),(26,'A. Crocadile, \n B. Great White Shark\n C. Blue whale\n D. Elephant','A',5);
/*!40000 ALTER TABLE `answers` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `questions`
--

DROP TABLE IF EXISTS `questions`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `questions` (
  `id` int NOT NULL AUTO_INCREMENT,
  `question` varchar(145) NOT NULL,
  `quizid` int NOT NULL,
  PRIMARY KEY (`id`),
  KEY `(quizid)_idx` (`quizid`),
  CONSTRAINT `` FOREIGN KEY (`quizid`) REFERENCES `quizzes` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=27 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `questions`
--

LOCK TABLES `questions` WRITE;
/*!40000 ALTER TABLE `questions` DISABLE KEYS */;
INSERT INTO `questions` VALUES (1,'What is the capital of France?',1),(2,'What is the capital of Spain?',1),(3,'What is the capital of United Kingdom?',1),(4,'What is the capital of Scotland?',1),(5,'What is the capital of Portugal?',1),(6,'Who is the best player in the World?',2),(7,'Which footballer has the most instagram following?',2),(8,'Who won the world Cup in 1966?',2),(9,'Who Lost in the Euros Final in 2021?',2),(10,'Where was football invented?',2),(11,'What food is Italy most famous for?',3),(12,'What is the Capital?',3),(13,'What did the Gladiatiors fight in',3),(14,'Who led a conquest to the United Kingdom',3),(15,'What was the famous volcano eruption called?',3),(16,'What Battle was in 1066?',4),(17,'Who had 6 wives?',4),(18,'What year did WWII end?',4),(19,'Who is the longest serving English Monarch?',4),(20,'Who invented the lightbuld?',4),(21,'Where was Fish and Chips orginally from?',5),(22,'What came first the Chicken or the Egg?',5),(23,'What is Punch and Judy?',5),(24,'What was the biggest Dinosaur',6),(25,'What is the Biggest mammal on the planet?',6),(26,'What is thought to be the oldest animal on the planet?',6);
/*!40000 ALTER TABLE `questions` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `quizzes`
--

DROP TABLE IF EXISTS `quizzes`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `quizzes` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(240) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=11 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `quizzes`
--

LOCK TABLES `quizzes` WRITE;
/*!40000 ALTER TABLE `quizzes` DISABLE KEYS */;
INSERT INTO `quizzes` VALUES (1,'Capital Citites of Europe'),(2,'Football'),(3,'Italy'),(4,'History'),(5,'Pub Quiz'),(6,'Universe'),(7,'Science'),(8,'The Arts'),(9,'Music'),(10,'The Random Quiz');
/*!40000 ALTER TABLE `quizzes` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `user`
--

DROP TABLE IF EXISTS `user`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `user` (
  `username` varchar(16) NOT NULL,
  `password` varchar(100) NOT NULL,
  `create_time` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `role` varchar(45) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `user`
--

LOCK TABLES `user` WRITE;
/*!40000 ALTER TABLE `user` DISABLE KEYS */;
/*!40000 ALTER TABLE `user` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2021-10-15 14:10:18
