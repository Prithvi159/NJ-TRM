import "./App.scss";
import { RouterProvider } from "react-router-dom";
import { AppRouter } from "./routes/AppRoute";

function App() {
  return (
    <>
      <main className="app-global">
        <RouterProvider router={AppRouter} />
      </main>
    </>
  );
}

export default App;
