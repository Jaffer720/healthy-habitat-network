<?php
require_once __DIR__ . '/../models/Business.php';

class BusinessController {
    private $db;
    private $business;

    public function __construct($pdo) {
        $this->db = $pdo;
        $this->business = new Business($pdo);
    }
    
    public function index() {
        echo json_encode($this->business->getAll()->fetchAll(PDO::FETCH_ASSOC));
    }

    public function store($data) {
        foreach ($data as $key => $value) $this->business->$key = $value;
        echo json_encode(['success' => $this->business->create()]);
    }

    public function update($id, $data) {
        foreach ($data as $key => $value) $this->business->$key = $value;
        echo json_encode(['success' => $this->business->update($id)]);
    }

    public function destroy($id) {
        echo json_encode(['success' => $this->business->delete($id)]);
    }

    public function register($data) {
        $username = $data['username'] ?? null;
        $password = $data['password'] ?? null;

        if (!$username || !$password) {
            echo json_encode(['success' => false, 'message' => 'Username and password are required']);
            return;
        }

        $hashedPassword = password_hash($password, PASSWORD_BCRYPT);
        $stmt = $this->db->prepare("INSERT INTO users (username, password) VALUES (:username, :password)");
        $success = $stmt->execute(['username' => $username, 'password' => $hashedPassword]);

        echo json_encode(['success' => $success]);
    }

    public function login($data) {
        $username = $data['username'] ?? null;
        $password = $data['password'] ?? null;

        if (!$username || !$password) {
            echo json_encode(['success' => false, 'message' => 'Username and password are required']);
            return;
        }

        $stmt = $this->db->prepare("SELECT * FROM users WHERE username = :username");
        $stmt->execute(['username' => $username]);
        $user = $stmt->fetch(PDO::FETCH_ASSOC);

        if ($user && password_verify($password, $user['password'])) {
            echo json_encode(['success' => true, 'message' => 'Login successful']);
        } else {
            echo json_encode(['success' => false, 'message' => 'Invalid username or password']);
        }
    }
}
