<?php
class Product {
    private $conn;
    private $table = 'products';

    public function __construct($db) {
        $this->conn = $db;
    }

    public function create() {
        $query = "INSERT INTO $this->table (business_id, name, description, size, price, type, category)
                  VALUES (:business_id, :name, :description, :size, :price, :type, :category)";
        $stmt = $this->conn->prepare($query);
        return $stmt->execute([
            ':business_id' => $this->business_id,
            ':name' => $this->name,
            ':description' => $this->description,
            ':size' => $this->size,
            ':price' => $this->price,
            ':type' => $this->type,
            ':category' => $this->category
        ]);
    }

    public function getAll() {
        return $this->conn->query("SELECT * FROM $this->table");
    }

    public function update($id) {
        $query = "UPDATE $this->table SET business_id = :business_id, name = :name, description = :description,
                  size = :size, price = :price, type = :type, category = :category WHERE id = :id";
        $stmt = $this->conn->prepare($query);
        return $stmt->execute([
            ':business_id' => $this->business_id,
            ':name' => $this->name,
            ':description' => $this->description,
            ':size' => $this->size,
            ':price' => $this->price,
            ':type' => $this->type,
            ':category' => $this->category,
            ':id' => $id
        ]);
    }

    public function delete($id) {
        return $this->conn->query("DELETE FROM $this->table WHERE id = $id");
    }
}
?>
