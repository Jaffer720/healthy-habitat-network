<?php
require_once __DIR__ . '/../vendor/autoload.php';

$dotenv = Dotenv\Dotenv::createImmutable(__DIR__ . '/../');
$dotenv->load();

$secret_key = $_ENV['JWT_SECRET'];
$jwt_expiration = intval($_ENV['JWT_EXPIRES_IN']);
?>
