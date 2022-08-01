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
  console.log("GUARDA DATOS");
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
  let saveDayControl = nombreDia + "_" + date.getDate();
  let saveDay;
  if (date.getDate() >= 1 && date.getDate() <= 9) {
    saveDay = "0" + date.getDate();
  } else {
    saveDay = date.getDate();
  }

  if (state == "startWork") {
    const timer = {
      startWork: time,
    };
    const timerSet = {
      completeName: global.name + global.lastName,
      id: saveDay,
    };
    await updateDoc(
      doc(
        global.dbCon,
        "/Usuarios/" + global.id + "/" + saveMonth + "/" + saveDayControl
      ),
      timer
    );
    await updateDoc(
      doc(
        global.dbCon,
        "/Usuarios/" + global.id + "/" + saveMonth + "/" + saveDayControl
      ),
      timerSet
    );
    await updateDoc(doc(global.dbCon, "/Usuarios", global.id), timer);
  } else if (state == "startBreak") {
    const timers = {
      startBreak: time,
      DescriptionBeforeBreak: Description,
      ImageBreak: Image,
    };
    await updateDoc(
      doc(
        global.dbCon,
        "/Usuarios/" + global.id + "/" + saveMonth + "/" + saveDayControl
      ),
      timers
    );
    const onlyTimers = {
      startBreak: time,
      stateBreak: true,
    };
    await updateDoc(doc(global.dbCon, "/Usuarios", global.id), onlyTimers);
    global.stateBreak = true;
  } else if (state == "startBack") {
    const timers = {
      startBack: time,
    };
    await updateDoc(
      doc(
        global.dbCon,
        "/Usuarios/" + global.id + "/" + saveMonth + "/" + saveDayControl
      ),
      timers
    );
    await updateDoc(doc(global.dbCon, "/Usuarios", global.id), timers);
  } else {
    const timers = {
      finishTime: time,
      DescriptionFinishDay: Description,
      ImageFinish: Image,
    };
    const onlyTimers = {
      finishTime: time,
    };
    await updateDoc(
      doc(
        global.dbCon,
        "/Usuarios/" + global.id + "/" + saveMonth + "/" + saveDayControl
      ),
      timers
    );
    await updateDoc(doc(global.dbCon, "/Usuarios", global.id), onlyTimers);
    const finishDay = {
      finishDay: date.getDate(),
    };
    await updateDoc(doc(global.dbCon, "/Usuarios", global.id), finishDay);
  }
  console.log("SALE");
};
// TRAER DATOS
export const getTimers = async (refreshScreen, dayNumber) => {
  console.log("TRAIGO EL TIEMPO");
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
  let saveMonth =
    getMonth(dayNumber.getMonth() + 1) + "_" + dayNumber.getFullYear();
  let saveDay = nombreDia + "_" + dayNumber.getDate();
  console.log(saveDay);
  const q = doc(
    global.dbCon,
    "/Usuarios/" + global.id + "/" + saveMonth + "/" + saveDay
  );
  const docSnap = await getDoc(q);
  let timerInformation = [];
  timerInformation.push(docSnap.data());
  if (timerInformation[0] == undefined) {
    refreshScreen(null);
  } else {
    refreshScreen(timerInformation[0]);
  }
  console.log("SALE");
};
// TRAE DATOS DEL MES
export const getTimersMonth = async (refreshScreen, dayNumber) => {
  console.log("TRAIGO EL TIEMPO");
  const monthDate =
    getMonth(dayNumber.getMonth() + 1) + "_" + dayNumber.getFullYear();

  const q = doc(
    global.dbCon,
    "/Usuarios/" + global.id + "/" + "MONTHLY_REGISTER" + "/" + monthDate
  );
  const docSnap = await getDoc(q);
  let timerInformation = [];
  timerInformation=(docSnap.data().totalHours);
  console.log(timerInformation);
  if (timerInformation == undefined) {
    refreshScreen(null);
  } else {
    refreshScreen(timerInformation);
  }
};
// CONTAR LAS HORAS DE CADA COSA

export const sumarHoras = async () => {
  console.log("SUMA LOS DIAS");
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
    if (startBreak == null || startBreak == undefined) {
      startBreak = "00:00:00";
    }
    startBack = timerInformation[i].startBack;
    if (startBack == null || startBack == undefined) {
      startBack = "00:00:00";
    }
    finishDay = timerInformation[i].finishTime;
  }
  let horaInicioArray = startWork.split(":");
  let horaBreakArray = startBreak.split(":");
  let horaBackArray = startBack.split(":");
  let horaFinishArray = finishDay.split(":");

  let hour1 = Number(horaInicioArray[0]) * 3600;
  let min1 = Number(horaInicioArray[1]) * 60;
  let sec1 = Number(horaInicioArray[2]);

  let horaIncioaSegundos = Number(hour1 + min1 + sec1);
  console.log("HoraInicioSegundos: " + horaIncioaSegundos);

  let hour2 = Number(horaBreakArray[0]) * 3600;
  let min2 = Number(horaBreakArray[1]) * 60;
  let sec2 = Number(horaBreakArray[2]);

  let horaBreakaSegundos = Number(hour2 + min2 + sec2);
  console.log("horaBreakaSegundos", horaBreakaSegundos);

  let hour3 = Number(horaBackArray[0]) * 3600;
  let min3 = Number(horaBackArray[1]) * 60;
  let sec3 = Number(horaBackArray[2]);

  let horaBackaSegundos = Number(hour3 + min3 + sec3);
  console.log("horaBackaSegundos", horaBackaSegundos);

  let hour4 = Number(horaFinishArray[0]) * 3600;
  let min4 = Number(horaFinishArray[1]) * 60;
  let sec4 = Number(horaFinishArray[2]);

  let horaFinishaSegundos = Number(hour4 + min4 + sec4);

  console.log("horaFinishaSegundos", horaFinishaSegundos);

  let restaHoraBreakInicio = horaBreakaSegundos - horaIncioaSegundos;
  let restaHorsFinishBack = horaFinishaSegundos - horaBackaSegundos;

  let hoursTotalDay = restaHoraBreakInicio + restaHorsFinishBack;

  let horaFinal = Math.round(hoursTotalDay / 3600);
  let horaFinalView;
  if (horaFinal < 10) {
    horaFinalView = "0" + horaFinal;
  } else {
    horaFinalView = horaFinal;
  }

  let restoHoraFinal = hoursTotalDay % 3600;
  let minFinal = Math.round(restoHoraFinal / 60);
  let minFinalView;
  if (minFinal < 10) {
    minFinalView = "0" + minFinal;
  } else {
    minFinalView = minFinal;
  }
  let secFinal = restoHoraFinal % 60;
  let secFinalView;
  if (secFinal < 10) {
    secFinalView = "0" + secFinal;
  } else {
    secFinalView = secFinal;
  }

  let horaFinalRegistro =
    horaFinalView + ":" + minFinalView + ":" + secFinalView;
  console.log("Tiempo trabajado", horaFinalRegistro);

  const timer = {
    totalDay: horaFinalRegistro,
  };
  await updateDoc(
    doc(
      global.dbCon,
      "/Usuarios/" + global.id + "/" + saveMonth + "/" + saveDay
    ),
    timer
  );
  try {
    const q = doc(
      global.dbCon,
      "/Usuarios/" + global.id + "/" + "MONTHLY_REGISTER" + "/" + saveMonth
    );
    const docSnap = await getDoc(q);
    timerInformation = docSnap.data().totalHours;
    console.log("Tiempo trabajados", timerInformation);
    let separacion = timerInformation.split(":");
    let horaMonthFinal = Number(separacion[0]) * 3600;
    let minutosMonthFinal = Number(separacion[1]) * 60;
    let segundosMonth = Number(separacion[2]);
    let sumaMonth = Number(horaMonthFinal + minutosMonthFinal + segundosMonth);
    let sumaFinal = Number(sumaMonth + hoursTotalDay);

    let horaFinalMonth = Math.round(sumaFinal / 3600);
    let horaFinalViewMonth;
    if (horaFinalMonth < 10) {
      horaFinalViewMonth = "0" + horaFinalMonth;
    } else {
      horaFinalViewMonth = horaFinalMonth;
    }

    let restoHoraFinalMonth = sumaFinal % 3600;
    let minFinalMonth = Math.round(restoHoraFinalMonth / 60);
    let minFinalViewMonth;
    if (minFinalMonth < 10) {
      minFinalViewMonth = "0" + minFinalMonth;
    } else {
      minFinalViewMonth = minFinalMonth;
    }
    let secFinalMonth = restoHoraFinalMonth % 60;
    let secFinalViewMonth;
    if (secFinalMonth < 10) {
      secFinalViewMonth = "0" + secFinalMonth;
    } else {
      secFinalViewMonth = secFinalMonth;
    }
    let month =
      horaFinalViewMonth + ":" + minFinalViewMonth + ":" + secFinalViewMonth;
    console.log(month);
    const monthTime = {
      totalHours: month,
    };
    await updateDoc(
      doc(
        global.dbCon,
        "/Usuarios/" + global.id + "/" + "MONTHLY_REGISTER" + "/" + saveMonth
      ),
      monthTime
    );
  } catch (error) {
    const monthTime = {
      totalHours: horaFinalRegistro,
    };
    await setDoc(
      doc(
        global.dbCon,
        "/Usuarios/" + global.id + "/" + "MONTHLY_REGISTER" + "/" + saveMonth
      ),
      monthTime
    );
  }
};
export const saveDay = async () => {
  const finishDay = {
    finishDay: date.getDate(),
  };
  await updateDoc(doc(global.dbCon, "/Usuarios", global.id), finishDay);
};
