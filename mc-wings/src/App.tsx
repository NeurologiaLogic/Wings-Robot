import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Homepage from "./pages/homepage.tsx";
import SelectFlavour from "./pages/select-flavour-page.tsx";
import YourBillDetails from "./pages/your-bill-details.tsx";
import OrderOnProgress from "./pages/order-on-progress.tsx";
import Layout from './layout/layout.tsx';
import SendingOrder from "./pages/sending-order.tsx";

function App() {
  return (
    <Router>
      <Routes>
          <Route path="/" element={<Homepage />} />
          <Route path="/select-flavour-page" element={<Layout next="/your-bill-details"><SelectFlavour/></Layout>} />
          <Route path="/your-bill-details" element={<Layout next="/order-on-progress"><YourBillDetails /></Layout>} />
          <Route path="/order-on-progress" element={<OrderOnProgress finish="/sending-order"/>} />
          <Route path="/sending-order" element={<SendingOrder/>} />
      </Routes>
    </Router>
  );
}

export default App;
