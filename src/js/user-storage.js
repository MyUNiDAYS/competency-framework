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
    
    return {
        getUser: getUser,
        setUser: setUser,
        getUserReviews: getUserReviews
    }
});