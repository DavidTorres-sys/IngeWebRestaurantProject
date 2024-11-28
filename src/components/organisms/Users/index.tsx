import { Badge } from '@/components/ui/badge';
import {
  Card,
  CardContent,
  CardDescription,
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
import { Avatar, AvatarImage } from '@/components/ui/avatar';
import { useQuery } from '@apollo/client';
import { GET_ALL_USERS } from '@/utils/queries/users';
import React from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Pagination } from '@/components/ui/pagination';

type User = {
  id: string;
  name: string;
  email: string;
  image: string;
};

const PAGE_SIZE = 10; // Define how many items you want per page

export default function Component() {
  const [currentPage, setCurrentPage] = React.useState(1);

  // Pass variables to the query for pagination
  const { data, loading, error } = useQuery(GET_ALL_USERS, {
    variables: { page: currentPage, pageSize: PAGE_SIZE },
    fetchPolicy: 'cache-and-network',
  });

  const users = data ? data.users : [];
  const totalUsers = data ? data.totalUsers : 0; // Assuming totalUsers is part of the response

  const handlePageChange = (page: number) => {
    setCurrentPage(page); // Update the page when user clicks on a pagination control
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  return (
    <Card className='shadow-lg rounded-lg'>
      <CardHeader className="flex flex-row justify-between items-center">
        <div>
          <CardTitle>Users</CardTitle>
        </div>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader className='bg-primary'>
            <TableRow>
              <TableHead className="text-white hidden md:table-cell">#</TableHead>
              <TableHead className="text-white hidden md:table-cell">Image</TableHead>
              <TableHead className="text-white hidden sm:table-cell">User</TableHead>
              <TableHead className="text-white hidden sm:table-cell">Email</TableHead>
              <TableHead className="text-white hidden md:table-cell">Role</TableHead>
              <TableHead className="text-white hidden md:table-cell">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {users.map((user: User, index: number) => (
              <TableRow key={user.id} className="bg-accent">
                <TableCell>
                  {PAGE_SIZE * (currentPage - 1) + index + 1} 
                </TableCell>
                <TableCell>
                  <Avatar>
                    <AvatarImage src={user.image} alt={user.name} />
                  </Avatar>
                </TableCell>
                <TableCell className="hidden sm:table-cell">
                  <div className="font-medium">{user.name}</div>
                </TableCell>
                <TableCell className="hidden md:table-cell">{user.email}</TableCell>
                <TableCell className="hidden sm:table-cell">
                  <Badge className="text-xs" variant="secondary">
                    Fulfilled
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
  );
}
