import { useState, useEffect, useCallback } from "react";
import { fetchNotifications } from "../api/notifications"; // fixed: "api" not "apis"

export function useNotifications({ limit = 10, priorityOnly = false } = {}) {
  const [notifications, setNotifications] = useState([]);
  const [total, setTotal] = useState(0);
  const [page, setPage] = useState(1);
  const [filter, setFilter] = useState("All");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const load = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await fetchNotifications({
        page,
        limit,
        notification_type: filter,
      });
      let list = data.notifications ?? [];
      if (priorityOnly) {
        list = list.filter((n) => n.priority === true || n.isPriority === true);
      }
      setNotifications(list);
      setTotal(data.total ?? list.length);
    } catch (err) {
      setError(err.message);
      setNotifications([]);
    } finally {
      setLoading(false);
    }
  }, [page, limit, filter, priorityOnly]);

  useEffect(() => {
    load();
  }, [load]); // fixed: no more infinite loop, only reloads when page/filter/limit change

  const totalPages = Math.max(1, Math.ceil(total / limit));

  return {
    notifications,
    total,
    totalPages,
    page,
    setPage,
    filter,
    setFilter,
    loading,
    error,
    reload: load,
  };
}