-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Apr 24, 2025 at 09:44 PM
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
-- Database: `healthy_habitat`
--

-- --------------------------------------------------------

--
-- Table structure for table `businesses`
--

CREATE TABLE `businesses` (
  `id` int(11) NOT NULL,
  `name` varchar(50) NOT NULL,
  `contact_info` text DEFAULT NULL,
  `certifications` text DEFAULT NULL,
  `location_id` int(11) DEFAULT NULL,
  `username` varchar(50) NOT NULL,
  `password` varchar(255) NOT NULL,
  `role` varchar(50) NOT NULL DEFAULT 'business'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `businesses`
--

INSERT INTO `businesses` (`id`, `name`, `contact_info`, `certifications`, `location_id`, `username`, `password`, `role`) VALUES
(2, 'Herts Enterprise Ltd.', '+923475788068', 'ISO 9001', 1, 'Hisam720', '$2y$10$TpgjHssyaR4oY90AM5ZZd.PDf5sBckMFQKsa4JB2BPRHOt6ivxrMK', 'business');

-- --------------------------------------------------------

--
-- Table structure for table `local_councils`
--

CREATE TABLE `local_councils` (
  `id` int(11) NOT NULL,
  `name` varchar(100) NOT NULL,
  `region` varchar(100) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `local_councils`
--

INSERT INTO `local_councils` (`id`, `name`, `region`) VALUES
(3, 'Test Council', 'Test Region'),
(4, 'TestC', 'TestR');

-- --------------------------------------------------------

--
-- Table structure for table `locations`
--

CREATE TABLE `locations` (
  `id` int(11) NOT NULL,
  `name` varchar(100) NOT NULL,
  `council_id` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `locations`
--

INSERT INTO `locations` (`id`, `name`, `council_id`) VALUES
(1, 'Shah khalid', 3);

-- --------------------------------------------------------

--
-- Table structure for table `products`
--

CREATE TABLE `products` (
  `id` int(11) NOT NULL,
  `business_id` int(11) DEFAULT NULL,
  `name` varchar(50) NOT NULL,
  `description` text DEFAULT NULL,
  `quantity_size` varchar(50) DEFAULT NULL,
  `category` varchar(50) NOT NULL,
  `price` decimal(10,2) DEFAULT NULL,
  `type` enum('product','service') NOT NULL,
  `price_range` enum('affordable','moderate','premium') NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `products`
--

INSERT INTO `products` (`id`, `business_id`, `name`, `description`, `quantity_size`, `category`, `price`, `type`, `price_range`) VALUES
(1, 2, 'Nutrition Counseling', 'Personalized dietary plans by certified nutritionists.', '1 session', 'Healthy Eating', 30.00, 'service', 'moderate'),
(2, 2, 'Organic Meal Delivery', 'Weekly subscription delivering organic, healthy meals.', '5 meals/week', 'Healthy Eating', 55.00, 'service', 'premium'),
(3, 2, 'Yoga Classes', 'Weekly in-person yoga sessions focused on flexibility and calm.', '4 sessions/month', 'Fitness & Wellness', 40.00, 'service', 'affordable'),
(4, 2, 'Personal Training Program', 'Customized fitness programs tailored to your fitness goals.', '8 sessions/month', 'Fitness & Wellness', 120.00, 'service', 'premium'),
(5, 2, 'Eco-Friendly Home Cleaning', 'Non-toxic cleaning services for your home.', '1 visit', 'Sustainable Living', 50.00, 'service', 'moderate'),
(6, 2, 'Sustainable Gardening Workshop', 'Learn permaculture and organic gardening techniques.', '1-day workshop', 'Sustainable Living', 25.00, 'service', 'affordable'),
(7, 2, 'Online Counseling Session', 'Confidential therapy sessions with licensed professionals.', '45 minutes', 'Mental Health', 60.00, 'service', 'premium'),
(8, 2, 'Stress Management Workshop', 'Group workshop teaching stress reduction techniques.', '3-hour session', 'Mental Health', 35.00, 'service', 'moderate'),
(9, 2, 'Stainless Steel Straws', 'Reusable straws made from high-grade stainless steel.', '4-pack', 'Reusable Health Products', 10.00, 'product', 'affordable'),
(10, 2, 'Reusable Organic Face Mask', 'Washable face mask made from organic cotton.', '1 mask', 'Reusable Health Products', 8.00, 'product', 'affordable'),
(11, 2, 'Cork Yoga Mat', 'Eco-friendly yoga mat made from 100% natural cork.', '1 mat', 'Eco-Friendly Fitness Gear', 45.00, 'product', 'moderate'),
(12, 2, 'Bamboo Fiber Towel', 'Highly absorbent and biodegradable gym towel.', '2-pack', 'Eco-Friendly Fitness Gear', 25.00, 'product', 'moderate'),
(13, 2, 'Natural Deodorant', 'Aluminum-free, plant-based deodorant stick.', '50g', 'Organic Personal Care', 12.00, 'product', 'affordable'),
(14, 2, 'Plant-Based Skincare Set', 'Set of organic face wash, serum, and moisturizer.', '3-piece set', 'Organic Personal Care', 55.00, 'product', 'premium'),
(15, 2, 'HEPA Air Purifier', 'High-efficiency air purifier with HEPA filtration.', 'Medium Room (up to 300 sqft)', 'Home Wellness', 120.00, 'product', 'premium'),
(16, 2, 'Organic Cotton Bedding', 'Sustainably sourced and chemical-free bed set.', 'Queen size set', 'Home Wellness', 85.00, 'product', 'moderate');

-- --------------------------------------------------------

--
-- Table structure for table `residents`
--

CREATE TABLE `residents` (
  `id` int(11) NOT NULL,
  `name` varchar(100) NOT NULL,
  `age_group` varchar(50) DEFAULT NULL,
  `gender` enum('male','female','other') NOT NULL,
  `location_id` int(11) DEFAULT NULL,
  `areas_of_interest` text DEFAULT NULL,
  `username` varchar(50) NOT NULL,
  `password` varchar(255) NOT NULL,
  `role` varchar(50) NOT NULL DEFAULT 'resident'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `residents`
--

INSERT INTO `residents` (`id`, `name`, `age_group`, `gender`, `location_id`, `areas_of_interest`, `username`, `password`, `role`) VALUES
(1, 'Hisam Nasir', 'adult', 'male', 1, 'health,fitness', 'Hisam123', '$2y$10$kxZXydHrA/xPrhilm/fLN.voRmLzVz4aYQcKWav8xr2De/rXLn9Pq', 'resident');

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `id` int(11) NOT NULL,
  `name` varchar(100) DEFAULT NULL,
  `email` varchar(100) DEFAULT NULL,
  `password` varchar(255) DEFAULT NULL,
  `role` varchar(50) NOT NULL DEFAULT 'admin',
  `created_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`id`, `name`, `email`, `password`, `role`, `created_at`) VALUES
(1, 'Muhammad Jaffer', 'mjaffer720@gmail.com', '$2y$10$8LSHotH63i6RrPg4R0JeCuls7VdHXjXb8UkWl2QDOJlWMbIkSsOGW', 'admin', '2025-04-11 20:41:36');

-- --------------------------------------------------------

--
-- Table structure for table `votes`
--

CREATE TABLE `votes` (
  `id` int(11) NOT NULL,
  `resident_id` int(11) DEFAULT NULL,
  `product_id` int(11) DEFAULT NULL,
  `vote_value` enum('Yes','No') NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `votes`
--

INSERT INTO `votes` (`id`, `resident_id`, `product_id`, `vote_value`) VALUES
(1, 1, 2, 'Yes'),
(4, 1, 3, 'No');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `businesses`
--
ALTER TABLE `businesses`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `username` (`username`),
  ADD KEY `location_id` (`location_id`);

--
-- Indexes for table `local_councils`
--
ALTER TABLE `local_councils`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `locations`
--
ALTER TABLE `locations`
  ADD PRIMARY KEY (`id`),
  ADD KEY `council_id` (`council_id`);

--
-- Indexes for table `products`
--
ALTER TABLE `products`
  ADD PRIMARY KEY (`id`),
  ADD KEY `business_id` (`business_id`);

--
-- Indexes for table `residents`
--
ALTER TABLE `residents`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `username` (`username`),
  ADD KEY `location_id` (`location_id`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `email` (`email`);

--
-- Indexes for table `votes`
--
ALTER TABLE `votes`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `resident_id` (`resident_id`,`product_id`),
  ADD KEY `product_id` (`product_id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `businesses`
--
ALTER TABLE `businesses`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `local_councils`
--
ALTER TABLE `local_councils`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT for table `locations`
--
ALTER TABLE `locations`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `products`
--
ALTER TABLE `products`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=17;

--
-- AUTO_INCREMENT for table `residents`
--
ALTER TABLE `residents`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `votes`
--
ALTER TABLE `votes`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `businesses`
--
ALTER TABLE `businesses`
  ADD CONSTRAINT `businesses_ibfk_1` FOREIGN KEY (`location_id`) REFERENCES `locations` (`id`);

--
-- Constraints for table `locations`
--
ALTER TABLE `locations`
  ADD CONSTRAINT `locations_ibfk_1` FOREIGN KEY (`council_id`) REFERENCES `local_councils` (`id`);

--
-- Constraints for table `products`
--
ALTER TABLE `products`
  ADD CONSTRAINT `products_ibfk_1` FOREIGN KEY (`business_id`) REFERENCES `businesses` (`id`);

--
-- Constraints for table `residents`
--
ALTER TABLE `residents`
  ADD CONSTRAINT `residents_ibfk_1` FOREIGN KEY (`location_id`) REFERENCES `locations` (`id`);

--
-- Constraints for table `votes`
--
ALTER TABLE `votes`
  ADD CONSTRAINT `votes_ibfk_1` FOREIGN KEY (`resident_id`) REFERENCES `residents` (`id`),
  ADD CONSTRAINT `votes_ibfk_2` FOREIGN KEY (`product_id`) REFERENCES `products` (`id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
