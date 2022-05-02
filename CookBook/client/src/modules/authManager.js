import firebase from "firebase/app";
import "firebase/auth";

const _apiUrl = "/api/userprofile";

const _doesUserExist = (firebaseUserId) => {
  return getToken().then((token) =>
    fetch(`${_apiUrl}/DoesUserExist/${firebaseUserId}`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`
      }
    }).then(resp => resp.ok));
};

const _saveUser = (userProfile) => {
  return getToken().then((token) =>
    fetch(_apiUrl, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify(userProfile)
    }).then(resp => resp.json()));
};

const _checkUser = (userName) => {
  return fetch(`${_apiUrl}/Profile/Register/${userName}`)
    .then((res) => res.json())
};

export const getToken = () => firebase.auth().currentUser.getIdToken();


export const login = (email, pw) => {
  return firebase.auth().signInWithEmailAndPassword(email, pw)
    .then((signInResponse) => _doesUserExist(signInResponse.user.uid))
    .then((doesUserExist) => {
      if (!doesUserExist) {

        logout();

        throw new Error("Something's wrong. The user exists in firebase, but not in the application database.");
      }
    }).catch(err => {
      console.error(err);
      throw err;
    });
};


export const logout = () => {
  firebase.auth().signOut()
};

export const register = (userProfile, password) => {
  return _checkUser(userProfile.name).then(userNameAvailable => {
    if (userNameAvailable) {
      return firebase.auth().createUserWithEmailAndPassword(userProfile.email, password)
      .then((createResponse) => _saveUser({
        ...userProfile,
        firebaseUserId: createResponse.user.uid
      }));
    } else {
      return userNameAvailable;
    }
  })
};


export const onLoginStatusChange = (onLoginStatusChangeHandler) => {
  firebase.auth().onAuthStateChanged((user) => {
    onLoginStatusChangeHandler(!!user);
  });
};

// export const getAllUsers = () => {
//   return getToken().then((token) => {
//     return fetch(_apiUrl, {
//       method: "GET",
//       headers: {
//         Authorization: `Bearer ${token}`,
//       },
//     }).then((resp) => {
//       if (resp.ok) {
//         return resp.json();
//       } else {
//         throw new Error("An error occurred retrieving user profiles");
//       }
//     });
//   });
// };

export const getUser = () => {
  return getToken().then((token) => {
    return fetch(_apiUrl, )
  })
}