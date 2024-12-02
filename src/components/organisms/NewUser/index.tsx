import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { nanoid } from 'nanoid';
import { useMutation } from '@apollo/client';
import { CREATE_USER } from '@/utils/gql/mutations/user';
import { createUser } from '@/utils/api';
import { z } from 'zod';
import { Card, CardContent } from "@/components/ui/card";
import { Input } from '@/components/ui/input';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";

const FormSchema = z.object({
  name: z.string().min(2, {
    message: 'Username must be at least 2 characters.',
  }),
  email: z.string().email({
    message: 'Invalid email address.',
  }),
  role: z.enum(['USER', 'ADMIN'], {
    message: 'Invalid role.',
  }),
  image: z
    .any()
    .refine((file) => file instanceof File && file.size > 0, {
      message: 'Image is required.',
    }),
});

export default function InputForm() {
  const { toast } = useToast();
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      name: '',
      email: '',
      role: undefined,
      image: '',
    },
  });

  const [createUserMutation] = useMutation(CREATE_USER);

  async function onSubmit(data: z.infer<typeof FormSchema>) {
    const password = nanoid();
    try {
      await createUser({
        name: data.name,
        email: data.email,
        password,
      }).then(async (res) => {
        const user = res.usuario;
        console.log(user);
        await createUserMutation({
          variables: {
            data: {
              accounts: {
                create: {
                  type: user.identities[0].provider,
                  provider: user.identities[0].provider,
                  providerAccountId: user.user_id,
                },
              },
              name: user.name,
              role: data.role,
              email: user.email,
              image: user.picture,
            },
          },
        });
        toast({
          title: "User Created Successfully",
          description: `User "${data.name}" has been added.`,
        });

        form.reset();
      });
    } catch (error) {
      console.log(error);
      toast({
        title: "Error Creating User",
        description: "Something went wrong. Please try again.",
        variant: "destructive",
      });
    }
  }

  return (
    <div className="mx-auto w-[900px] py-8">
      <h1 className="text-3xl font-bold text-primary mb-6">Add User</h1>
      <hr className="border-t-4 border-red-600 mb-6" />
      <Card className="shadow-2xl rounded-lg overflow-hidden h-auto p-10">
        <CardContent className="flex flex-row justify-center">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="w-2/3 space-y-6">
              {/* Name Field */}
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Name</FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        placeholder="Enter your name"
                        className="focus:ring-primary focus:border-primary"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Email Field */}
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        placeholder="Enter your email"
                        className="focus:ring-primary focus:border-primary"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Role Field */}
              <FormField
                control={form.control}
                name="role"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Role</FormLabel>
                    <FormControl>
                      <Select
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                      >
                        <SelectTrigger className="focus:ring-primary focus:border-primary">
                          <SelectValue placeholder="Select role" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="USER">USER</SelectItem>
                          <SelectItem value="ADMIN">ADMIN</SelectItem>
                        </SelectContent>
                      </Select>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Image Field */}
              <FormField
                control={form.control}
                name="image"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Image</FormLabel>
                    <FormControl>
                      <input
                        type="file"
                        accept="image/*"
                        onChange={(e) => {
                          const file = e.target.files?.[0];
                          field.onChange(file);
                        }}
                        className="block w-full text-sm text-gray-900 border-gray-300 rounded-md shadow-sm focus:ring-primary focus:border-primary"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              {/* Submit Button */}
              <Button
                type="submit"
                className="transition ease-in-out delay-150 hover:-translate-y-1 hover:scale-110 hover:bg-red-500 duration-300"
                variant="default"
                size="lg"
              >
                Submit
              </Button>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
}
