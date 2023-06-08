import { database } from "../index";
import { ref, onValue } from "firebase/database";
import { NumberingInterface } from "../../interfaces/numberInterface";

export const getNumber = (): Promise< NumberingInterface[]> => {
  return new Promise((resolve, reject) => {
    const numberRef = ref(database, "number");
    onValue(numberRef, (snapshot) => {
      const numberData = snapshot.val();
      const numberList:  NumberingInterface[] = Object.values(numberData);
      resolve(numberList);
    }, (error) => {
      reject(error);
    });
  });
};
