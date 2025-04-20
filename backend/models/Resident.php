<?php
class Resident {
    private $conn;
    private $table = 'residents';

    public function __construct($db) {
        $this->conn = $db;
    }

    public function create() {
        $query = "INSERT INTO $this->table (name, age_group, gender, location_id, areas_of_interest, username, password)
                  VALUES (:name, :age_group, :gender, :location_id, :areas_of_interest, :username, :password)";
        $stmt = $this->conn->prepare($query);
        return $stmt->execute([
            ':name' => $this->name,
            ':age_group' => $this->age_group,
            ':gender' => $this->gender,
            ':location_id' => $this->location_id,
            ':areas_of_interest' => $this->areas_of_interest,
            ':username' => $this->username,
            ':password' => $this->password
        ]);
    }

    public function getAll() {
        return $this->conn->query("SELECT * FROM $this->table");
    }

    public function update($id) {
        $query = "UPDATE $this->table SET name = :name, age_group = :age_group, gender = :gender,
                  location_id = :location_id, areas_of_interest = :areas_of_interest, username = :username
                  WHERE id = :id";
        $stmt = $this->conn->prepare($query);
        return $stmt->execute([
            ':name' => $this->name,
            ':age_group' => $this->age_group,
            ':gender' => $this->gender,
            ':location_id' => $this->location_id,
            ':areas_of_interest' => $this->areas_of_interest,
            ':username' => $this->username,
            ':id' => $id
        ]);
    }

    public function delete($id) {
        return $this->conn->query("DELETE FROM $this->table WHERE id = $id");
    }

    public function findByUsername($username) {
        $stmt = $this->conn->prepare("SELECT * FROM $this->table WHERE username = :username");
        $stmt->execute([':username' => $username]);
        return $stmt->fetch(PDO::FETCH_ASSOC);
    }
}
?>
