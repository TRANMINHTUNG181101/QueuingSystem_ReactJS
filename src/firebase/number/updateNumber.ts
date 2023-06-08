import { database } from "../index";
import { ref, onValue, update } from "firebase/database";
import { NumberingInterface } from "../../interfaces/numberInterface";

export const updateNumber = (numberId: string, newData: Partial<NumberingInterface>): Promise<void> => {
  return new Promise((resolve, reject) => {
    const numberRef = ref(database, `number/${numberId}`);
    update(numberRef, newData)
      .then(() => {
        resolve();
      })
      .catch((error) => {
        reject(error);
      });
  });
};