<?php
require_once __DIR__ . '/../controllers/BusinessController.php';

$businessController = new BusinessController($pdo);
$path = $_SERVER['REQUEST_URI'];
$requestMethod = $_SERVER["REQUEST_METHOD"];

switch ($requestMethod && strpos($path, 'api/businesses') !== false) {
    case 'POST':
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
        break;
    case 'GET':
        $businessController->index();
        break;
    case 'PUT':
        parse_str($_SERVER['QUERY_STRING'], $params);
        $data = json_decode(file_get_contents("php://input"), true);
        $businessController->update($params['id'], $data);
        break;
    case 'DELETE':
        parse_str($_SERVER['QUERY_STRING'], $params);
        $businessController->delete($params['id']);
        break;
}
