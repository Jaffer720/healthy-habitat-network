<?php
require_once __DIR__ . '/../controllers/LocationController.php';

$locationController = new LocationController($pdo);

$requestMethod = $_SERVER["REQUEST_METHOD"];
$path = $_SERVER['REQUEST_URI'];
parse_str($_SERVER['QUERY_STRING'] ?? '', $params);
$data = json_decode(file_get_contents("php://input"), true);

if ($requestMethod === 'GET' && strpos($path, 'api/locations') !== false) {
  $locationController->index();
} elseif ($requestMethod === 'POST' && strpos($path, 'api/locations') !== false) {
  $locationController->store($data);
} elseif ($requestMethod === 'PUT' && strpos($path, 'api/locations') !== false) {
  $locationController->update($params['id'], $data);
} elseif ($requestMethod === 'DELETE' && strpos($path, 'api/locations') !== false) {
  $locationController->destroy($params['id']);
}