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
      <section className='h-full rounded-md border bg-white px-2 py-4'>
        <div className='flex items-center justify-between'>
          <h4 className='relative text-sm font-[700] leading-[40px] tracking-[0.15px]'>
            About Masterclass
          </h4>
        </div>

        <p className='text-sm leading-[30px] tracking-[0.15px] text-gray-500'>
          "Elevator Baby" is a Nigerian drama film that tells the story of a wealthy young man who
          finds himself stuck in an elevator with a pregnant woman from a lower socioeconomic
          background. Directed by Akhigbe Ilozobhie and produced by Victoria Akujobi, the film stars
          Toyin Abraham and Timini Egbuson in lead roles. The idea for the film was inspired by a
          real-life incident that happened to one of the producers. From there, the team worked hard
          to develop a compelling script that would touch on important social issues such as class,
          privilege, and gender. The film was shot in Lagos, Nigeria, and features stunning
          cinematography that showcases the city's vibrant energy and unique character. The cast and
          crew worked tirelessly to bring the story to life, delivering powerful performances that
          have resonated with audiences both in Nigeria and around the world. privilege, and gender.
          The film was shot in Lagos, Nigeria, and features stunning cinematography that showcases
          the city's vibrant energy and unique character. The cast and crew worked tirelessly to
          bring the story to life, delivering powerful performances that have resonated with
          audiences both in Nigeria and around the world.
        </p>
      </section>
    </section>
  );
};

export default Attachments;
