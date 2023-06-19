import { database } from "../index";
import {
  ref,
  onValue,
  update,
  query,
  orderByChild,
  equalTo,
} from "firebase/database";
import { RoleInterface } from "../../interfaces/roleInterface";

export const updateRole = (
  fieldName: string,
  fieldValue: string,
  newData: Partial<RoleInterface>
): Promise<void> => {
  return new Promise((resolve, reject) => {
    const rolesRef = ref(database, "role");
    console.log(newData);
    const fieldQuery = query(
      rolesRef,
      orderByChild(fieldName),
      equalTo(fieldValue)
    );
    onValue(fieldQuery, (snapshot) => {
      if (snapshot.exists()) {
        const roles = snapshot.val();
        const updates: { [key: string]: Partial<RoleInterface> } = {};

        Object.keys(roles).forEach((idRole) => {
          updates[`role/${idRole}`] = {
            ...roles[idRole],
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
