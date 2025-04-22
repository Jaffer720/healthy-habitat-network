<?php
require_once __DIR__ . '/../controllers/CouncilController.php';

$councilController = new CouncilController($pdo);
$path = $_SERVER['REQUEST_URI'];
$requestMethod = $_SERVER["REQUEST_METHOD"];

parse_str($_SERVER['QUERY_STRING'] ?? '', $params);
$data = json_decode(file_get_contents("php://input"), true);

switch ($requestMethod) {
  
  case 'GET':
    $councilController->index();
    break;
  case 'POST':
    $councilController->store($data);
    break;
  case 'PUT':
    $councilController->update($params['id'], $data);
    break;
  case 'DELETE':
    $councilController->destroy($params['id']);
    break;
}
