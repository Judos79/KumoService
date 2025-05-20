<?php
session_start(); // Iniciar sesión

// Conexión a la base de datos
$servername = "localhost";
$username = "tu_usuario";
$password = "tu_contraseña";
$dbname = "nombre_de_tu_base_de_datos";

$conn = new mysqli($servername, $username, $password, $dbname);

// Verificar conexión
if ($conn->connect_error) {
    die("Conexión fallida: " . $conn->connect_error);
}

// Obtener datos del formulario y evitar inyección SQL
$usuario = mysqli_real_escape_string($conn, $_POST['Usuario']);
$contraseña = mysqli_real_escape_string($conn, $_POST['contraseña']);

// Consulta para verificar credenciales
$sql = "SELECT * FROM usuarios WHERE usuario='$usuario' AND contraseña='$contraseña'";
$result = $conn->query($sql);

if ($result->num_rows > 0) {
    $_SESSION['Usuario'] = $usuario; // Guardar usuario en la sesión
    header("Location: page-1.html"); // Redirigir
    exit();
} else {
    echo "<script>alert('Usuario o contraseña incorrectos'); window.location.href='index.html';</script>";
}

$conn->close();
?>
