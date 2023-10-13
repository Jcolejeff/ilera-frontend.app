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

const SingleMasterClass = () => {
  const navigate = useNavigate();
  const [liked, setLiked] = useState(false);

  const { id } = useParams();

  const { data, isLoading } = useQuery<any, any, apiInterfaceV2<contentApiItemInterface>>({
    queryKey: ['get-blogs', id],
    queryFn: () =>
      contentService.getSingleContent({
        organization_id: import.meta.env.VITE_TIMBU_ORG_ID,
        id,
      }),
    onError: (err) => {
      processError(err);
    },
  });

  return (
    <main className='relative w-full px-container-base '>
      <div className='w-full md:my-[1.5rem] rounded-[1rem] py-[1rem] sm:py-[.25rem]  sm:px-[0.5rem] flex flex-col '>
        <section>
          <div className='flex justify-between items-start mb-1 md:mb-6'>
            <button
              onClick={() => navigate(-1)}
              className=' mb-4  rounded-[15px] flex items-center justify-center gap-2 group hover:opacity-90 transition-all duration-300 ease-in-out'
            >
              <Icon
                name='arrowBack'
                svgProp={{
                  className:
                    ' bg-white rounded-2xl px-1 cursor-pointer hover:opacity-95 transition-opacity duration-300 ease-in-out active:opacity-100',
                }}
              />
              <span className='font-[500] text-sm leading-[24px] tracking-[0.4px]'> Go Back</span>
            </button>
          </div>

          <section className='grid grid-cols-1 md:grid-cols-[4.7fr_2fr] gap-4'>
            <div className=' flex flex-col gap-4'>
              {/* title section */}
              <section className='flex  bg-white rounded-md p-5 px-8 '>
                <div className='flex items-start gap-2'>
                  <div>
                    <LazyLoadImage
                      placeholderSrc={`data:image/svg+xml;base64,${toBase64(shimmer(700, 475))}`}
                      src='https://github.com/shadcn.png'
                      alt=' '
                      className='w-[2.5rem] md:w-[3rem] rounded-lg object-cover transition-transform duration-300 ease-in-out bg-top bg-cover group-hover:scale-105'
                    />
                  </div>

                  <div className='flex gap-1  flex-col'>
                    <h3 className='font-semibold text-sm '>
                      "From Script to Screen: The Filmmaking Process"
                    </h3>
                    <p className='text-xs md:text-sm  text-primary-2'>Coming Up: 11/04/22023</p>
                  </div>
                </div>
              </section>
              {/* masterclass location section */}
              <section className='bg-white p-8 py-5 rounded-md'>
                <section className='flex flex-col gap-10 '>
                  <div className='flex justify-between items-start gap-4'>
                    <div className='flex flex-col gap-2 '>
                      <div className='flex gap-4 items-center'>
                        <h3 className=' font-[700] text-sm'>Landmark Events, Lagos</h3>
                      </div>
                      <div className='flex gap-2  flex-col md:flex-row'>
                        <p className='text-sm opacity-50'>location</p>
                      </div>
                    </div>

                    <button className=' px-1 md:px-5 py-1 bg-none  border-primary-2 border rounded-lg  flex items-center justify-center gap-2 group hover:opacity-90 transition-all duration-300 ease-in-out'>
                      <span className='font-light text-xs md:text-sm leading-[24px]tracking-[0.4px'>
                        Google Maps
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
              </section>
              {/* about master class section */}
              <section className='bg-white p-8 rounded-md'>
                <div className='flex justify-between items-center'>
                  <h4 className='relative font-[700] text-sm leading-[40px] tracking-[0.15px]'>
                    About Masterclass
                  </h4>
                </div>

                <p className='text-sm leading-[30px] tracking-[0.15px] text-gray-500'>
                  "Elevator Baby" is a Nigerian drama film that tells the story of a wealthy young
                  man who finds himself stuck in an elevator with a pregnant woman from a lower
                  socioeconomic background. Directed by Akhigbe Ilozobhie and produced by Victoria
                  Akujobi, the film stars Toyin Abraham and Timini Egbuson in lead roles. The idea
                  for the film was inspired by a real-life incident that happened to one of the
                  producers. From there, the team worked hard to develop a compelling script that
                  would touch on important social issues such as class, privilege, and gender. The
                  film was shot in Lagos, Nigeria, and features stunning cinematography that
                  showcases the city's vibrant energy and unique character. The cast and crew worked
                  tirelessly to bring the story to life, delivering powerful performances that have
                  resonated with audiences both in Nigeria and around the world.
                </p>
              </section>
            </div>
            <div className=' '>
              <RegistrationForm />
            </div>
          </section>
        </section>
      </div>
    </main>
  );
};

export default SingleMasterClass;
