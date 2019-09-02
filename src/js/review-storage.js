window.ReviewStorage = (function(firebase){
    var db = firebase.firestore();

    function getUser(uid){
        return db
            .collection("users")
            .doc(user.uid)
            .get()
            .then(doc => doc.data());
    }

    function getUserReviews(uid){
        return db  
            .collection("users")
            .doc(user.uid)
            .collection('reviews')
            .get()
            .then(result => result.docs.map(d => d.data()));
    }
    
    return {
        getUser: getUser,
        getUserReviews: getUserReviews
    }

});