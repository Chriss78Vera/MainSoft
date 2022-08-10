import { doc, getDoc, setDoc, updateDoc } from "firebase/firestore";

export const saveDocumentPersonal = async (data) => {
    try {
   
        await updateDoc(doc(global.dbCon, "/Usuarios/"+global.id+"/DOCUMENTS","DATA"), data);
        global.documents=true;
    } catch (error) {

        await setDoc(doc(global.dbCon, "/Usuarios/"+global.id+"/DOCUMENTS","DATA"), data);
        global.documents=true;
    }
  
  };
  export const getDocumentsData = async (getDocuments) => {
    const q = doc(global.dbCon, "/Usuarios/" + global.id +"/DOCUMENTS/"+"DATA");
    const docSnap = await getDoc(q);
    let documentInformation = [];
    documentInformation.push(docSnap.data());
    getDocuments(documentInformation)
  };