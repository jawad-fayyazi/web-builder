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

// Check if page_id is provided in the request
$page_id = isset($_GET['page_id']) ? $_GET['page_id'] : null;

if ($page_id) {
    // Prepare the SQL query to fetch data for the specific page_id
    $stmt = $conn->prepare("SELECT canvas_json FROM canvas_data WHERE page_id = ? LIMIT 1");
    $stmt->bind_param("i", $page_id);

    // Execute the query
    $stmt->execute();
    $result = $stmt->get_result();

    // Check if any data exists for the given page_id
    if ($result->num_rows > 0) {
        // Fetch the data and return as JSON
        $row = $result->fetch_assoc();
        echo $row['canvas_json'];
    } else {
        echo json_encode(['status' => 'error', 'message' => 'No canvas data found for the specified page_id']);
    }

    // Close the statement
    $stmt->close();
} else {
    echo json_encode(['status' => 'error', 'message' => 'No page_id provided']);
}

// Close the connection
$conn->close();
?>