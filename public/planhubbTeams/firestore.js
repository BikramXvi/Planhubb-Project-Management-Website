import { app } from "../js/firebase/config.js"; // <-- import your initialized Firebase app
import { getFirestore, collection, doc, addDoc, updateDoc, deleteDoc, onSnapshot } from "https://www.gstatic.com/firebasejs/10.1.0/firebase-firestore.js";

const db = getFirestore(app); // <-- pass the app here
const teamsCol = collection(db, "teams");

export async function createTeam(team) {
    await addDoc(teamsCol, team);
}

export async function updateTeam(id, team) {
    const ref = doc(db, "teams", id);
    await updateDoc(ref, team);
}

export async function deleteTeam(id) {
    const ref = doc(db, "teams", id);
    await deleteDoc(ref);
}

export function onTeamsChange(callback) {
    onSnapshot(teamsCol, snapshot => {
        const teams = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        callback(teams);
    });
}
