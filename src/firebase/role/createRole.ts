import { database } from "../index";
import { ref, push } from "firebase/database";
import { RoleInterface } from "../../interfaces/roleInterface";

export const createRole = async (role: RoleInterface): Promise<void> => {
  try {
    const roleRef = ref(database, "role");
    await push(roleRef, role);
    console.log("role sent to Realtime Database");
  } catch (error) {
    console.error("Error sending role to Realtime Database:", error);
  }
};