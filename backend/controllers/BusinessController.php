<?php
require_once __DIR__ . '/../models/Business.php';
require_once __DIR__ . '/../config/auth.php';
require_once __DIR__ . '/../vendor/autoload.php'; // for JWT

use Firebase\JWT\JWT;

class BusinessController {
    private $db;
    private $business;

    public function __construct($pdo) {
        $this->db = $pdo;
        $this->business = new Business($pdo);
    }
    
    public function index() {
        try {
            echo json_encode(["success" => true, "data" => $this->business->getAll()->fetchAll(PDO::FETCH_ASSOC)]);
        } catch (PDOException $e) {
            http_response_code(500);
            echo json_encode(['success' => false, 'error' => $e->getMessage()]);
            return;
        }
    }

    public function store($data) {
        try {
            foreach ($data as $key => $value) $this->business->$key = $value;
            $this->business->create();
            echo json_encode(['success' => true, "message" => "Business created successfully"]);
        } catch (PDOException $e) {
            http_response_code(500);
            echo json_encode(['success' => false, 'error' => $e->getMessage()]);
            return;
        }
    }

    public function update($id, $data) {
        try {
            foreach ($data as $key => $value) $this->business->$key = $value;
            $this->business->update($id);
            echo json_encode(['success' => true, "message" => "Business updated successfully"]);
        } catch (PDOException $e) {
            http_response_code(500);
            echo json_encode(['success' => false, 'error' => $e->getMessage()]);
            return;
        }
    }

    public function destroy($id) {
        try {
            $this->business->delete($id);
            echo json_encode(['success' => true, "message" => "Business deleted successfully"]);
        } catch (PDOException $e) {
            http_response_code(500);
            echo json_encode(['success' => false, 'error' => $e->getMessage()]);
            return;
        }   
    }

    public function register($data) {
        try{
            // if ($this->business->checkUsername($data['username'])) {
            //     http_response_code(403);
            //     echo json_encode(["success" => false, "message" => "Username already exists"]);
            //     return;
            // }
            $data['password'] = password_hash($data['password'], PASSWORD_BCRYPT);
            $success = $this->business->register($data);
            
            http_response_code(200);
            echo json_encode(["success"=>true,"message" => "Business registration successful"]);
        } catch (PDOException $e) {
            http_response_code(500);
            echo json_encode(["success" => false, "error" => $e->getMessage()]);
        }
    }

    public function login($data) {
        try{
        $username = $data['username'] ?? '';
        $password = $data['password'] ?? '';
        $user = $this->business->login($username);

        if ($user && password_verify($password, $user['password'])) {
            $payload = [
                "id" => $user['id'],
                "username" => $user['username'],
                "role" => "business",
                "exp" => time() + $GLOBALS['jwt_expiration'],
            ];
            $jwt = JWT::encode($payload, $GLOBALS['secret_key'], 'HS256');
            echo json_encode([
                "success" => true,
                "message" => "Login successful",
                "token" => $jwt,
                "user" => $user
            ]);
        } else if (!$user) {
            http_response_code(404);
            echo json_encode(["success" => false, "message" => "Business not found"]);
        } else {
            http_response_code(401);
            echo json_encode(["success" => false, "message" => "Invalid credentials"]);
        }
        } catch (PDOException $e) {
            http_response_code(500);
            echo json_encode(['success' => false, 'error' => $e->getMessage()]);
            return;
        }
    }
}