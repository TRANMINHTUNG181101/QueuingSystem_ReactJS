import { database } from "../index";
import { ref, onValue, update } from "firebase/database";
import { AccountInterface } from "../../interfaces/accountInterface";

export const updateAccount = (accountId: string, newData: Partial<AccountInterface>): Promise<void> => {
  return new Promise((resolve, reject) => {
    const accountRef = ref(database, `account/${accountId}`);
    update(accountRef, newData)
      .then(() => {
        resolve();
      })
      .catch((error) => {
        reject(error);
      });
  });
};