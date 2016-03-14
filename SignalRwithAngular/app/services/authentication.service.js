/*
This service aims in adding authentication to each PUT http request sent with the chat data. 
It also sents the chat data to update the chat thread.
*/

(function () {

    var authenticatedRequestFactory = function ($http, $q, sessionService) {
        var task = $q.defer();
        var isAuthenticated = false;
        if (sessionService.getToken())//other checks might be needed.
            isAuthenticated = true;
        //that is the PUT request sent with each chat message 
        //each http request needs a bearer token, so we add it here:
        var createRequest = function (senderId, message, image, giphy) {

            $http({
                method: id === undefined ? "POST" : "PUT", //not sure
                url: "/NerdChatRoom/",
                data: {
                    Id: senderId,
                    Text: message,
                    Picture: image,
                    Giphy: giphy
                },
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": "Bearer " + sessionService.getToken()
                }
            })
              .success(function (response) {
                  task.resolve(response);
              })
              .error(function (response) {
                  task.reject(response);
              });

            return task.promise;
        };


        //API (returning an object makes Service behave like Factory
        return {
            createRequest: createRequest,
            isAuthenticated: isAuthenticated
        };


    };




    var module = angular.module("app"); //GET a reference to the module
    module.factory("authenticatedRequestFactory", authenticatedRequestFactory); //subscribe service function that returns the API


}());

// do we need something like:
authenticatedRequestFactory.$inject = ["$http", "$q", "sessionService"];