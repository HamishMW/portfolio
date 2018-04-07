import { firebase } from '@firebase/app';
import '@firebase/database';
import config from '../config';

const firebaseConfig = config.firebase;
const Firebase = firebase.initializeApp(firebaseConfig);

export default Firebase;
