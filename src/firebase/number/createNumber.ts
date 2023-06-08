import { database } from "../index";
import { ref, push } from "firebase/database";
import { NumberingInterface } from "../../interfaces/numberInterface";

export const createNumber = async (number: NumberingInterface): Promise<void> => {
  try {
    const numberRef = ref(database, "number");
    await push(numberRef, number);
    console.log("number sent to Realtime Database");
  } catch (error) {
    console.error("Error sending number to Realtime Database:", error);
  }
};