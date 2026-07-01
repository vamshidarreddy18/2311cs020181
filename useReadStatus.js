import { useCallback, useEffect, useState } from "react";

const STORAGE_KEY = "viewedNotificationIds";

function loadViewedIds() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? new Set(JSON.parse(raw)) : new Set();
  } catch {
    return new Set();
  }
}

export function useReadStatus() {
  const [viewedIds, setViewedIds] = useState(loadViewedIds);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify([...viewedIds]));
  }, [viewedIds]);

  const markAsViewed = useCallback((id) => {
    setViewedIds((prev) => {
      if (prev.has(id)) return prev;
      const next = new Set(prev);
      next.add(id);
      return next;
    });
  }, []);

  const isViewed = useCallback((id) => viewedIds.has(id), [viewedIds]);

  return { markAsViewed, isViewed };
}