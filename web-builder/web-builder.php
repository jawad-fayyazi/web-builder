<?php
// Get the 'id' parameter from the URL (if it's set)
$project_id = isset($_GET['project_id']) ? $_GET['project_id'] : null;
?>



<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Web Builder</title>
    <link rel="stylesheet" href="css/style.css">
    <!-- Include GrapesJS -->
    <link href="css/grapes.min.css" rel="stylesheet" />
    <script src="js/grapes.min.js"></script>
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.6.0/css/all.min.css">
    <!-- <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-EVSTQN3/azprG1Anm3QDgpJLIm9Nao0Yz1ztcQTwFspd3yD65VohhpuuCOmLASjC" crossorigin="anonymous"> -->

    <!-- Include GrapesJS Preset Webpage Plugin -->
    <script src="js/grapesjs-preset-webpage.min.js"></script>
    <script src="js/basic-blocks.js"></script>
    <script src="js/grapesjs-custom-code.js"></script>
    <script src="js/grapesjs-form-blocks.js"></script>
    <script src="https://unpkg.com/grapesjs-component-countdown@1.0.1"></script>
    <script src="https://unpkg.com/grapesjs-plugin-export@1.0.11"></script>
    <script src="https://unpkg.com/grapesjs-tabs@1.0.6"></script>
    <script src="https://unpkg.com/grapesjs-touch@0.1.1"></script>
    <script src="https://unpkg.com/grapesjs-parser-postcss@1.0.1"></script>
    <script src="https://unpkg.com/grapesjs-tooltip@0.1.7"></script>
    <script src="https://unpkg.com/grapesjs-tui-image-editor@0.1.3"></script>
    <script src="https://unpkg.com/grapesjs-typed@1.0.5"></script>
    <script src="https://unpkg.com/grapesjs-style-bg@2.0.1"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/jszip/3.10.1/jszip.min.js"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/jszip/3.10.1/jszip.min.js"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/FileSaver.js/2.0.5/FileSaver.min.js"></script>






</head>

<body>
    <div class="app">

        <!-- <div id="navbar" class="gjs-one-bg gjs-two-color side-nav">
        <button id="collapse" class="btn-collapse"><i class="fa-solid fa-caret-left"></i></button>
        <div class="">
            <div class="">
                <button type="button" class="btn btn-outline-secondary btn-sm mx-2">
                    <i class="fa-solid fa-file-circle-plus"></i>Add Page
                </button>
                <ul class="pages">
                </ul>
            </div>
        </div>
    </div> -->
        <!-- <div id="pages-nav" class="pages-wrp gjs-two-color gjs-one-bg page-manager">
            <h3>Pages</h3>
            <div id="page-list"></div>
        </div>-->

        <div class="sidenav-collapse gjs-one-bg gjs-two-color">
            <i class="fa-solid fa-bars"> </i></div>
            <div id="side-bar-collpase" class="sidebar gjs-one-bg gjs-two-color">
                <h1 class="logo">TeknoFlair</h1>
                <div class="pages-collapse">
                    <i class="fa-solid fa-caret-down"></i>
                    Pages
                </div>
                <div id="page-list">
                    <button id="add-page" class="add-page-btn gjs-one-bg gjs-two-color gjs-four-color-h">
                        <i class="fa-solid fa-plus"></i> &nbsp; Add Page
                    </button>
                    <!-- Dynamic list of pages will go here -->
                    <ul id="pages-ul"></ul>
                </div>
            </div>
        </div>
        <div id="gjs"></div>
    


<script>
    var projectId = <?php echo json_encode($project_id); ?>;
    console.log("page id is ", projectId);
</script>
    <script src="js/script.js"></script>
</body>

</html>