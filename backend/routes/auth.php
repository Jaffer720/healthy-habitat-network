<?php
require_once __DIR__ . '/../controllers/AuthController.php';
$auth = new AuthController($pdo);

$method = $_SERVER['REQUEST_METHOD'];
$path = $_SERVER['REQUEST_URI'];

if ($method === 'POST' && strpos($path, '/api/register') !== false) {
    $data = json_decode(file_get_contents("php://input"), true);
    $auth->register($data);
}

if ($method === 'POST' && strpos($path, '/api/login') !== false) {
    $data = json_decode(file_get_contents("php://input"), true);
    $auth->login($data);
}
?>
