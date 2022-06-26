import { StyleSheet, Text, View, Modal } from "react-native";
import { Icon } from "react-native-elements";
import React from "react";
export const CalendarDay = (colors) => {
  const [day, setDay] = React.useState();
  let nuevosColores = "white";
  const calcularDia = () => {
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
    const nombreDia = dias[numeroDia];
    setDay(numeroDia);

    console.log("Nombre de día de la semana: ", nombreDia);
  };
  // VALIDATION //
  React.useEffect(() => {
    calcularDia();
  }, []);

  let ValidateDay = () => {
    if (day == 0) {
      return (
        <>
          <Text style={[styles.textCalendar, { color: nuevosColores }]}>
            LUN
          </Text>
          <Text style={[styles.textCalendar, { color: nuevosColores }]}>
            MAR
          </Text>
          <Text style={[styles.textCalendar, { color: nuevosColores }]}>
            MIR
          </Text>
          <Text style={[styles.textCalendar, { color: nuevosColores }]}>
            JUE
          </Text>
          <Text style={[styles.textCalendar, { color: nuevosColores }]}>
            VIE
          </Text>
          <Text style={[styles.textCalendar, { color: nuevosColores }]}>
            SAB
          </Text>
          <Text
            style={[
              styles.textCalendar,
              { color: colors.colors, textDecorationLine: "underline" },
            ]}
          >
            DOM
          </Text>
        </>
      );
    } else if (day == 1) {
      return (
        <>
          <Text
            style={[
              styles.textCalendar,
              { color: colors.colors, textDecorationLine: "underline" },
            ]}
          >
            LUN
          </Text>
          <Text style={[styles.textCalendar, { color: nuevosColores }]}>
            MAR
          </Text>
          <Text style={[styles.textCalendar, { color: nuevosColores }]}>
            MIR
          </Text>
          <Text style={[styles.textCalendar, { color: nuevosColores }]}>
            JUE
          </Text>
          <Text style={[styles.textCalendar, { color: nuevosColores }]}>
            VIE
          </Text>
          <Text style={[styles.textCalendar, { color: nuevosColores }]}>
            SAB
          </Text>
          <Text style={[styles.textCalendar, { color: nuevosColores }]}>
            DOM
          </Text>
        </>
      );
    } else if (day == 2) {
      return (
        <>
          <Text style={[styles.textCalendar, { color: nuevosColores }]}>
            LUN
          </Text>
          <Text
            style={[
              styles.textCalendar,
              { color: colors.colors, textDecorationLine: "underline" },
            ]}
          >
            MAR
          </Text>
          <Text style={[styles.textCalendar, { color: nuevosColores }]}>
            MIR
          </Text>
          <Text style={[styles.textCalendar, { color: nuevosColores }]}>
            JUE
          </Text>
          <Text style={[styles.textCalendar, { color: nuevosColores }]}>
            VIE
          </Text>
          <Text style={[styles.textCalendar, { color: nuevosColores }]}>
            SAB
          </Text>
          <Text style={[styles.textCalendar, { color: nuevosColores }]}>
            DOM
          </Text>
        </>
      );
    } else if (day == 3) {
      return (
        <>
          <Text style={[styles.textCalendar, { color: nuevosColores }]}>
            LUN
          </Text>
          <Text style={[styles.textCalendar, { color: nuevosColores }]}>
            MAR
          </Text>
          <Text
            style={[
              styles.textCalendar,
              { color: colors.colors, textDecorationLine: "underline" },
            ]}
          >
            MIR
          </Text>
          <Text style={[styles.textCalendar, { color: nuevosColores }]}>
            JUE
          </Text>
          <Text style={[styles.textCalendar, { color: nuevosColores }]}>
            VIE
          </Text>
          <Text style={[styles.textCalendar, { color: nuevosColores }]}>
            SAB
          </Text>
          <Text style={[styles.textCalendar, { color: nuevosColores }]}>
            DOM
          </Text>
        </>
      );
    } else if (day == 4) {
      return (
        <>
          <Text style={[styles.textCalendar, { color: nuevosColores }]}>
            LUN
          </Text>
          <Text style={[styles.textCalendar, { color: nuevosColores }]}>
            MAR
          </Text>
          <Text style={[styles.textCalendar, { color: nuevosColores }]}>
            MIR
          </Text>
          <Text
            style={[
              styles.textCalendar,
              { color: colors.colors, textDecorationLine: "underline" },
            ]}
          >
            JUE
          </Text>
          <Text style={[styles.textCalendar, { color: nuevosColores }]}>
            VIE
          </Text>
          <Text style={[styles.textCalendar, { color: nuevosColores }]}>
            SAB
          </Text>
          <Text style={[styles.textCalendar, { color: nuevosColores }]}>
            DOM
          </Text>
        </>
      );
    } else if (day == 5) {
      return (
        <>
          <Text style={[styles.textCalendar, { color: nuevosColores }]}>
            LUN
          </Text>
          <Text style={[styles.textCalendar, { color: nuevosColores }]}>
            MAR
          </Text>
          <Text style={[styles.textCalendar, { color: nuevosColores }]}>
            MIR
          </Text>
          <Text style={[styles.textCalendar, { color: nuevosColores }]}>
            JUE
          </Text>
          <Text
            style={[
              styles.textCalendar,
              { color: colors.colors, textDecorationLine: "underline" },
            ]}
          >
            VIE
          </Text>
          <Text style={[styles.textCalendar, { color: nuevosColores }]}>
            SAB
          </Text>
          <Text style={[styles.textCalendar, { color: nuevosColores }]}>
            DOM
          </Text>
        </>
      );
    } else if (day == 6) {
      return (
        <>
          <Text style={[styles.textCalendar, { color: nuevosColores }]}>
            LUN
          </Text>
          <Text style={[styles.textCalendar, { color: nuevosColores }]}>
            MAR
          </Text>
          <Text style={[styles.textCalendar, { color: nuevosColores }]}>
            MIR
          </Text>
          <Text style={[styles.textCalendar, { color: nuevosColores }]}>
            JUE
          </Text>
          <Text style={[styles.textCalendar, { color: nuevosColores }]}>
            VIE
          </Text>
          <Text
            style={[
              styles.textCalendar,
              { color: colors.colors, textDecorationLine: "underline" },
            ]}
          >
            SAB
          </Text>
          <Text style={[styles.textCalendar, { color: nuevosColores }]}>
            DOM
          </Text>
        </>
      );
    } else {
      return (
        <>
          <Text style={[styles.textCalendar, { color: nuevosColores }]}>
            LUN
          </Text>
          <Text style={[styles.textCalendar, { color: nuevosColores }]}>
            MAR
          </Text>
          <Text style={[styles.textCalendar, { color: nuevosColores }]}>
            MIR
          </Text>
          <Text style={[styles.textCalendar, { color: nuevosColores }]}>
            JUE
          </Text>
          <Text style={[styles.textCalendar, { color: nuevosColores }]}>
            VIE
          </Text>
          <Text style={[styles.textCalendar, { color: nuevosColores }]}>
            SAB
          </Text>
          <Text style={[styles.textCalendar, { color: nuevosColores }]}>
            DOM
          </Text>
        </>
      );
    }
  };
  return (
    <>
      <ValidateDay />
    </>
  );
};
export const DateTimer = (dayNumber) => {
  const [day, setDay] = React.useState();
  let nuevosColores = "white";
  const calcularDia = () => {
    const dias = [
      "domingo", // 0
      "lunes", // 1
      "martes",
      "miércoles",
      "jueves",
      "viernes",
      "sábado",
    ];
    const numeroDia = dayNumber.dayNumber
    const nombreDia = dias[numeroDia];
    setDay(numeroDia);
    console.log("Nombre de día de la semana: ", numeroDia);
  };
  // VALIDATION //
  React.useEffect(() => {
    calcularDia();
  }, []);
  let ValidateDay = () => {
    if ((day == 0)) {
      return (
        <>
          <Text style={styles.textCalendarDay}> DOMINGO </Text>
        </>
      );
    } else if (day == 1) {
      return (
        <>
          <Text style={styles.textCalendarDay}>LUNES</Text>
        </>
      );
    } else if (day == 2) {
      return (
        <>
          <Text style={styles.textCalendarDay}>MARTES</Text>
        </>
      );
    } else if (day == 3) {
      return (
        <>
          <Text style={styles.textCalendarDay}>MIERCOLES</Text>
        </>
      );
    } else if (day == 4) {
      return (
        <>
          <Text style={styles.textCalendarDay}>JUEVES</Text>
        </>
      );
    } else if (day == 5) {
      return (
        <>
          <Text style={styles.textCalendarDay}>VIERNES</Text>
        </>
      );
    } else {
      return (
        <>
          <Text style={styles.textCalendarDay}>SABADO</Text>
        </>
      );
    }
  };
  return (
    <>
      <ValidateDay />
    </>
  );
};
export const DateTimerData = (dayNumber) => {
  const [day, setDay] = React.useState();
  let nuevosColores = "white";
  const calcularDia = () => {
    const dias = [
      "domingo", // 0
      "lunes", // 1
      "martes",
      "miércoles",
      "jueves",
      "viernes",
      "sábado",
    ];
    const numeroDia = dayNumber.dayNumber
    const nombreDia = dias[numeroDia];
    setDay(numeroDia);
    console.log("Nombre de día de la semana: ", numeroDia);
  };
  // VALIDATION //
  React.useEffect(() => {
    calcularDia();
  }, []);
  let ValidateDay = () => {
    if ((day == 0)) {
      return (
        <>
          <Text style={styles.textCalendarDayData}> DOMINGO </Text>
        </>
      );
    } else if (day == 1) {
      return (
        <>
          <Text style={styles.textCalendarDayData}>LUNES</Text>
        </>
      );
    } else if (day == 2) {
      return (
        <>
          <Text style={styles.textCalendarDayData}>MARTES</Text>
        </>
      );
    } else if (day == 3) {
      return (
        <>
          <Text style={styles.textCalendarDayData}>MIERCOLES</Text>
        </>
      );
    } else if (day == 4) {
      return (
        <>
          <Text style={styles.textCalendarDayData}>JUEVES</Text>
        </>
      );
    } else if (day == 5) {
      return (
        <>
          <Text style={styles.textCalendarDayData}>VIERNES</Text>
        </>
      );
    } else {
      return (
        <>
          <Text style={styles.textCalendarDayData}>SABADO</Text>
        </>
      );
    }
  };
  return (
    <>
      <ValidateDay />
    </>
  );
};
const styles = StyleSheet.create({
  textCalendar: {
    paddingHorizontal: 10,
    paddingVertical: 10,
    fontSize: 15,
    fontWeight: "bold",
    color: "white",
  },
  textCalendarDay: {
    paddingHorizontal: 10,
    paddingVertical: 10,
    fontSize: 25,
    fontWeight: "bold",
    color: "#6DC0D5",
  },
  textCalendarDayData: {
    fontSize: 15,
    textAlign: "center",
    fontWeight: "bold",
    color: "black",
  },
});
