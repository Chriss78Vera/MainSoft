import { doc, setDoc, getDoc, updateDoc } from "firebase/firestore";
import { getMonth } from "../../Components/Date";
export const updateStateWork = async (state) => {
  const docRefUser = doc(global.dbCon, "/Usuarios", global.id);
  await updateDoc(docRefUser, {
    workingState: state,
  });
  global.workState = state;
};
// CREATE TASK
export const createTask = async () => {
  let date = new Date();
  const dias = [
    "domingo", // 0
    "lunes", // 1
    "martes",
    "miércoles",
    "jueves",
    "viernes",
    "sábado",
  ];
  const numeroDia = new Date().getDay();
  const nombreDia = dias[numeroDia].toUpperCase();
  let saveMonth = getMonth(date.getMonth() + 1) + "_" + date.getFullYear();
  let saveDay = nombreDia + "_" + date.getDate();
  const setTime = {
    startWork: null,
    startBreak: null,
    startBack: null,
    finishTime: null,
  };
  const setTimer = {
    notChange: null,
  };
  try {
    await updateDoc(
      doc(
        global.dbCon,
        "/Usuarios/" + global.id + "/" + saveMonth + "/" + saveDay
      ),
      setTimer
    );
  } catch (error) {
    await setDoc(
      doc(
        global.dbCon,
        "/Usuarios/" + global.id + "/" + saveMonth + "/" + saveDay
      ),
      setTime
    );
  }
};
// SAVE TIME 
export const saveTimeUser = async (time, state) => {
  let date = new Date();
  console.log(time);
  const dias = [
    "domingo", // 0
    "lunes", // 1
    "martes",
    "miércoles",
    "jueves",
    "viernes",
    "sábado",
  ];
  const numeroDia = new Date().getDay();
  const nombreDia = dias[numeroDia].toUpperCase();
  let saveMonth = getMonth(date.getMonth() + 1) + "_" + date.getFullYear();
  let saveDay = nombreDia + "_" + date.getDate();
  if (state == "startWork") {
    const timer = {
      startWork: time,
    };
    await updateDoc(
      doc(
        global.dbCon,
        "/Usuarios/" + global.id + "/" + saveMonth + "/" + saveDay
      ),
      timer
    );
  } else if (state == "startBreak") {
    const timers = {
      startBreak: time,
    };
    await updateDoc(
      doc(
        global.dbCon,
        "/Usuarios/" + global.id + "/" + saveMonth + "/" + saveDay
      ),
      timers
    );
  } else if (state == "startBack") {
    const timers = {
      startBack: time,
    };
    await updateDoc(
      doc(
        global.dbCon,
        "/Usuarios/" + global.id + "/" + saveMonth + "/" + saveDay
      ),
      timers
    );
  } else {
    const timers = {
      finishTime: time,
    };
    await updateDoc(
      doc(
        global.dbCon,
        "/Usuarios/" + global.id + "/" + saveMonth + "/" + saveDay
      ),
      timers
    );
    const finishDay = {
      finishDay: date.getDate(),
    };
    await updateDoc(doc(global.dbCon, "/Usuarios", global.id), finishDay);
  }
};
// TRAER DATOS 
export const getTimers = async (refreshScreen,dayNumber) =>{
  let date = new Date();
  const dias = [
    "domingo", // 0
    "lunes", // 1
    "martes",
    "miércoles",
    "jueves",
    "viernes",
    "sábado",
  ];
  const numeroDia = new Date().getDay();
  const nombreDia = dias[numeroDia].toUpperCase();
  let saveMonth = getMonth(date.getMonth() + 1) + "_" + date.getFullYear();
  let saveDay = nombreDia + "_" + date.getDate();
  try {
    const q = doc(global.dbCon, "/Usuarios/" + global.id +"/"+saveMonth+"/"+saveDay);
    const docSnap = await getDoc(q);
    let timerInformation = [];
    timerInformation.push(docSnap.data());
    refreshScreen(timerInformation)
  } catch (error) {
    refreshScreen(null)
  }
 
}