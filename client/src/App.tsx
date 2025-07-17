import { AlertProvider } from "./context/AlertContext";
import UserProvider from "./context/UserContext";
import AppRouter from "./router/AppRouter";

function App() {
  return (
    <AlertProvider>
      <UserProvider>
        <AppRouter />
      </UserProvider>
    </AlertProvider>
  );
}

export default App;
