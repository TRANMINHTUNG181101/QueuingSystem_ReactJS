import { database } from "../index";
import { ref, push } from "firebase/database";
import { AccountInterface } from "../../interfaces/accountInterface";

export const createAccount = async (account: AccountInterface): Promise<void> => {
  try {
    const accountRef = ref(database, "account");
    await push(accountRef, account);
    console.log("account sent to Realtime Database");
  } catch (error) {
    console.error("Error sending account to Realtime Database:", error);
  }
};