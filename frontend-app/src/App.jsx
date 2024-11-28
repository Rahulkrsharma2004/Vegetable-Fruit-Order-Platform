import { BrowserRouter } from "react-router-dom";
import AllRoutes from "./routes/AllRoutes";
import { AuthProvider } from "./context/AuthContext";
// import './index.css'
function App() {
  return (
    <>
      <BrowserRouter>
        <AuthProvider>
          <AllRoutes />
        </AuthProvider>
      </BrowserRouter>
    </>
  );
}

export default App;
