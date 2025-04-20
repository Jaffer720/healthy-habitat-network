<?php
class Vote {
    private $conn;
    private $table = 'votes';

    public function __construct($db) {
        $this->conn = $db;
    }

    public function create() {
        $query = "INSERT INTO $this->table (resident_id, product_id, vote_value)
                  VALUES (:resident_id, :product_id, :vote_value)";
        $stmt = $this->conn->prepare($query);
        return $stmt->execute([
            ':resident_id' => $this->resident_id,
            ':product_id' => $this->product_id,
            ':vote_value' => $this->vote_value
        ]);
    }

    public function getAll() {
        return $this->conn->query("SELECT * FROM $this->table");
    }

    public function delete($id) {
        return $this->conn->query("DELETE FROM $this->table WHERE id = $id");
    }
}
?>
