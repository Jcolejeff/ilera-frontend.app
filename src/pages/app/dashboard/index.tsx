import FunkyPagesHero from 'components/general/FunkyPagesHero';
import PillTabs from 'components/general/PillTabs';
import SearchComboBox from 'components/general/SearchComboBox';
import PlanGuard from 'guards/PlanGuard';
import { useState } from 'react';
import demoAd from 'assets/image/dashboardAdSample.png';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import Icon from 'utils/Icon';
import BlogCard from 'components/general/Card';
import blogImg from 'assets/image/blogImg.png?format=webp&w=330&h=280&imagetools';
import dpIcon from 'assets/image/demoDp.jpg?format=webp&imagetools';
import BtsCard from 'components/general/BtsCard';
import filmImg from 'assets/image/heyyou.png?format=webp&w=240&h=153&imagetools';
import AssetCard from 'components/general/AssetCard';
import assetImg from 'assets/image/assetFilmImg.png';
import { shimmer, toBase64 } from 'utils/general/shimmer';
import { useQuery } from '@tanstack/react-query';
import { apiInterface, contentApiItemInterface, productInterface } from 'types';
import contentService from 'services/content';
import { processError } from 'helper/error';
import CONSTANTS from 'constant';
import ContentLoader from 'components/general/ContentLoader';
import EmptyContentWrapper from 'components/Hocs/EmptyContentWrapper';
import productService from 'services/product';
import { filterStringsContainingImageExtensions } from 'helper';
import { useNavigate } from 'react-router-dom';

type filterTypes = 'All' | 'Adverts' | 'Blog Posts' | 'BTS' | 'Assets' | 'Upcoming Events';

const generalFilters: filterTypes[] = [
  'All',
  'Adverts',
  'Blog Posts',
  'BTS',
  'Assets',
  'Upcoming Events',
];

const Dashboard = () => {
  const [currFilter, setCurrFilter] = useState<filterTypes>('All');

  //TODO: handle key searchparam of type filterTypes

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

  // const { data: bts, isLoading: btsLoading } = useQuery<
  //   any,
  //   any,
  //   apiInterface<contentApiItemInterface[]>
  // >({
  //   queryKey: ['get-bts'],
  //   queryFn: () =>
  //     contentService.getContent({
  //       organization_id: import.meta.env.VITE_TIMBU_ORG_ID,
  //       category: CONSTANTS.TIMBU_KEYS.BTS_ID,
  //     }),
  //   onError: (err) => {
  //     processError(err);
  //   },
  // });

  // const { data: assets, isLoading: assetsLoading } = useQuery<apiInterface<productInterface[]>>({
  //   queryKey: ['get-assets-templates'],
  //   queryFn: () =>
  //     productService.getProduct({
  //       organization_id: import.meta.env.VITE_TIMBU_ORG_ID,
  //     }),
  //   onError: (err) => {
  //     processError(err);
  //   },
  // });

  return (
    <div className='container flex h-full w-full flex-col overflow-auto px-container-base py-[1.875rem]'>
      <FunkyPagesHero
        // description='Find advertisements and track your activities here'
        title=' Dashboard'
      />
      <PlanGuard page='dashboard'>
        <>
          {/* <div className='relative mx-auto my-[1.5rem] w-full max-w-[800px] md:-top-[1.5rem] md:my-0 md:mb-[1rem]'>
            <SearchComboBox />
          </div>
          <div className='mb-[2.25rem] flex w-full justify-center'>
            <PillTabs
              tabs={generalFilters}
              currActive={currFilter}
              onSelect={(i) => setCurrFilter(i)}
            />
          </div>
          <div className='flex w-full flex-col gap-[2.5rem]'>
            <div className='flex flex-col items-center gap-8 lg:flex-row'>
              <div className='max-h-[424px] w-full max-w-[424px]'>
                <LazyLoadImage
                  placeholderSrc={`data:image/svg+xml;base64,${toBase64(shimmer(700, 475))}`}
                  className='h-full w-full'
                  src={demoAd}
                  effect='blur'
                  alt=' '
                />
              </div>
              <div className='flex flex-col justify-center gap-4'>
                <span className='text-[14px] font-[600] leading-[21px] tracking-[0.1px] text-primary-1 '>
                  Advertisement
                </span>
                <h5 className='text-[32px] font-[700] leading-[43px] text-primary-9'>
                  We’re looking for an Experienced Animator!
                </h5>
                <p className='text-[14px] font-[300] leading-[21px] tracking-[0.15px] text-secondary-2'>
                  Filmmaking is an art form that requires a combination of technical skills and
                  creativity. As a filmmaker, it's essential to understand the different aspects of
                  the craft to bring your vision to life. In this blog post, ...
                </p>
                <button className='group flex w-max items-center justify-center gap-2 rounded-[8px] bg-primary-1 px-[1.5rem] py-[0.75rem] transition-opacity duration-300 ease-in-out hover:opacity-90'>
                  <span className='leading-[28px] tracking-[0.15px] text-white'>Check it Out</span>
                  <Icon
                    name='arrow45'
                    svgProp={{
                      className:
                        'group-hover:translate-x-[2px] transition-transform duration-300 ease-in-out',
                    }}
                  />
                </button>
              </div>
            </div>
            <h3 className='text-[24px] font-[500] leading-[32px] text-primary-9/[0.87]'>
              Continue Reading!
            </h3>
            <EmptyContentWrapper
              customMessage='No blogs currently, pls check back'
              isEmpty={!blogLoading && blogs?.items && blogs?.items?.length < 1}
            >
              <ContentLoader isLoading={blogLoading}>
                <div className='grid grid-cols-1 gap-x-[1.5rem] gap-y-[2.5rem]  sm:grid-cols-2 md:grid-cols-3'>
                  {blogs?.items?.slice(0, 2)?.map((i, idx) => (
                    <div key={idx} className='h-full w-full'>
                      <BlogCard
                        authorImg={dpIcon}
                        authorName={`${i?.content_author?.first_name} ${i?.content_author?.last_name}`}
                        authorRole={`${i?.content_author?.email}`}
                        blogImage={`${CONSTANTS.TIMBU_KEYS.IMAGE_BASE_URL}/${i?.photos?.[0]?.url}`}
                        category={`Production`}
                        date={`18 April, 2022`}
                        description={i?.subtitle}
                        title={i?.title}
                        link={`/app/blogs/${i?.id}`}
                      />
                    </div>
                  ))}
                </div>
              </ContentLoader>
            </EmptyContentWrapper>
            <h3 className='text-[24px] font-[500] leading-[32px] text-primary-9/[0.87]'>
              Continue watching
            </h3>
            <EmptyContentWrapper
              customMessage='No bts currently, pls check back'
              isEmpty={!btsLoading && bts?.items && bts?.items?.length < 1}
            >
              <ContentLoader isLoading={btsLoading}>
                <div className='grid grid-cols-1 gap-x-[1.5rem] gap-y-[2.5rem] sm:grid-cols-2 md:grid-cols-3'>
                  {bts?.items?.slice(0, 2)?.map((i, idx) => (
                    <div key={idx} className='h-full w-full'>
                      <BtsCard
                        btsImage={`${CONSTANTS.TIMBU_KEYS.IMAGE_BASE_URL}/${i?.photos[0]?.url}`}
                        category={`BTS`}
                        title={`${i?.title}`}
                        description={`${i?.subtitle}`}
                        link={`/app/bts/${i?.id}`}
                      />
                    </div>
                  ))}
                </div>
              </ContentLoader>
            </EmptyContentWrapper>
            <h3 className='text-[24px] font-[500] leading-[32px] text-primary-9/[0.87]'>
              Assets and Templates you might like
            </h3>
            <EmptyContentWrapper
              isEmpty={!assetsLoading && assets?.items && assets?.items?.length < 1}
              customMessage='No assets and templates currently'
            >
              <ContentLoader isLoading={assetsLoading}>
                <div className='grid w-full grid-cols-1 gap-x-[1.5rem] gap-y-[3.875rem] sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4'>
                  {assets?.items?.map((i, idx) => (
                    <div key={idx} className='h-full w-full'>
                      <AssetCard
                        desc='Storytelling blueprint for movies.'
                        image={`${CONSTANTS?.TIMBU_KEYS?.IMAGE_BASE_URL}/${
                          filterStringsContainingImageExtensions(
                            i?.photos?.map((i) => i?.url) as string[],
                          )?.[0]
                        }`}
                        title={i?.name}
                        onClick={() =>
                          navigate(`/app/${CONSTANTS.ROUTES['assets-templates']}?open=${i?.id}`)
                        }
                      />
                    </div>
                  ))}
                </div>
              </ContentLoader>
            </EmptyContentWrapper>
          </div> */}
        </>
      </PlanGuard>
    </div>
  );
};

export default Dashboard;
