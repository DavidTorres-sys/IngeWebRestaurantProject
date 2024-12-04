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
import { useQuery, useMutation } from '@apollo/client';
import { GET_ALL_ORDERS } from '@/utils/gql/queries/orders';
import { CREATE_ORDER_HISTORY } from '@/utils/gql/mutations/orders';
import React from 'react';
import { Button } from '@/components/ui/button';
import { SearchBar } from '@/components/molecules/SearchBar';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useToast } from "@/hooks/use-toast";

type Order = {
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
  orderHistory: {
    id: string;
    changed_at: string;
    order_id: string;
    status: {
      id: string;
      description: string;
      name: string;
    };
  }[];
};

const PAGE_SIZE = 10;

export default function Component() {
  const { toast } = useToast();
  const [currentPage, setCurrentPage] = React.useState(1);
  const [selectedOrder, setSelectedOrder] = React.useState<Order | null>(null);
  const [selectedStatus, setSelectedStatus] = React.useState<string | null>(null);

  const { data, loading, error } = useQuery(GET_ALL_ORDERS, {
    fetchPolicy: 'cache-and-network',
  });

  const [updateOrderStatus] = useMutation(CREATE_ORDER_HISTORY, {
    refetchQueries: [{ query: GET_ALL_ORDERS }],
  });

  const orders: Order[] = data ? data.orders : [];

  const handleStatusChange = async () => {
    if (selectedOrder && selectedStatus) {
      console.log(selectedOrder.id, selectedStatus, new Date().toISOString());
      try {
        const response = await updateOrderStatus({
          variables: {
            data: {
              order_id: selectedOrder.id,
              status_id: selectedStatus,
              changed_at: new Date().toISOString(),
            }
          },
        });
        toast({
          title: `Status Changed to ${response.data.createOrderHistory.status.name}`,
          description: `${response.data.createOrderHistory.status.description}.`,
        });
        setSelectedOrder(null);
      } catch (err) {
        console.error(err);
        toast({
          title: "Error Changing Status",
          description: "Something went wrong. Please try again.",
          variant: "destructive",
        });
      }
    }
  };
  

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  return (
    <div className="mr-5">
      <SearchBar />
      <Card className="shadow-2xl rounded-lg mt-10">
        <CardHeader className="flex flex-row justify-between items-center">
          <CardTitle>Orders</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader className="bg-primary">
              <TableRow>
                <TableHead className="text-white hidden md:table-cell">#</TableHead>
                <TableHead className="text-white hidden md:table-cell">Address</TableHead>
                <TableHead className="text-white hidden sm:table-cell">Creation Date</TableHead>
                <TableHead className="text-white hidden sm:table-cell">Price</TableHead>
                <TableHead className="text-white hidden md:table-cell">User</TableHead>
                <TableHead className="text-white hidden md:table-cell">Status</TableHead>
                <TableHead className="text-white hidden md:table-cell">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {orders.map((order, index) => {
                const lastHistory = order.orderHistory[order.orderHistory.length - 1] || null;

                return (
                  <TableRow key={order.id} className="bg-accent">
                    <TableCell>
                      {PAGE_SIZE * (currentPage - 1) + index + 1}
                    </TableCell>
                    <TableCell className="hidden sm:table-cell">
                      <div className="font-medium">{order.address}</div>
                    </TableCell>
                    <TableCell className="hidden sm:table-cell">
                      <div className="font-medium">{order.created_at}</div>
                    </TableCell>
                    <TableCell className="hidden md:table-cell">{order.total_price}</TableCell>
                    <TableCell className="hidden sm:table-cell">
                      <Badge className="text-xs" variant="secondary">
                        {order.user.name}
                      </Badge>
                    </TableCell>
                    <TableCell className="hidden sm:table-cell">
                      <Badge className="text-xs" variant="secondary">
                        {lastHistory?.status.name || 'Unknown'}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <Dialog>
                        <DialogTrigger asChild>
                          <Button
                            className="text-xs mr-2"
                            variant="outline"
                            onClick={() => setSelectedOrder(order)}
                          >
                            View
                          </Button>
                        </DialogTrigger>
                        <DialogContent  className="bg-white">
                          <DialogHeader>
                            <DialogTitle>Order Details</DialogTitle>
                          </DialogHeader>
                          {selectedOrder && (
                            <div className="space-y-4">
                              <p>
                                <strong>Order ID:</strong> {selectedOrder.id}
                              </p>
                              <p>
                                <strong>Address:</strong> {selectedOrder.address}
                              </p>
                              <p>
                                <strong>Price:</strong> {selectedOrder.total_price}
                              </p>
                              <p>
                                <strong>Creation Date:</strong> {selectedOrder.created_at}
                              </p>
                              <p>
                                <strong>User:</strong> {selectedOrder.user.name} ({selectedOrder.user.email})
                              </p>
                              <p>
                                <strong>Order History:</strong>
                              </p>
                              <ul className="list-disc pl-5">
                                {selectedOrder.orderHistory.map((history) => (
                                  <li key={history.id}>
                                    {history.changed_at} - {history.status.name} ({history.status.description})
                                  </li>
                                ))}
                              </ul>
                              <div>
                                <strong>Change Status:</strong>
                                <Select
                                  onValueChange={(value) => setSelectedStatus(value)}
                                >
                                  <SelectTrigger className="w-full">
                                    <SelectValue placeholder="Select a status" />
                                  </SelectTrigger>
                                  <SelectContent>
                                    <SelectItem value="ae59b871-eb1c-46bc-94e9-51be7eb484e7">Pending</SelectItem>
                                    <SelectItem value="05683864-9c94-4a2d-aadf-94457c2c989d">In Progress</SelectItem>
                                    <SelectItem value="17d5c4f4-fabb-4a43-a368-7107004347c4">Delivered</SelectItem>
                                  </SelectContent>
                                </Select>
                              </div>
                              <Button
                                className="mt-4"
                                variant="default"
                                onClick={handleStatusChange}
                                disabled={!selectedStatus}
                              >
                                Update Status
                              </Button>
                            </div>
                          )}
                        </DialogContent>
                      </Dialog>
                      <Button className="text-xs" variant="outline">
                        Delete
                      </Button>
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}
