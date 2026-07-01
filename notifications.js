import axios from "axios";
import { logger, attachHttpLogging } from "../../../logging-middleware";

const BASE_URL = "http://4.224.186.213/evaluation-service";

const httpClient = axios.create({
  baseURL: BASE_URL,
  timeout: 10000,
});

attachHttpLogging(httpClient);

export async function fetchNotifications({ page = 1, limit = 10, notification_type } = {}) {
  try {
    const params = { page, limit };
    if (notification_type && notification_type !== "All") {
      params.notification_type = notification_type;
    }
    const { data } = await httpClient.get("/notifications", { params });
    return data;
  } catch (err) {
    logger.error("api", "fetchNotifications failed", { error: err.message });
    throw new Error(err.response?.data?.message || "Unable to load notifications.");
  }
}