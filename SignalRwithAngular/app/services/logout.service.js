/*
Service that aims in logging the user off, returns a promise , as logout request is async.
User needs to be authorized to logout.
*/

(function () {

    var logoutService = function ($http, $q) {
        var task = $q.defer();

        var logout = function (token) {

            $http({
                method: "GET",
                url: "/NerdChatRoom/logout",
                headers: { "Authorization": "Bearer " + token }
            })
            .success(function (response) {
                task.resolve(response);
            })
            .error(function (response) {
                task.reject(response);
            });

            return task.promise;
        };

        return {
            logout: logout
        };

    };

}());

//logoutService.$inject = ["$http", "$q"];??