import { LazyLoadImage } from 'react-lazy-load-image-component';
import { useNavigate, useParams } from 'react-router-dom';
import RegistrationForm from './RegistrationForm';
import Icon from 'utils/Icon';
import { shimmer, toBase64 } from 'utils/general/shimmer';
import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import contentService from 'services/content';
import { processError } from 'helper/error';
import { apiInterfaceV2, contentApiItemInterface } from 'types';
import sections from 'pages/app/patients/tempData';
import { cn } from 'lib/utils';
import Timeline from './Timeline';
import Attachments from './Attachments';
import DeletePatient from 'components/modal/Patients/DeletePatient';

const SinglePatientPage = () => {
  const navigate = useNavigate();
  const [liked, setLiked] = useState(false);

  const { id } = useParams();

  // const { data, isLoading } = useQuery<any, any, apiInterfaceV2<contentApiItemInterface>>({
  //   queryKey: ['get-blogs', id],
  //   queryFn: () =>
  //     contentService.getSingleContent({
  //       organization_id: import.meta.env.VITE_TIMBU_ORG_ID,
  //       id,
  //     }),
  //   onError: (err) => {
  //     processError(err);
  //   },
  // });

  return (
    <main className='relative h-full w-full px-container-base  '>
      <div className='flex w-full flex-col gap-8 rounded-[1rem]  py-[1rem] sm:px-[0.5rem] sm:py-[.25rem] md:my-[1.5rem]'>
        <div className=' flex items-start justify-between'>
          <button
            onClick={() => navigate(-1)}
            className=' group   flex items-center justify-center gap-2 rounded-[15px] transition-all duration-300 ease-in-out hover:opacity-90'
          >
            <Icon
              name='arrowBack'
              svgProp={{
                className:
                  ' bg-white rounded-2xl px-1 cursor-pointer hover:opacity-95 transition-opacity duration-300 ease-in-out active:opacity-100',
              }}
            />
            <span className='text-base font-[500] leading-[24px] tracking-[0.4px]'> Back</span>
          </button>
          {/* <DeletePatient /> */}
        </div>

        <div className=' flex flex-col gap-4'>
          {/* title section */}
          <section className='flex  rounded-md bg-white '>
            <div className='flex items-center gap-4'>
              <div>
                <LazyLoadImage
                  placeholderSrc={`data:image/svg+xml;base64,${toBase64(shimmer(700, 475))}`}
                  src='https://github.com/shadcn.png'
                  alt=' '
                  className='w-[2.5rem] rounded-lg bg-cover bg-top object-cover transition-transform duration-300 ease-in-out group-hover:scale-105 md:w-[7rem]'
                />
              </div>

              <div className='flex flex-col  gap-1'>
                <div className='flex items-center gap-2'>
                  <h3 className='text-xl font-bold '>Blessing Bamigboye Oluwadamilare</h3>
                  <Icon name='linkIcon' svgProp={{ className: 'w-[1.5rem] h-[2rem]' }} />
                </div>
                <p className='text-xs   text-gray-500 md:text-base '>Email: blessingb@ilera.io</p>
                <p className='text-xs   text-gray-500 md:text-base '>Phone Number: 09094988638</p>
              </div>
            </div>
          </section>
        </div>

        <section className=' grid grid-cols-[1fr_1fr]  gap-[2rem] rounded-lg md:grid-cols-[1fr_1fr_1fr]  xxl:grid-cols-[1fr_1fr_1fr_1fr]'>
          {sections.slice(0, 4).map((item, key) => {
            return (
              <article
                className={cn(
                  `} cursor-pointer rounded-lg border px-5 py-6 opacity-50 transition-all duration-500 ease-in-out`,
                )}
                key={key}
              >
                <div className='flex flex-col gap-1  px-2'>
                  <h3 className='text-sm font-semibold'>{item.heading}</h3>
                  <p>
                    <span className='font-bold md:text-[1.5rem]'>{item.count}</span>
                    {/* <span className='text-[0.8rem] font-semibold'>%</span> */}
                  </p>
                  <p className='text-[0.79rem] leading-[130%] tracking-[0.02rem] md:leading-[1.2rem] md:tracking-[0.0125rem]'>
                    {item.paragraph}
                  </p>
                </div>
              </article>
            );
          })}
        </section>
        <div className='grid grid-cols-1 gap-4 md:grid-cols-[2.8fr_2fr] '>
          <Timeline />
          <Attachments />
        </div>
      </div>
    </main>
  );
};

export default SinglePatientPage;
