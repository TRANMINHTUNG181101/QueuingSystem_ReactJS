import { database } from "../index";
import { ref, push } from "firebase/database";
import { HistoryInterface } from "../../interfaces/historyInterface";

export const createHistory = async (
  history: HistoryInterface
): Promise<void> => {
  try {
    const historyRef = ref(database, "history");
    await push(historyRef, history);
    console.log("history sent to Realtime Database");
  } catch (error) {
    console.error("Error sending history to Realtime Database:", error);
  }
};
