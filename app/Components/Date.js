export const dateComplete = () => {
  const dateA = new Date();
  const yearA = dateA.getFullYear();
  let today;
  if(dateA.getDate()>=1 && dateA.getDate()<=9){
    today = "0"+dateA.getDate();
  }else{
    today = dateA.getDate();
  }
  const actualMonth = dateA.getMonth() + 1;
  let monthResult = "";

  if (actualMonth == 1) {
    monthResult ="01"+"-" + yearA;
  } else if (actualMonth == 2) {
    monthResult = "02"+"-" + yearA;
  } else if (actualMonth == 3) {
    monthResult = "03"+"-" + yearA;
  } else if (actualMonth == 4) {
    monthResult = "04"+"-" + yearA;
  } else if (actualMonth == 5) {
    monthResult = "05"+"-" + yearA;
  } else if (actualMonth == 6) {
    monthResult = "06"+"-" + yearA;
  } else if (actualMonth == 7) {
    monthResult = "07"+"-" + yearA;
  } else if (actualMonth == 8) {
    monthResult = "08"+"-" + yearA;
  } else if (actualMonth == 9) {
    monthResult = "09"+"-" + yearA;
  } else if (actualMonth == 10) {
    monthResult = "10"+"-" + yearA;
  } else if (actualMonth == 11) {
    monthResult = "11"+"-" + yearA;
  } else if (actualMonth == 12) {
    monthResult = "12"+"-" + yearA;
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
  let actualMonth =monthResultExtra[0]
  let monthResult=""
  if (actualMonth == "01") {
    monthResult = "ENERO"
  } else if (actualMonth == "02") {
    monthResult = "FEBRERO";
  } else if (actualMonth == "03") {
    monthResult = "MARZO";
  } else if (actualMonth == "04") {
    monthResult = "ARBIL";
  } else if (actualMonth== "05") {
    monthResult = "MAYO";
  } else if (actualMonth == "06") {
    monthResult = "JUNIO"
  } else if (actualMonth == "07") {
    monthResult ="JULIO"
  } else if (actualMonth == "08") {
    monthResult = "AGOSTO"
  } else if (actualMonth == "09") {
    monthResult = "SEPTIEMBRE"
  } else if (actualMonth == "10") {
    monthResult = "OCTUBRE"
  } else if (actualMonth == "11") {
    monthResult = "NOVIEMBRE"
  } else if (actualMonth == "12") {
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