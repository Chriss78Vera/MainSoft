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
export const saveTimeUser = async (time, state, Description, Image) => {
  console.log("GUARDA DATOS")
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
      DescriptionBeforeBreak: Description,
      ImageBreak: Image,
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
      DescriptionFinishDay: Description,
      ImageFinish: Image,
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
  console.log("SALE")
};
// TRAER DATOS
export const getTimers = async (refreshScreen, dayNumber) => {
  console.log("TRAIGO EL TIEMPO")
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
  const numeroDia = dayNumber.getDay();
  const nombreDia = dias[numeroDia].toUpperCase();
  let saveMonth = getMonth(date.getMonth() + 1) + "_" + date.getFullYear();
  let saveDay = nombreDia + "_" + dayNumber.getDate();
  console.log(saveDay)
    const q = doc(
      global.dbCon,
      "/Usuarios/" + global.id + "/" + saveMonth + "/" + saveDay
    );
    const docSnap = await getDoc(q);
    let timerInformation = [];
    timerInformation.push(docSnap.data());
    if(timerInformation[0]==undefined){
      refreshScreen(null);
    }else{
      refreshScreen(timerInformation[0]);
    }
    console.log("SALE")
};
// CONTAR LAS HORAS DE CADA COSA

export const sumarHoras = async () => {
  console.log("SUMA LOS DIAS")
  // TRAER DE LA BASE LOS DATOS
  let timerInformation = [];
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
  let startWork;
  let startBreak;
  let startBack;
  let finishDay;
  try {
    const q = doc(
      global.dbCon,
      "/Usuarios/" + global.id + "/" + saveMonth + "/" + saveDay
    );
    const docSnap = await getDoc(q);
    timerInformation.push(docSnap.data());
  } catch (error) {
    console.log("NO HAY NADA QUE LEER");
  }
  for (let i = 0; i < timerInformation.length; i++) {
    startWork = timerInformation[i].startWork;
    startBreak = timerInformation[i].startBreak;
    startBack = timerInformation[i].startBack;
    finishDay = timerInformation[i].finishTime;
  }
  // PRIMERA PARTE DEL TRABAJO
  // TRANSFORMACION DE LA PRIMERA PARTE DEL TRABAJO
  let firstTimeHours = startWork.split(":");
  let firstFinishTimeHours = startBreak.split(":");
  // HORAS QUE TRABAJO EN LA PRIMERA PARTE
  let totalFisrtTime =
    parseInt(firstFinishTimeHours[0]) - parseInt(firstTimeHours[0]);
  // TRANSFORMACION DE LOS MINUTOS A SEGUNDOS
  let firstMinutes = firstTimeHours[1] * 60;
  let firstFinishMinutes = firstFinishTimeHours[1] * 60;
  let firstHoursWithMinutes = (
    (firstMinutes + firstFinishMinutes) /
    3600
  ).toFixed(0);
  // HORA REALIZADA EN LA PRIMERA PARTE
  let totalFirst = parseInt(totalFisrtTime) + parseInt(firstHoursWithMinutes);

  // SEGUNDA PARTE DEL TRABAJO
  // TRANSFORMACION DE LA SEGUNDA PARTE DEL TRABAJO
  let secondTimeHours = startBack.split(":");
  let secondFinishTimeHours = finishDay.split(":");
  let totalSecondTime =
    parseInt(secondFinishTimeHours) - parseInt(secondTimeHours);
  // TRANSFORMACION DE LOS MINUTOS
  let secondMinutes = secondTimeHours[1] * 60;
  let secondFinishMinutes = secondFinishTimeHours[1] * 60;
  let totalSecondFinishMinutes = (
    (secondMinutes + secondFinishMinutes) /
    3600
  ).toFixed(0);
  let totalSecond =
    parseInt(totalSecondTime) + parseInt(totalSecondFinishMinutes);

  let totalHoursDay = totalSecond + totalFirst;
  const timer = {
    totalDay: totalHoursDay,
    totalExtraDay: 0,
  };
  await updateDoc(
    doc(
      global.dbCon,
      "/Usuarios/" + global.id + "/" + saveMonth + "/" + saveDay
    ),
    timer
  );
  let suma = parseInt(global.totalMonth) + parseInt(totalHoursDay);
   const data = {
     totalMonth: suma,
     totalExtraMonth: 0,
   };
   await updateDoc(doc(global.dbCon, "/Usuarios", global.id), data);
   console.log("GUARDO LOS DATOS");
};
