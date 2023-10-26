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

const MergePatientModal = ({ trigger, triggerClassName, title }: Iprop) => {
  const [modalOpen, setModalOpen] = useState(false);
  const navigate = useNavigate();

  return (
    <Dialog onOpenChange={(i) => setModalOpen(i)} open={modalOpen}>
      <DialogTrigger className={triggerClassName}>{trigger}</DialogTrigger>
      <DialogContent className='no-scrollbar mt-4 h-full w-full max-w-full overflow-auto  overflow-x-hidden bg-white  px-6  md:!max-w-[700px] lg:px-[2rem]'>
        <div className='flex w-full flex-col '>
          <div className='w-full gap-[0.87rem] py-6'>
            {/* <Icon name='saveIcon' svgProp={{ className: 'w-20 h-16 text-gray-500' }} /> */}
            <p className='mb-6 text-xl font-semibold'>Merge Patient</p>
            <div>
              <p className=' mb-4 font-semibold capitalize'>source patient</p>
              <div className='grid gap-4 rounded-lg border px-4 py-2 md:grid-cols-3'>
                <TextInfoSTack title='Patient ID' text='123456789' />
                <TextInfoSTack title='Patient Name' text='Adeoluwa Siyanbade' />
                <TextInfoSTack title='Email' text='1Adeoluwa Siyanbade@gmaucine' />
                <TextInfoSTack title='Date of Birth' text='123456789' />
                <TextInfoSTack title='Age' text='123456789' />
                <TextInfoSTack title='Country' text='Usa' />
              </div>
            </div>
            <div className='my-12 space-y-3'>
              <p className='text-sm font-semibold'>Search Destination Patient</p>
              <div className='flex flex-grow items-center rounded-lg border px-6 '>
                <input className='form-input mx-2 flex-grow border-0  placeholder:text-sm placeholder:font-bold placeholder:text-textColor-disabled focus:!ring-0' />
                <Icon name='searchIcon' svgProp={{ className: 'text-primary-9' }} />
              </div>
            </div>
            <div>
              <div className='grid gap-4 rounded-lg border px-4 py-2 md:grid-cols-3'>
                <TextInfoSTack title='Patient ID' text='123456789' />
                <TextInfoSTack title='Patient Name' text='Adeoluwa Siyanbade' />
                <TextInfoSTack title='Email' text='1Adeoluwa Siyanbade@gmaucine' />
                <TextInfoSTack title='Date of Birth' text='123456789' />
                <TextInfoSTack title='Age' text='123456789' />
                <TextInfoSTack title='Country' text='Usa' />
              </div>
            </div>
            <section className='my-8  space-y-3'>
              <div className='flex flex-row items-center space-x-3 space-y-0 rounded-md '>
                <Checkbox />

                <div className=' leading-none'>
                  <label className='text-sm font-semibold '>
                    Merge destination patient to source patient
                  </label>
                </div>
              </div>
              <div className='flex flex-row items-center space-x-3 space-y-0 rounded-md '>
                <Checkbox />

                <div className=' leading-none'>
                  <label className='text-sm font-semibold'>
                    Merge source patient to destination patient
                  </label>
                </div>
              </div>
            </section>

            <div className='my-4 flex w-full justify-end gap-4'>
              <button className='group flex  items-center justify-center gap-2  rounded-[5px] bg-primary-1 px-8 py-2 text-base font-semibold text-white transition-all duration-300 ease-in-out hover:opacity-90'>
                <span className='text-xs font-[500] leading-[24px] tracking-[0.4px] text-white md:text-sm'>
                  Merge Patient
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

export default MergePatientModal;
