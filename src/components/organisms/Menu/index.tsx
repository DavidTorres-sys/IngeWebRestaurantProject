import { MenuCard } from '@/components/molecules/MenuCard';
import { SearchBar } from '@/components/molecules/SearchBar';
import { TotalPrice } from '@/components/molecules/TotalPrice';
import { GET_PRODUCTS } from "@/utils/gql/queries/products";
import { useQuery } from '@apollo/client';
import { useState } from 'react';

export default function MenuComponent() {
  const { loading, error, data } = useQuery(GET_PRODUCTS, {
    onError: (error) => {
      console.error("GraphQL Query Error:", error);
    },
  });

  // State to store orders and total price
  const [orders, setOrders] = useState<{ id: string; quantity: number; total: number }[]>([]);
  const [totalPrice, setTotalPrice] = useState(0);

  // Function to handle adding an order
  const addOrder = (id: string, name: string, price: number, quantity: number) => {
    const existingOrder = orders.find(order => order.id === id);

    if (existingOrder) {
      // Update the existing order
      const updatedOrders = orders.map(order =>
        order.id === id
          ? { ...order, quantity: order.quantity + quantity, total: order.total + price * quantity }
          : order
      );
      setOrders(updatedOrders);
    } else {
      // Add a new order
      setOrders([...orders, { id, quantity, total: price * quantity }]);
    }

    // Update the total price
    setTotalPrice(prevTotal => prevTotal + price * quantity);
    console.log(orders);
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  return (
    <div className="p-5">
      <SearchBar />
      <div className="mt-5">
        {/* TotalPrice component now reflects the dynamic total */}
        <TotalPrice totalPrice={totalPrice} />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-10">
        {data?.products.map((product: any) => (
          <MenuCard
            key={product.id}
            id={product.id}
            name={product.name}
            description={product.description}
            price={product.price}
            imageUrl={product.image_url}
            specialIntructions={product.specialInstructions || ''}
            onAddOrder={addOrder} // Pass the addOrder function
          />
        ))}
      </div>
    </div>
  );
}
