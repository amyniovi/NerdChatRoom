/*
This service aims in storing the bearer token in cookie storage so we can retrieve it upon refreshing of 
the browser and reloading of the DOM when the token is reset to undefined. 
The cookie is not sent to the server for authentication , the authorize header is authenticated with the token. 
but the cookie is sent to the server with each request (server does nothing with it) 
*/

(function () {

    var sessionService = function ($cookies, logoutService) {

        this.token = undefined;

        //getToken() tries to get token value, if undefined it retrieves from cookie, if undefined it 
        // sends a request to login.
        this.getToken = function () {
            var temp = $cookies.nerdChatRoomToken;
            if (!temp) {
                temp = this.token;
                if (!temp) {
                    return undefined;
                }
            }
            this.setToken(temp);
            return $cookies.nerdChatRoomToken;
        };
        //setToken() sets the token for the whole app, and stores it in cookies. 
        //(as there is one service instance per app.)
        this.setToken = function (token) {
            this.token = token;
            $cookies.nerdChatRoomToken = token;
        };

        this.deleteToken = function () {
            this.token = undefined;
            logoutService.logout($cookies.nerdChatRoomToken)
            .then(
            function () {
                document.cookie = "nerdChatRoomToken = ; expires = Thu, 01 Jan 1970 00:00:00 UTC";
            },
            function () {
                //handle errors 
            })
        };

    };

}());