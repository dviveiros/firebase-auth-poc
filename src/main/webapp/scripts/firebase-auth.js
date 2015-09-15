/* Gets the reference for a Firebase object */
var rootRef = new Firebase("https://sc-core-dev.firebaseio.com/");

/**
 * On document load
 */
$(function() {
    rootRef.onAuth(authDataCallback);
});

/**
 * Handles authentication
 */
function authDataCallback(authData) {
    if (!authData) {
        console.log(authData);
        rootRef.authWithOAuthRedirect("google", function (error) {
            console.log("Login Failed!", error);
        },{
            remember: "default",
            scope: "email, https://www.googleapis.com/auth/plus.login, https://www.googleapis.com/auth/drive"
        });
    }
    else {
        console.log("Authenticated successfully with payload:", authData);
        if (authData) {
            provider = authData.provider;
            googleId = authData.google.id;
            googleAccessToken = authData.google.accessToken;
            googleDisplayName = authData.google.displayName;
            googleEmail = authData.google.email;
            googleImageURL = authData.google.profileImageURL;
            googleCachedUserProfile = authData.google.cachedUserProfile;


            var $credentials = $("#credentials");
            var credentialsMessage = "Provider = " + provider
                + ", googleId = " + googleId + ", googleAccessToken = " + googleAccessToken
                + ", googleDisplayName = " + googleDisplayName + ", googleEmail = " + googleEmail
                + ", googleImageURL = " + googleImageURL + ", googleCachedUserProfile = " + googleCachedUserProfile;
            $credentials.text(credentialsMessage);
        }
    }
}

function logout() {
    rootRef.unauth();
}

