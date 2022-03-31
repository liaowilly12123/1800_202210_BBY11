document.getElementById("logout-button").onclick=signOutSuccessWithAuthResult();

function signOutSuccessWithAuthResult() {
    console.log("Logout Function");
    firebase.auth().signOut().then(function() {
        // Sign-out successful.
        console.log("YES")
        .then(() => {
          window/location.herf == "../index.html";//added a new line.
        })
      }, function(error) {
        // An error happened.
        console.log("NO")
      });
}