<?php 
    $dir=$_SERVER['REQUEST_URI'];
    $functions = $_SERVER['DOCUMENT_ROOT']."/functions.php"; 
    include_once($functions);
    if (isset($_GET['dn']) && isset($_GET['d_type'])) {
        create_dir($_GET['dn']);
        header('Location: .');
    }
    if (isset($_POST["fn"])){
       if ($_FILES['uf']['error'] !== UPLOAD_ERR_OK) {
            echo $_FILES['uf']['error'];
       }
       add_file($_FILES["uf"],$_POST["fn"]); 
    }
    if (isset($_GET['itemdel'])) {
        unlink('./'.$_GET['itemdel']);
        header('Location: .');
    }
    if (isset($_GET['boxdel'])) {
        removedir($_GET['boxdel']);
        header('Location: .');
    }
?>
<!DOCTYPE html>
<html>
<head>
    <title>Benk Media Server</title>
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <meta charset="UTF-8"> 
    <link rel="stylesheet" href="/style.css">
    <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.3.1/jquery.min.js"></script>
    <script src="/.Scripts/add.js"></script>
</head>
<body>
    <?php
        if ($dir != "/"){
        echo "<h1>".basename(__DIR__)."</h1>";
        }
    ?>
    <div class="dir-container">
        <?php 
            list_dirs(); 
        ?>
    </div>
    <div class="file-container">
        <?php
            if ($dir != "/"){
                list_files();
            }
        ?>
    </div>
    <div class="menu-container">
        <div class="new-menu">
            <ul>
                <li id='cnd'> Create new directory </li> 
                <li id='um'> Upload media </li>
            </ul>
        </div>
        <div class="new-button">
        </div>
    </div>
    <div class="cnd_container">
        <div class="cnd">
            <h1>Create New Directory</h1>
            <form id="cnd_form">
                <h3>Directory Name</h3>
                <input type="text" name="dn"><br>
                <h3>Media Type</h3>
                <div class="selectbox">
                    <select name="d_type" form="cnd_form">
                        <option value="none">None</option>
                        <option value="movies">Movies</option>
                        <option value="music">Music</option>
                        <option value="tv">TV</option>
                    </select> <br /> 
                    <input type="submit" value="Submit">
                </div>
            </form>
        </div>
    </div>
    <div class="um_container">
        <div class="um">
            <h1>Upload Media</h1>
            <form id="um_form" method="post" enctype="multipart/form-data">
                <h3>File Name</h3>
                <input type="text" name="fn"><br>
                <h3>Upload File</h3>
                <div class="fsubmit">
                    <input type="file" name="uf">
                </div>
                <input type="submit" value="Submit">
            </form>
        </div>
    </div>
</body>
</html>
