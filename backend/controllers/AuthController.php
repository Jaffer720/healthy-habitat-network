<?php
require_once __DIR__ . '/../models/User.php';
require_once __DIR__ . '/../config/auth.php';
require_once __DIR__ . '/../vendor/autoload.php'; // for JWT

use Firebase\JWT\JWT;

class AuthController {
    private $db;
    private $user;

    public function __construct($pdo) {
        $this->db = $pdo;
        $this->user = new User($pdo);
    }

    public function register($data) {
        $name = $data['name'] ?? '';
        $email = $data['email'] ?? '';
        $password = $data['password'] ?? '';
        if ($this->user->register($name, $email, $password)) {
            echo json_encode(["message" => "Registration successful"]);
        } else {
            http_response_code(500);
            echo json_encode(["message" => "Registration failed"]);
        }
    }

    public function login($data) {
        $email = $data['email'] ?? '';
        $password = $data['password'] ?? '';
        $user = $this->user->login($email);
        if ($user && password_verify($password, $user['password'])) {
            $payload = [
                "id" => $user['id'],
                "email" => $user['email'],
                "exp" => time() + $GLOBALS['jwt_expiration'],
            ];
            $jwt = JWT::encode($payload, $GLOBALS['secret_key'], 'HS256');
            echo json_encode(["success" => true, "message"=>"login succesfully", "token" => $jwt, "user" => $user]);
        } else if(!$user) {
            http_response_code(404);
            echo json_encode(["success" => false, "message" => "User not found"]);
        } else {
            http_response_code(401);
            echo json_encode(["success" => false, "message" => "Invalid credentials"]);
        }
    }
}
?>
