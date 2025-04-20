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
      if(isset($id) && !is_numeric($id)) {
        throw new Exception('Invalid ID provided');
      }
      if($id <= 0) {
        throw new Exception('ID must be greater than zero');
      }
      if(!$this->council->getAll()->fetchColumn()) {
        throw new Exception('No councils found to delete');
      }
      if(!$this->council->getAll()->fetchColumn($id)) {
        throw new Exception('Council not found');
      }
      $this->council->delete($id);
      echo json_encode(['success' => true, 'message' => 'Council deleted successfully', 'data' => $this->council->getAll()->fetchAll(PDO::FETCH_ASSOC)]);
    } catch (PDOException $e) {
      echo json_encode(['success' => false, 'error' => $e->getMessage()]);
      return;
    }
  }
}
