import { Button } from "@/components/ui/button";

const InventoryCard = ({
  imageUrl,
  title,
  onDelete,
}: {
  imageUrl: string;
  title: string;
  onDelete: () => void;
}) => {
  return (
    <div className="w-[300px] h-[336px] shadow-lg rounded-2xl p-3">
      <div className="h-[208px]">
        <img
          src={imageUrl}
          alt=""
          className="w-full h-full object-cover rounded-2xl"
        />
        <h3 className="text-center text-xl font-semibold mt-2">
          {title}
        </h3>
        <Button className="text-xs w-full text-white mt-3" onClick={onDelete} variant="default">
          Delete
        </Button>
      </div>
    </div>
  );
};

export default InventoryCard;
