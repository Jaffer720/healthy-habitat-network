<?php
require_once __DIR__ . '/../models/Council.php';

class CouncilController {
  private $db;
  private $council;

  public function __construct($pdo) {
    $this->db = $pdo;
    $this->council = new Council($pdo);
  }

  public function index() {
    try {
      $this->council->getAll();
      $councils = $this->council->getAll()->fetchAll(PDO::FETCH_ASSOC);
      echo json_encode(['success' => true, 'data' => $councils]);
    } catch (PDOException $e) {
      echo json_encode(['success' => false, 'error' => $e->getMessage()]);
      return;
    }
  }

  public function store($data) {
    try {
      $this->council->create($data['name'], $data['region']);
      echo json_encode(['success' => true, 'message' => 'Council created successfully']);
    } catch (PDOException $e) {
      echo json_encode(['success' => false, 'error' => $e->getMessage()]);
      return;
    }
  }

  public function update($id, $data) {
    try {
      $this->council->update($id, $data['name'], $data['region']);
      echo json_encode(['success' => true, 'message' => 'Council updated successfully']);
    } catch (PDOException $e) {
      echo json_encode(['success' => false, 'error' => $e->getMessage()]);
      return;
    }
  }

  public function destroy($id) {
    try {
      $this->council->delete($id);
      echo json_encode(['success' => true, 'message' => 'Council deleted successfully', 'data' => $this->council->getAll()->fetchAll(PDO::FETCH_ASSOC)]);
    } catch (PDOException $e) {
      echo json_encode(['success' => false, 'error' => $e->getMessage()]);
      return;
    }
  }
}
