-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: May 09, 2024 at 01:39 PM
-- Server version: 10.4.32-MariaDB
-- PHP Version: 8.2.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `project_cp151`
--

-- --------------------------------------------------------

--
-- Table structure for table `order_detail`
--

CREATE TABLE `order_detail` (
  `id` int(11) UNSIGNED ZEROFILL NOT NULL,
  `Order_ID` int(5) UNSIGNED ZEROFILL NOT NULL,
  `Product_ID` int(11) NOT NULL,
  `orderPrice` float NOT NULL,
  `orderQty` int(11) NOT NULL,
  `Total` float NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `order_detail`
--

INSERT INTO `order_detail` (`id`, `Order_ID`, `Product_ID`, `orderPrice`, `orderQty`, `Total`) VALUES
(00000000001, 00005, 1, 19.99, 1, 20),
(00000000002, 00006, 6, 19.99, 1, 20),
(00000000003, 00006, 2, 25.99, 1, 26),
(00000000004, 00006, 3, 39.99, 1, 40),
(00000000005, 00006, 4, 12.99, 1, 13),
(00000000006, 00006, 5, 15.99, 1, 16),
(00000000007, 00007, 1, 19.99, 5, 100),
(00000000008, 00008, 3, 39.99, 5, 200),
(00000000009, 00009, 1, 19.99, 5, 100),
(00000000010, 00010, 5, 15.99, 10, 160),
(00000000011, 00011, 1, 19.99, 1, 20),
(00000000012, 00012, 2, 25.99, 2, 52),
(00000000013, 00012, 3, 39.99, 1, 40),
(00000000014, 00013, 6, 19.99, 5, 100),
(00000000015, 00014, 2, 25.99, 2, 52),
(00000000016, 00014, 4, 12.99, 1, 13),
(00000000017, 00014, 3, 39.99, 1, 40),
(00000000018, 00015, 1, 19.99, 1, 19.99),
(00000000019, 00015, 3, 39.99, 1, 39.99),
(00000000020, 00015, 2, 25.99, 1, 25.99),
(00000000021, 00016, 1, 19.99, 2, 39.98),
(00000000022, 00017, 1, 19.99, 8, 159.92),
(00000000023, 00017, 6, 19.99, 5, 99.95),
(00000000024, 00017, 2, 25.99, 1, 25.99),
(00000000025, 00018, 2, 25.99, 1, 25.99),
(00000000026, 00019, 2, 25.99, 1, 25.99),
(00000000027, 00020, 2, 25.99, 1, 25.99),
(00000000028, 00020, 3, 39.99, 1, 39.99),
(00000000029, 00021, 2, 25.99, 1, 25.99),
(00000000030, 00022, 2, 25.99, 2, 51.98),
(00000000031, 00022, 5, 15.99, 2, 31.98),
(00000000032, 00023, 5, 15.99, 7, 111.93),
(00000000033, 00024, 2, 25.99, 2, 51.98),
(00000000034, 00024, 1, 19.99, 1, 19.99),
(00000000035, 00024, 3, 39.99, 1, 39.99),
(00000000036, 00024, 4, 12.99, 2, 25.98),
(00000000037, 00024, 5, 15.99, 1, 15.99),
(00000000038, 00024, 6, 19.99, 1, 19.99),
(00000000039, 00025, 2, 25.99, 4, 103.96),
(00000000040, 00026, 2, 25.99, 1, 25.99),
(00000000041, 00027, 1, 19.99, 1, 19.99),
(00000000042, 00028, 6, 19.99, 1, 19.99),
(00000000043, 00029, 2, 25.99, 2, 51.98),
(00000000044, 00030, 2, 25.99, 1, 25.99),
(00000000045, 00031, 2, 25.99, 13, 337.87),
(00000000046, 00032, 3, 39.99, 22, 879.78),
(00000000047, 00032, 2, 25.99, 7, 181.93),
(00000000048, 00032, 1, 19.99, 4, 79.96),
(00000000049, 00032, 4, 12.99, 9, 116.91),
(00000000050, 00033, 2, 25.99, 23, 597.77),
(00000000051, 00034, 2, 25.99, 10, 259.9),
(00000000052, 00034, 5, 15.99, 2, 31.98),
(00000000053, 00034, 3, 39.99, 1, 39.99),
(00000000054, 00035, 2, 25.99, 3, 77.97),
(00000000055, 00035, 5, 15.99, 1, 15.99),
(00000000056, 00035, 3, 39.99, 1, 39.99),
(00000000057, 00035, 4, 12.99, 1, 12.99),
(00000000058, 00036, 1, 19.99, 4, 79.96),
(00000000059, 00036, 2, 25.99, 1, 25.99),
(00000000060, 00037, 2, 25.99, 2, 51.98),
(00000000061, 00037, 6, 19.99, 1, 19.99),
(00000000062, 00038, 2, 25.99, 2, 51.98),
(00000000063, 00038, 3, 39.99, 2, 79.98),
(00000000064, 00038, 4, 12.99, 11, 142.89);

-- --------------------------------------------------------

--
-- Table structure for table `payment`
--

CREATE TABLE `payment` (
  `Order_ID` int(5) UNSIGNED ZEROFILL NOT NULL,
  `pay_money` double NOT NULL,
  `pay_date` date NOT NULL,
  `pay_time` time NOT NULL,
  `pay_image` varchar(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `payment`
--

INSERT INTO `payment` (`Order_ID`, `pay_money`, `pay_date`, `pay_time`, `pay_image`) VALUES
(00001, 500, '2024-05-08', '01:41:00', 'b_663a75eda93f8.png'),
(00012, 91.97, '2024-05-08', '13:36:00', 'b_6639fd1ccff03.jpeg'),
(00013, 99.95, '2024-05-08', '13:44:00', 'b_663b1f5fa662f.png'),
(00014, 104.96, '2024-05-08', '13:41:00', 'b_663b1e8b05887.png'),
(00016, 500, '2024-05-08', '02:57:00', 'b_663a87c1aacb9.png'),
(00018, 500, '2024-05-08', '01:45:00', 'b_663a76b266c34.png'),
(00019, 25.99, '2024-05-08', '13:28:00', 'b_663a76331bc58.png'),
(00022, 83.96, '2024-05-08', '13:30:00', 'b_663b1c0d201a6.jpg'),
(00023, 111.93, '2024-05-08', '13:32:00', 'b_663b1ca25f9fe.jpg'),
(00024, 173.92, '2024-05-08', '13:49:00', 'b_663b2091e531d.jpg'),
(00025, 103.96, '2024-05-08', '13:52:00', 'b_663b211cc84d1.jpg'),
(00026, 25.99, '2024-05-08', '13:55:00', 'b_663b21dd06b0e.jpg'),
(00027, 19.99, '2024-05-08', '17:01:00', 'b_663b222af3550.jpg'),
(00031, 337.87, '2024-05-08', '14:27:00', 'b_663b294c0d380.jpg'),
(00034, 331.87, '2024-05-08', '18:37:00', 'b_663b63e0a1e06.png'),
(00035, 146.94, '2024-05-08', '18:10:00', 'b_663b5db525f2a.jpg'),
(00036, 105.95, '2024-05-08', '18:16:00', 'b_663b5f21c89d5.jpg');

-- --------------------------------------------------------

--
-- Table structure for table `products`
--

CREATE TABLE `products` (
  `Product_ID` int(11) NOT NULL,
  `name` varchar(100) NOT NULL,
  `price` float NOT NULL,
  `description` varchar(200) NOT NULL,
  `stock` int(10) NOT NULL,
  `image` varchar(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;

--
-- Dumping data for table `products`
--

INSERT INTO `products` (`Product_ID`, `name`, `price`, `description`, `stock`, `image`) VALUES
(1, 'The Courtyard', 19.99, 'Test 1 Test 1 Test 1 Test 1', 68, 'TheCourtyard.jpg'),
(2, 'The Valley', 25.99, 'Description 2', 17, 'TheValley.jpg'),
(3, 'The Bamboo', 39.99, 'Description 3', 64, 'TheBamboo.jpg'),
(4, 'The Moon', 12.99, 'Description 4', 76, 'TheMoon.jpg'),
(5, 'The Snow', 15.99, 'Description 5', 77, 'TheSnow.jpg'),
(6, 'The Wind', 19.99, 'Description 6', 87, 'TheWind.jpg');

-- --------------------------------------------------------

--
-- Table structure for table `register`
--

CREATE TABLE `register` (
  `email` varchar(50) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  `pass` varchar(50) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  `conpass` varchar(50) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  `role` enum('admin','user') NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `register`
--

INSERT INTO `register` (`email`, `pass`, `conpass`, `role`) VALUES
('jina@gmail.com', 'Jina', 'Jina', 'user'),
('student', 'student', 'student', 'user'),
('admin', 'admin', 'admin', 'admin');

-- --------------------------------------------------------

--
-- Table structure for table `td_order`
--

CREATE TABLE `td_order` (
  `Order_ID` int(5) UNSIGNED ZEROFILL NOT NULL,
  `username` varchar(50) NOT NULL,
  `email` varchar(50) NOT NULL,
  `address` varchar(500) NOT NULL,
  `phone_number` varchar(10) NOT NULL,
  `UnitPrice` varchar(10000) NOT NULL,
  `order_status` enum('0','1','2') NOT NULL,
  `order_date` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `td_order`
--

INSERT INTO `td_order` (`Order_ID`, `username`, `email`, `address`, `phone_number`, `UnitPrice`, `order_status`, `order_date`) VALUES
(00001, 'เมษา เด็กดี', '', '256/99 หมู่ 5 ต.คนดี อ.เมือง จ.ชลบุรี 20000', '0387457896', '39.98', '1', '2024-05-06 14:37:13'),
(00002, 'สมชาย คนดี', '', '99/52 หมู่ 5 ต.เหมืองดี อ.นาดี จ.ชลบุรี 99999', '0687457906', '12.99', '1', '2024-04-08 17:00:00'),
(00003, 'มานี มีนามี', '', '120/52 หมู่ 4 ต.ในเมือง อ.เมือง จ.ตราด 45000', '0457890012', '99.95', '2', '2024-04-12 17:00:00'),
(00004, 'ดากะ โปะ', '', '199/99 หมู่ 9 ต.เหนือ อ.เมือง จ.เชียงใหม่ 12000', '0885559990', '15.99', '1', '2024-04-15 17:00:00'),
(00005, 'อีแทยง', '', 'สมุทรปราการ', '0987654321', '19.99', '1', '2024-05-06 15:06:42'),
(00006, 'คิมแชวอน', '', 'สมุทรปราการ', '1234567890', '114.95', '1', '2024-05-06 15:08:28'),
(00007, 'ยุนจองฮัน', '', 'สมุทรปราการ', '098345679', '99.95', '1', '2024-05-06 15:17:27'),
(00008, 'ควอนซุนยอง', '', 'สมุทรปราการ', '987657890', '199.95', '1', '2024-05-06 15:20:35'),
(00009, 'ชเวซึงชอล', '', 'สมุทรปราการ', '76448975', '99.95', '1', '2024-05-06 16:56:18'),
(00010, 'คิมมินจอง', '', 'กรุงเทพ', '986467633', '159.9', '1', '2024-05-06 17:25:41'),
(00011, 'อีแฮชาน', '', 'กรุงเทพ', '568743345', '19.99', '1', '2024-05-06 17:30:07'),
(00012, 'คิมโดยอง', '', 'เชียงใหม่', '777777', '91.97', '1', '2024-05-06 19:58:47'),
(00013, 'จางวอนยอง', 'wonyoung@gmail', 'เชียงราย', '1111111', '99.95', '1', '2024-05-06 21:01:20'),
(00014, 'ปาร์คจีซอง', 'jisung@gmail.com', 'นนทบุรี', '5688777', '104.96', '1', '2024-05-07 06:33:53'),
(00015, 'นาแจมิน', 'jaemin@gmail.com', 'กรุงเทพ', '777777', '85.97', '2', '2024-05-07 09:39:40'),
(00016, 'Karina Aespa', 'karinaluvwinter@gmail.com', 'Korean', '1150', '39.98', '1', '2024-05-07 11:10:39'),
(00017, 'มาสจุ๊ บุ', 'karinaluvwinter@gmail.com', 'ไทยLand', '9999', '285.86', '1', '2024-05-07 18:21:22'),
(00018, 'คุณานนต์ หฤทัยธรรม', 'karinaluvwinter@gmail.com', '123', '123', '25.99', '2', '2024-05-07 19:02:08'),
(00019, 'คุณานนต์ หฤทัยธรรม', 'karinaluvwinter@gmail.com', '213', '123214124', '25.99', '1', '2024-05-07 18:29:26'),
(00020, 'Karina Aespa', 'karinaluvwinter@gmail.com', 'asdsad', '214312541', '65.98', '1', '2024-05-07 18:46:34'),
(00021, 'Karina Aespa', 'karinaluvwinter@gmail.com', '2134', '1325135151', '25.99', '1', '2024-05-07 18:51:31'),
(00022, 'ชเวอูชิก', 'kimdami@gmail.com', 'Seoul', '0000', '83.96', '1', '2024-05-08 06:30:14'),
(00023, 'Karina Aespa', 'karinaluvwinter@gmail.com', 'sadasd', '124124214', '111.93', '2', '2024-05-08 06:33:52'),
(00024, 'ชเวอูชิก', 'kimdami@gmail.com', 'asdsa', '32523532', '173.92', '1', '2024-05-08 06:49:40'),
(00025, 'Karina Aespa', 'kimdami@gmail.com', '213213', '54125215', '103.96', '1', '2024-05-08 06:51:51'),
(00026, 'Karina Aespa', 'karinaluvwinter@gmail.com', 'asd', '324532423', '25.99', '1', '2024-05-08 06:53:55'),
(00027, 'คุณานนต์ หฤทัยธรรม', 'karinaluvwinter@gmail.com', '4354354', '4354354354', '19.99', '1', '2024-05-08 06:54:06'),
(00028, 'Karina Aespa', 'karinaluvwinter@gmail.com', '43543', '345435435', '19.99', '1', '2024-05-08 06:54:13'),
(00029, 'Karina Aespa', 'karinaluvwinter@gmail.com', '324234', '234324324', '51.98', '0', '2024-05-08 07:27:28'),
(00030, 'Karina Aespa', 'karinaluvwinter@gmail.com', '324', '324234324', '25.99', '1', '2024-05-08 07:19:46'),
(00031, 'Karina Aespa', 'karinaluvwinter@gmail.com', '213213', '124214214', '337.87', '2', '2024-05-08 07:27:26'),
(00032, 'Karina Aespa', 'karinaluvwinter@gmail.com', 'asfasf', '32523532', '1258.58', '1', '2024-05-08 08:19:14'),
(00033, 'Karina Aespa', 'karinaluvwinter@gmail.com', 'Seoul', '2343241414', '597.77', '1', '2024-05-08 10:03:26'),
(00034, 'Karina Aespa', 'karinaluvwinter@gmail.com', 'asdfsaf', '2365234523', '331.87', '1', '2024-05-08 11:02:44'),
(00035, 'มาส v2', 'kimdami@gmail.com', 'mas111', '7436436434', '146.94', '2', '2024-05-08 11:11:01'),
(00036, 'ชเวอูชิก', 'kimdami@gmail.com', 'เกาเหลา', '1112', '105.95', '1', '2024-05-08 11:13:22'),
(00037, 'ชเวอูชิก', 'karinaluvwinter@gmail.com', '124312', '151512412', '71.97', '1', '2024-05-08 11:36:02'),
(00038, 'มาส v2', 'kimdami@gmail.com', 'asd', '2346256325', '274.85', '2', '2024-05-08 14:18:56');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `order_detail`
--
ALTER TABLE `order_detail`
  ADD PRIMARY KEY (`id`,`Order_ID`);

--
-- Indexes for table `payment`
--
ALTER TABLE `payment`
  ADD PRIMARY KEY (`Order_ID`);

--
-- Indexes for table `products`
--
ALTER TABLE `products`
  ADD PRIMARY KEY (`Product_ID`);

--
-- Indexes for table `td_order`
--
ALTER TABLE `td_order`
  ADD PRIMARY KEY (`Order_ID`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `order_detail`
--
ALTER TABLE `order_detail`
  MODIFY `id` int(11) UNSIGNED ZEROFILL NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=65;

--
-- AUTO_INCREMENT for table `td_order`
--
ALTER TABLE `td_order`
  MODIFY `Order_ID` int(5) UNSIGNED ZEROFILL NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=39;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
