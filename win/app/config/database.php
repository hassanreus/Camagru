<?php
    //DB Params
    $ip_server = $_SERVER['SERVER_NAME'];
    define('DB_HOST', 'localhost:3307');
    define('DB_USER', 'root');
    define('DB_PASS', 'root');
    define('DB_NAME', 'Camagru');

    //approot
    define('APPROOT',dirname(dirname(__FILE__)));
    define('APPROOT1',dirname(dirname(dirname(__FILE__)))."/"."public/img/");
    define('APPROOT2',dirname(dirname(dirname(__FILE__)))."/"."public/stickers/");
    define('APPROOT3',dirname(dirname(dirname(__FILE__)))."/"."public/emoji/");
    //urlroot
    define('URLROOT','http://'.$ip_server.'/Camagru/');
    //sitename
    define('SITENAME','Camagru');