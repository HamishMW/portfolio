import { firebase } from '@firebase/app';
import '@firebase/database';

// Firebase config for storing messages from the contact form.
// Replace this with your own config or remove the form if you're
// checking out or modifying my protfolio – HW
import config from '../config';

const firebaseConfig = config.firebase;

export default firebase.initializeApp(firebaseConfig);
