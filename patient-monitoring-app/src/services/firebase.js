import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyB0-B3YJJxd5APny5bNR3H0vvtBxKYal4A",
  authDomain: "patient-monitoring-syste-19099.firebaseapp.com",
  projectId: "patient-monitoring-syste-19099",
  storageBucket: "patient-monitoring-syste-19099.firebasestorage.app",
  messagingSenderId: "19291660764",
  appId: "1:19291660764:web:4f54da6a6f4b6a04992f19"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
