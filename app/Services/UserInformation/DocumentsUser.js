import { doc, getDoc, setDoc, updateDoc } from "firebase/firestore";

export const saveDocumentPersonal = async (data) => {
    try {
        console.log("HACE EL UPDATE")
        await updateDoc(doc(global.dbCon, "/Usuarios/"+global.id+"/DOCUMENTS","DATA"), data);
    } catch (error) {
        console.log("NO HACE EL UPDATE")
        await setDoc(doc(global.dbCon, "/Usuarios/"+global.id+"/DOCUMENTS","DATA"), data);
    }
    console.log("GUARDO LOS DATOS");
  };
  export const getDocumentsData = async (getDocuments) => {
    const q = doc(global.dbCon, "/Usuarios/" + global.id +"/DOCUMENTS/"+"DATA");
    const docSnap = await getDoc(q);
    let documentInformation = [];
    documentInformation.push(docSnap.data());
    getDocuments(documentInformation)
  };