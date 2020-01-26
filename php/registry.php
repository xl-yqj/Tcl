<?php
include "conn.php";

if(isset($_POST['userTel'])){
    $user = $_POST['userTel'];
    $result = $conn->query("select * from usertable 
    where userTel = '$user'");//存在则被注册
    if($result->fetch_assoc()){
        echo true;
    }else{
        echo false;
    }
        
}

if(isset($_POST['submit'])){
    $user =  $_POST['userTel'];
    $conn->query("insert usertable value(null,'$user',Now())");
    header
    ('location:http://localhost/Tcl/src/login.html');
}
?>