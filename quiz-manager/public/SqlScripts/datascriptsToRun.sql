CREATE SCHEMA `your database name`;

CREATE TABLE `quizzes` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(240) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=11 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

CREATE TABLE `questions` (
  `id` int NOT NULL AUTO_INCREMENT,
  `question` varchar(145) NOT NULL,
  `quizid` int NOT NULL,
  PRIMARY KEY (`id`),
  KEY `(quizid)_idx` (`quizid`),
  CONSTRAINT `` FOREIGN KEY (`quizid`) REFERENCES `quizzes` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=27 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

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

CREATE TABLE `user` (
  `username` varchar(16) NOT NULL,
  `password` varchar(100) NOT NULL,
  `create_time` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `role` varchar(45) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;


INSERT INTO `quiz_manager`.`quizzes`
(`id`,
`name`)
VALUES
(1,
"Capital Cites of Europe"),
(2,
"Football"),
(3,
"Italy"),
(4,
"History"),
(5,
"Pub Quiz"),
(6,
"Universe");

INSERT INTO `quiz_manager`.`questions` 
(`id`, `question`, `quizid`) 
VALUES 
(1, "What is the capital of France?", 1), 
(2, "What is the capital of Spain?", 1), 
(3, "What is the capital of United Kingdom?", 1), å
(4, "What is the capital of Scotland?", 1), 
(5, "What is the capital of Portugal?", 1), 
(6, "Who is the best player in the World?", 2), 
(7, "Which footballer has the most instagram following?", 2), 
(8, "Who won the world Cup in 1966?", 2), 
(9, "Who Lost in the Euros Final in 2021?", 2), 
(10, "Where was football invented?", 2), 
(11, "What food is Italy most famous for?", 3), 
(12, "What is the Capital?", 3), 
(13, "What did the Gladiatiors fight in", 3), 
(14, "Who led a conquest to the United Kingdom", 3), 
(15, "What was the famous volcano eruption called?", 3), 
(16, "What Battle was in 1066?", 4), 
(17, "Who had 6 wives?", 4), 
(18, "What year did WWII end?", 4), 
(19, "Who is the longest serving English Monarch?", 4), 
(20, "Who invented the lightbuld?", 4), 
(21, "Where was Fish and Chips orginally from?", 5), 
(22, "What came first the Chicken or the Egg?", 5), 
(23, "What is Punch and Judy?", 5), 
(24, "What was the biggest Dinosaur", 6), 
(25, "What is the Biggest mammal on the planet?", 6), 
(26, "What is thought to be the oldest animal on the planet?", 6);

INSERT INTO `quiz_manager`.`answers`
(`id`,
`answer`,
`correct`,
`questionid`)
VALUES
(1,
"A. Paris 
 B. London
 C. Lisbon",
'A',
1),
(2,
"A. Paris 
 B. Madird
 C. Lisbon",
'B',
1),
(3,
"A. London 
 B. Madird
 C. Lisbon",
'1',
1),
(4,
"A. Paris 
 B. Madird
 C. Edinburgh
 D. Glasgow",
'C',
1),
(5,
"A. Paris 
 B. Madird
 C. Lisbon
 D. Glasgow",
'C',
1),
(6,
"A. Messi 
 B. Ronaldo
 C. Salah
 D. Foden",
'D',
2),
(7,
"A. Messi 
 B. Ronaldo
 C. Salah
 D. Foden",
'B',
2),
(8,
"A. England 
 B. Germany
 C. Spain
 D. Italy",
'A',
2),
(9,
"A. England 
 B. Germany
 C. Italy
 D. Spain",
'A',
2),
(10,
"A. England 
 B. Germany
 C. Italy
 D. Spain",
'A',
2),
(11,
"A. Pizza 
 B. Pasta
 C. Chips
 D. Fish",
'A',
2),
(12,
"A. Rome 
 B. London
 C. Naples
 D. Paris",
'A',
2),
(13,
"A. Boats 
 B. Pompeii
 C. Vatican
 D. Collesium",
'D',
3),
(14,
"A. Julius Ceasar 
 B. Emperor Claudius
 C. Commadus
 D. Nero",
'B',
3),
(15,
"A. Mt Etna, 
 B. Pompeii
 C. Monseratt
 D. Aso",
'B',
3),
(16,
"A. Hastings, 
 B. Britain
 C. Agincourt
 D. Stamford Bridge",
'A',
4),
(17,
"A. Henry 8th, 
 B. Henry 7th
 C. Edward III
 D. William II",
'A',
4),
(18,
"A. 1967, 
 B. 1943
 C. 1915
 D. 1945",
'D',
4),
(19,
"A. Elizbath I, 
 B. Victoria
 C. Henry 8th
 D. William III
 E. Elizabeth II",
'E',
4),
(20,
"A. Tesla, 
 B. Edison
 C. Musk
 D. Gates
 E. Bond",
'B',
4),
(21,
"A. Whitby, 
 B. Scarborough
 C. Norfolk
 D. Bristol
 E. London",
'A',
5),
(22,
"A. Egg, 
 B. Chicken",
'A',
5),
(23,
"A. Puppets, 
 B. Clowns",
'A',
5),
(24,
"A. T-Rrex, 
 B. Dipladocus
 C. Velocraptors
 D. titanosaur",
'D',
5),
(25,
"A. Lion, 
 B. Great White Shark
 C. Blue whale
 D. Elephant",
'C',
5),
(26,
"A. Crocadile, 
 B. Great White Shark
 C. Blue whale
 D. Elephant",
'A',
5);
