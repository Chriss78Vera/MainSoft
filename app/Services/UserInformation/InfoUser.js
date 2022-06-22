import { doc, setDoc, getDoc } from "firebase/firestore";
// EXTRAER DATOS DEl ROL DEL USUARIO
export const getPersonalRol = async (Show) => {
  const personalRol = doc(global.dbCon, "/Roles/" + global.email);
  const docSnapRol = await getDoc(personalRol);
  let Rol = docSnapRol.data().id;
  console.log("ENTRA AL SEVICIO");
  console.log("TREALE", Rol);
  console.log("ENTRA", Rol);
  // TRAER INFORMATION
  const q = doc(global.dbCon, "/Usuarios/" + Rol);
  const docSnap = await getDoc(q);
  let personalInformation = [];
  personalInformation.push(docSnap.data());
  console.log("Muestra", personalInformation);
  for (let i = 0; i < personalInformation.length; i++) {
    global.name = personalInformation[i].firsName;
    global.lastName = personalInformation[i].lastName;
    global.id = personalInformation[i].id;
    global.picture = personalInformation[i].imageUser;
    global.workState = personalInformation[i].workingState;
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
  await setDoc(doc(global.dbCon, "/Usuarios", global.id), data);
  console.log("GUARDO LOS DATOS");
};
