import { Dialog, DialogContent, DialogTrigger } from 'components/shadcn/dialog';

import { useState } from 'react';
import Icon from 'utils/Icon';
import { useNavigate } from 'react-router-dom';
import TextInfoSTack from 'components/general/InfoStack/InfoStack';
import { Checkbox } from 'components/shadcn/checkbox';

interface Iprop {
  trigger: JSX.Element;
  triggerClassName?: string;
  title?: string;
}

const ViewLinkedPatientsModal = ({ trigger, triggerClassName, title }: Iprop) => {
  const [modalOpen, setModalOpen] = useState(false);
  const navigate = useNavigate();

  return (
    <Dialog onOpenChange={(i) => setModalOpen(i)} open={modalOpen}>
      <DialogTrigger className={triggerClassName}>{trigger}</DialogTrigger>
      <DialogContent className='no-scrollbar mt-4 h-fit w-full max-w-full overflow-auto  overflow-x-hidden bg-white  px-6  md:!max-w-[700px] lg:px-[2rem]'>
        <div className='flex w-full flex-col '>
          <div className='w-full gap-[0.87rem] py-6'>
            {/* <Icon name='saveIcon' svgProp={{ className: 'w-20 h-16 text-gray-500' }} /> */}
            <p className='mb-6 text-xl font-semibold'>Linked Patient</p>

            <div className='my-6 space-y-3'>
              <p className='text-sm font-semibold'>Search</p>
              <div className='flex flex-grow items-center rounded-lg border px-6  '>
                <input className='form-input mx-2 flex-grow border-0  placeholder:text-sm placeholder:font-bold placeholder:text-textColor-disabled focus:!ring-0' />
                <Icon name='searchIcon' svgProp={{ className: 'text-primary-9' }} />
              </div>
            </div>
            <div>
              <div className='flex h-full flex-col items-center justify-center gap-1 rounded-lg border px-4 py-7 '>
                <p className='text-sm font-semibold text-gray-500'>No linked patient found</p>
                <p className='text-xs text-gray-400'>This patient has no other patient linked </p>
              </div>
            </div>

            <div className='my-4 flex w-full justify-end gap-4'>
              <button className='group flex  items-center justify-center gap-2  rounded-[5px] bg-primary-1 px-8 py-2 text-base font-semibold text-white transition-all duration-300 ease-in-out hover:opacity-90'>
                <span className='text-xs font-[500] leading-[24px] tracking-[0.4px] text-white md:text-sm'>
                  Save Changes
                </span>
              </button>

              <button className='group flex  items-center justify-center gap-2  rounded-[5px] border   px-5 text-base font-semibold transition-all duration-300 ease-in-out hover:opacity-90'>
                <span className='text-xs font-[500] leading-[24px] tracking-[0.4px]  md:text-sm'>
                  Cancel
                </span>
              </button>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ViewLinkedPatientsModal;
