import { ShoppingCart, } from "lucide-react";

interface TotalPriceProps {
  totalPrice: number;
}

export const TotalPrice: React.FC<TotalPriceProps> = ({ totalPrice }) => {
  return (
    <div className="flex items-rigth bg-primary text-white rounded-full px-4 py-2 w-full">
      <span className="font-semibold mr-3">${totalPrice.toFixed(1)}</span>
      <ShoppingCart className="w-5 h-5" />
    </div>
  );
};