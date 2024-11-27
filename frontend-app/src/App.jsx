import { BrowserRouter } from "react-router-dom";
import AllRoutes from "./routes/AllRoutes";
// import './index.css'
function App() {
  return (
    <>
      <BrowserRouter>
        <AllRoutes />
      </BrowserRouter>
    </>
  );
}

export default App;
