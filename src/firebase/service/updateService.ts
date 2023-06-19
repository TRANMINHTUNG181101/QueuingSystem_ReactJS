import { database } from "../index";
import {
  ref,
  onValue,
  update,
  query,
  orderByChild,
  equalTo,
} from "firebase/database";
import { ServiceInterface } from "../../interfaces/serviceInterface";

export const updateService = (
  fieldName: string,
  fieldValue: string,
  newData: Partial<ServiceInterface>
): Promise<void> => {
  return new Promise((resolve, reject) => {
    const servicesRef = ref(database, "service");
    console.log(newData);
    const fieldQuery = query(
      servicesRef,
      orderByChild(fieldName),
      equalTo(fieldValue)
    );
    onValue(fieldQuery, (snapshot) => {
      if (snapshot.exists()) {
        const services = snapshot.val();
        const updates: { [key: string]: Partial<ServiceInterface> } = {};

        Object.keys(services).forEach((serviceCode) => {
          updates[`service/${serviceCode}`] = {
            ...services[serviceCode],
            ...newData,
          };
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
