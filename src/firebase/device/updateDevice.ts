import { database } from "../index";
import { ref, onValue, update } from "firebase/database";
import { DeviceInterface } from "../../interfaces/deviceInterface";

export const updateDevice = (deviceId: string, newData: Partial<DeviceInterface>): Promise<void> => {
  return new Promise((resolve, reject) => {
    const deviceRef = ref(database, `device/${deviceId}`);
    update(deviceRef, newData)
      .then(() => {
        resolve();
      })
      .catch((error) => {
        reject(error);
      });
  });
};