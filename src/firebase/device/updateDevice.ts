import { database } from "../index";
import {
  ref,
  onValue,
  update,
  query,
  orderByChild,
  equalTo,
} from "firebase/database";
import { DeviceInterface } from "../../interfaces/deviceInterface";

export const updateDevice = (
  fieldName: string,
  fieldValue: string,
  newData: Partial<DeviceInterface>
): Promise<void> => {
  return new Promise((resolve, reject) => {
    const devicesRef = ref(database, "device");
    const fieldQuery = query(
      devicesRef,
      orderByChild(fieldName),
      equalTo(fieldValue)
    );
    onValue(fieldQuery, (snapshot) => {
      if (snapshot.exists()) {
        const devices = snapshot.val();
        const updates: { [key: string]: Partial<DeviceInterface> } = {};

        Object.keys(devices).forEach((deviceId) => {
          updates[`device/${deviceId}`] = { ...devices[deviceId], ...newData };
        });

        update(ref(database), updates)
          .then(() => {
            resolve();
          })
          .catch((error) => {
            reject(error);
          });
      } else {
        reject(new Error("Không tìm thấy mục thỏa mãn điều kiện."));
      }
    });
  });
};
