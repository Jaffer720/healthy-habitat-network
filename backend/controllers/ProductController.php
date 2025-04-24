<?php
require_once __DIR__ . '/../models/Product.php';

class ProductController {
  private $db;
  private $product;

  public function __construct($pdo) {
    $this->db = $pdo;
    $this->product = new Product($pdo);
  }
  
  public function index() {
    try{
      $products = $this->product->getAll()->fetchAll(PDO::FETCH_ASSOC);
      echo json_encode(['success' => true, 'data' => $products]);
    } catch (Exception $e) {
      echo json_encode(["success" => false, 'error' => $e->getMessage()]);
    }
  }

  public function store($data) {
    try {
      foreach ($data as $key => $value) $this->product->$key = $value;
      $this->product->create();
      echo json_encode(['success' => true, "message" => "Product added successfully"]);
    } catch (Exception $e) {
      echo json_encode(["success" => false, 'error' => $e->getMessage()]);
    }
  }

  public function update($id, $data) {
    try {
      foreach ($data as $key => $value) $this->product->$key = $value;
      $this->product->update($id);
      echo json_encode(['success' => true, "message" => "Product updated successfully"]);
    } catch (Exception $e) {
      echo json_encode(["success" => false, 'error' => $e->getMessage()]);
    }
  }

  public function destroy($id) {
    try{
    $this->product->delete($id);
    echo json_encode(['success' => true, "message" => "Product deleted successfully"]);
    } catch (Exception $e) {
      echo json_encode(["success" => false, 'error' => $e->getMessage()]);
    }
  }
}
