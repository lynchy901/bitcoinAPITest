
<!DOCTYPE html>
<?php

session_start();

if(isset($_SESSION['username'])) {
	// If user is logged in, send them elsewhere
	header('Location: views/home.php');
} else if(!empty($_POST)) {
	// If login form was submitted ($_POST is NOT empty), process the data
	$username = $_POST['username'];
	$password = $_POST['password'];
	if($username != "" && $password != "") {
		$loginQuery = "SELECT password, userType FROM user WHERE userName='{$username}'";
		$loginResult = mysqli_query($connection, $loginQuery);
		$account = mysqli_fetch_assoc($loginResult);
		if($account['password'] == $password) {
			// Successful login
			$_SESSION['username'] = $username;
			$_SESSION['userType'] = $account['userType'];
			
			header('Location: home.php');
		}
		else
			{
				$errorMessage = "Incorrect login credentials. Try again.";
			}
	} else {
		$errorMessage = "Incorrect login credentials. Try again.";
	}
}

// Otherwise, proceed as normal and show login page

?>
<html>
	<head>
		<title>personal bitcoin assistant</title>
	</head>

	<body>
	        
	        <input type="text" ng-model="input_guid">
	        <input type="text" ng-model="input_password">
			<input type="submit" ng-click="login()">
        
	</body>
</html>