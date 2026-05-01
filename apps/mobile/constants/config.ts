import { Platform } from "react-native";

const DEV_IP = process.env.API_HOST || "localhost";
const DEV_PORT = process.env.PORT || 3000;
export const API_URL =
  Platform.OS === "android"
    ? `http://${DEV_IP}:${DEV_PORT}`
    : `http://${DEV_IP}:${DEV_PORT}`;
