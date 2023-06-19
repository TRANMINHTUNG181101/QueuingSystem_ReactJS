import { database } from "../index";
import { get, ref } from "firebase/database";
import { AccountInterface } from "../../interfaces/accountInterface";

export const checkEmail = async (email: string): Promise<boolean> => {
  try {
    const accountRef = ref(database, "account");
    const snapshot = await get(accountRef);

    if (snapshot.exists()) {
      const accounts: AccountInterface[] = Object.values(snapshot.val());
      const accountWithEmail = accounts.find(
        (account) => account.email === email
      );
      return !!accountWithEmail;
    }

    return false;
  } catch (error) {
    console.log(error);
    return false;
  }
};
