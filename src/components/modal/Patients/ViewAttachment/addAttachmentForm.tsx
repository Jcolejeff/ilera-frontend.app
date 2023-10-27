import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import React from 'react';
import * as z from 'zod';
import { Input } from 'components/shadcn/input';

import { Form, FormField, FormItem, FormMessage, FormControl } from 'components/shadcn/ui/form';
import { toast } from 'components/shadcn/ui/use-toast';
import FileDropzone from './FileDropZone';
import { Textarea } from 'components/shadcn/textarea';

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
              <div className='relative w-1/2'>
                <label className=' rounded-full bg-white px-1 text-sm  font-semibold  '>
                  Attachment Name
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
                <label className=' rounded-full bg-white px-1 text-sm  font-semibold  '>
                  Remark
                </label>
                <FormControl>
                  <Textarea rows={2} className=' border-gray-200 text-secondary-3' {...field} />
                </FormControl>
              </div>
              <FormMessage className='mt-1 text-xs' />
            </FormItem>
          )}
        />
        <div className='my-4 flex w-full justify-end gap-4'>
          <button
            type='submit'
            className='group flex  items-center justify-center gap-2  rounded-[5px] bg-primary-1 px-8 py-2 text-base font-semibold text-white transition-all duration-300 ease-in-out hover:opacity-90'
          >
            <span className='text-xs font-[500] leading-[24px] tracking-[0.4px] text-white md:text-sm'>
              Save
            </span>
          </button>

          <button
            onClick={() => setModalOpen(false)}
            className='group flex  items-center justify-center gap-2  rounded-[5px] border   px-5 text-base font-semibold transition-all duration-300 ease-in-out hover:opacity-90'
          >
            <span className='text-xs font-[500] leading-[24px] tracking-[0.4px]  md:text-sm'>
              Cancel
            </span>
          </button>
        </div>
      </form>
    </Form>
  );
}
