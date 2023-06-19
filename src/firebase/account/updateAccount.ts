import { database } from "../index";
import {
  ref,
  onValue,
  update,
  query,
  orderByChild,
  equalTo,
} from "firebase/database";
import { AccountInterface } from "../../interfaces/accountInterface";

export const updateAccount = (
  fieldName: string,
  fieldValue: string,
  newData: Partial<AccountInterface>
): Promise<void> => {
  return new Promise((resolve, reject) => {
    const accountsRef = ref(database, "account");
    const fieldQuery = query(
      accountsRef,
      orderByChild(fieldName),
      equalTo(fieldValue)
    );
    onValue(fieldQuery, (snapshot) => {
      if (snapshot.exists()) {
        const accounts = snapshot.val();
        const updates: { [key: string]: Partial<AccountInterface> } = {};

        Object.keys(accounts).forEach((id) => {
          updates[`account/${id}`] = {
            ...accounts[id],
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
