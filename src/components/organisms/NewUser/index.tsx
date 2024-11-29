import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { createUser } from '@/utils/api';
import { nanoid } from 'nanoid';
import { useMutation } from '@apollo/client';
import { CREATE_USER } from '@/utils/gql/mutations/user';


const FormSchema = z.object({
  username: z.string().min(2, {
    message: 'Username must be at least 2 characters.',
  }),
  email: z.string().email({
    message: 'Invalid email address.',
  }),
});

export default function InputForm() {
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      username: '',
      email: '',
    },
  });

  const [createUserMutation] = useMutation(CREATE_USER);

  async function onSubmit(data: z.infer<typeof FormSchema>) {
    const password = nanoid();
    try {
      await createUser({
        name: data.username,
        email: data.email,
        password,
      }).then(async (res) => {
        const user = res.usuario;
        console.log(res);
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
              role: 'USER',
              email: user.email,
              image: user.picture,
            },
          },
        });
      });
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <div className="flex w-[900px] h-96 items-center justify-center shadow-lg">
      {/* Left Section */}
      <div className="w-1/2 bg-cover bg-center relative" style={{ backgroundImage: "url('/img/login.png')" }}>
        <div className="absolute inset-0 bg-black bg-opacity-50 flex flex-col justify-center pl-12">
          <h1 className="text-white text-4xl font-bold">RestoRec Restaurant</h1>
          <p className="text-white text-2xl mt-4">Hello, Welcome!</p>
        </div>
      </div>
      <div className="w-1/2 flex justify-center items-center bg-white">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className='w-2/3 space-y-6'>
            <FormField
              control={form.control}
              name='username'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Name</FormLabel>
                  <FormControl>
                    <Input placeholder='shadcn' {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name='email'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input placeholder='shadcn' {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type='submit'>Submit</Button>
          </form>
        </Form>
      </div>
    </div>
  );
}