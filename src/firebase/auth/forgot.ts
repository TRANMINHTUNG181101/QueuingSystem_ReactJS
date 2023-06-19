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

export const forgotPasswordAccount = (
  email: string,
  newPassword: Partial<AccountInterface>
): Promise<void> => {
  return new Promise((resolve, reject) => {
    const accountsRef = ref(database, "account");
    const fieldQuery = query(
      accountsRef,
      orderByChild("email"),
      equalTo(email)
    );
    onValue(fieldQuery, (snapshot) => {
      if (snapshot.exists()) {
        const accounts = snapshot.val();
        const updates: { [key: string]: Partial<AccountInterface> } = {};

        Object.keys(accounts).forEach((email) => {
          updates[`account/${email}`] = {
            ...accounts[email],
            password: newPassword,
          };
        });

        console.log(updates);

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
