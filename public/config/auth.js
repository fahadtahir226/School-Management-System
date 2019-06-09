const auth = firebase.auth();
const db = firebase.firestore();
var nameForDB, emailForDB;
// user Sign Up  

const Register = (e) => {
    e.preventDefault();
    var heading = document.querySelector(".name");
    var name = document.getElementById('reg-name');
    var email = document.getElementById("reg-email");
    var pass = document.getElementById("reg-password");
    var DBName = heading.firstChild.textContent.replace("register ", "").trim();
    // Loading('block')
    if ((email.value.length && pass.value.length && name.value.length) !== 0) {
        auth.createUserWithEmailAndPassword(email.value, pass.value)
            .then(async (user) => {
                await db.collection(DBName).doc(auth.currentUser.uid).set({
                    name: name.value,
                    email: email.value,
                    id: auth.currentUser.uid
                })
                    .then(res => {
                        auth.currentUser.updateProfile({
                            displayName: name.value,
                        }).then(function () {
                            setlogs("New User Added");
                            console.log('User Name Added to authentication')
                        }).catch(function (error) {
                            console.log('User Name Added to authentication')
                        });
                        alert(`Your Account Has Been Created Successfully !!`)
                        SignOut(event);
                        return Loading('none') && ClearField()
                    })
            })
            .catch(err => {
                console.log(err.message)
                return Loading('none')
            })

    } else {
        alert('field is empty!!')
    }
}

// USer Sign Out
const SignOut = (e) => {
    e.preventDefault();
    auth.signOut().then(res => {
        setlogs("User Logged out");
        alert('You\'re Logged Out Successfully', {
            icon: 'success'
        });
        window.location.replace("../index.html");
    }).catch(err => {
        alert(err.message);
    })
}

// User login 
const login = (e) => {
    e.preventDefault();
    var heading = document.querySelector('.heading');
    var text = heading.firstChild.textContent.replace("Welcome ", "").trim();

    const email = document.getElementById("login-email");
    const pass = document.getElementById("login-pass");
    Loading('block');

    auth.signInWithEmailAndPassword(email.value, pass.value)
        .then(async res => {
            if (res) {
                console.log(auth.currentUser);
                Loading('Block');
                await db.collection(text).doc(auth.currentUser.uid).get()
                    .then(doc => {
                        if (doc.exists) {
                            if (text === 'admin') {
                                setlogs(`Admin Logged in`);
                                window.location.replace("./Field_Wise_Pages/admin_panel.html");
                            }
                            else if (text === 'moderate') {
                                setlogs(`Moderate Logged in`);
                                window.location.replace("./Field_Wise_Pages/moderate_panel.html");
                            }
                            else if (text === 'user') {
                                setlogs(`User Logged in`);
                                window.location.replace("./Field_Wise_Pages/user_panel.html");
                            }
                        } else {
                            alert('User Doesnt Exist!!!')
                            return Loading('none')
                        }
                    })
                    .catch(err => {
                        alert(err.message);
                        return Loading('none')
                    })
            }
        }).catch(err => {
            alert(err.message);
            return Loading('none');
        });
}

const reqFromUser = (event) => {
    var currentDate = document.getElementById("date_input").value;
    db.collection('moderator-panel').doc().set({
        id: auth.currentUser.uid,
        date: currentDate,
        name: auth.currentUser.displayName
    }).then(res => {
        setlogs(`A request Added from User for date: ${currentDate}`);
        alert("Request Send Successfully")
        return Loading('none')
    })
        .catch(err => {
            alert(err.message)
            return Loading('none')
        })
}
window.addEventListener('DOMContentLoaded', (event) => {
    // const reqFromModerate = (event) => {

    let table = document.getElementById("tbody_moderator");
    if (table) {
        db.collection("moderator-panel").get()
            .then(snapshot => {
                snapshot.forEach(doc => {
                    table.innerHTML += `
                    <tr>
                        <td>${doc.data().name}</td>
                        <td>${doc.data().date}</td>
                        <td>
                            <div class="row">
                                <form class="col s12">
                                    <div class="row">
                                        <div class="input-field col s12">
                                            <textarea id="${doc.data().id}" class="materialize-textarea"></textarea>
                                        </div>
                                    </div>
                                </form>
                            </div>
                        </td>
                        <td>
                        <button
                            onclick="reqFromMod( '${doc.data().name}' , '${doc.data().date}' , '${doc.data().id}', '${doc.id}')" class="btn btn-large btn-primary" >
                            Submit
                        </button>
                    </tr>
                    `;
                });
            })
    }
})



const reqFromMod = (name, date, id, todelete) => {
    let details = document.getElementById(id).value;
    db.collection('admin-panel').doc().set({
        name,
        date,
        details,
        id
    }).then(res => {
        setlogs(`A request Added from Moderator for date: ${date}` );
        alert("Request Send Successfully")
        db.collection('moderator-panel').doc(todelete).delete();
        window.location.reload();
        return Loading('none')
    })
        .catch(err => {
            alert(err.message)
            return Loading('none')
        })
    // console.log(auth.currentUser.uid);
}



// ADMIN

window.addEventListener('DOMContentLoaded', (event) => {
    // const reqFromModerate = (event) => {
    let table = document.getElementById("tbody_admin");
    if (table) {
        db.collection("admin-panel").get()
            .then(snapshot => {
                snapshot.forEach(doc => {
                    table.innerHTML += `
                <tr>
                <td>${doc.data().name}</td>
                <td>${doc.data().date}</td>
                <td>${doc.data().details}</td>
                <td>
                <button onclick="accept('${doc.id}','${doc.data().date}','${doc.data().email}')" class="btn btn-large btn-primary" >  <i class="large material-icons"> check </i></button>
                <button onclick="reject('${doc.id}','${doc.data().date}')" class="btn btn-large btn-primary" >  <i class="large material-icons"> clear </i></button>
                </tr>
                `;
                    console.log('Document ID: ', doc.id, ' User ID: ', doc.data().id, ' Name: ', doc.data().name, ' Date: ', doc.data().date);
                });
            })
    }
})
const accept = (todelete,date,email) => {
    db.collection('admin-panel').doc(todelete).delete()
    .then(res => {
        alert("Request Accepted!")
        window.open(`mailto:${email}?subject= Acceptance of leave&body=Your Request for leave have been approved on date ${date}`);
        setlogs(`A request from moderator has been Accepted for date : ${date}` );
        window.location.reload();
    })
    .catch(err => {
        alert(err);
    })
    return Loading('none');
}
const reject = (todelete, date) => {
    db.collection('admin-panel').doc(todelete).delete()
    .then(res => {
        alert("Request Cancelled!")
        setlogs(`A request from moderator has been rejected for date ${date}` );
        window.location.reload();
    })
    .catch(err => {
        alert(err);
    })
    return Loading('none');
}


const setlogs = (Message) => {
    db.collection("logs").doc().set({
        Message
    })
}

// const getlogs = () => {
    window.addEventListener('DOMContentLoaded', (event) => {
        // const reqFromModerate = (event) => {
    
        let table = document.getElementById("tbody_logs");
        if (table) {
            db.collection("logs").get()
                .then(snapshot => {
                    snapshot.forEach(doc => {
                        table.innerHTML += `
                        <tr>
                            <td>${doc.data().Message}</td>
                        </tr>
                        `;
                    });
                })
        }
    })