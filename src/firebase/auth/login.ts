import { database } from "../index";
import { ref, query, equalTo, onValue, orderByChild } from "firebase/database";
import { AccountInterface } from "../../interfaces/accountInterface";

export const login = (
  username: string,
  password: string
): Promise<AccountInterface[]> => {
  return new Promise((resolve, reject) => {
    const accountRef = ref(database, "account");
    const queryRef = query(
      accountRef,
      orderByChild("username"),
      equalTo(username)
    );

    onValue(
      queryRef,
      (snapshot) => {
        const accountData = snapshot.val();

        if (accountData === null) {
          resolve([]);
          return;
        }

        const accountList: AccountInterface[] = Object.values(accountData);

        const matchingAccounts = accountList.filter(
          (account) => account.password === password
        );

        resolve(matchingAccounts);
      },
      (error) => {
        reject(error);
      }
    );
  });
};
