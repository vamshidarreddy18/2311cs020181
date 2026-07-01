import { useState } from "react";
import {
  Alert,
  Box,
  CircularProgress,
  Divider,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  Stack,
  Typography,
} from "@mui/material";
import StarIcon from "@mui/icons-material/Star";

import { NotificationCard } from "../components/NotificationCard";
import { NotificationFilter } from "../components/NotificationFilter";
import { useNotifications } from "../hooks/useNotifications";
import { useReadStatus } from "../hooks/useReadStatus";

const TOP_N_OPTIONS = [5, 10, 20];

export function PriorityNotificationsPage() {
  const [topN, setTopN] = useState(5);

  const { notifications, filter, setFilter, loading, error } = useNotifications({
    limit: topN,
    priorityOnly: true,
  });

  const { isViewed, markAsViewed } = useReadStatus();

  return (
    <Box sx={{ maxWidth: 720, mx: "auto", px: 2, py: 4 }}>
      <Stack direction="row" alignItems="center" spacing={1.5} mb={3}>
        <StarIcon color="warning" sx={{ fontSize: 28 }} />
        <Typography variant="h5" fontWeight={700}>
          Priority Notifications
        </Typography>
      </Stack>

      <Divider sx={{ mb: 3 }} />

      <Stack direction="row" spacing={2} alignItems="center" flexWrap="wrap" mb={3}>
        <NotificationFilter value={filter} onChange={setFilter} />
        <FormControl size="small" sx={{ minWidth: 140 }}>
          <InputLabel>Show top</InputLabel>
          <Select
            value={topN}
            label="Show top"
            onChange={(e) => setTopN(e.target.value)}
          >
            {TOP_N_OPTIONS.map((n) => (
              <MenuItem key={n} value={n}>{n}</MenuItem>
            ))}
          </Select>
        </FormControl>
      </Stack>

      {loading && (
        <Box display="flex" justifyContent="center" py={6}>
          <CircularProgress />
        </Box>
      )}

      {!loading && error && (
        <Alert severity="error">Failed to load priority notifications: {error}</Alert>
      )}

      {!loading && !error && notifications.length === 0 && (
        <Alert severity="info">No priority notifications right now.</Alert>
      )}

      {!loading && !error && notifications.length > 0 && (
        <Stack spacing={1.5}>
          {notifications.map((n) => (
            <NotificationCard
              key={n.id}
              notification={n}
              isNew={!isViewed(n.id)}
              onView={markAsViewed}
            />
          ))}
        </Stack>
      )}
    </Box>
  );
}