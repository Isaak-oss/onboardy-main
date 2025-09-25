import { instance } from "../api.ts";
import { Settings } from "../../types/rawTypes.ts";

export const settingsApi = {
  getMySettings: (): Promise<Settings> => {
    return instance.get("/settings");
  },
  updateSettings: (data: Settings): Promise<Settings> => {
    return instance.put("/settings", data);
  },
};
