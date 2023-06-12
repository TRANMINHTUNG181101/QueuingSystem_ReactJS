import { database } from "../index";
import { ref, onValue } from "firebase/database";
import { AccountInterface } from "../../interfaces/accountInterface";

export const getAccount = (): Promise<AccountInterface[]> => {
  return new Promise((resolve, reject) => {
    const accountRef = ref(database, "account");
    onValue(accountRef, (snapshot) => {
      const accountData = snapshot.val();
      const accountList: AccountInterface[] = Object.values(accountData);
      resolve(accountList);
    }, (error) => {
      reject(error);
    });
  });
};
