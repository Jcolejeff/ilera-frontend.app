import FunkyPagesHero from 'components/general/FunkyPagesHero';
import PillTabs from 'components/general/PillTabs';
import SearchComboBox from 'components/general/SearchComboBox';
import { useState } from 'react';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import demoBlogImg from 'assets/image/blogImg.png';
import demoDp from 'assets/image/demoDp.jpg';
import Card from 'components/general/Card';
import { shimmer, toBase64 } from 'utils/general/shimmer';
import { useQuery } from '@tanstack/react-query';
import { apiInterface, contentApiItemInterface } from 'types';
import contentService from 'services/content';
import CONSTANTS from 'constant';
import { processError } from 'helper/error';
import { formatDate } from 'lib/utils';
import FeaturedLoader from 'components/Loaders/FeaturedLoader';
import ContentLoader from 'components/general/ContentLoader';
import EmptyContentWrapper from 'components/Hocs/EmptyContentWrapper';
import assistantsList from './data';
import { useNavigate } from 'react-router-dom';

type filterTypes =
  | 'All'
  | 'Production'
  | 'Post-production'
  | 'Distribution and Marketing'
  | 'Animation';

const generalFilters: filterTypes[] = [
  'All',
  'Production',
  'Post-production',
  'Distribution and Marketing',
  'Animation',
];

const AllAssistantsPage = () => {
  const [currFilter, setCurrFilter] = useState<filterTypes>('All');
  const navigate = useNavigate();

  // const { data: blogs, isLoading: blogLoading } = useQuery<
  //   any,
  //   any,
  //   apiInterface<contentApiItemInterface[]>
  // >({
  //   queryKey: ['get-blogs'],
  //   queryFn: () =>
  //     contentService.getContent({
  //       organization_id: import.meta.env.VITE_TIMBU_ORG_ID,
  //       category: CONSTANTS.TIMBU_KEYS.BLOG_ID,
  //     }),
  //   onError: (err) => {
  //     processError(err);
  //   },
  // });
  // console.log(blogs);

  return (
    <div className='container my-[1.125rem] flex flex-col px-container-base lg:px-container-lg'>
      <article className='mb-12 mt-7 flex items-center justify-between'>
        <div>
          <p className='font-bold md:text-[19px]'>My App Assistant</p>
          <p className='text-sm text-gray-400'>
            A list of all assistants in your account that you have created
          </p>
        </div>
        <button
          onClick={() => navigate(CONSTANTS.ROUTES['create-account'])}
          className='hidden rounded-md bg-primary-1 px-6 py-2 text-[0.81rem] leading-[24px] tracking-[0.15px] text-white transition-opacity duration-300 ease-in-out hover:opacity-90 md:flex'
        >
          Create App Assistant
        </button>
      </article>
      {/* <EmptyContentWrapper
        isEmpty={!blogLoading && blogs?.items && blogs?.items?.length < 1}
        customMessage="You haven't created an assistant yet?. Create App Assistant"
      >
        <div className='mb-[7.68rem] flex w-full  flex-col gap-[2.5rem]'>
          <ContentLoader isLoading={blogLoading}>
            <div className='grid grid-cols-1 gap-[2.69rem] sm:grid-cols-2   md:grid-cols-3 xl:grid-cols-4'>
              {assistantsList?.items?.map((i, idx) => (
                <div key={idx} className='h-full w-full'>
                  <Card
                    authorImg={demoDp}
                    authorName={`${i?.content_author?.first_name} ${i?.content_author?.last_name}`}
                    authorRole={`${i?.content_author?.email}`}
                    blogImage={`${CONSTANTS.TIMBU_KEYS.IMAGE_BASE_URL}/${i?.photos?.[0]?.url}`}
                    category={`5 times`}
                    date={`18 April, 2022`}
                    description={i?.subtitle}
                    title={'Hotels.ng'}
                    link={`/app/dashboard?${i?.id}`}
                  />
                </div>
              ))}
            </div>
          </ContentLoader>
        </div>
      </EmptyContentWrapper> */}
    </div>
  );
};

export default AllAssistantsPage;
