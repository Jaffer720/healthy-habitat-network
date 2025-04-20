<?php
class Location {
    private $conn;
    private $table = 'locations';

    public function __construct($db) {
        $this->conn = $db;
    }

    public function create($name, $council_id) {
        
        $query = "INSERT INTO " . $this->table . " (name, council_id) VALUES (:name, :council_id)";
        // echo $query;
        // echo $name;
        // echo $council_id;
        $stmt = $this->conn->prepare($query);
        return $stmt->execute([
            ':name' => $name,
            ':council_id' => $council_id
        ]);
    }

    public function getAll() {
        return $this->conn->query("SELECT * FROM $this->table");
    }

    public function update($id, $name, $council_id) {
        
        $query = "UPDATE " . $this->table . " SET name = :name, council_id = :council_id WHERE id = :id";
        $stmt = $this->conn->prepare($query);
        return $stmt->execute([
            ':name' => $name,
            ':council_id' => $council_id,
            ':id' => $id
        ]);
    }

    public function delete($id) {
        $query = "DELETE FROM " . $this->table . " WHERE id = :id";
        $stmt = $this->conn->prepare($query);
        return $stmt->execute([':id' => $id]);
    }
}
?>
