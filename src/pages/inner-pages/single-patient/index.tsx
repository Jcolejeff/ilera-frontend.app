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
import TextInfoSTack from 'components/general/InfoStack/InfoStack';
import NormalTableInfoCard from 'components/general/tableInfoCard/NormalTableInfoCard';
import ViewLinkedPatientsModal from 'components/modal/Patients/ViewLinkedPatients';

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
                  <ViewLinkedPatientsModal
                    trigger={
                      <button className='flex items-center gap-2'>
                        <Icon
                          name='linkIcon'
                          svgProp={{ className: 'w-[1.5rem] text-primary-1 h-[2rem]' }}
                        />
                      </button>
                    }
                  />
                </div>
                <p className='text-xs   text-gray-500 md:text-base '>Email: blessingb@ilera.io</p>
                <p className='text-xs   text-gray-500 md:text-base '>Phone Number: 09094988638</p>
              </div>
            </div>
          </section>
        </div>

        <div className='items-stretchs grid gap-4 rounded-lg   md:flex'>
          <div className='grid w-7/12  rounded-lg border  px-4 py-2 md:grid-cols-3'>
            <div className='col-span-3'>
              <TextInfoSTack title='Patient ID' text='123456789' />
            </div>

            <TextInfoSTack title='Gender' text='Male' />
            <TextInfoSTack title='Date of Birth' text='123456789' />
            <TextInfoSTack title='Age' text='123456789' />
            <TextInfoSTack title='Home Address' text='92 Miles Drive, Newark, NJ 07103' />
            <TextInfoSTack title='City' text='Califonia' />
            <TextInfoSTack title='Country' text='Usa' />
          </div>

          <NormalTableInfoCard
            title='Total Visits'
            value={0}
            description='Number of times this
patient has had a visit'
            border
          />
          <NormalTableInfoCard
            title='Total Tests'
            value={0}
            description='Number of times this
patient has had a test'
            border
          />
          <NormalTableInfoCard
            title='Total Prescribtions'
            value={0}
            description='TNumber of times this patient has had drugs.'
            border
          />
        </div>
        <div className='grid grid-cols-1 gap-4 md:grid-cols-[2.8fr_2fr] '>
          <Timeline />
          <Attachments />
        </div>
      </div>
    </main>
  );
};

export default SinglePatientPage;
