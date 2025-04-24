<?php
require_once __DIR__ . '/../controllers/CouncilController.php';

$councilController = new CouncilController($pdo);
$path = $_SERVER['REQUEST_URI'];
$requestMethod = $_SERVER["REQUEST_METHOD"];

parse_str($_SERVER['QUERY_STRING'] ?? '', $params);
$data = json_decode(file_get_contents("php://input"), true);

if ($requestMethod === 'GET' && strpos($path, 'api/councils') !== false) {
    $councilController->index();
} elseif ($requestMethod === 'POST' && strpos($path, 'api/councils') !== false) {
    $councilController->store($data);
} elseif ($requestMethod === 'PUT' && strpos($path, 'api/councils') !== false) {
    $councilController->update($params['id'], $data);
} elseif ($requestMethod === 'DELETE' && strpos($path, 'api/councils') !== false) {
    $councilController->destroy($params['id']);
}