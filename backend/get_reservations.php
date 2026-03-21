<?php
require_once 'config.php';

$sql = "SELECT * FROM reservations ORDER BY reservation_date DESC, reservation_time DESC";
$result = $conn->query($sql);

$reservations = [];
if ($result->num_rows > 0) {
    while ($row = $result->fetch_assoc()) {
        $reservations[] = $row;
    }
}

echo json_encode([
    'success' => true,
    'data' => $reservations
]);

$conn->close();
?>