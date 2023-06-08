import { database } from "../index";
import { ref, onValue, update } from "firebase/database";
import { RoleInterface } from "../../interfaces/roleInterface";

export const updateRole = (roleId: string, newData: Partial<RoleInterface>): Promise<void> => {
  return new Promise((resolve, reject) => {
    const roleRef = ref(database, `role/${roleId}`);
    update(roleRef, newData)
      .then(() => {
        resolve();
      })
      .catch((error) => {
        reject(error);
      });
  });
};
