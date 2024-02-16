import { useEffect, useState } from "react";
import { ChevronLeft, ChevronLeftSquare, Home, ShoppingCart } from "lucide-react";
import { useFoodStore } from "../../store/food-store"
import { Link, useNavigate } from "react-router-dom";

export default function Footer({next}: {next: string}) {
  const getCartCount = useFoodStore(state => state.getProductInCartCount);
  const [cartCount, setCartCount] = useState(getCartCount());
  const back = useNavigate();
  
  useEffect(() => {
    // Update cart count whenever it changes in the store
    const unsubscribe = useFoodStore.subscribe((state,prevState)=>{
      setCartCount(state.getProductInCartCount());
    })

    // Unsubscribe from store when component unmounts
    return () => {
      unsubscribe();
    };
  }, []);

  const links = [
    { text: "Select Flavour", path: "/select-flavour-page" },
    { text: "Your Bill Details", path: "/your-bill-details" },
    { text: "Continue to Payment", path: "/continue-to-payment" },
    { text: "Choose Your Payment Method", path: "/choose-your-payment-method" },
    { text: "Order on Progress", path: "/order-on-progress" },
  ];

  return (
    <div className="fixed bottom-0 h-24 flex bg-white w-full items-center justify-evenly">
      <div className="flex items-center gap-2">
        <Link to="/">
          <Home color="black" size={40}/>
        </Link>
        <ChevronLeft color="black" size={40} onClick={() => back(-1)} className="cursor-pointer"/>
        <div className="w-0.5 bg-black h-12"></div>
        <div className="shoping-cart relative">
          <div className="absolute -right-3 -top-2 bullet bg-[#bc1c2c] w-5 h-5 flex items-center justify-center">
            <p>{cartCount}</p>
          </div>
          <ShoppingCart color="black" size={40}/>
        </div>
      </div>
      <div>
        {/* {links.map((link, index) => (
          <Link to={link.path} key={index}>
            <button className="p-3 bg-gray-400 color-black rounded-sm">{link.text}</button>
            </Link>
          ))} */}
        <Link to={next}>
          <button className="p-3 bg-gray-400 color-black rounded-sm">Continue</button>
        </Link>
      </div>
    </div>
  );
}
