/*
This service uses username and password to log user in 
*/

(function () {

    var loginService = function ($http, $q) {

        var defferedTask = $q.defer();
        var login = function (username, password) {

            $http({
                method: "POST",
                url: "/NerdChatRoom/token",
                data: { username: username, password: password },
                headers: { 'Content-Type': "application/x-www-form-urlencoded; charset=UTF-8;" },
                transformRequest: function (obj) {
                    var str = [];
                    for (var p in obj)
                        str.push(encodeURIComponent(p) + "=" + encodeURIComponent(obj[p]));
                    return str.join("&");
                },//weirded out but it just URL encodes the data probably into a query string

            })
            .success(function (response) {
                deferredTask.resolve(response);
            })
            .error(function (response) {
                deferredTask.reject(ersponse);
            });

            return deferredTask.promise;
        };

        return {
            login: login
        };

    };




}());
