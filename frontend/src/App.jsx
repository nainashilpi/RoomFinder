import { BrowserRouter, Routes, Route } from "react-router-dom";

import Login from "./pages/Login";
import Register from "./pages/Register";
import Home from "./pages/Home";
import MainLayout from "./layouts/mainLayout";
import Roomies from "./pages/Roomies";
import FindStay from "./pages/FindStay";
import AddProperty from "./pages/AddProperty";
import AddRoommate from "./pages/AddRoommate";
import PropertyDetails from "./pages/PropertyDetails";
import RoommateDetails from "./pages/RoommateDetails";
import EditProperty from "./pages/EditProperty";
import EditRoommate from "./pages/EditRoommate";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<MainLayout />}>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/roomies" element={<Roomies />} />
          <Route path="/findStay" element={<FindStay />} />
          <Route path="/addProperty" element={<AddProperty />} />
          <Route path="/addRoommate" element={<AddRoommate />} />
          <Route path="/property/:id" element={<PropertyDetails />} />
          <Route path="/roommate/:id" element={<RoommateDetails />} />
          <Route path="/editProperty/:id" element={<EditProperty />} />
          <Route path="/editRoommate/:id" element={<EditRoommate />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;