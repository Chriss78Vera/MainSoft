import { doc, setDoc, getDoc, updateDoc } from "firebase/firestore";
export const updateStateWork = async (state) => {
    const docRefUser = (doc(global.dbCon, "/Usuarios", global.id));
    await updateDoc(docRefUser, {
        workingState: state,
      });
  };