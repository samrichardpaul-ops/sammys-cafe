<?php
// Database configuration
$host = 'localhost';
$username = 'root';
$password = 'tiger';  // If you have MySQL password, add it here
$database = 'sammys_cafe';

// Create connection
$conn = new mysqli($host, $username, $password, $database);

// Check connection
if ($conn->connect_error) {
    die(json_encode([
        'success' => false, 
        'message' => 'Database connection failed: ' . $conn->connect_error
    ]));
}

// Set JSON header for API responses
header('Content-Type: application/json');

// Enable CORS (for development)
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: POST, GET, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type');
?>