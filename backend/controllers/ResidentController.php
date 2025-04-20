<?php
require_once __DIR__ . '/../models/Resident.php';

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
        echo json_encode($this->resident->getAll()->fetchAll(PDO::FETCH_ASSOC));
    }

    public function store($data)
    {
        foreach ($data as $key => $value)
            $this->resident->$key = $value;
        echo json_encode(['success' => $this->resident->create()]);
    }

    public function update($id, $data)
    {
        foreach ($data as $key => $value)
            $this->resident->$key = $value;
        echo json_encode(['success' => $this->resident->update($id)]);
    }

    public function destroy($id)
    {
        echo json_encode(['success' => $this->resident->delete($id)]);
    }

    public function login($email, $password)
    {
        $resident = $this->resident->findByEmail($email);
        if ($resident && password_verify($password, $resident['password'])) {
            echo json_encode(['success' => true, 'message' => 'Login successful']);
        } else {
            echo json_encode(['success' => false, 'message' => 'Invalid credentials']);
        }
    }
    public function register($data)
    {
        if (isset($data['password'])) {
            $data['password'] = password_hash($data['password'], PASSWORD_BCRYPT);
        }
        foreach ($data as $key => $value)
            $this->resident->$key = $value;
        echo json_encode(['success' => $this->resident->create()]);
    }

}
