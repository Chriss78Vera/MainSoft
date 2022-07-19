import { doc, setDoc, getDoc, updateDoc } from "firebase/firestore";
import { saveDay, updateStateWork } from "../TimerRegister/TimerUser";
// EXTRAER DATOS DEl ROL DEL USUARIO
export const getPersonalRol = async (Show) => {
  const personalRol = doc(global.dbCon, "/Roles/" + global.email);
  const docSnapRol = await getDoc(personalRol);
  let Rol = docSnapRol.data().id;
  let Trabalo = docSnapRol.data().rol;
  // TRAER INFORMATION
  global.rol = Trabalo;
  if (Trabalo == "Empleado") {
    const q = doc(global.dbCon, "/Usuarios/" + Rol);
    const docSnap = await getDoc(q);
    let personalInformation = [];
    console.log(personalInformation)
    personalInformation.push(docSnap.data());
    for (let i = 0; i < personalInformation.length; i++) {
      global.id = personalInformation[i].id;
      global.finishDay = personalInformation[i].finishDay;
      global.workState = personalInformation[i].workingState;
      global.name = personalInformation[i].firstName;
      global.lastName = personalInformation[i].lastName;
      global.picture = personalInformation[i].imageUser;
      global.totalMonth = personalInformation[i].totalMonth;
      global.extraMonth = personalInformation[i].totalExtraMonth;
      global.stateBreak = personalInformation[i].stateBreak;
      global.workStation = personalInformation[i].workstation;
    }
    
    let date = new Date();
    // IGUALA SI EL DIA ACTUAL ES IGUAL AL DIA ALMACENADO EN LA BASE
    if (global.finishDay == null || global.workState == null) {
      await updateStateWork("NOTWORKING");
      const finishDay = {
        finishDay: date.getDate(),
        totalMonth:0,
      };
      await updateDoc(doc(global.dbCon, "/Usuarios", global.id), finishDay);
    } else {
      if (date.getDate() == global.finishDay) {
      } else {
        await updateStateWork("NOTWORKING");
        global.workState = "NOTWORKING";
        const finishDay = {
          startWork: 0,
          startBreak: 0,
          startBack: 0, 
          finishTime:0,
          finishDay: date.getDate(),
          stateBreak: false,
        };
        global.stateBreak=false,
        await updateDoc(doc(global.dbCon, "/Usuarios", global.id), finishDay);
      }
    }
  } else {
    console.log("NO LEE EL ESTADO");
  }
  if(global.totalMonth==null){
    global.totalMonth =0
    console.log(global.totalMonth)
  }else{
    "NO HAY NADA"
  }
  
};
export const getPersonalInformation = async (getInformations) => {
  const q = doc(global.dbCon, "/Usuarios/" + global.id);
  const docSnap = await getDoc(q);
  let personalInformation = [];
  personalInformation.push(docSnap.data());
  getInformations(personalInformation);
};
export const savePersonalInformation = async (data) => {
  await updateDoc(doc(global.dbCon, "/Usuarios", global.id), data);
};
export const getDocumentsData = async () => {
  try {
    const q = doc(global.dbCon, "/Usuarios/" + global.id +"/DOCUMENTS/"+"DATA");
    const docSnap = await getDoc(q);
    global.documents = docSnap.data().account;
    console.log(global.documents)
  } catch (error) {
    global.documents=0;
  }
 
};