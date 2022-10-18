import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Header from "./Header";
import FinnishUserComponent from "./User/FinnishUserComponent";
import AdminComponent from "./Admin/AdminComponent";
import EnglishUserComponent from "./User/EnglishUserComponent";

function App() {
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        {/*Link to the user view to enter Finnish words*/}
        <Route path="/" element={<FinnishUserComponent />} />
        {/*Link to the user view to enter English words*/}
        <Route path="/2" element={<EnglishUserComponent />} />
        {/*Link to the admin view*/}
        <Route path="/admin" element={<AdminComponent />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
