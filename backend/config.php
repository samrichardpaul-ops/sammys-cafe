<?php
// Database configuration for InfinityFree
$host = 'sql103.byetcluster.com';
$username = 'if0_41444293';
$password = 'SammyCafe2026';  // Replace with your InfinityFree password
$database = 'if0_41444293_sammys_cafe';

// Create connection
$conn = new mysqli($host, $username, $password, $database);

// Check connection
if ($conn->connect_error) {
    die(json_encode([
        'success' => false, 
        'message' => 'Database connection failed: ' . $conn->connect_error
    ]));
}

// Set JSON header
header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: POST, GET, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type');
?>