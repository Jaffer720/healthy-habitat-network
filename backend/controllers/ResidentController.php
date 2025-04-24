<?php
require_once __DIR__ . '/../models/Resident.php';
require_once __DIR__ . '/../config/auth.php';
require_once __DIR__ . '/../vendor/autoload.php'; // for JWT

use Firebase\JWT\JWT;

class ResidentController
{
    private $db;
    private $resident;

    public function __construct($pdo)
    {
        $this->db = $pdo;
        $this->resident = new Resident($pdo);
    }

    public function index()
    {
        try {
            $residents = $this->resident->getAll()->fetchAll(PDO::FETCH_ASSOC);
            if ($residents){
                http_response_code(200);
                echo json_encode(["success" => true, "data" => $residents]);
            }else{
                http_response_code(404);
                echo json_encode(["success" => false, "message" => "No residents found"]);
            }
        } catch (PDOException $e) {
            http_response_code(500);
            echo json_encode(['success' => false, 'error' => $e->getMessage()]);
            return;
        }
        
        
    }

    public function store($data)
    {
        try{
            foreach ($data as $key => $value)
                $this->resident->$key = $value;
            echo json_encode(['success' => $this->resident->create(), "message" => "Resident created successfully"]);
        }catch (PDOException $e) {
            http_response_code(500);
            echo json_encode(['success' => false, 'error' => $e->getMessage()]);
            return;
        }
    }

    public function update($id, $data)
    {
        try{
            foreach ($data as $key => $value)
                $this->resident->$key = $value;
            echo json_encode(['success' => $this->resident->update($id), "message" => "Resident updated successfully"]);
        } catch (PDOException $e) {
            http_response_code(500);
            echo json_encode(['success' => false, 'error' => $e->getMessage()]);
            return;
        }
    }

    public function destroy($id)
    {
        try{
            echo json_encode(['success' => $this->resident->delete($id), "message"=> "Resident deleted successfully"]);
        }catch (PDOException $e) {
            http_response_code(500);
            echo json_encode(['success' => false, 'error' => $e->getMessage()]);
            return;
        }
    }

    public function register($data) {
        // if ($this->resident->checkUsername($data['username'])) {
        //     http_response_code(403);
        //     echo json_encode(["success" => false, "message" => "Username already exists"]);
        //     return;
        // }
        $data['password'] = password_hash($data['password'], PASSWORD_BCRYPT);
        $success = $this->resident->register($data);
        if ($success) {
            http_response_code(200);
            echo json_encode(["success" => true, "message" => "Resident registration successful"]);
        } else {
            http_response_code(500);
            echo json_encode(["success" => false, "message" => "Registration failed"]);
        }
    }

    public function login($data) {
        $username = $data['username'] ?? '';
        $password = $data['password'] ?? '';
        $user = $this->resident->login($username);

        if ($user && password_verify($password, $user['password'])) {
            $payload = [
                "id" => $user['id'],
                "username" => $user['username'],
                "role" => "resident",
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
            echo json_encode(["success" => false, "message" => "Resident not found"]);
        } else {
            http_response_code(401);
            echo json_encode(["success" => false, "message" => "Invalid credentials"]);
        }
    }

}
