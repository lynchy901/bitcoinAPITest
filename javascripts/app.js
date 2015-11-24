var app = angular.module('Bitcoin', []);

app.controller('logincntl', function($scope, $http) {
    $scope.input_guid;
    $scope.input_password;
    var API_CODE = "84ac8198-cd38-4cda-b8a4-c35061404889";
	

	$scope.login = function() {
		var url = 'http://localhost:3000/merchant/' + $scope.input_guid + '/login?password=' + $scope.input_password + '&api_code=' + API_CODE;
		console.log(url);
  
        $.ajax({
            url: url,
            method: 'POST',
            success: function (data) {

                alert("login successful!");
                console.log(data);
                window.location.href = "/views/home.html";

            },
            error: function () {
                //alert an error if the search is unsuccessful.
                alert('invalid guid or password. try again');
            }
        });
  	}
});    
    
app.controller('maincntl', function($scope, $http) {
    $scope.input_guid;
    $scope.input_password;
    $scope.input_to;
    $scope.input_amount;
    $scope.recipients;
    $scope.input_note;
    $scope.input_fee;
    
    $scope.checkBalance = function() {
        
        var url = 'http://localhost:3000/merchant/' + $scope.input_guid + '/balance?password=' + $scope.input_password;
        
        $.ajax({
            url: url,
            method: 'POST',
            success: function (data) {
            	alert("balance check successful! \n Current Balance: " +  data.balance);
                console.log(data);
            },
            error: function () {
                //alert an error if the search is unsuccessful.
                alert('invalid guid or password. try again');
            }
        });
    }
    
    $scope.listAddresses = function() {
        var url = 'http://localhost:3000/merchant/' + $scope.input_guid + '/list?password=' + $scope.input_password;
            
        $.ajax({
            url: url,
            method: 'POST',
            success: function (data) {
                var balanceSummary = "";
                for(var i = 0; i < data.addresses.length; i++) {
                    balanceSummary = balanceSummary + "-Address " + data.addresses[i].address + "has a balance of " + data.addresses[i].balance + " and has recieved " + data.addresses[i].total_received + " Satoshi \n"; 
                    
                }
                alert(balanceSummary);
            	console.log(data);
                
            },
            error: function () {
                //alert an error if the search is unsuccessful.
                alert('invalid guid or password. try again');
            }
        });
    }
    
    $scope.sendToOne = function() {
        if (!$scope.input_note || $scope.input_note == "") {
            $scope.input_note = "";
        } else {
            $scope.input_note = "&note=" + $scope.input_note;
        }
        if (!$scope.input_fee || $scope.input_fee == "") {
            $scope.input_fee = "";
        } else {
            $scope.input_fee = "&fee=" + $scope.input_fee;
        }
        
        var url = 'http://localhost:3000/merchant/' + $scope.input_guid + '/payment?to=' + $scope.input_to + '&amount=' + $scope.input_amount +  '&password=' + $scope.input_password + $scope.input_fee;// + $scope.input_note;
        
        $.ajax({
            url: url,
            method: 'POST',
            success: function (data) {
            	alert("Transfer Successful! \n You sent " + data.amounts[0] + " from " + data.from[0] + " to " + data.to[0] + "\n txid = " + data.txid + " and you paid a fee of " + data.fee);
                console.log(data);
            },
            error: function () {
                //alert an error if the search is unsuccessful.
                alert('Transfer Failed');
            }
        });
    }
    
    $scope.sendToMany = function() {
        var json = {};
        var str1 = $scope.recipients;
        str1 = str1.replace(/ /g, '');
        var splitStr = str1.split(",");
        for (var i = 0; i < splitStr.length; i++) {
            json[splitStr[i].split(":")[0]] = parseInt(splitStr[i].split(":")[1]);
        }
        
        var jsonString = JSON.stringify(json);
        console.log(jsonString);
        var myURIEncodedJSONString = encodeURIComponent(jsonString);

        $scope.input_guid;
        $scope.input_password;
        
        if (!$scope.input_note) {
            $scope.input_note = "";
        } else {
            $scope.input_note = "&note=" + $scope.input_note;
        }
        if (!$scope.input_fee || $scope.input_fee == "") {
            $scope.input_fee = "";
        } else {
            $scope.input_fee = "&fee=" + $scope.input_fee;
        }
        
        var url = 'http://localhost:3000/merchant/' + $scope.input_guid + '/sendmany?recipients=' + myURIEncodedJSONString + '&password=' + $scope.input_password + $scope.input_fee;// + $scope.input_note; 
        console.log(url);
        
        $.ajax({
            url: url,
            method: 'POST',
            success: function (data) {
            	alert("Transfer Successful! \n You sent " + data.amounts.toString() + " from " + data.from.toString() + " to " + data.to.toString() + "\n txid = " + data.txid + " and you paid a fee of " + data.fee);
            },
            error: function () {
                //alert an error if the search is unsuccessful.
                alert('Transfer Failed');
            }
        });
        
    }
    
    
    $scope.clearVars = function(){
        $scope.input_password = "";
        $scope.input_to = "";
        $scope.input_amount = "";
        $scope.input_note = "";
    }
});