import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from 'components/shadcn/ui/alert-dialog';
import { Button } from 'components/shadcn/ui/button';
import { tr } from 'date-fns/locale';
import Icon from 'utils/Icon';

export default function DeletePatient({
  btnText,
  title,
  description,
  action,
  cancel,
}: {
  btnText?: string;
  title?: string;
  description?: string;
  action?: string;
  cancel?: string;
}) {
  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        {/* <Button
          variant='outline'
          className=' h-[3.15rem] w-[3.1rem] rounded-full  p-4 text-xl font-light shadow-md focus:border-none active:border-none'
        >
          x
        </Button> */}
        <Button
          variant='outline'
          className='flex w-full  items-center justify-start gap-2 border-0 p-0 px-2 capitalize text-red-500 disabled:cursor-not-allowed disabled:opacity-50'
          onClick={() => {
            setTimeout(() => {
              console.log('delete');
            }, 500);
          }}
        >
          <Icon name='trash' svgProp={{ className: 'text-black' }}></Icon>
          <p>{btnText}</p>
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent className='bg-white'>
        <AlertDialogHeader className='flex flex-col items-center'>
          <AlertDialogTitle className='text-center capitalize'>{btnText}</AlertDialogTitle>
          <AlertDialogDescription className='text-center text-gray-400'>
            Deleting this patient’s profile removes all the information for this patient completely
          </AlertDialogDescription>
          <AlertDialogDescription className='text-center font-semibold text-red-600'>
            This action can not be reversed!
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter className='sm:justify-center'>
          <AlertDialogAction
            className='bg-red-600 capitalize'
            onClick={() => {
              setTimeout(() => {
                console.log('cancel');
              }, 500);
            }}
          >
            {btnText}
          </AlertDialogAction>
          <AlertDialogCancel className='md:px-8'>Cancel</AlertDialogCancel>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
