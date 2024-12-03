import { MenuCard } from '@/components/molecules/MenuCard';
import { SearchBar } from '@/components/molecules/SearchBar';
import { GET_ALL_PRODUCTS } from '@/utils/queries/product';
import { useQuery } from '@apollo/client';
import { Search } from 'lucide-react';

export default function MenuComponent() {
  const { data, loading, error } = useQuery(GET_ALL_PRODUCTS);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  return (
    <div className="p-5">
      <SearchBar />
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-10">
        {data?.products.map((product: any) => (
          <MenuCard
            key={product.id}
            id={product.id}
            name={product.name}
            description={product.description}
            price={product.price}
            specialIntructions={product.specialInstructions || ''}
          />
        ))}
      </div>
    </div>
  );
}
