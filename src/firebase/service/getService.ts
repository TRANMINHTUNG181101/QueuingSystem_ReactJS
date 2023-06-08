import { database } from "../index";
import { ref, onValue } from "firebase/database";
import { ServiceInterface } from "../../interfaces/serviceInterface";

export const getService = (): Promise<ServiceInterface[]> => {
  return new Promise((resolve, reject) => {
    const serviceRef = ref(database, "service");
    onValue(serviceRef, (snapshot) => {
      const serviceData = snapshot.val();
      const serviceList: ServiceInterface[] = Object.values(serviceData);
      resolve(serviceList);
    }, (error) => {
      reject(error);
    });
  });
};
