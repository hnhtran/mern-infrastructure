// css
import "./App.css";
// library
import { useState } from "react";
import { Routes, Route } from "react-router-dom";
// routers
import AuthPage from "../AuthPage/AuthPage";
import NewOrderPage from "../NewOrderPage/NewOrderPage";
import OrderHistoryPage from "../OrderHistoryPage/OrderHistoryPage";
import NavBar from "../../components/NavBar";

function App() {
  const [user, setUser] = useState(null);

  return (
    <main className="App">
      <NavBar />
      {!user ? 
        <AuthPage />
       :
       <> 
       <Routes>
          <Route path="/orders/new" element={<NewOrderPage />} />
          <Route path='/orders' element={<OrderHistoryPage />} />
        </Routes>
       </> 
        
      }
    </main>
  );
}

export default App;
