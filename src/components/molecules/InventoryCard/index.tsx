import { Button } from "@/components/ui/button";

const InventoryCard = ({
  imageUrl,
  title,
}: {
  imageUrl: string;
  title: string;
}) => {
  return (
    <div className="w-[300px] h-[356px] shadow-lg rounded-2xl p-3">
      <div className="h-[208px]">
        <img
          src={imageUrl}
          alt=""
          className="w-full h-full object-cover rounded-2xl"
        />
        <h3 className="text-center text-xl font-semibold mt-2">
          {title}
        </h3>
        <div className="w-full flex gap-1 justify-center items-center">
          <div className="w-8 h-8 flex items-center justify-center text-3xl text-primary border-2 border-primary rounded-full cursor-pointer">
            -
          </div>
          <p className=" text-primary">10</p>
          <div className="w-8 h-8 flex items-center justify-center text-3xl text-primary border-2 border-primary rounded-full cursor-pointer">
            +
          </div>
        </div>
        <Button className="text-xs w-full text-white mt-3" variant="default">
          Delete
        </Button>
      </div>
    </div>
  );
};

export default InventoryCard;
