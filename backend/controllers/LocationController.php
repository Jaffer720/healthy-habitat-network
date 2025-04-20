<?php
require_once __DIR__ . '/../models/Location.php';

class LocationController {
  private $db;
  private $location;

  public function __construct($pdo) {
    $this->db = $pdo;
    $this->location = new Location($pdo);
  }

  public function index() {
    try{
      $councils = $this->location->getAll()->fetchAll(PDO::FETCH_ASSOC);
      echo json_encode(['success' => true, 'data' => $councils]);
    }catch (PDOException $e) {
      echo $e->getMessage();
      echo json_encode(['success' => false, 'error' => $e->getMessage()]);
    }
  }

  public function store($data) {
    // foreach ($data as $key => $value) $this->location->$key = $value;
    try{

      $success = $this->location->create($data['name'], $data['council_id']);
      echo $success;
      echo json_encode(['success' => $success, 'message' => 'Location created successfully']);
    }catch (PDOException $e) {
      echo $e->getMessage();
      echo json_encode(['success' => false, 'error' => $e->getMessage()]);
    }
    
  }

  public function update($id, $data) {
    // foreach ($data as $key => $value) $this->location->$key = $value;
    try{
      $success = $this->location->update($id, $data['name'], $data['council_id']);
      echo json_encode(['success' => $success, 'message' => 'Location updated successfully']);  
    }catch (PDOException $e) {
      echo $e->getMessage();
      echo json_encode(['success' => false, 'error' => $e->getMessage()]);
    }
  }

  public function destroy($id) {
    try{
      $success = $this->location->delete($id);
      echo json_encode(['success' => $success, 'message' => 'Location deleted successfully']);  
    }catch (PDOException $e) {
      echo $e->getMessage();
      echo json_encode(['success' => false, 'error' => $e->getMessage()]);
    }
  }
}
