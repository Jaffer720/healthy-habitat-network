<?php
require_once __DIR__ . '/../models/Vote.php';

class VoteController {
  private $db;
  private $vote;

  public function __construct($pdo) {
    $this->db = $pdo;
    $this->vote = new Vote($pdo);
  }

  public function index() {
    try{
      $votes = $this->vote->getAll()->fetchAll(PDO::FETCH_ASSOC);
      echo json_encode(["success" => true, "data" => $votes]);
    } catch (Exception $e) {
      echo json_encode(["success" => false, 'error' => $e->getMessage()]);
    }
  }

  public function store($data) {
    try {
      foreach ($data as $key => $value) $this->vote->$key = $value;
      $this->vote->create();
      echo json_encode(['success' => true, "message" => "Vote added successfully"]);
    } catch (Exception $e) {
      echo json_encode(["success" => false, 'error' => $e->getMessage()]);
    }
  }

  public function destroy($id) {
    try {
      $this->vote->delete($id);
      echo json_encode(["success" => true, "message" => "Vote deleted successfully"]);
    } catch (Exception $e) {
      echo json_encode(["success" => false, 'error' => $e->getMessage()]);
    }
  }
}
