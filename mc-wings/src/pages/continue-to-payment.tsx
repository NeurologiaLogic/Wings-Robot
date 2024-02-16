import { useNavigate } from "react-router-dom";
import logo from "../assets/logo.png";
import machine_hand from "../assets/mahine_hand.jpg";

export default function ContinueToPayment() {
  const navigate = useNavigate()
  return (
    <div className="h-screen relative bg-[#bc1c2c] w-full overflow-hidden">
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-center">
        <img src={logo} alt="Logo" className="w-36 mx-auto" />
        <img src={machine_hand} alt="Machine Hand" className="mt-4" />
        <h3 className="font-semibold text-2xl max-w-sm">Your order will be sent to the kitchen after you’ve completed the payment.</h3>
      </div>
      <div className="flex flex-col gap-2 fixed bottom-20 left-0 w-full z-20 p-10">
        <div className="order-option flex gap-2 ">
          <button className="bg-gray-300 text-black p-2 flex-1 rounded-md" onClick={()=>navigate("/select-flavour-page")}>Cancel Order</button>
          <button className="bg-[#24a4a4] text-white p-2 flex-1" onClick={()=>navigate("/choose-your-payment-method")}>Payment</button>
        </div>
      </div>
    </div>
  );
}
