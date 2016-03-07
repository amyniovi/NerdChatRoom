(function () {
    
    function AuthController($scope) {
        //var username = "amyniovi"
        // var password = "pass123";
        // var args = [username, password];
        $scope.authenticated = false;

        $scope.authenticate = function (username, password) {


            var loginResponse = {
                token: "",
                httpCode: "",
                errors: "404 error page, password was wrong for username: " + username
            };

            try {
                authorize(loginResponse);
            } catch (ex) {
                document.write("<br>" + ex);
            }

           
        };

        function authorize(response) {


            if (response === undefined)
                return;

            if (response.token !== undefined && response.token !== "") {
                document.write("<br>authenticated!");
                $scope.authenticated = true;
            } else {
                document.write(response.errors);
            }

        };

        //document.write(authentication);
        // authorize(authentication);

    }
    angular.module('app').controller('AuthController', AuthController);


}());