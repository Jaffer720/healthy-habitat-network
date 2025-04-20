<?php
require_once __DIR__ . '/../controllers/ResidentController.php';

$residentController = new ResidentController($pdo);
$path = $_SERVER['REQUEST_URI'];
$requestMethod = $_SERVER["REQUEST_METHOD"];

switch ($requestMethod && strpos($path, 'api/residents') !== false) {
    case 'POST':
        if (strpos($path, 'login') !== false) {
            $data = json_decode(file_get_contents("php://input"), true);
            $residentController->login($data);
        } elseif (strpos($path, 'register') !== false) {
            $data = json_decode(file_get_contents("php://input"), true);
            $residentController->register($data);
        } else {
            $data = json_decode(file_get_contents("php://input"), true);
            $residentController->store($data);
        }
        break;
    case 'GET':
        $residentController->index();
        break;
    case 'PUT':
        parse_str($_SERVER['QUERY_STRING'], $params);
        $data = json_decode(file_get_contents("php://input"), true);
        $residentController->update($params['id'], $data);
        break;
    case 'DELETE':
        parse_str($_SERVER['QUERY_STRING'], $params);
        $residentController->delete($params['id']);
        break;
}
