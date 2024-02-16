import { useNavigate } from "react-router-dom";
import { useFoodStore } from "../../store/food-store.ts";
import FoodCard from "../component/food-card.tsx";

export default function OrderOnProgress() {
  const getProductInCart = useFoodStore((state) => state.getProductInCart);
  const navigate = useNavigate();
  return (
    <div className="mx-auto max-w-screen-lg h-screen bg-[#bc1c2c] pt-20">
      <div className="text-center my-5">
        <h1 className="font-bold text-4xl">Your Order</h1>
        <h1 className="font-bold text-4xl">is on Progress</h1>
      </div>
      <div className="receipt mx-auto max-w-md md:w-3/4 lg:w-1/2">
        <div className="receipt-container bg-white p-5 rounded-xl ">
            <div className="transaction flex flex-col gap-3">
            <div className="headings text-center">
                <h1 className="font-bold text-black text-3xl">Thank you!</h1>
                <h1 className="text-black text-sm">Your Transaction Was Successful</h1>
            </div>
            <div className="order-id">
                <h1 className="font-bold text-black text-xl">Order ID:</h1>
                <h1 className="text-black text-sm">9120000-0002-0123</h1>
            </div>
            <div className="order-time">
                <h1 className="font-bold text-black text-xl">Order Time:</h1>
                <h1 className="text-black text-sm">Sunday, 10 February 2023</h1>
            </div>
            <div className="order-summary">
                <h1 className="font-bold text-black text-xl">Order Summary:</h1>
                {getProductInCart().map((food, index) => (
                <div className="flex justify-between" key={index}>
                    <h1 className="text-black text-sm">{food.name}</h1>
                    <h1 className="text-black text-sm">x{food.count}</h1>
                </div>
                ))}
            </div>
            </div>
            <div className="seperator relative my-4">
            <div className="left absolute -left-12 -top-5 h-12 w-12 rounded-3xl bg-[#bc1c2c]"></div>
            <div className="dashes border-t-2 border-dashed border-black "></div>
            <div className="right absolute -right-12 -top-5 h-12 w-12 rounded-3xl bg-[#bc1c2c]"></div>
            </div>
            <div className="transaction-details mt-4 flex flex-col gap-2">
            <div className="flex justify-between">
                <span className="font-bold text-black">Subtotal:</span>
                <span className="font-bold text-black">Rp. 22.000</span>
            </div>
            <p className="font-bold text-black">Payment Method:</p>
            <p className="text-black">Gopay</p>
            <button className="w-full bg-[#24a4a4] rounded-md p-2">Finish</button>
            </div>
        </div>
        <div className="button-container flex flex-end mt-4">
            <div className="button ml-auto bg-white px-4 py-2 text-center text-black rounded-xl" onClick={()=>navigate("/")}>Back To Home</div>
        </div>
      </div>
      <div className="mb-36"></div>
    </div>
  );
}
