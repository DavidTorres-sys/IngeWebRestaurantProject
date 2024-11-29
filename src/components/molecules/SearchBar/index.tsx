import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Select, SelectTrigger, SelectContent, SelectItem, SelectValue } from "@/components/ui/select";
import { Form } from "@/components/ui/form";

export const SearchBar = () => {
  return (
    <Form>
      <Card className="p-4 shadow-2xl rounded-xl flex items-center space-x-4 gap-4 content-end">
        {/* Search Input */}
        <div className="flex-1">
          <label htmlFor="search" className="block text-sm font-medium text-gray-700">
            What are you looking for?
          </label>
          <div className="relative mt-1">
            <Input
              id="search"
              type="text"
              placeholder="Search for name or email"
              className="pr-10"
            />
            <span className="absolute inset-y-0 right-3 flex items-center pointer-events-none">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-5 h-5 text-gray-400"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M21 21l-4.35-4.35m-3.4-1.65A7.5 7.5 0 1118.75 9 7.5 7.5 0 0113.25 15"
                />
              </svg>
            </span>
          </div>
        </div>

        {/* Role Dropdown */}
        <div>
          <label htmlFor="role" className="block text-sm font-medium text-gray-700">
            Role
          </label>
          <Select>
            <SelectTrigger id="role" className="w-[150px]">
              <SelectValue placeholder="All" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All</SelectItem>
              <SelectItem value="admin">Admin</SelectItem>
              <SelectItem value="user">User</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Search Button */}
        <Button variant="default" className="bg-primary 0 text-white transition ease-in-out delay-15 hover:-translate-y-1 hover:scale-110 hover:bg-red-500 duration-300">
          Search
        </Button>
      </Card>
    </Form>
  );
};
