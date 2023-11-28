-- phpMyAdmin SQL Dump
-- version 4.9.5deb2
-- https://www.phpmyadmin.net/
--
-- Host: localhost:3306
-- Generation Time: Apr 07, 2022 at 06:04 PM
-- Server version: 8.0.28-0ubuntu0.20.04.3
-- PHP Version: 7.4.3

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `mobile`
--

-- --------------------------------------------------------

--
-- Table structure for table `Genre`
--

CREATE TABLE `Genre` (
  `ID` int NOT NULL,
  `label` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `value` varchar(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `Genre`
--

INSERT INTO `Genre` (`ID`, `label`, `value`) VALUES
(1, 'Shooter', 'Shooter'),
(2, 'Action', 'Action'),
(3, 'Adventure', 'Adventure'),
(4, 'Racing', 'Racing'),
(5, 'Sports', 'Sports'),
(6, 'JRPG', 'JRPG'),
(7, 'RPG', 'RPG'),
(8, 'Party', 'Party'),
(9, 'Fighting', 'Fighting'),
(10, 'Platformer', 'Platformer'),
(11, 'Other', 'Other');

-- --------------------------------------------------------

--
-- Table structure for table `Listings`
--

CREATE TABLE `Listings` (
  `ID` int NOT NULL,
  `Title` varchar(200) NOT NULL,
  `Description` varchar(15000) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `Price` decimal(15,2) NOT NULL,
  `Platform` varchar(50) NOT NULL,
  `Genre` varchar(50) NOT NULL,
  `Borough` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `Image` varchar(500) NOT NULL,
  `UserID` int NOT NULL,
  `CreatedOn` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `Sold` tinyint(1) NOT NULL DEFAULT '0'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `Listings`
--

INSERT INTO `Listings` (`ID`, `Title`, `Description`, `Price`, `Platform`, `Genre`, `Borough`, `Image`, `UserID`, `CreatedOn`, `Sold`) VALUES
(23, 'Minecraft Story Mode', 'This is a used game, the case has some light marks and signs of use but the game its self is perfect with no marks and plays fine.\r\n', '5.00', 'PS3', 'Adventure', 'Westminster', 'minecraft.jpg', 1, '2022-03-23 20:03:20', 0),
(24, 'Deathloop', 'Deathloop -- Standard Edition (Sony PlayStation 5, 2021). Only played  for  a few hours, selling as wasn\'t interested in it anymore.', '15.00', 'PS5', 'Action', 'Merton', 'deathloop.jpg', 2, '2022-03-23 20:39:41', 0),
(25, 'Uncharted 2: Among Thieves', 'This product has passed our meticulous quality checks and is guaranteed to be in great condition. With over 7 million ratings, you can buy from us with confidence. Please presume that any DLC has already been used. Very Good Condition: An item that has been used, but is in very good condition. No damage to the jewel case or item cover, no scratches, cracks, or holes. The cover art and liner notes are included. The box/case is included. Instructions may or may not be present, as not all games are released with instructions. Minimal wear on the exterior of item. No skipping on the game, when played.', '3.30', 'PS3', 'Shooter', 'Harrow', 'uncharted2.jpg', 3, '2022-03-23 20:42:01', 0),
(31, 'Wii Sports', 'Nintendo Wii Game Wii Sports. No manual included. Other games available so please check out our other listings. Discount offered for multiple purchases.', '4.00', 'Nintendo Wii', 'Sports', 'Merton', 'wiisports.jpg', 2, '2022-03-23 21:46:52', 0),
(32, 'Sniper Ghost Warrior Contracts', 'Experience pure sniper gameplay across the harsh terrain of modern-day Siberia in a brand new contracts-based system that encourages strategic thinking within engaging, redeployable missions.\r\n\r\nContracts delivers tailor-made missions that offer a clear main objective with a fixed monetary reward, and options to complete secondary objectives for bonus payouts. With hundreds of ways to take down a wide range of targets, Sniper Ghost Warrior Contracts offers sniping gameplay at its? absolute best.', '14.99', 'Xbox One', 'Shooter', 'Westminster', 'SniperGhost.jpg', 1, '2022-03-23 21:51:44', 0),
(33, 'F1 2015', 'F1 2015 (Xbox One), Good Xbox One, xbox_one Video Games. ', '0.99', 'Xbox One', 'Racing', 'Merton', 'F12015.jpg', 2, '2022-03-23 21:55:51', 0),
(34, 'Deadpool', 'Deadpool (Sony PlayStation 4, 2015)', '0.99', 'PS4', 'Action', 'Westminster', 'Deadpool.jpg', 1, '2022-03-23 21:59:27', 0),
(35, 'Lego Star Wars: The Force Awakens', 'Lego Force Awakens game for the PS4.  Boxed and in very good condition.  Please note this will not be compatible with DLC purchased through the Playstation store.', '7.95', 'PS4', 'Adventure', 'Merton', 'LegoStarWars.jpg', 2, '2022-03-23 22:03:18', 0),
(36, 'Twisted Metal', 'High atop his penthouse office, a mysterious ringleader named Calypso lords over the contest of vehicle combat known as Twisted Metal. He returns again to host the ultimate contest of skill and destruction. Contestants have been chosen to compete and, should they emerge victorious, win whatever prize their heart desires. Fight online as a disciple of one of four factions, each based on a classic Twisted Metal character. Supports up to 16 players online through PSN. Play with friends in 2- 4 player split-screen and online as well. Featuring a variety of gameplay types including series\' favorite and new, unique game modes. With the power of PS3 system, unleash massive amounts of destruction in brand new, never before seen Twisted levels. Deliver destruction to strategically change the face of the level, or just cause incredible chaos. Featuring a complete arsenal of weapons that make for more creative kills, from missiles and miniguns to giant magnets and flying mascots; players always have a way to take someone out. Choose from over a dozen Twisted vehicles, each outfitted with special weapons to strategically dismantle opponents. Flight is a first for the franchise. One of the new vehicles in Twisted Metal to take full advantage of flight is the Talon, a helicopter armed to the teeth with a minigun turret. Disciples team their rides up in various modes to wreak havoc on the enemy such as using the Talon as a magnet to pick up teammates and rain double the destruction down below. Fight for the prize of one wish fulfilled by Calypso, the Twisted Metal mastermind. Twisted Metal will feature full PSN Trophy support, making players\' accomplishments that much more satisfying.', '9.99', 'PS3', 'Action ', 'Westminster', 'TwistedMetal.jpg', 1, '2022-03-23 22:06:20', 0),
(37, 'Street Fighter V', 'Street Fighter V brings the classic fighting game franchise to a different generation of consoles. Choose your fighter and battle either computer-controlled or human opponents. The game\'s 16 starting characters (more are available to download) include returning fighters such as Ken, Ryu and Chun Li, characters such as R. Mika and Birdie who haven\'t appeared in recent games, and characters such as Laura, Rashid, Necalli and F.A.N.G.', '1.99', 'PS4', 'Action', 'Merton', 'StreetFighterV.jpg', 2, '2022-03-23 22:15:29', 0),
(38, 'Hitman HD Trilogy', 'Hitman HD Trilogy Sony PlayStation 3 2013 provides the gamers with hours of fun and new experiences. Based on its content, this Square Enix PAL video game belongs to the Action & Adventure genre. The Hitman HD Trilogy is a valuable addition to the gamers collections.', '13.99', 'PS3', 'Shooter', 'Harrow', 'HitmanHDTrilogy.jpg', 3, '2022-03-23 22:17:45', 0),
(39, 'Knight Rider: The Game', 'Knight Rider The Game Davilex PC CD Rom. Condition is \"Very Good\". ', '4.99', 'PS2', 'Racing', 'Westminster', 'KnightRider.jpg', 1, '2022-03-23 22:20:41', 0),
(40, 'Super Mario Party', 'Nintendo switch game, Super Mario Party.\r\nGame and case in good condition', '1.04', 'Nintendo Switch', 'Party', 'Merton', 'SuperMario.jpg', 2, '2022-03-23 22:25:31', 0),
(41, 'LEGO Star Wars The Force Awakens ', 'LEGO Star Wars: The Force Awakens (Nintendo 3DS 2016).\r\n\r\nIn good used condition ', '3.99', 'Nintendo 3DS', 'Adventure', 'Harrow', 'LEGOStarWarsTheForceAwakens.jpg', 3, '2022-03-23 22:32:56', 0),
(74, 'Dragon Quest 9', 'DRAGON QUEST 9 IX Sentinels of the Starry Skies Nintendo DS complete in box. Complete with box, cart and instruction booklet in great condition.', '15.00', 'Nintendo DS', 'JRPG', 'Westminster', 'dragonquest9.png', 1, '2022-03-30 15:49:30', 0),
(80, 'Ratatouille', 'Ratatouille Nintendo DS Game\r\n\r\nThis will also work on the DSi / DSi XL/ 3DS / 3DS XL / 2DS / 2DS XL Consoles\r\n\r\nThis is in great working condition and includes box and instructions.\r\n\r\nGeneral wear all over\r\n\r\nI have lots of games for sale in my ebay shop with great low prices, have a look!', '3.95', 'Nintendo DS', 'Adventure ', 'Merton', 'ratatouille.jpg', 2, '2022-03-30 18:31:47', 1),
(81, 'Duck Hunt', 'Good condition Duck Hunt for the NES. This sale is just for the cart; no manual or box is included.\r\n\r\nGame has been cleaned plus tested and is guaranteed to be working. If you have any questions about this sale then please don\'t hesitate to ask.\r\n\r\nI combine shipping and ship within 1 business day. All games are NTSC USA versions unless otherwise stated in the description', '5.30', 'NES', 'Shooter', 'Westminster', 'duckhunt.jpg', 1, '2022-03-30 18:36:26', 0),
(82, 'Pokemon Blue', 'Pokemon blue, no case.  Cannot verify if it works. ', '6.50', 'Game Boy', 'JRPG', 'Harrow', 'pokemonblue.jpg', 3, '2022-03-30 18:44:29', 0),
(83, 'New Super Mario Bros.', 'New Super Mario Bros.\r\nNintendo DS\r\nComplete with Cartridge, Case and Manual\r\nGood used condition', '9.95', 'Nintendo DS', 'Platformer', 'Merton', 'supermariobros.png', 2, '2022-03-30 19:56:14', 0);

-- --------------------------------------------------------

--
-- Table structure for table `Platform`
--

CREATE TABLE `Platform` (
  `ID` int NOT NULL,
  `label` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `value` varchar(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `Platform`
--

INSERT INTO `Platform` (`ID`, `label`, `value`) VALUES
(1, 'Xbox One', 'Xbox One'),
(2, 'Xbox 360', 'Xbox 360'),
(3, 'PS5', 'PS5'),
(4, 'PS4', 'PS4'),
(5, 'PS3', 'PS3'),
(6, 'PS2', 'PS2'),
(7, 'PS1', 'PS1'),
(8, 'Nintendo Wii', 'Nintendo Wii'),
(9, 'Nintendo Switch', 'Nintendo Switch'),
(10, 'Nintendo DS', 'Nintendo DS'),
(11, 'Nintendo 3DS', 'Nintendo 3DS'),
(12, 'NES', 'NES'),
(13, 'Game Boy', 'Game Boy'),
(14, 'Other', 'Other');

-- --------------------------------------------------------

--
-- Table structure for table `User`
--

CREATE TABLE `User` (
  `ID` int NOT NULL,
  `Name` varchar(100) NOT NULL,
  `Username` varchar(100) NOT NULL,
  `Password` varchar(100) NOT NULL,
  `Borough` varchar(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `User`
--

INSERT INTO `User` (`ID`, `Name`, `Username`, `Password`, `Borough`) VALUES
(1, 'Admin', 'Admin', 'admin123@', 'Westminster'),
(2, 'John', 'John', 'john123@', 'Merton'),
(3, 'Mark', 'Mark', 'mark123@', 'Harrow'),
(10, 'Dirosan', 'dirosan', 'dirosan', 'Morden');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `Genre`
--
ALTER TABLE `Genre`
  ADD PRIMARY KEY (`ID`);

--
-- Indexes for table `Listings`
--
ALTER TABLE `Listings`
  ADD PRIMARY KEY (`ID`),
  ADD KEY `UserID` (`UserID`);

--
-- Indexes for table `Platform`
--
ALTER TABLE `Platform`
  ADD PRIMARY KEY (`ID`);

--
-- Indexes for table `User`
--
ALTER TABLE `User`
  ADD PRIMARY KEY (`ID`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `Genre`
--
ALTER TABLE `Genre`
  MODIFY `ID` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=12;

--
-- AUTO_INCREMENT for table `Listings`
--
ALTER TABLE `Listings`
  MODIFY `ID` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=94;

--
-- AUTO_INCREMENT for table `Platform`
--
ALTER TABLE `Platform`
  MODIFY `ID` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=15;

--
-- AUTO_INCREMENT for table `User`
--
ALTER TABLE `User`
  MODIFY `ID` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `Listings`
--
ALTER TABLE `Listings`
  ADD CONSTRAINT `UserID` FOREIGN KEY (`UserID`) REFERENCES `User` (`ID`) ON DELETE RESTRICT ON UPDATE RESTRICT;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
