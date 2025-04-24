<?php
require_once __DIR__ . '/../controllers/VoteController.php';

$voteController = new VoteController($pdo);

$requestMethod = $_SERVER["REQUEST_METHOD"];
$path = $_SERVER['REQUEST_URI'];
parse_str($_SERVER['QUERY_STRING'] ?? '', $params);
$data = json_decode(file_get_contents("php://input"), true);

if ($requestMethod === 'GET' && strpos($path, 'api/votes') !== false) {
  $voteController->index();
} elseif ($requestMethod === 'POST' && strpos($path, 'api/votes') !== false) {
  $voteController->store($data);
} elseif ($requestMethod === 'DELETE' && strpos($path, 'api/votes') !== false) {
  $voteController->destroy($params['id']);
}
