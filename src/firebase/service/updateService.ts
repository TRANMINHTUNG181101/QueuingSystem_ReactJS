import { database } from "../index";
import { ref, onValue, update } from "firebase/database";
import { ServiceInterface } from "../../interfaces/serviceInterface";

export const updateService = (serviceId: string, newData: Partial<ServiceInterface>): Promise<void> => {
  return new Promise((resolve, reject) => {
    const serviceRef = ref(database, `service/${serviceId}`);
    update(serviceRef, newData)
      .then(() => {
        resolve();
      })
      .catch((error) => {
        reject(error);
      });
  });
};