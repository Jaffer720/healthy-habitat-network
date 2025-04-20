<?php
require_once __DIR__ . '/../controllers/ProductController.php';

$productController = new ProductController($pdo);
$path = $_SERVER['REQUEST_URI'];
$requestMethod = $_SERVER["REQUEST_METHOD"];

switch ($requestMethod && strpos($path, 'api/products') !== false) {
  case 'GET':
    $productController->index();
    break;
  case 'POST':
    $data = json_decode(file_get_contents("php://input"), true);
    $productController->store($data);
    break;
  case 'PUT':
    parse_str($_SERVER['QUERY_STRING'], $params);
    $data = json_decode(file_get_contents("php://input"), true);
    $productController->update($params['id'], $data);
    break;
  case 'DELETE':
    parse_str($_SERVER['QUERY_STRING'], $params);
    $productController->destroy($params['id']);
    break;
}
