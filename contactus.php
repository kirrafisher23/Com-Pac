<?php
// Include PHPMailer
use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;

require 'path/to/src/PHPMailer.php';
require 'path/to/src/SMTP.php';
require 'path/to/src/Exception.php';

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $name = $_POST['fullName'] ?? '';
    $email = $_POST['email'] ?? '';
    $message = $_POST['message'] ?? '';

    // Validate inputs
    if (empty($name) || empty($email) || empty($message)) {
        die('Please fill in all fields.');
    }

    if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
        die('Invalid email address.');
    }

    try {
        $mail = new PHPMailer(true);
        // SMTP configuration
        $mail->isSMTP();
        $mail->Host = 'smtp.gmail.com'; // Use your SMTP server
        $mail->SMTPAuth = true;
        $mail->Username = 'your-email@gmail.com'; // Replace with your email
        $mail->Password = 'your-app-password'; // Use an app-specific password if using Gmail
        $mail->SMTPSecure = PHPMailer::ENCRYPTION_STARTTLS;
        $mail->Port = 587;

        // Email details
        $mail->setFrom($email, $name);
        $mail->addAddress('your-recipient-email@example.com'); // Replace with recipient email
        $mail->Subject = 'Contact Form Submission';
        $mail->Body = "Name: $name\nEmail: $email\nMessage:\n$message";

        // Send the email
        $mail->send();
        echo 'Message sent successfully!';
    } catch (Exception $e) {
        echo "Message could not be sent. Error: {$mail->ErrorInfo}";
    }
}
?>
