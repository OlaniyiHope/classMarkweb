import "../fake-db";

import { useRoutes } from "react-router-dom";
import { MatxTheme } from "./components";

import routes from "./routes";
import { AuthProvider } from "./contexts/JWTAuthContext";

const App = () => {
  const content = useRoutes(routes);

  return (
    <>
      <MatxTheme>
        <AuthProvider>{content}</AuthProvider>
      </MatxTheme>
    </>
  );
};

export default App;
