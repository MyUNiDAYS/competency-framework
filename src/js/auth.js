window.AuthService = (function(){

    var provider = new firebase.auth.GoogleAuthProvider();
    provider.setCustomParameters({
        'login_hint': 'user@myunidays.com',
        'hd': 'myunidays.com'
    });

    var currentUser;
    firebase.auth().onAuthStateChanged(u => currentUser = u);

    let authReadyPromiseResolver;
    const authReadyPromise = new Promise(resolve => {
        authReadyPromiseResolver = resolve
    });
    const unsubscribe = firebase.auth().onAuthStateChanged(() => {
        authReadyPromiseResolver();
        unsubscribe();
    });

    function requestAuth(){

        var signIn;
        if(this.event && this.event.type === 'click')
            signIn = firebase.auth().signInWithPopup(provider)
        else
            signIn = firebase.auth().signInWithRedirect(provider)

        return signIn.then(function(result) {
            
            var token = result.credential.accessToken;
            return result.user;
            
        }).catch(function(error) {
            
            var errorCode = error.code;
            var errorMessage = error.message;
            
            // The email of the user's account used.
            var email = error.email;
            // The firebase.auth.AuthCredential type that was used.
            var credential = error.credential;
            console.log(error);
            // ...
            throw error;
        });
    }

    function ensureAuth(){
        if(!currentUser)
            // launches a popup so must be called synchronously
            return requestAuth();
        return Promise.resolve(currentUser);
    }

    return {
        requestAuth: requestAuth,
        ensureAuth: ensureAuth,
        get currentUser() {
            return currentUser;
        },
        onAuthStateChanged: function(callback){
            return firebase.auth().onAuthStateChanged(callback);
        }
    }

});