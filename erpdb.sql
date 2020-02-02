-- MySQL dump 10.13  Distrib 8.0.16, for Win64 (x86_64)
--
-- Host: localhost    Database: erpdb
-- ------------------------------------------------------
-- Server version	5.7.26-log

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
 SET NAMES utf8 ;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `brands`
--

DROP TABLE IF EXISTS `brands`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
 SET character_set_client = utf8mb4 ;
CREATE TABLE `brands` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `brand` varchar(45) NOT NULL,
  `intime` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  UNIQUE KEY `id_UNIQUE` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `brands`
--

LOCK TABLES `brands` WRITE;
/*!40000 ALTER TABLE `brands` DISABLE KEYS */;
INSERT INTO `brands` VALUES (1,'博德','2020-02-02 13:44:59'),(2,'亚细亚','2020-02-02 13:45:04');
/*!40000 ALTER TABLE `brands` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `client`
--

DROP TABLE IF EXISTS `client`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
 SET character_set_client = utf8mb4 ;
CREATE TABLE `client` (
  `client_id` int(11) NOT NULL AUTO_INCREMENT,
  `client_name` varchar(45) NOT NULL DEFAULT '未知',
  `client_phone` varchar(45) NOT NULL DEFAULT '未知',
  `client_department` varchar(45) DEFAULT NULL,
  `client_job` varchar(45) DEFAULT NULL,
  `client_gender` varchar(45) DEFAULT NULL,
  `client_age` int(11) DEFAULT NULL,
  `join_time` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`client_id`,`client_name`,`client_phone`),
  UNIQUE KEY `clientid_UNIQUE` (`client_id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `client`
--

LOCK TABLES `client` WRITE;
/*!40000 ALTER TABLE `client` DISABLE KEYS */;
INSERT INTO `client` VALUES (1,'新客户','13333339999',NULL,NULL,NULL,NULL,'2020-02-02 13:48:10'),(2,'测试客户','13335776666',NULL,NULL,NULL,NULL,'2020-02-02 14:37:41');
/*!40000 ALTER TABLE `client` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `repository`
--

DROP TABLE IF EXISTS `repository`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
 SET character_set_client = utf8mb4 ;
CREATE TABLE `repository` (
  `repositoryid` varchar(12) NOT NULL,
  `brand` varchar(45) NOT NULL DEFAULT '未知',
  `fullname` varchar(45) NOT NULL DEFAULT '未知',
  `type` varchar(45) NOT NULL DEFAULT '未知',
  `level` varchar(4) NOT NULL DEFAULT '未知',
  `width` int(11) NOT NULL DEFAULT '0',
  `height` int(11) NOT NULL DEFAULT '0',
  `num` int(11) NOT NULL DEFAULT '0',
  `costsum` double NOT NULL DEFAULT '0',
  `intime` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `remark` varchar(45) DEFAULT NULL,
  PRIMARY KEY (`repositoryid`),
  UNIQUE KEY `id_UNIQUE` (`repositoryid`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `repository`
--

LOCK TABLES `repository` WRITE;
/*!40000 ALTER TABLE `repository` DISABLE KEYS */;
INSERT INTO `repository` VALUES ('A01','博德','博德测试瓷砖','X0001','优',800,800,189,7560,'2020-02-02 14:37:41','测试备注'),('A02','博德','博德测试瓷砖','X0002','优',900,900,989,11868,'2020-02-02 14:37:41','测试备注2'),('B01','亚细亚','九九九瓷砖','XL001','优',1200,2000,0,0,'2020-02-02 13:46:34','');
/*!40000 ALTER TABLE `repository` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `repository_in`
--

DROP TABLE IF EXISTS `repository_in`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
 SET character_set_client = utf8mb4 ;
CREATE TABLE `repository_in` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `repositoryid` varchar(12) NOT NULL,
  `brand` varchar(45) NOT NULL DEFAULT '未知',
  `fullname` varchar(45) NOT NULL DEFAULT '未知',
  `type` varchar(45) NOT NULL DEFAULT '未知',
  `level` varchar(4) NOT NULL DEFAULT '未知',
  `width` int(11) NOT NULL DEFAULT '0',
  `height` int(11) NOT NULL DEFAULT '0',
  `num` int(11) NOT NULL DEFAULT '0',
  `costsum` double NOT NULL DEFAULT '0',
  `intime` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `remark` varchar(45) DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `id_UNIQUE` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `repository_in`
--

LOCK TABLES `repository_in` WRITE;
/*!40000 ALTER TABLE `repository_in` DISABLE KEYS */;
INSERT INTO `repository_in` VALUES (1,'A01','博德','博德测试瓷砖','X0001','优',800,800,200,8000,'2020-02-02 13:46:58','测试入库'),(2,'A02','博德','博德测试瓷砖','X0002','优',900,900,1000,12000,'2020-02-02 13:46:58','测试入库2');
/*!40000 ALTER TABLE `repository_in` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `repository_out`
--

DROP TABLE IF EXISTS `repository_out`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
 SET character_set_client = utf8mb4 ;
CREATE TABLE `repository_out` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `repositoryid` varchar(12) NOT NULL,
  `brand` varchar(45) NOT NULL DEFAULT '未知',
  `fullname` varchar(45) NOT NULL DEFAULT '未知',
  `type` varchar(45) NOT NULL DEFAULT '未知',
  `level` varchar(4) NOT NULL DEFAULT '未知',
  `width` int(11) NOT NULL DEFAULT '0',
  `height` int(11) NOT NULL DEFAULT '0',
  `num_pre` int(11) NOT NULL DEFAULT '0',
  `num` int(11) NOT NULL DEFAULT '0',
  `num_after` int(11) NOT NULL DEFAULT '0',
  `outtime` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `remark` varchar(45) DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `id_UNIQUE` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `repository_out`
--

LOCK TABLES `repository_out` WRITE;
/*!40000 ALTER TABLE `repository_out` DISABLE KEYS */;
INSERT INTO `repository_out` VALUES (1,'A01','博德','博德测试瓷砖','X0001','优',800,800,200,10,190,'2020-02-02 13:48:10','测试销售备注'),(2,'A02','博德','博德测试瓷砖','X0002','优',900,900,1000,1,999,'2020-02-02 13:48:10','测试销售备注2'),(3,'A01','博德','博德测试瓷砖','X0001','优',800,800,190,1,189,'2020-02-02 14:37:41',''),(4,'A02','博德','博德测试瓷砖','X0002','优',900,900,999,10,989,'2020-02-02 14:37:41','');
/*!40000 ALTER TABLE `repository_out` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `sale`
--

DROP TABLE IF EXISTS `sale`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
 SET character_set_client = utf8mb4 ;
CREATE TABLE `sale` (
  `saleid` int(11) NOT NULL AUTO_INCREMENT,
  `agent_id` varchar(45) NOT NULL DEFAULT '未知',
  `client_id` int(11) NOT NULL,
  `department` varchar(45) NOT NULL DEFAULT '未知',
  `sale_time` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `remark` varchar(45) DEFAULT NULL,
  PRIMARY KEY (`saleid`),
  UNIQUE KEY `saleid_UNIQUE` (`saleid`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `sale`
--

LOCK TABLES `sale` WRITE;
/*!40000 ALTER TABLE `sale` DISABLE KEYS */;
INSERT INTO `sale` VALUES (1,'1',1,'龙湾中学','2020-02-02 13:48:10','测试摘要1'),(2,'1',2,'龙湾中学','2020-02-02 14:37:41','');
/*!40000 ALTER TABLE `sale` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `sale_item`
--

DROP TABLE IF EXISTS `sale_item`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
 SET character_set_client = utf8mb4 ;
CREATE TABLE `sale_item` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `saleid` int(11) NOT NULL,
  `repositoryid` varchar(12) NOT NULL DEFAULT '未知',
  `brand` varchar(45) NOT NULL DEFAULT '未知',
  `fullname` varchar(45) NOT NULL DEFAULT '未知',
  `type` varchar(45) NOT NULL DEFAULT '未知',
  `level` varchar(4) NOT NULL DEFAULT '未知',
  `width` int(11) NOT NULL DEFAULT '0',
  `height` int(11) NOT NULL DEFAULT '0',
  `sale_num` int(11) NOT NULL DEFAULT '0',
  `unitprice` double NOT NULL DEFAULT '0',
  `remark` varchar(45) DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `saleid_UNIQUE` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `sale_item`
--

LOCK TABLES `sale_item` WRITE;
/*!40000 ALTER TABLE `sale_item` DISABLE KEYS */;
INSERT INTO `sale_item` VALUES (1,1,'A01','博德','博德测试瓷砖','X0001','优',800,800,10,100,'测试销售备注'),(2,1,'A02','博德','博德测试瓷砖','X0002','优',900,900,1,50,'测试销售备注2'),(3,2,'A01','博德','博德测试瓷砖','X0001','优',800,800,1,500,''),(4,2,'A02','博德','博德测试瓷砖','X0002','优',900,900,10,200,'');
/*!40000 ALTER TABLE `sale_item` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `users`
--

DROP TABLE IF EXISTS `users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
 SET character_set_client = utf8mb4 ;
CREATE TABLE `users` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `username` varchar(16) NOT NULL,
  `password` varchar(32) CHARACTER SET latin1 NOT NULL,
  `create_time` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `priority` int(11) NOT NULL,
  PRIMARY KEY (`username`,`id`),
  UNIQUE KEY `username_UNIQUE` (`username`),
  UNIQUE KEY `id_UNIQUE` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `users`
--

LOCK TABLES `users` WRITE;
/*!40000 ALTER TABLE `users` DISABLE KEYS */;
INSERT INTO `users` VALUES (2,'admin','c7f1b49dd97bd9e2f392aba074ea9bf7','2020-02-02 06:35:45',0),(1,'陈茜茜','c7f1b49dd97bd9e2f392aba074ea9bf7','2020-01-17 15:26:20',0);
/*!40000 ALTER TABLE `users` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2020-02-02 23:15:19
