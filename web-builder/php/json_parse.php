<?php
// Connect to the database
$servername = "localhost";
$username = "root"; // Change if needed
$password = ""; // Change if needed
$dbname = "web-builder_db"; // Replace with your database name

$conn = new mysqli($servername, $username, $password, $dbname);

// Check connection
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

$sql = "SELECT canvas_json FROM canvas_data WHERE page_id = 8"; // adjust to your query
$result = $conn->query($sql);


if ($result->num_rows > 0) {
    // Fetch the canvas_json
    $row = $result->fetch_assoc();
    $canvasJson = $row['canvas_json'];  // The canvas_json column in your DB
} else {
    echo "No data found.";
    exit;
}

$conn->close();  // Close the connection
echo $canvasJson;
?>
