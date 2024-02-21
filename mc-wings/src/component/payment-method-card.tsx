import { Payment } from '../../types/payment';

type Props = {
  item: Payment;
};

export default function PaymentMethodCard({ item }: Props) {
  return (
    <div className={`p-5 border-2 max-w-[240px] rounded-2xl bg-white  justify-center flex flex-col items-center`}>
      <img src={item.image} alt="awdaw" className="w-44 h-32 object-contain" />
      <div className="text-center flex flex-col items-center">
        <h4 className="text-black">{item.name}</h4>
        <h5 className="font-bold text-black">{item.price}</h5>
      </div>
    </div>
  );
}
