import React from 'react';
import Icon from 'utils/Icon';

const Attachments = () => {
  return (
    <section className='h-full w-full rounded-md bg-white p-8 py-0'>
      <section className='flex flex-col gap-10 '>
        <div className='flex items-center justify-between gap-4'>
          <h3 className=' text-sm font-[700]'>Attachments</h3>

          <button className=' group flex items-center justify-center  gap-2 rounded-lg border  border-primary-2 bg-none px-1 py-1 transition-all duration-300 ease-in-out hover:opacity-90 md:px-5'>
            <span className='leading-[24px]tracking-[0.4px text-xs font-light md:text-sm'>
              New Attachment
            </span>
            <Icon
              name='locationIconBlack'
              svgProp={{
                className:
                  ' w-[1rem] md:w-[1rem] h-[1rem] md:w-[1rem] cursor-pointer hover:opacity-95 transition-opacity duration-300 ease-in-out active:opacity-100',
              }}
            />
          </button>
        </div>
      </section>
      {/* about master class section */}
      <section className='mt-12 h-full rounded-md border bg-white px-2 py-4'>
        <p className='h-full'>no attachments found</p>
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
