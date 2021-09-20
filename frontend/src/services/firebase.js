import axios from "../utils/axiosForBackend"
import dotenv from "dotenv";
import firebase from "firebase/app";
import cookie from "react-cookies";
import "firebase/auth";

dotenv.config();

firebase.initializeApp({
  apiKey: process.env.REACT_APP_API_KEY,
  authDomain: process.env.REACT_APP_AUTH_DOMAIN,
  databaseURL: process.env.REACT_APP_DATABASE_URL,
  projectId: process.env.REACT_APP_PROJECT_ID,
  storageBucket: process.env.REACT_APP_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_MESSAGING_SENDER_ID,
  appId: process.env.REACT_APP_APP_ID,
  measurementId: process.env.REACT_APP_MEASUREMENT_ID,
});

export const auth = firebase.auth();
const googleProvider = new firebase.auth.GoogleAuthProvider();

export const signInWithGoogle = () => {
  (auth
    .signInWithPopup(googleProvider))
    .then((res) => {
      cookie.save("key", res.user.uid, { path: "/" });

      axios.post("/users/google", {
        email: res.user.email,
        tokenId: res.credential.idToken,
      }).then((response) => {
        const data = response.data;
        return data;
      })
        .then((data) => {
          console.log(data)
          window.location.href = "/projects"
        })
    })
    .catch((error) => {
      console.log(error.message);
    });
}

export const logOut = () => {
  cookie.remove("key");
  window.location.href = "/"
}

