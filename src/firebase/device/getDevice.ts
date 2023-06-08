import { database } from "../index";
import { ref, onValue } from "firebase/database";
import { DeviceInterface } from "../../interfaces/deviceInterface";

export const getDevice = (): Promise<DeviceInterface[]> => {
  return new Promise((resolve, reject) => {
    const deviceRef = ref(database, "device");
    onValue(deviceRef, (snapshot) => {
      const deviceData = snapshot.val();
      const deviceList: DeviceInterface[] = Object.values(deviceData);
      resolve(deviceList);
    }, (error) => {
      reject(error);
    });
  });
};
