import { StyleSheet } from "react-native";
import colors from "./Colors";

const FormStyle = StyleSheet.create({
  input: {
    marginBottom: 20,
  },
  btnSuccess: {
    padding: 5,
    backgroundColor: colors.primary,
  },
  btnText: {
    marginTop: 10,
  },
  btnTextLabel: {
    color: colors.dark,
  },
  themeInput: {
    colors: { primary: colors.primary, underlineColor: "transparent" },
  },
});

export default FormStyle;
