-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Feb 19, 2026 at 12:06 PM
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
-- Database: `ticket_system_db`
--

-- --------------------------------------------------------

--
-- Table structure for table `departments`
--

CREATE TABLE `departments` (
  `id` int(11) NOT NULL,
  `department_name` varchar(100) NOT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `departments`
--

INSERT INTO `departments` (`id`, `department_name`, `createdAt`, `updatedAt`) VALUES
(1, 'LINE 01', '2026-02-19 07:02:31', '2026-02-19 07:56:01'),
(2, 'LINE 02', '2026-02-19 07:05:01', '2026-02-19 07:56:09'),
(3, 'LINE 03', '2026-02-19 07:05:15', '2026-02-19 07:56:15'),
(4, 'LINE 05', '2026-02-19 07:05:23', '2026-02-19 07:56:32'),
(6, 'LINE 06', '2026-02-19 07:05:42', '2026-02-19 07:56:38'),
(7, 'LINE 04', '2026-02-19 07:28:05', '2026-02-19 07:56:25'),
(8, 'Cutting & Crimping', '2026-02-19 07:34:42', '2026-02-19 07:34:42'),
(9, 'Airbag', '2026-02-19 07:34:50', '2026-02-19 07:34:50'),
(10, 'Warehouse', '2026-02-19 07:34:59', '2026-02-19 07:34:59'),
(12, 'LINE 11', '2026-02-19 07:02:31', '2026-02-19 07:56:01'),
(13, 'LINE 12', '2026-02-19 07:05:01', '2026-02-19 07:56:09'),
(14, 'LINE 07', '2026-02-19 07:05:15', '2026-02-19 07:56:15'),
(15, 'LINE 08', '2026-02-19 07:05:23', '2026-02-19 07:56:32'),
(16, 'LINE 09', '2026-02-19 07:05:42', '2026-02-19 07:56:38'),
(17, 'LINE 10', '2026-02-19 07:28:05', '2026-02-19 07:56:25');

-- --------------------------------------------------------

--
-- Table structure for table `reasons`
--

CREATE TABLE `reasons` (
  `id` int(11) NOT NULL,
  `reason_name` varchar(100) NOT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `reasons`
--

INSERT INTO `reasons` (`id`, `reason_name`, `createdAt`, `updatedAt`) VALUES
(1, 'Network Connection', '2026-02-19 08:29:47', '2026-02-19 08:29:47'),
(2, 'Printer', '2026-02-19 08:29:57', '2026-02-19 08:29:57'),
(3, 'MES System', '2026-02-19 08:30:07', '2026-02-19 08:30:07'),
(4, 'Monitor Issue', '2026-02-19 08:30:30', '2026-02-19 08:30:30'),
(5, 'No Internet Connection', '2026-02-19 08:30:40', '2026-02-19 08:30:40');

-- --------------------------------------------------------

--
-- Table structure for table `stations`
--

CREATE TABLE `stations` (
  `id` int(11) NOT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  `station_name` varchar(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `stations`
--

INSERT INTO `stations` (`id`, `createdAt`, `updatedAt`, `station_name`) VALUES
(1, '2026-02-19 07:55:50', '2026-02-19 07:55:50', 'ME 01'),
(2, '2026-02-19 07:55:50', '2026-02-19 07:55:50', 'ME 02'),
(3, '2026-02-19 07:55:50', '2026-02-19 07:55:50', 'ME 03'),
(4, '2026-02-19 07:55:50', '2026-02-19 07:55:50', 'ME 04'),
(5, '2026-02-19 07:55:50', '2026-02-19 07:55:50', 'ME 05'),
(6, '2026-02-19 07:55:50', '2026-02-19 07:55:50', 'ME 06'),
(7, '2026-02-19 07:55:50', '2026-02-19 07:55:50', 'ME 07'),
(8, '2026-02-19 07:55:50', '2026-02-19 07:55:50', 'ME 08'),
(9, '2026-02-19 07:55:50', '2026-02-19 07:55:50', 'ME 09'),
(10, '2026-02-19 07:55:50', '2026-02-19 07:55:50', 'ME 10'),
(11, '2026-02-19 07:55:50', '2026-02-19 07:55:50', 'ME 11'),
(12, '2026-02-19 07:55:50', '2026-02-19 07:55:50', 'ME 12'),
(13, '2026-02-19 07:55:50', '2026-02-19 07:55:50', 'ME 13'),
(14, '2026-02-19 07:55:50', '2026-02-19 07:55:50', 'ME 14'),
(15, '2026-02-19 07:55:50', '2026-02-19 07:55:50', 'ME 15'),
(16, '2026-02-19 07:55:50', '2026-02-19 07:55:50', 'ME 16'),
(17, '2026-02-19 08:00:44', '2026-02-19 08:00:44', 'Product Inspection'),
(18, '2026-02-19 08:00:52', '2026-02-19 08:00:52', 'Dimension'),
(19, '2026-02-19 08:01:02', '2026-02-19 08:01:02', 'Rework');

-- --------------------------------------------------------

--
-- Table structure for table `tickets`
--

CREATE TABLE `tickets` (
  `id` int(11) NOT NULL,
  `department` varchar(100) DEFAULT NULL,
  `station` varchar(100) DEFAULT NULL,
  `reason` varchar(100) DEFAULT NULL,
  `status` varchar(100) DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  `user` varchar(100) DEFAULT NULL,
  `description` varchar(999) DEFAULT NULL,
  `remarks` varchar(999) DEFAULT NULL,
  `it_personel` varchar(100) DEFAULT NULL,
  `user_id` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `id` int(11) NOT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  `user_name` varchar(100) NOT NULL,
  `password` varchar(255) NOT NULL,
  `is_admin` int(11) DEFAULT 0
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`id`, `createdAt`, `updatedAt`, `user_name`, `password`, `is_admin`) VALUES
(6, '2026-02-19 06:50:33', '2026-02-19 08:28:00', 'Jem', '$2b$10$kz.iKQy/DNkDrWVZ886bfOoNQHs8HFSiV73aiTg5lBNa/HkT16e1i', 1),
(7, '2026-02-19 08:38:41', '2026-02-19 08:38:41', 'SampleUser', '$2b$10$f7FfyXSAIO9.GisLaMy..eBf79O1K9wdJRq4LdoMzlpwjJD1QI/n.', 0);

--
-- Indexes for dumped tables
--

--
-- Indexes for table `departments`
--
ALTER TABLE `departments`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `reasons`
--
ALTER TABLE `reasons`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `stations`
--
ALTER TABLE `stations`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `tickets`
--
ALTER TABLE `tickets`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `departments`
--
ALTER TABLE `departments`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=19;

--
-- AUTO_INCREMENT for table `reasons`
--
ALTER TABLE `reasons`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT for table `stations`
--
ALTER TABLE `stations`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=21;

--
-- AUTO_INCREMENT for table `tickets`
--
ALTER TABLE `tickets`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=16;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
