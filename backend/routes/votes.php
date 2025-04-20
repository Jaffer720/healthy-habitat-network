<?php
require_once __DIR__ . '/../controllers/VoteController.php';

$voteController = new VoteController($pdo);

$requestMethod = $_SERVER["REQUEST_METHOD"];
parse_str($_SERVER['QUERY_STRING'] ?? '', $params);
$data = json_decode(file_get_contents("php://input"), true);

switch ($requestMethod && strpos($_SERVER['REQUEST_URI'], 'api/votes') !== false) {
  case 'GET':
    $voteController->index();
    break;
  case 'POST':
    $voteController->store($data);
    break;
  case 'DELETE':
    $voteController->destroy($params['id']);
    break;
}
