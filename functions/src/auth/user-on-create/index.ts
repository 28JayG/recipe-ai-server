import { firestore } from 'firebase-admin';
import * as functions from 'firebase-functions';

const addUserToFirestore = functions.auth.user().onCreate((user) => {
  const { uid, email, displayName, photoURL } = user;

  firestore().collection('users').doc(uid).set({
    email,
    displayName,
    photoURL,
    history: [],
  });
});

export default addUserToFirestore;
