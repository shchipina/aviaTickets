import { Route, Routes } from "react-router"
import Header from "./components/Header"
import FlightsPage from "./pages/FlightsPage"
import Cart from "./pages/Cart"
import FlightDetailsPage from "./pages/FlightDetailsPage"

function App() {
  return (
    <>
      <Header />

      <Routes>
        <Route path="/" element={<FlightsPage />} />
        <Route path="/flights/:id" element={<FlightDetailsPage />} />
        <Route path="/cart" element={<Cart />} />
      </Routes>
    </>
  )
}

export default App