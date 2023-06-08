import { database } from "../index";
import { ref, push } from "firebase/database";
import { ServiceInterface } from "../../interfaces/serviceInterface";

export const createService = async (service: ServiceInterface): Promise<void> => {
  try {
    const serviceRef = ref(database, "service");
    await push(serviceRef, service);
    console.log("service sent to Realtime Database");
  } catch (error) {
    console.error("Error sending service to Realtime Database:", error);
  }
};