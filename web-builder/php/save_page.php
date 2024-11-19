<?php
// Database connection settings
$host = 'localhost';
$dbname = 'web-builder_db';
$username = 'root';
$password = '';

// Create connection to the database
$conn = new mysqli($host, $username, $password, $dbname);

// Check for connection errors
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

// Check if the POST request has JSON data
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    // Get the raw POST data
    $canvas_data = file_get_contents('php://input');


    // Extract page_id from the URL data
    $page_id = isset($_GET['page_id']) ? $_GET['page_id'] : null;
    $canvas_json = $canvas_data;  // Keep the canvas data in JSON format

    if ($page_id) {
        // Check if this page_id already exists in the database
        $check_stmt = $conn->prepare("SELECT page_id FROM canvas_data WHERE page_id = ?");
        $check_stmt->bind_param('i', $page_id);
        $check_stmt->execute();
        $result = $check_stmt->get_result();

        if ($result->num_rows > 0) {
            // If page_id exists, update the existing record
            $stmt = $conn->prepare("UPDATE canvas_data SET canvas_json = ? WHERE page_id = ?");
            $stmt->bind_param('si', $canvas_json, $page_id);
            $stmt->execute();
            $stmt->close();
            echo json_encode(['status' => 'success', 'message' => 'Canvas data updated successfully']);
        } else {
            // If page_id does not exist, insert a new record
            $stmt = $conn->prepare("INSERT INTO canvas_data (page_id, canvas_json) VALUES (?, ?)");
            $stmt->bind_param('is', $page_id, $canvas_json);
            $stmt->execute();
            $stmt->close();
            echo json_encode(['status' => 'success', 'message' => 'Canvas data saved successfully']);
        }

        $check_stmt->close();
    } else {
        echo json_encode(['status' => 'error', 'message' => 'No page_id provided']);
    }


    // Close the connection
    $conn->close();
} else {
    echo json_encode(['status' => 'error', 'message' => 'Invalid request method']);
}
?>