<?php
require_once __DIR__ . '/../controllers/ProductController.php';

$productController = new ProductController($pdo);
$path = $_SERVER['REQUEST_URI'];
$requestMethod = $_SERVER["REQUEST_METHOD"];

if ($requestMethod === 'GET' && strpos($path, 'api/products') !== false) {
  $productController->index();
} elseif ($requestMethod === 'POST' && strpos($path, 'api/products') !== false) {
  $productController->store($data);
} elseif ($requestMethod === 'PUT' && strpos($path, 'api/products') !== false) {
  $productController->update($params['id'], $data);
} elseif ($requestMethod === 'DELETE' && strpos($path, 'api/products') !== false) {
  $productController->destroy($params['id']);
}
