import { useNavigate } from "react-router-dom";
import { useFoodStore } from "../../store/food-store.ts";
import PaymentMethodCard from "../component/payment-method-card.tsx";

export default function ChooseYourPaymentMethod() {
  const paymentMethods = [
    { id: 1, name: "GoPay", image: "data:image/png;base64,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", price: "Rp. 22.000,-" },
    { id: 2, name: "QRIS", image: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAASwAAABvCAMAAABhGA0xAAAAeFBMVEX///8BAQGtra0mJiY/Pz9CQkKmpqbGxsZFRUUPDw/e3t7a2tr6+vqCgoI8PDybm5tzc3NbW1szMzPq6uofHx/MzMwaGhpoaGj09PRgYGAlJSW8vLxvb283NzcrKyvR0dETExNRUVG1tbWOjo5+fn6Xl5dTU1OIiIg0hJ5HAAAD/ElEQVR4nO3d61aCQBSGYTJRQVIDVEzNtIP3f4dlwgDOsJk9awKJ7/3VWpzGJ5dxNMefPWg0dtBPrzpWwLqmZQWsa8BidMVYvdId2h7mffRrtYkCurZHeSddrOKk7VF0pAuW2/YguhKwGAGLUREr2I4GpUbLbLbgNGB0ivINjEf182s2mmYrTeThnMQH78HiFrdVWJF85POVzRa96e2QpcX5vobW4ZRmT9lKfcVEIbmzuMV9Fda7PO+zwFrxNiIWdIY2xpx2FlieNM0TWAuLW5xVYX3I8xpj5R+Dro0xp90R1pM8rzHWBFj6AYsRsBgBixGwGAGLEbAYAYsRsBgBixGwGAGLEbAY9RtLHh1ZjrW3Mea05rFCE6zkOBtW5T7KC+ZYu+oFyVzFuVkLWKHLGcRsZ4JFNqewjHv+E6ylemN6AYsRsBgBixGwGAGL0WUF6Z4XsOryPC97ZcCqazqdHvzrj73AsnUPI7kH/zV0b5qI0ZFYC2lBzRRHoxaw9hPOGIblPXhNLNWxoXhHk1j/6dhQF0vxe9bD+k9nHYBFBixG5lgvy2na8TIRWOXKWK9i1vVlIrDK3WCJ2zY3l4nAKgcsYOkHLEbAYgQsRth1YGSO9bZbXPv4fbIaWOVwuAMs/YDFyAyLOvn3SW3EJtaHFpbNp8KMsILBSEo8VOjL0/Ln9BRYxB053vkkr0wkTqCTWAdiDYrm1N1URljmKbDOx+rR7X2dlZJY3BQ3Ad0R1iAhntiMda6/2MRKXu4aa656aFa00ri01zjWcvtTcakGsUgtb1u70saxfodbXKpJLCciHgeu12oca9gqFq01qFlp41huu1ik1sOIXuldYm0MB1CoEov83KrRanzXQQdrMiYSZ7cieVr+978ay0mOxDA/jbF8atBy29gSFhl1uDPUwXKCL2L176ZYf3G4Yw+LeyAtsIy1Gj+QvgcsWmsBrBKWoVZPsWitNbBKWLRWxb5Lb7GcQHH3qGij/HLG/mLR762j6tsbe4xFv7cmCq0+Y9HvrUkkzd9rLCdYExvaS1r9xqIPUsJbrb5j0Vo3pxR6j0VqxWUtYJFaL6WLPsCitVbF76RvH0vx1Ztk9rFIrbeCVvtYJ+aKjB90qsYitQqXMRr7BtzsQScJy5nPHjmJTxES61lekLp2s6jeXhyKX48fSlNDcd3/zHoVdNkVGxnLtL95OFOuxf940D2sFgMWI2AxAhYjYDECln7JCliimv/R5F/P5FrZVOexljFd+iVxVrbVeayx/AJUWdkWsBj1BGtfvyKNOo91CDU6at2hX1vnser+Gtr8t4Xdx2owYDECFiNgMQIWI2AxAhYjYDFSPDRg59DgPzZeS1GPR3S2b4fzory2YLNnAAAAAElFTkSuQmCC", price: "Rp. 22.000,-" },
    { id: 3, name: "Shopee", image: "data:image/jpeg;base64,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", price: "Rp. 22.000,-" },
    // Add more payment methods as needed
  ];
  const navigate = useNavigate();

  return (
    <div className="p-4 sm:px-auto h-screen bg-[#bc1c2c]">
      <div className="text-left my-5">
        <h3 className="font-semibold text-2xl">Choose Your</h3>
        <h1 className="font-bold text-4xl">Payment Method</h1>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
        {paymentMethods.map((method) => (
          <PaymentMethodCard key={method.id} item={method} />
        ))}
      </div>
      <div className="flex flex-col gap-2 fixed w-full bottom-20 left-0 z-20 p-10">
        <div className="sub-total flex justify-between p-5 bg-gray-300">
            <h1 className="text-black ">Subtotal: </h1>
            <h1 className="text-[#bc1c2c] font-bold ">Rp. 22.000,-</h1>
        </div>
        <div className="order-option flex gap-2">
            <button className="bg-gray-300 text-black p-2 flex-1" onClick={()=>navigate("/")}>Cancel Order</button>
            <button className="bg-[#24a4a4] text-white p-2 flex-1" onClick={()=>navigate("/order-on-progress")}>Payment</button>
        </div>
      </div>
    </div>
  );
}
