<?php
// Check if the file was uploaded without errors
if ($_FILES['file']['error'] == UPLOAD_ERR_OK) {
    // Get the file from the uploaded data
    $fileTmpPath = $_FILES['file']['tmp_name'];
    $fileName = $_FILES['file']['name'];

    // Cloudflare Pages API details
    $apiToken = 'SsGE_fiqsZNl5giNrlrl23WRTiW8SzAyiSDASkXl'; // Your API token, securely kept in the backend
    $accountId = 'a01246bb8dfbf94e30a7e1ccfe81ce9e'; // Replace with your Cloudflare account ID
    $projectName = 'test-web'; // Replace with your Cloudflare Pages project name

    // Cloudflare API endpoint for file upload
    $url = "https://api.cloudflare.com/client/v4/accounts/$accountId/pages/projects/$projectName/files";

    // Prepare the cURL request to upload the file to Cloudflare Pages
    $ch = curl_init();
    $headers = [
        "Authorization: Bearer $apiToken",
    ];

    // Create a POST request with the file
    $cFile = new CURLFile($fileTmpPath, 'application/zip', $fileName);
    $data = [
        'file' => $cFile,
    ];

    // Set cURL options
    curl_setopt($ch, CURLOPT_URL, $url);
    curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
    curl_setopt($ch, CURLOPT_HTTPHEADER, $headers);
    curl_setopt($ch, CURLOPT_POST, true);
    curl_setopt($ch, CURLOPT_POSTFIELDS, $data);

    // Execute the cURL request
    $response = curl_exec($ch);

    // Check for errors
    if (curl_errno($ch)) {
        echo json_encode(["error" => curl_error($ch)]);
    } else {
        echo json_encode(["success" => json_decode($response)]);
    }

    // Close cURL
    curl_close($ch);
} else {
    echo json_encode(["error" => "No file uploaded or upload error"]);
}
?>