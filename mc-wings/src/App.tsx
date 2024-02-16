import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Homepage from "./pages/homepage.tsx";
import SelectFlavour from "./pages/select-flavour-page.tsx";
import YourBillDetails from "./pages/your-bill-details.tsx";
import ContinueToPayment from "./pages/continue-to-payment.tsx";
import ChooseYourPaymentMethod from "./pages/choose-your-payment-method.tsx";
import OrderOnProgress from "./pages/order-on-progress.tsx";
import Layout from './layout/layout.tsx';

function App() {
  return (
    <Router>
      <Routes>
          <Route path="/" element={<Homepage />} />
          <Route path="/select-flavour-page" element={<Layout next="/your-bill-details"><SelectFlavour/></Layout>} />
          <Route path="/your-bill-details" element={<Layout next="/continue-to-payment"><YourBillDetails /></Layout>} />
          <Route path="/continue-to-payment" element={<ContinueToPayment/>} />
          <Route path="/choose-your-payment-method" element={<ChooseYourPaymentMethod />} />
          <Route path="/order-on-progress" element={<OrderOnProgress />} />
      </Routes>
    </Router>
  );
}

export default App;
