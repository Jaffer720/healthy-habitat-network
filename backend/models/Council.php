<?php
class Council {
    private $conn;
    private $table = 'local_councils';

    public function __construct($db) {
        $this->conn = $db;
    }

    public function create($name, $region) {
        $query = "INSERT INTO $this->table (name, region) VALUES (:name, :region)";
        $stmt = $this->conn->prepare($query);
        return $stmt->execute([
            ':name' => $name,
            ':region' => $region
        ]);
    }

    public function getAll() {
        return $this->conn->query("SELECT * FROM $this->table");
    }

    public function update($id, $name, $region) {
        $query = "UPDATE $this->table SET name = :name, region = :region WHERE id = :id";
        $stmt = $this->conn->prepare($query);
        return $stmt->execute([
            ':name' => $name,
            ':region' => $region,
            ':id' => $id
        ]);
    }

    public function delete($id) {
        return $this->conn->query("DELETE FROM $this->table WHERE id = $id");
    }
}
?>
