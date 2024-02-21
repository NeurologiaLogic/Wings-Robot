import { Food } from '../../types/food';

type Props = {
  item: Food;
  remove: () => void;
};

export default function BillCard({ item, remove }: Props) {
  const price = parseFloat(item.price) * item.count;
  const formattedPrice = price.toLocaleString("id-ID", {
    style: "currency",
    currency: "IDR",
  });
  return (
    <div className="mb-3 rounded-2xl bg-gray-200">
      <div className="flex items-center ">
        <div className="bg-white h-64 rounded-l-2xl flex items-center px-2">
          <img src={item.image} alt={item.name} className="w-56 h-32 object-cover" />
        </div>
        <div className="flex flex-col justify-between basis-full p-4 gap-4">
          <h4 className="text-black bold text-lg">{item.name}</h4>
          <div className="flex justify-between">
            <span className="text-black">Quantity:</span>
            <span className="font-bold text-black">{item.count}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-black">Subtotal:</span>
            <span className="font-bold text-black">{formattedPrice}</span>
          </div>
         <button onClick={remove} className="w-full py-2 bg-[#bc1c2c] text-white font-bold ">
            Remove
         </button>
        </div>
      </div>
    </div>
  );
}
