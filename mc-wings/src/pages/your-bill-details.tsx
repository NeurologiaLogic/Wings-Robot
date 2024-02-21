import { useEffect, useState } from "react";
import { useFoodStore } from "../../store/food-store.ts";
import BillCard from "../component/bill-card.tsx";

export default function YourBillDetails() {
  const getProductInCart = useFoodStore((state) => state.getProductInCart);
  const [productInCart,setProductInCart] =  useState(getProductInCart())
  const removeProductFromCart = useFoodStore((state) => state.removeProductFromCart);
  useEffect(() => {
    // Update cart count whenever it changes in the store
    const unsubscribe = useFoodStore.subscribe((state,)=>{
      setProductInCart(state.getProductInCart());
    })

    // Unsubscribe from store when component unmounts
    return () => {
      unsubscribe();
    };
  }, []);
  return (
    <div className="mx-4 max-w-screen-md min-h-screen px-24">
      <div className="my-5">
        <h1 className="font-bold text-4xl text-left">Your</h1>
        <h1 className="font-bold text-4xl text-left">Bill Details</h1>
      </div>
      <div>
        {productInCart.map((food, index) => (
          <BillCard key={index} item={food} remove={() => removeProductFromCart(food.id)} />
        ))}
      </div>
      <div className="h-[256px]"></div>
    </div>
  );
}
