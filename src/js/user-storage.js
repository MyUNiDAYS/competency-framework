window.UserStorage = (function(){
    var db = firebase.firestore();

    function setUser(user){
        return db.collection("users").doc(user.uid).set({
            email: "ada@lovelace.com"
        })
        .then(function(docRef) {
            console.log("Document written with ID: ", docRef.id);
        })
        .catch(function(error) {
            console.error("Error adding document: ", error);
        });

    }

    function setUserReview(uid, review){
        return db
            .collection("users")
            .doc(uid)
            .collection('reviews')
            .add(review)
            .then(function(docRef) {
                console.log("Document written with ID: ", docRef.id);
                return docRef.id;
            })
            .catch(function(error) {
                console.error("Error adding document: ", error);
                return null;
            });
    }

    function getUser(uid){
        return db
            .collection("users")
            .doc(uid)
            .get()
            .then(doc => doc.data());
    }

    function getUserReviews(uid){
        return db  
            .collection("users")
            .doc(uid)
            .collection('reviews')
            .get()
            .then(result => result.docs.map(d => d.data()));
    }

    function getUserReview(uid, reviewId){
        return db  
            .collection("users")
            .doc(uid)
            .collection('reviews')
            .doc(reviewId)
            .get()
            .then(doc => doc.data());
    }
    
    return {
        getUser: getUser,
        setUser: setUser,
        getUserReviews: getUserReviews,
        getUserReview: getUserReview,
        setUserReview: setUserReview
    }
});