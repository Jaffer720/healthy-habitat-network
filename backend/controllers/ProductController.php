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
    echo json_encode($this->product->getAll()->fetchAll(PDO::FETCH_ASSOC));
  }

  public function store($data) {
    foreach ($data as $key => $value) $this->product->$key = $value;
    echo json_encode(['success' => $this->product->create()]);
  }

  public function update($id, $data) {
    foreach ($data as $key => $value) $this->product->$key = $value;
    echo json_encode(['success' => $this->product->update($id)]);
  }

  public function destroy($id) {
    echo json_encode(['success' => $this->product->delete($id)]);
  }
}
