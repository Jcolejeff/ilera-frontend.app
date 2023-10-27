import AddAttachmentModal from 'components/modal/Patients/AddAttactment';
import React from 'react';
import Icon from 'utils/Icon';

const Attachments = () => {
  return (
    <section className='h-full w-full rounded-md bg-white p-8 py-0'>
      <section className='flex flex-col gap-10 '>
        <div className='flex items-center justify-between gap-4'>
          <h3 className=' text-sm font-[700]'>Attachments</h3>
          <AddAttachmentModal
            trigger={
              <button className=' group flex items-center justify-center  gap-2 rounded-lg border  border-primary-2 bg-none px-1 py-1 transition-all duration-300 ease-in-out hover:opacity-90 md:px-5'>
                <span className='leading-[24px]tracking-[0.4px text-xs font-light font-semibold text-primary-1 md:text-sm'>
                  New Attachment
                </span>
              </button>
            }
          />
        </div>
      </section>
      {/* about master class section */}
      <section className='mt-12 flex h-full flex-col items-center justify-center gap-2 rounded-md border bg-white px-2 py-4'>
        <p className='font-semibold text-gray-500'>No attachments here</p>

        <AddAttachmentModal
          trigger={
            <button className='group flex  items-center justify-center gap-2  rounded-[5px] bg-primary-1  px-3 py-2 text-base font-semibold text-white transition-all duration-300 ease-in-out hover:opacity-90'>
              <Icon
                name='addIcon'
                svgProp={{
                  className:
                    'text-primary-1 cursor-pointer hover:opacity-95 transition-opacity duration-300 ease-in-out active:opacity-100',
                }}
              />
              <span className='text-xs font-[500] leading-[24px] tracking-[0.4px] text-white md:text-sm'>
                Add Attachment
              </span>
            </button>
          }
        />
      </section>
      <p className='invisible'>
        Lorem ipsum dolor sit amet, consectetur adipisicing elit. Cum ex laboriosam, sit a
        necessitatibus laborum ratione labore nesciunt hic optio, temporibus et. Repudiandae alias
        ipsum, et ducimus odio atque nesciunt?
      </p>
    </section>
  );
};

export default Attachments;
