<?php
require_once __DIR__ . '/../controllers/LocationController.php';

$locationController = new LocationController($pdo);

$requestMethod = $_SERVER["REQUEST_METHOD"];
parse_str($_SERVER['QUERY_STRING'] ?? '', $params);
$data = json_decode(file_get_contents("php://input"), true);

switch ($requestMethod && strpos($_SERVER['REQUEST_URI'], 'api/locations') !== false) {
  case 'GET':
    $locationController->index();
    break;
  case 'POST':
    echo $data['name'];
    $locationController->store($data);
    break;
  case 'PUT':
    $locationController->update($params['id'], $data);
    break;
  case 'DELETE':
    $locationController->destroy($params['id']);
    break;
}
