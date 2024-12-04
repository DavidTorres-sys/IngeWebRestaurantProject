import { useState } from "react";
import { Card, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";

type MenuCardProps = {
  id: string;
  name: string;
  description: string;
  price: number;
  specialIntructions: string;
  imageUrl: string;
  onAddOrder: (id: string, name: string, price: number, quantity: number) => void;
};

export const MenuCard = ({
  id,
  name,
  description,
  price,
  imageUrl,
  onAddOrder,
}: MenuCardProps) => {
  const [quantity, setQuantity] = useState(1);
  const [cutleryOption, setCutleryOption] = useState("");
  const [isOpen, setIsOpen] = useState(false); // Modal visibility state
  const { toast } = useToast(); // Toast hook

  const handleAddOrder = () => {
    // Add the order to the state
    onAddOrder(id, name, price, quantity);

    // Show success toast
    toast({
      title: "Success!",
      description: `${name} has been added to your order.`,
    });

    // Close the modal
    setIsOpen(false);
  };

  return (
    <Card className="w-80 border rounded-lg shadow-md text-center">
      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <CardHeader className="cursor-pointer p-4">
          <img
            src={imageUrl}
            alt={name}
            className="w-full h-48 object-cover rounded-t-lg"
          />
          <CardTitle className="mt-4 text-xl font-semibold">{name}</CardTitle>
        </CardHeader>

        <DialogTrigger asChild>
          <CardFooter className="p-4 border-t">
            <Button
              variant="outline"
              className="text-red-600 border-red-600 w-full"
              onClick={() => setIsOpen(true)} // Open the modal
            >
              ${price.toFixed(2)}
            </Button>
          </CardFooter>
        </DialogTrigger>

        <DialogContent className="bg-white">
          <DialogHeader>
            <DialogTitle className="text-2xl font-bold">{name}</DialogTitle>
            <p className="text-gray-600">{description}</p>
          </DialogHeader>

          <div className="space-y-4 mt-4">
            <h4 className="font-semibold">Would you like to add table cutlery?</h4>
            <RadioGroup
              className="space-y-2"
              value={cutleryOption}
              onChange={(e) => setCutleryOption((e.target as HTMLInputElement).value)}
            >
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="with-cutlery" id="with-cutlery" />
                <label htmlFor="with-cutlery" className="text-sm">
                  With table cutlery
                </label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="without-cutlery" id="without-cutlery" />
                <label htmlFor="without-cutlery" className="text-sm">
                  Without table cutlery
                </label>
              </div>
            </RadioGroup>

            <h4 className="font-semibold">Special Instructions (Optional)</h4>
            <Textarea
              placeholder="Add any special instructions..."
              className="w-full"
            />

            <div className="flex items-center justify-between mt-4">
              <div className="flex items-center space-x-4">
                <Button
                  variant="outline"
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                >
                  -
                </Button>
                <span className="font-bold">{quantity}</span>
                <Button
                  variant="outline"
                  onClick={() => setQuantity(quantity + 1)}
                >
                  +
                </Button>
              </div>
              <span className="text-xl font-bold">${(price * quantity).toFixed(2)}</span>
            </div>
          </div>

          <DialogFooter>
            <Button
              variant="default"
              className="w-full"
              onClick={handleAddOrder} // Add the order and close the modal
            >
              Add to Order
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </Card>
  );
};
