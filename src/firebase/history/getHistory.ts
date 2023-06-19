import { database } from "../index";
import { ref, onValue } from "firebase/database";
import { HistoryInterface } from "../../interfaces/historyInterface";

export const getHistory = (): Promise<HistoryInterface[]> => {
  return new Promise((resolve, reject) => {
    const historyRef = ref(database, "history");
    onValue(
      historyRef,
      (snapshot) => {
        const historyData = snapshot.val();
        const historyList: HistoryInterface[] = Object.values(historyData);
        resolve(historyList);
      },
      (error) => {
        reject(error);
      }
    );
  });
};
