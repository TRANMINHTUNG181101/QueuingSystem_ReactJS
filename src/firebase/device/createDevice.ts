import { database } from "../index";
import { ref, push } from "firebase/database";
import { DeviceInterface } from "../../interfaces/deviceInterface";

export const createDevice = async (device: DeviceInterface): Promise<void> => {
  try {
    const deviceRef = ref(database, "device");
    await push(deviceRef, device);
    console.log("device sent to Realtime Database");
  } catch (error) {
    console.error("Error sending device to Realtime Database:", error);
  }
};