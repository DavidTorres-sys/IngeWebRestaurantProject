import { Badge } from '@/components/ui/badge';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { useQuery } from '@apollo/client';

import React from 'react';
import { Button } from '@/components/ui/button';
import { SearchBar } from '@/components/molecules/SearchBar';

type User = {
  id: string;
  total_price: number;
  address: string;
  orderHistoryId: string;
  created_at: string;
  updated_at: string;
  user: {
    id: string;
    name: string;
    email: string;
    image: string;
  };
};

const PAGE_SIZE = 10;
export default function Component() {
  const [currentPage, setCurrentPage] = React.useState(1);

  const { data, loading, error } = useQuery(GET_ALL_ORDERS_BY_USER, {
    fetchPolicy: 'cache-and-network',
  });


  const orders = data ? data.orders : [];

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  return (
    <div className='mr-5'>
      <SearchBar />
      <Card className='shadow-2xl rounded-lg mt-10'>
        <CardHeader className="flex flex-row justify-between items-center">
          <CardTitle>Orders</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader className='bg-primary'>
              <TableRow>
                <TableHead className="text-white hidden md:table-cell">#</TableHead>
                <TableHead className="text-white hidden md:table-cell">Address</TableHead>
                <TableHead className="text-white hidden sm:table-cell">Creation Date</TableHead>
                <TableHead className="text-white hidden sm:table-cell">Price</TableHead>
                <TableHead className="text-white hidden md:table-cell">User</TableHead>
                <TableHead className="text-white hidden md:table-cell">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {orders.map((orders: User, index: number) => (
                <TableRow key={orders.id} className="bg-accent">
                  <TableCell>
                    {PAGE_SIZE * (currentPage - 1) + index + 1}
                  </TableCell>
                  <TableCell>
                  <TableCell className="hidden sm:table-cell">
                    <div className="font-medium">{orders.address}</div>
                  </TableCell>                    
                  </TableCell>
                  <TableCell className="hidden sm:table-cell">
                    <div className="font-medium">{orders.created_at}</div>
                  </TableCell>
                  <TableCell className="hidden md:table-cell">{orders.total_price}</TableCell>
                  <TableCell className="hidden sm:table-cell">
                    <Badge className="text-xs" variant="secondary">
                      {orders.user.name}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-right">
                    <Button className="text-xs" variant="outline">
                      Delete
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}
