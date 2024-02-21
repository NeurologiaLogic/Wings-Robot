import { Food } from '../../types/food';
import { MinusSquare, PlusSquare } from 'lucide-react';

type Props = {
  item: Food;
  increment: () => void;
  decrement: () => void;
};

export default function FoodCard({ item, increment, decrement }: Props) {
  return (
    <div className="rounded-md overflow-hidden">
      <div className={`w-full h-full p-5 border-2 sm:max-w-[240px] md:max-w-[480px] rounded-md bg-white justify-center flex flex-col items-center ${item.count > 0 ? 'wings-outline-gradient' : 'none'}`}>
        <img src={item.image} alt={item.name} className="w-44 h-32 object-contain" />
        <div className="text-center flex flex-col items-center">
          <h4 className="text-black">{item.name}</h4>
          <h5 className="font-bold text-black">{item.price}</h5>
          <div className="flex gap-5">
            <button onClick={decrement}><MinusSquare color='gray'/></button>
            <h5 className="text-black">{item.count}</h5>
            <button onClick={increment}><PlusSquare color='black'/></button>
          </div>
        </div>
      </div>
    </div>
  );
}
