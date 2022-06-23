export const dateComplete = () => {
  const dateA = new Date();
  const yearA = dateA.getFullYear();
  const today = dateA.getDate();
  const actualMonth = dateA.getMonth() + 1;
  let monthResult = "";

  if (actualMonth == 1) {
    monthResult = today + "-01-" + yearA;
  } else if (actualMonth == 2) {
    monthResult = today + "-02-" + yearA;
  } else if (actualMonth == 3) {
    monthResult = today + "-03-" + yearA;
  } else if (actualMonth == 4) {
    monthResult = today + "-04-" + yearA;
  } else if (actualMonth == 5) {
    monthResult = today + "-05-" + yearA;
  } else if (actualMonth == 6) {
    monthResult = today + "-06-" + yearA;
  } else if (actualMonth == 7) {
    monthResult = today + " -07- " + yearA;
  } else if (actualMonth == 8) {
    monthResult = today + " -08-" + yearA;
  } else if (actualMonth == 9) {
    monthResult = today + " -09-" + yearA;
  } else if (actualMonth == 10) {
    monthResult = today + " -10-" + yearA;
  } else if (actualMonth == 11) {
    monthResult = today + " -11-" + yearA;
  } else if (actualMonth == 12) {
    monthResult = today + " -12-" + yearA;
  }
  return monthResult;
};
export const dateMonth = () => {
  const dateA = new Date();
  const yearA = dateA.getFullYear();
  const actualMonth = dateA.getMonth() + 1;
  let monthResult = "";
  if (actualMonth == 1) {
    monthResult = " 01-" + yearA;
  } else if (actualMonth == 2) {
    monthResult = " 02-" + yearA;
  } else if (actualMonth == 3) {
    monthResult = " 03-" + yearA;
  } else if (actualMonth == 4) {
    monthResult = " 04-" + yearA;
  } else if (actualMonth == 5) {
    monthResult = " 05-" + yearA;
  } else if (actualMonth == 6) {
    monthResult = " 06-" + yearA;
  } else if (actualMonth == 7) {
    monthResult = " 07- " + yearA;
  } else if (actualMonth == 8) {
    monthResult = " 08-" + yearA;
  } else if (actualMonth == 9) {
    monthResult = " 09-" + yearA;
  } else if (actualMonth == 10) {
    monthResult = " 10-" + yearA;
  } else if (actualMonth == 11) {
    monthResult = " 11-" + yearA;
  } else if (actualMonth == 12) {
    monthResult = " 12-" + yearA;
  }
  return monthResult;
};
export const ShowMonth = (month) => {
  let monthResultExtra = month.split("-");
  let actualMonth =monthResultExtra[0].split(0)
  let monthResult=""
  if (actualMonth[1] == 1) {
    monthResult = "ENERO"
  } else if (actualMonth[1] == 2) {
    monthResult = "FEBRERO";
  } else if (actualMonth[1] == 3) {
    monthResult = "MARZO";
  } else if (actualMonth[1] == 4) {
    monthResult = "ARBIL";
  } else if (actualMonth[1]== 5) {
    monthResult = "MAYO";
  } else if (actualMonth[1] == 6) {
    monthResult = "JUNIO"
  } else if (actualMonth[1] == 7) {
    monthResult ="JULIO"
  } else if (actualMonth[1] == 8) {
    monthResult = "AGOSTO"
  } else if (actualMonth[1] == 9) {
    monthResult = "SEPTIEMBRE"
  } else if (actualMonth[1] == 10) {
    monthResult = "OCTUBRE"
  } else if (actualMonth[1] == 11) {
    monthResult = "NOVIEMBRE"
  } else if (actualMonth[1] == 12) {
    monthResult = "DICIEMBRE"
  }
  return monthResult;
};
export const getMonth = (month) => {
  let monthResult=""
  if (month == 1) {
    monthResult = "ENERO"
  } else if (month == 2) {
    monthResult = "FEBRERO";
  } else if (month == 3) {
    monthResult = "MARZO";
  } else if (month == 4) {
    monthResult = "ARBIL";
  } else if (month== 5) {
    monthResult = "MAYO";
  } else if (month == 6) {
    monthResult = "JUNIO"
  } else if (month == 7) {
    monthResult ="JULIO"
  } else if (month == 8) {
    monthResult = "AGOSTO"
  } else if (month == 9) {
    monthResult = "SEPTIEMBRE"
  } else if (month == 10) {
    monthResult = "OCTUBRE"
  } else if (month == 11) {
    monthResult = "NOVIEMBRE"
  } else if (month == 12) {
    monthResult = "DICIEMBRE"
  }
  return monthResult;
};