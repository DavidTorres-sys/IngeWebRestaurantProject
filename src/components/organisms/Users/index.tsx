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
import { GET_ALL_USERS } from '@/utils/gql/queries/users';
import React from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { SearchBar } from '@/components/molecules/SearchBar';

type User = {
  id: string;
  name: string;
  email: string;
  image: string;
  role: string;
};

const PAGE_SIZE = 10; // Define how many items you want per page

export default function Component() {
  const [currentPage, setCurrentPage] = React.useState(1);

  const { data, loading, error } = useQuery(GET_ALL_USERS, {
    variables: { page: currentPage, pageSize: PAGE_SIZE },
    fetchPolicy: 'cache-and-network',
  });

  const users = data ? data.users : [];
  const totalUsers = data ? data.totalUsers : 0;

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  return (
    <div>
      <SearchBar />
      <Card className='shadow-2xl rounded-lg mt-10 '>
        <CardHeader className="flex flex-row justify-between items-center">
          <CardTitle>Users</CardTitle>
          <Link className="flex text-right" href="/users/new">
            <Button className="text-xs text-white">Add User</Button>
          </Link>
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
                      {user.role}
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
