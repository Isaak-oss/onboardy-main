import { ClientToolTip } from "../../types/rawTypes.ts";
import { instance } from "../api.ts";

export const dashBoardApi = {
  getTooltips: (projectId: string): Promise<ClientToolTip[]> => {
    return instance.get(`/tooltips/${projectId}`);
  },
  createTooltip: (data?: ClientToolTip, projectId?: string): Promise<ClientToolTip> => {
    return instance.post(`/tooltips/${projectId}`, data);
  },
  updateTooltip: (id: string, data: ClientToolTip, projectId: string): Promise<ClientToolTip> => {
    return instance.put(`/tooltips/${projectId}/tooltip/${id}`, data);
  },
  deleteTooltip: (id: string, projectId: string): Promise<void> => {
    return instance.delete(`/tooltips/${projectId}/tooltip/${id}`);
  },
};
