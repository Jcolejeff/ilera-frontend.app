import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { useState } from 'react';
import * as z from 'zod';
import { Button } from 'components/shadcn/ui/button';
import { Checkbox } from 'components/shadcn/ui/checkbox';
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from 'components/shadcn/ui/form';
import { Input } from 'components/shadcn/input';
import Toast from 'react-hot-toast';
import { set } from 'date-fns';

const items = [
  {
    id: 'online',
    label: 'Online',
  },
  {
    id: 'onSite',
    label: 'On-Site',
  },
  {
    id: 'notSure',
    label: 'Not Sure',
  },
] as const;
const FormSchema = z.object({
  email: z
    .string({
      required_error: 'Please enter a valid email.',
    })
    .min(2, {
      message: 'Please enter a valid email.',
    })
    .email(),
  firstName: z
    .string({
      required_error: 'Please enter a valid first name.',
    })
    .min(2, {
      message: 'Please enter a valid first name.',
    }),
  lastName: z.string({
    required_error: 'Please enter a valid last name.',
  }),
  items: z.array(z.string()).refine((value) => value.some((item) => item), {
    message: 'You have to select at least one item.',
  }),
});
const RegistrationForm = () => {
  const [completed, setCompleted] = useState<boolean>(false);
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      items: ['online'],
    },
  });

  function onSubmit(data: z.infer<typeof FormSchema>) {
    setCompleted(true);
    console.log(data);

    Toast.success('Congratulations! You have successfully registered for this Master Class', {
      duration: 4000,
    });
  }

  return (
    <section
      className={
        completed
          ? 'opacity-40 cursor-not-allowed transition-all duration-300 ease-in-out'
          : 'transition-all duration-300 ease-in-out'
      }
    >
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className='w-full space-y-6'>
          <section className='bg-white grid grid-cols-[1fr] gap-6  p-6  rounded-md'>
            <div className='flex justify-between items-center'>
              <h4 className='relative font-[700] text-sm leading-[40px] tracking-[0.15px]'>
                Register
              </h4>
            </div>
            <FormField
              control={form.control}
              name='firstName'
              render={({ field }) => (
                <FormItem>
                  <div className='relative'>
                    <label className='absolute top-[-20%] left-2 bg-white rounded-full font-extralight text-secondary-1 text-xs px-1'>
                      First Name
                    </label>
                    <FormControl>
                      <Input className=' text-secondary-3' {...field} />
                    </FormControl>
                  </div>
                  <FormMessage className='text-xs mt-1' />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name='lastName'
              render={({ field }) => (
                <FormItem>
                  <div className='relative'>
                    <label className='absolute top-[-20%] left-2 bg-white rounded-full font-extralight text-secondary-1 text-xs px-1'>
                      Last Name
                    </label>
                    <FormControl>
                      <Input className=' text-secondary-3' {...field} />
                    </FormControl>
                  </div>
                  <FormMessage className='text-xs mt-1' />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name='email'
              render={({ field }) => (
                <FormItem>
                  <div className='relative'>
                    <label className='absolute top-[-20%] left-2 bg-white rounded-full font-extralight text-secondary-1 text-xs px-1'>
                      Email
                    </label>
                    <FormControl>
                      <Input className=' text-secondary-3' {...field} />
                    </FormControl>
                  </div>
                  <FormMessage className='text-xs mt-1' />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name='items'
              render={() => (
                <FormItem>
                  <div className='mb-4'>
                    <FormDescription>How would you like to attend?</FormDescription>
                  </div>
                  {items.map((item) => (
                    <FormField
                      key={item.id}
                      control={form.control}
                      name='items'
                      render={({ field }) => {
                        return (
                          <FormItem
                            key={item.id}
                            className='flex flex-row items-start space-x-3 space-y-0'
                          >
                            <FormControl>
                              <Checkbox
                                checked={field.value?.includes(item.id)}
                                onCheckedChange={(checked) => {
                                  return checked
                                    ? field.onChange([...field.value, item.id])
                                    : field.onChange(
                                        field.value?.filter((value) => value !== item.id),
                                      );
                                }}
                              />
                            </FormControl>
                            <FormLabel className='text-sm text-gray-500 font-normal'>
                              {item.label}
                            </FormLabel>
                          </FormItem>
                        );
                      }}
                    />
                  ))}
                  <FormMessage />
                </FormItem>
              )}
            />
          </section>
          <Button
            disabled={completed}
            type='submit'
            className={` w-full p-2 disabled:cursor-not-allowed bg-primary-1 rounded-md flex items-center justify-center gap-2 group hover:opacity-90 transition-all duration-300 ease-in-out`}
          >
            <span className='font-light text-white text-sm leading-[24px] tracking-[0.4px]'>
              Register
            </span>
          </Button>
        </form>
      </Form>
    </section>
  );
};

export default RegistrationForm;
