import BlogCard from 'components/general/Card';
import FunkyPagesHero from 'components/general/FunkyPagesHero';
import LinksFilter from 'components/general/LinksFilter';
import SearchComboBox from 'components/general/SearchComboBox';
import PlanGuard from 'guards/PlanGuard';
import blogImg from 'assets/image/blogImg.png?format=webp&w=330&h=280&imagetools';
import dpIcon from 'assets/image/demoDp.jpg?format=webp&imagetools';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import { shimmer, toBase64 } from 'utils/general/shimmer';
import demoAd from 'assets/image/blogImg.png';
import Icon from 'utils/Icon';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from 'components/shadcn/dropdown-menu';
import { useQuery } from '@tanstack/react-query';
import contentService from 'services/content';
import { processError } from 'helper/error';
import ContentLoader from 'components/general/ContentLoader';
import { apiInterface, contentApiItemInterface } from 'types';
import FeaturedLoader from 'components/Loaders/FeaturedLoader';
import CONSTANTS from 'constant';
import { useNavigate } from 'react-router-dom';

const VisitsPage = () => {
  const navigate = useNavigate();

  // const { data, isLoading } = useQuery<any, any, apiInterface<contentApiItemInterface[]>>({
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

  return (
    <div className='container flex w-full flex-col px-container-base py-[1.875rem]'>
      <FunkyPagesHero
        // description='Explore Filmmaking blogs'
        title='Visits'
      />
      <PlanGuard page='visits'>
        <>
          {/* <div className='relative mx-auto my-[1.5rem] w-full max-w-[800px] md:-top-[1.5rem] md:my-0 md:mb-[1rem]'>
            <SearchComboBox />
          </div>
          <div className='mb-[2.5rem] flex w-full justify-center'>
            <LinksFilter
              tabs={[
                {
                  link: ``,
                  sublinks: [
                    { title: `Best tv shows`, link: `` },
                    { link: ``, title: `Awards` },
                  ],
                  title: `General`,
                },
                {
                  link: ``,
                  sublinks: [],
                  title: `Production`,
                },
                {
                  link: ``,
                  sublinks: [],
                  title: `Post-production`,
                },
                {
                  link: ``,
                  sublinks: [],
                  title: `Distribution and Marketing`,
                },
                {
                  link: ``,
                  sublinks: [],
                  title: `Animation/vfx`,
                },
              ]}
            />
          </div>

          <div className='mb-[2.5rem] flex w-full items-center justify-between'>
            <h4 className='text-[16px] font-[600] leading-[1.5rem] tracking-[0.00938rem] text-primary-9 sm:text-[1.125rem]'>
              Featured Blogs
            </h4>
            <DropdownMenu>
              <DropdownMenuTrigger className='flex items-center gap-1'>
                <span className='text-[14px] leading-[1.5rem] tracking-[0.00938rem] text-primary-9'>
                  Sorting:
                </span>
                <span className='text-[14px] leading-[1.5rem] tracking-[0.00938rem] text-primary-1'>
                  Popularity
                </span>
                <Icon name='arrowDown' />
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuItem>Top Blogs</DropdownMenuItem>
                <DropdownMenuItem>latest: Acsending</DropdownMenuItem>
                <DropdownMenuItem>Latest: Decending</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>

          <FeaturedLoader isLoading={isLoading}>
            <div className='mb-[2.5rem] flex flex-col items-center gap-8 lg:flex-row'>
              <div className='w-full max-w-[424px] overflow-hidden rounded-[8px]'>
                <LazyLoadImage
                  placeholderSrc={`data:image/svg+xml;base64,${toBase64(shimmer(700, 475))}`}
                  className='h-full w-full bg-cover'
                  src={`${CONSTANTS.TIMBU_KEYS.IMAGE_BASE_URL}/${data?.items[0]?.photos?.[0]?.url}`}
                  effect='blur'
                  alt=' '
                />
              </div>
              <div className='flex max-w-[30rem] flex-col justify-center gap-4'>
                <span className='text-[14px] font-[600] leading-[21px] tracking-[0.1px] text-primary-1 '>
                  Production
                </span>
                <h5 className='text-[32px] font-[700] leading-[43px] text-primary-9'>
                  {data?.items[0]?.title}
                </h5>
                <p className='text-[14px] font-[300] leading-[21px] tracking-[0.15px] text-secondary-2'>
                  {data?.items[0]?.subtitle}
                </p>
                <button
                  onClick={() => navigate(`${data?.items[0]?.id}`)}
                  className='group flex w-max items-center justify-center gap-2 rounded-[8px] bg-primary-1 px-[1.5rem] py-[0.75rem] transition-opacity duration-300 ease-in-out hover:opacity-90'
                >
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
          </FeaturedLoader>

          <ContentLoader isLoading={isLoading} numberOfBlocks={6}>
            <div className='grid grid-cols-1 gap-x-[1.5rem] gap-y-[2.5rem]  sm:grid-cols-2 md:grid-cols-3'>
              {data?.items?.map((i, idx) => (
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
                    link={`${i?.id}`}
                  />
                </div>
              ))}
            </div>
          </ContentLoader> */}
        </>
      </PlanGuard>
    </div>
  );
};

export default VisitsPage;
