import { Dialog, DialogContent, DialogTrigger } from 'components/shadcn/dialog';

import { useState } from 'react';
import Icon from 'utils/Icon';
import { useNavigate } from 'react-router-dom';

interface Iprop {
  trigger: JSX.Element;
  triggerClassName?: string;
  title?: string;
}

const SavePatientModal = ({ trigger, triggerClassName, title }: Iprop) => {
  const [modalOpen, setModalOpen] = useState(false);
  const navigate = useNavigate();

  return (
    <Dialog onOpenChange={(i) => setModalOpen(i)} open={modalOpen}>
      <DialogTrigger className={triggerClassName}>{trigger}</DialogTrigger>
      <DialogContent className='no-scrollbar mt-4 w-fit max-w-full overflow-auto  overflow-x-hidden bg-white  px-6  md:!max-w-[1000px] lg:px-[6rem]'>
        <div className='flex w-full flex-col '>
          <div className='flex w-full flex-col items-center justify-center gap-[0.87rem] py-6'>
            {/* <Icon name='saveIcon' svgProp={{ className: 'w-20 h-16 text-gray-500' }} /> */}
            <p className='text-xl font-semibold'>Duplicate Patient Found</p>
            <p className='text-gray-500'>
              There is an already existing patient with the same Names as the new patient.
            </p>

            {/* <button
              className='w-full rounded-md bg-primary-1 px-8 py-4 font-semibold text-white'
              onClick={() => navigate(-1)}
            >
              View saved pages
            </button> */}
            <div className='flex gap-4'>
              <button className='group flex  items-center justify-center gap-2  rounded-[5px] bg-primary-1 px-8 py-2 text-base font-semibold text-white transition-all duration-300 ease-in-out hover:opacity-90'>
                <span className='text-xs font-[500] leading-[24px] tracking-[0.4px] text-white md:text-sm'>
                  Confirm Existing
                </span>
              </button>

              <button className='group flex  items-center justify-center gap-2  rounded-[5px] border   px-5 text-base font-semibold transition-all duration-300 ease-in-out hover:opacity-90'>
                <span className='text-xs font-[500] leading-[24px] tracking-[0.4px]  md:text-sm'>
                  Still Create Patient
                </span>
              </button>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default SavePatientModal;
