<?php
require_once 'config.php';

// Get JSON data
$input = json_decode(file_get_contents('php://input'), true);

if (!$input) {
    echo json_encode(['success' => false, 'message' => 'Invalid input']);
    exit;
}

// Get and sanitize data
$name = $conn->real_escape_string(trim($input['name']));
$email = $conn->real_escape_string(trim($input['email']));
$phone = $conn->real_escape_string(trim($input['phone']));
$date = $conn->real_escape_string($input['date']);
$time = $conn->real_escape_string($input['time']);
$guests = (int)$input['guests'];
$special = $conn->real_escape_string(trim($input['special'] ?? ''));

// Validate
if (empty($name) || empty($email) || empty($phone) || empty($date) || empty($time)) {
    echo json_encode(['success' => false, 'message' => 'All fields required']);
    exit;
}

// Insert into database
$sql = "INSERT INTO reservations (name, email, phone, reservation_date, reservation_time, guests, special_requests) 
        VALUES ('$name', '$email', '$phone', '$date', '$time', $guests, '$special')";

if ($conn->query($sql)) {
    echo json_encode([
        'success' => true,
        'message' => 'Reservation saved to database!',
        'reservation_id' => $conn->insert_id
    ]);
} else {
    echo json_encode([
        'success' => false,
        'message' => 'Database error: ' . $conn->error
    ]);
}

$conn->close();
?>