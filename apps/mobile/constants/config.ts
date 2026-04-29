import { Platform } from "react-native";

// Use your computer's IP address
const DEV_IP = "192.168.60.22";
const DEV_PORT = 3000;
export const API_URL =
  Platform.OS === "android"
    ? `http://${DEV_IP}:${DEV_PORT}`
    : `http://${DEV_IP}:${DEV_PORT}`;
