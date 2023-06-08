import { database } from "../index";
import { ref, onValue } from "firebase/database";
import { RoleInterface } from "../../interfaces/roleInterface";

export const getRole = (): Promise<RoleInterface[]> => {
  return new Promise((resolve, reject) => {
    const roleRef = ref(database, "role");
    onValue(roleRef, (snapshot) => {
      const roleData = snapshot.val();
      const roleList: RoleInterface[] = Object.values(roleData);
      resolve(roleList);
    }, (error) => {
      reject(error);
    });
  });
};
