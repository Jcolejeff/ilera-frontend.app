import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import React from 'react';
import * as z from 'zod';
import { Input } from 'components/shadcn/input';

import { Form, FormField, FormItem, FormMessage, FormControl } from 'components/shadcn/ui/form';
import { toast } from 'components/shadcn/ui/use-toast';
import FileDropzone from './FileDropZone';

const FormSchema = z.object({
  file: z.string({
    required_error: 'Twitter is required.',
  }),
  link: z.string().min(2, {
    message: 'Please enter a valid link',
  }),
  role: z.string().min(2, {
    message: 'Please enter a valid role',
  }),
});
interface Iprops {
  setModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
}
export default function AddResumeForm({ setModalOpen }: Iprops) {
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
  });

  function onSubmit(data: z.infer<typeof FormSchema>) {
    console.log(data);

    toast({
      title: 'You submitted the following values:',
      description: (
        <pre className='mt-2 w-[340px] rounded-md bg-slate-950 p-4'>
          <code className='text-white'>{JSON.stringify(data, null, 2)}</code>
        </pre>
      ),
    });
  }

  // const handleFileDrop = (files: any, setFieldValue: any) => {
  //   setFieldValue('file', files[0]);
  // };
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className='w-full space-y-6'>
        <section className=' mb-4 pb-[3rem] pt-4 sm:mb-4 sm:pb-[4rem] md:mb-1 md:pb-[2rem] lg:mb-1 lg:pb-[10rem] '>
          <FormField
            name='file'
            control={form.control}
            render={({ field }) => (
              <FileDropzone
                onDrop={(acceptedFiles: any) => field.onChange(acceptedFiles[0])}
                file={field.value}
              />
            )}
          />{' '}
          <FormField
            control={form.control}
            name='role'
            render={({ field }) => (
              <FormItem>
                <div className='relative'>
                  <label className=' rounded-full bg-white px-1 text-xs font-extralight text-secondary-1'>
                    Role
                  </label>
                  <FormControl>
                    <Input className=' text-secondary-3' {...field} />
                  </FormControl>
                </div>
                <FormMessage className='mt-1 text-xs' />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name='link'
            render={({ field }) => (
              <FormItem>
                <div className='relative'>
                  <label className=' rounded-full bg-white px-1 text-xs font-extralight text-secondary-1'>
                    Project Link
                  </label>
                  <FormControl>
                    <Input className=' text-secondary-3' {...field} />
                  </FormControl>
                </div>
                <FormMessage className='mt-1 text-xs' />
              </FormItem>
            )}
          />
        </section>
        <div className='flex w-full items-center justify-end gap-4'>
          <button
            type='submit'
            //     onClick={() => doSubSelection()}
            className='group flex h-[38px] w-[130px] items-center justify-center gap-2 rounded-[6px] bg-primary-1 transition-all duration-300 ease-in-out hover:opacity-90'
          >
            <span className='text-xs font-[500]  leading-[24px] tracking-[0.4px] text-white'>
              {`Save Changes`.toUpperCase()}
            </span>
          </button>
          <button
            onClick={() => setModalOpen(false)}
            type='button'
            className='group flex h-[38px] w-max items-center justify-center gap-2 rounded-[6px] bg-white px-[0.87rem] shadow-9 transition-all duration-300 ease-in-out hover:opacity-90'
          >
            <span className='whitespace-nowrap text-xs font-[500] leading-[24px] tracking-[0.4px] text-primary-1'>
              {`Cancel`.toUpperCase()}
            </span>
          </button>
        </div>
      </form>
    </Form>
  );
}
