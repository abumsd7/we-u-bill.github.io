firebase.auth().onAuthStateChanged(function(user) {
  if (user) {
    // User is signed in.

    document.getElementById("user_div").style.display = "block";
    document.getElementById("login_div").style.display = "none";
	document.getElementById("inst-edit").style.display = "none";
	document.getElementById("bill-edit").style.display = "none";
	document.getElementById("bill-open").style.display = "none";
	document.getElementById("bill-display").style.display = "none";


    var user = firebase.auth().currentUser;

    if(user != null){

      var email_id = user.email;
      document.getElementById("user_para").innerHTML = "Signed in as : " + email_id;

    }

  } else {
    // No user is signed in.

    document.getElementById("user_div").style.display = "none";
    document.getElementById("login_div").style.display = "block";
	document.getElementById("inst-edit").style.display = "none";
	document.getElementById("bill-edit").style.display = "none";
	document.getElementById("bill-open").style.display = "none";
	document.getElementById("bill-display").style.display = "none";


  }
});

function signup(){

  var userEmail = document.getElementById("email_field").value;
  var userPass = document.getElementById("password_field").value;

  firebase.auth().createUserWithEmailAndPassword(userEmail, userPass).catch(function(error) {
    // Handle Errors here.
    var errorCode = error.code;
    var errorMessage = error.message;

    window.alert("Error : " + errorMessage);

    // ...
  });

}

function signin(){

  var userEmail = document.getElementById("email_field").value;
  var userPass = document.getElementById("password_field").value;

  firebase.auth().signInWithEmailAndPassword(userEmail, userPass).catch(function(error) {
    // Handle Errors here.
    var errorCode = error.code;
    var errorMessage = error.message;

    window.alert("Error : " + errorMessage);

    // ...
  });

}
function instedit()
{
//window.location.replace("https://webbill-58535.firebaseapp.com/billinst.html");
    document.getElementById("user_div").style.display = "none";
    document.getElementById("login_div").style.display = "none";
	document.getElementById("inst-edit").style.display = "block";
	document.getElementById("bill-edit").style.display = "none";
	document.getElementById("bill-open").style.display = "none";
	document.getElementById("bill-display").style.display = "none";

	
}
function billedit()
{
//window.location.replace("https://webbill-58535.firebaseapp.com/billadd.html");
    document.getElementById("user_div").style.display = "none";
    document.getElementById("login_div").style.display = "none";
	document.getElementById("inst-edit").style.display = "none";
	document.getElementById("bill-edit").style.display = "block";
	document.getElementById("bill-open").style.display = "none";
	document.getElementById("bill-display").style.display = "none";

	
}
function billopen()
{
//window.location.replace("https://webbill-58535.firebaseapp.com");
    document.getElementById("user_div").style.display = "none";
    document.getElementById("login_div").style.display = "none";
	document.getElementById("inst-edit").style.display = "none";
	document.getElementById("bill-edit").style.display = "none";
	document.getElementById("bill-open").style.display = "block";
	document.getElementById("bill-display").style.display = "none";
	
}
function billdisplay()
{
	document.getElementById("user_div").style.display = "none";
    document.getElementById("login_div").style.display = "none";
	document.getElementById("inst-edit").style.display = "none";
	document.getElementById("bill-edit").style.display = "none";
	document.getElementById("bill-open").style.display = "none";
	document.getElementById("bill-display").style.display = "block";
	var fragment = document.createDocumentFragment();
	var table = document.getElementById("table");
	var table2 = document.getElementById("insttable");
	var user = firebase.auth().currentUser;
	var str = user.email;
	var res = str.split("@");
	var email = res[0].replace(/[^a-zA-Z0-9]/g, '');
	var que = firebase.database().ref("/"+email+"/Institution Details");
	var sno3 = document.getElementById("sno2").value.toString();
	var viewBtn = document.getElementById('viewBtn');
	a=["/",email,"/",sno3];
	qq= a.join('');
	
	var query = firebase.database().ref(qq)
	que.once("value").then(function(snapshot) {
  	snapshot.forEach(function(childSnapshot) {
    var tr = document.createElement("tr");
    var trValues = [childSnapshot.val()];

    for (var i = 0; i < trValues.length; i++) {
      var td = document.createElement("td");
      td.textContent = trValues[i];
      tr.appendChild(td);
	  tr.style.textAlign="center";
	  tr.style.fontWeight="900";
    }

    table2.appendChild(tr);
 	 });
	});
	
	query.once("value").then(function(snapshot) {
  	snapshot.forEach(function(childSnapshot) {
    var tr = document.createElement("tr");
    var trValues = [childSnapshot.key, childSnapshot.val()];

    for (var i = 0; i < trValues.length; i++) {
      var td = document.createElement("td");
      td.textContent = trValues[i];
      tr.appendChild(td);
    }

    table.appendChild(tr);
  });
});
}
function logout(){
  firebase.auth().signOut();
}
function back()
{
	window.location.replace("https://webbill-58535.firebaseapp.com");
}
function billsubmit()
{
	var user = firebase.auth().currentUser;
	var str = user.email;
	var res = str.split("@");
	var email = res[0].replace(/[^a-zA-Z0-9.]/g, '');
	var sno = document.getElementById("sno").value.toString();
	var reg = document.getElementById("reg-no").value;
  	var clas = document.getElementById("class").value;
	var name = document.getElementById("name").value;
  	var hostel = document.getElementById("hostel").value;
	var addBtn = document.getElementById('addBtn');
  // Push a new recommendation to the database using those values
  	const database = firebase.database();
	const usersRef = database.ref("/"+email);
	addBtn.addEventListener("click", e => {
  	e.preventDefault();
  	usersRef.child(sno).set({
    "a.Register No": reg,
    "c.Class": clas,
    "b.Name": name,
	"d.Hostel Fees":hostel,
  	});
	});
}
function instsubmit()
{   var user = firebase.auth().currentUser;
	var str = user.email;
	var res = str.split("@");
	var email = res[0].replace(/[^a-zA-Z0-9]/g, '');
	var inst = document.getElementById("inst-name").value;
  	var addr = document.getElementById("addr").value;
	var phno = document.getElementById("phno").value;
  	var website = document.getElementById("web-link").value;
	var instBtn = document.getElementById('instBtn');
  // Push a new recommendation to the database using those values
	const database = firebase.database();
	const usersRef = database.ref('/'+email);
	instBtn.addEventListener('click', e => {
	e.preventDefault();
 	usersRef.child("Institution Details").set({
    "a": inst,
    "b": addr,
    "c": phno,
	"d":website,
  });
});
  
}