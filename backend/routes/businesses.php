<?php
require_once __DIR__ . '/../controllers/BusinessController.php';

$businessController = new BusinessController($pdo);
$path = $_SERVER['REQUEST_URI'];
$requestMethod = $_SERVER["REQUEST_METHOD"];

if ($requestMethod === 'POST' && strpos($path, 'api/businesses') !== false) {
    if (strpos($path, 'login') !== false) {
        $data = json_decode(file_get_contents("php://input"), true);
        $businessController->login($data);
    } elseif (strpos($path, 'register') !== false) {
        $data = json_decode(file_get_contents("php://input"), true);
        $businessController->register($data);
    } else {
        $data = json_decode(file_get_contents("php://input"), true);
        $businessController->store($data);
    }
} elseif ($requestMethod === 'GET' && strpos($path, 'api/businesses') !== false) {
    $businessController->index();
} elseif ($requestMethod === 'PUT' && strpos($path, 'api/businesses') !== false) {
    parse_str($_SERVER['QUERY_STRING'], $params);
    $data = json_decode(file_get_contents("php://input"), true);
    $businessController->update($params['id'], $data);
} elseif ($requestMethod === 'DELETE' && strpos($path, 'api/businesses') !== false) {
    parse_str($_SERVER['QUERY_STRING'], $params);
    $businessController->delete($params['id']);
}
