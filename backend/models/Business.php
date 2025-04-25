<?php
class Business {
    private $conn;
    private $table = 'businesses';

    public function __construct($db) {
        $this->conn = $db;
    }

    public function create() {
        $query = "INSERT INTO $this->table (name, contact_info, certifications, location_id, username, password)
                  VALUES (:name, :contact_info, :certifications, :location_id, :username, :password)";
        $stmt = $this->conn->prepare($query);
        return $stmt->execute([
            ':name' => $this->name,
            ':contact_info' => $this->contact_info,
            ':certifications' => $this->certifications,
            ':location_id' => $this->location_id,
            ':username' => $this->username,
            ':password' => $this->password
        ]);
    }

    public function getAll() {
        return $this->conn->query("SELECT * FROM $this->table");
    }

    public function update($id) {
        $query = "UPDATE $this->table SET name = :name, contact_info = :contact_info,
                  certifications = :certifications, location_id = :location_id, username = :username
                  WHERE id = :id";
        $stmt = $this->conn->prepare($query);
        return $stmt->execute([
            ':name' => $this->name,
            ':contact_info' => $this->contact_info,
            ':certifications' => $this->certifications,
            ':location_id' => $this->location_id,
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

    public function login($username) {
        $stmt = $this->conn->prepare("SELECT * FROM $this->table WHERE username = :username");
        $stmt->execute([':username' => $username]);
        return $stmt->fetch(PDO::FETCH_ASSOC);
    }

    public function register($data) {
        
        $query = "INSERT INTO {$this->table} 
                  (name, contact_info, certifications, location_id, username, password) 
                  VALUES (:name, :contact_info, :certifications, :location_id, :username, :password)";
        
        $stmt = $this->conn->prepare($query);
        
        return $stmt->execute([
            ':name' => $data['name'],
            ':contact_info' => $data['contact_info'],
            ':certifications' => $data['certifications'],
            ':location_id' => $data['location_id'],
            ':username' => $data['username'],
            ':password' => $data['password'],
        ]);
    }

    public function checkUsername($username) {
        // Check if username already exists
        $check = $this->conn->prepare("SELECT * FROM {$this->table} WHERE username = :username");
        return $check->execute([':username' => $username]);
        
    }
}
?>
