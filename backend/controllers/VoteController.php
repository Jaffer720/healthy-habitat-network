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
      echo json_encode($this->vote->getAll()->fetchAll(PDO::FETCH_ASSOC));
    } catch (Exception $e) {
      echo json_encode(['error' => $e->getMessage()]);
    }
  }

  public function store($data) {
    try {
      foreach ($data as $key => $value) $this->vote->$key = $value;
      echo json_encode(['success' => $this->vote->create()]);
    } catch (Exception $e) {
      echo json_encode(['error' => $e->getMessage()]);
    }
  }

  public function destroy($id) {
    try {
      echo json_encode(['success' => $this->vote->delete($id)]);
    } catch (Exception $e) {
      echo json_encode(['error' => $e->getMessage()]);
    }
  }
}
