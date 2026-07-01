import { BrowserRouter, Routes, Route, Link, useLocation } from "react-router-dom";
import { AppBar, Toolbar, Button, CssBaseline, ThemeProvider, createTheme } from "@mui/material";
import { NotificationsPage } from "./pages/NotificationsPage";
import { PriorityNotificationsPage } from "./pages/PriorityNotificationsPage";

const theme = createTheme({
  palette: { mode: "light", primary: { main: "#1976d2" } },
});

function NavBar() {
  const { pathname } = useLocation();
  return (
    <AppBar position="static" color="default" elevation={1}>
      <Toolbar>
        <Button component={Link} to="/" sx={{ fontWeight: pathname === "/" ? 700 : 400 }}>
          All Notifications
        </Button>
        <Button component={Link} to="/priority" sx={{ fontWeight: pathname === "/priority" ? 700 : 400 }}>
          Priority
        </Button>
      </Toolbar>
    </AppBar>
  );
}

export default function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <BrowserRouter>
        <NavBar />
        <Routes>
          <Route path="/" element={<NotificationsPage />} />
          <Route path="/priority" element={<PriorityNotificationsPage />} />
        </Routes>
      </BrowserRouter>
    </ThemeProvider>
  );
}