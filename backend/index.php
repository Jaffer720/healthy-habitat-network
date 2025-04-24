<?php
header("Access-Control-Allow-Origin: http://localhost:3000"); // Frontend URL
header("Access-Control-Allow-Headers: Content-Type, Authorization");
header("Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS");
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') exit;

require_once __DIR__ . '/config/database.php';

// Load routes
require_once __DIR__ . '/routes/auth.php';
// require_once __DIR__ . '/routes/users.php';
require_once __DIR__ . '/routes/locations.php';
require_once __DIR__ . '/routes/residents.php';
require_once __DIR__ . '/routes/businesses.php';
require_once __DIR__ . '/routes/products.php';
require_once __DIR__ . '/routes/councils.php';
require_once __DIR__ . '/routes/locations.php';
require_once __DIR__ . '/routes/votes.php';
?>
