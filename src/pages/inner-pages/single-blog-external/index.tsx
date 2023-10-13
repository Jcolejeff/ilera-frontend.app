import { LazyLoadImage } from 'react-lazy-load-image-component';
import Icon from 'utils/Icon';
import demoDp from 'assets/image/demoDp.jpg';
import blogImgBig from 'assets/image/blogImageBig.png?format=webp&imagetools';
import BlogCard from 'components/general/Card';
import blogImg from 'assets/image/blogImg.png?format=webp&w=330&h=280&imagetools';
import dpIcon from 'assets/image/demoDp.jpg?format=webp&imagetools';
import { useNavigate, useParams } from 'react-router-dom';
import { shimmer, toBase64 } from 'utils/general/shimmer';
import { useQuery } from '@tanstack/react-query';
import { apiInterface, apiInterfaceV2, contentApiItemInterface } from 'types';
import contentService from 'services/content';
import { processError } from 'helper/error';
import CONSTANTS from 'constant';
import InlineLoader from 'components/Loaders/InlineLoader';
import { formatDate } from 'lib/utils';
import TextContentLoader from 'components/Loaders/TextContentLoader';
import { ReactMarkdown } from 'react-markdown/lib/react-markdown';
import remarkGfm from 'remark-gfm';
import EmptyContentWrapper from 'components/Hocs/EmptyContentWrapper';
import ContentLoader from 'components/general/ContentLoader';

const SingleBlogExternal = () => {
  const navigate = useNavigate();

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

  const { data: similar, isLoading: similarLoading } = useQuery<
    any,
    any,
    apiInterface<contentApiItemInterface[]>
  >({
    queryKey: ['get-blogs'],
    queryFn: () =>
      contentService.getContent({
        organization_id: import.meta.env.VITE_TIMBU_ORG_ID,
        category: CONSTANTS.TIMBU_KEYS.BLOG_ID,
      }),
    onError: (err) => {
      processError(err);
    },
  });

  return (
    <main className='container flex flex-col w-full h-full'>
      <div className='w-full min-h-[16.5rem] pb-[7.44rem] md:pb-[4.875rem] bg-primary-19 px-container-base lg:px-container-lg'>
        <div className='flex gap-[1.69rem] flex-col lg:flex-row justify-between'>
          <div className='flex flex-col mt-[2rem]'>
            <div
              onClick={() => navigate(-1)}
              className='p-1 w-max rounded-[50px] bg-transparent hover:bg-white/10 cursor-pointer transition-colors duration-300 ease-in-out active:bg-black/10 mb-4'
            >
              <Icon name='arrowBack' svgProp={{ className: 'text-white' }} />
            </div>
            <span className='font-[600] text-[14px] leading-[21px] tracking-[0.1px] text-info-1 mb-[0.75rem]'>
              #Production
            </span>
            <InlineLoader isLoading={isLoading}>
              <h5 className='text-white font-[800] text-[24px] md:text-[32px] leading-[32px] md:leading-[43px] max-w-[680px]'>
                {data?.data?.title}
              </h5>
            </InlineLoader>
          </div>
          <div className='flex items-end gap-4'>
            <div className='w-[48px] h-[48px] overflow-hidden rounded-[50px]'>
              <LazyLoadImage
                placeholderSrc={`data:image/svg+xml;base64,${toBase64(shimmer(700, 475))}`}
                src={demoDp}
                className='w-full h-full origin-center'
                effect='blur'
              />
            </div>
            <div className='flex flex-col gap-1'>
              <h6 className='font-[600] leading-[21px] text-white'>
                {data?.data?.content_author?.first_name} {data?.data?.content_author?.last_name}
              </h6>
              <p className='font-[300] text-[14px] leading-[21px] tracking-[0.15px] text-secondary-2'>
                {formatDate(`${data?.data?.date_created}`)}
              </p>
            </div>
          </div>
        </div>
      </div>
      <div className='relative flex flex-col px-container-base lg:px-container-lg '>
        <div className='relative flex flex-col mb-[2.5rem] h-[35rem] w-full -mt-[calc(264px-211px)] lg:px-[3.125rem]  '>
          <div className='w-full h-full overflow-hidden rounded-[16px]'>
            <LazyLoadImage
              placeholderSrc={`data:image/svg+xml;base64,${toBase64(shimmer(700, 475))}`}
              effect='blur'
              src={`${CONSTANTS.TIMBU_KEYS.IMAGE_BASE_URL}/${data?.data?.photos?.[0]?.url}`}
              className='w-full !h-full origin-center bg-cover'
            />
          </div>
          <div className='relative lg:absolute top-0 right-0 mt-4  lg:mt-[calc(12.69rem-10px)] flex lg:flex-col gap-4  lg:gap-[2.56rem]'>
            <div className='flex flex-col items-center gap-2 cursor-pointer group'>
              <Icon
                name='shareIcon'
                svgProp={{
                  className:
                    'text-primary-9 group-hover:text-primary-1 transition-colors duration-300 ease-in-out',
                }}
              />
              <span className='hidden md:flex font-[300] text-[12px] leading-[21px] tracking-[0.15px] text-secondary-2 group-hover:text-primary-1 transition-colors duration-300 ease-in-out'>
                Share
              </span>
            </div>
            <div className='flex flex-col items-center gap-2 cursor-pointer group'>
              <Icon
                name='thumb'
                svgProp={{
                  className:
                    'text-primary-9 group-hover:text-primary-1 transition-colors duration-300 ease-in-out',
                }}
              />
              <span className='hidden md:flex font-[300] text-[12px] leading-[21px] tracking-[0.15px] text-secondary-2 group-hover:text-primary-1 transition-colors duration-300 ease-in-out'>
                Like
              </span>
            </div>
          </div>
        </div>
        <div className='absolute'></div>
        <TextContentLoader isLoading={isLoading} className='py-1'>
          <ReactMarkdown
            remarkPlugins={[remarkGfm]}
            components={{
              h1: ({ node, ...props }) => (
                <h1
                  {...props}
                  className='text-[1.2rem] font-[500] text-secondary-9/[0.87] my-[1rem]'
                />
              ),
              b: ({ node, ...props }) => <span {...props} className='' />,
              i: ({ node, ...props }) => <span {...props} className='' />,
              blockquote: ({ node, ...props }) => (
                <span
                  {...props}
                  className='text-primary-9/[0.87] leading-[2rem] tracking-[0.00938rem] mb-[2.5rem]'
                />
              ),
              ol: ({ node, ...props }) => <ol {...props} className='' />,
              ul: ({ node, ...props }) => <ul {...props} className='' />,
              a: ({ node, ...props }) => <a {...props} className='' />,
              img: ({ node, ...props }) => (
                <div className='flex justify-center items-center my-8 max-w-full h-auto overflow-hidden'>
                  {' '}
                  <img {...props} className='w-full h-full' />
                </div>
              ),
              p: ({ node, ...props }) => (
                <p
                  {...props}
                  className='text-primary-9/[0.87] leading-[2rem] tracking-[0.00938rem] mb-[1.5rem]'
                ></p>
              ),
            }}
          >{`${data?.data?.content}`}</ReactMarkdown>
        </TextContentLoader>
        <p className='text-center py-[5rem] font-[600] text-[24px] leading-[24px] tracking-[0.15px] text-primary-8'>
          Thanks for Reading!
        </p>
        <div className='flex justify-start items-center gap-[0.57rem] text-primary-1 mb-[1.5rem]'>
          <Icon name='gearIcon' />
          <span className='leading-[28px] tracking-[0.15px]'>Similar Articles</span>
        </div>
        <EmptyContentWrapper
          isEmpty={!similarLoading && similar?.items && similar?.items?.length < 2}
          customMessage='No Similar Items at the moment'
        >
          <ContentLoader isLoading={similarLoading}>
            <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-x-[1.5rem] gap-y-[2.5rem] mb-[6.94rem]'>
              {similar?.items
                ?.filter((i) => i?.id !== id)
                ?.map((i, idx) => (
                  <div key={idx} className='w-full h-full'>
                    <BlogCard
                      authorImg={dpIcon}
                      authorName={`${i?.content_author?.first_name} ${i?.content_author?.last_name}`}
                      authorRole={`${i?.content_author?.email}`}
                      blogImage={`${CONSTANTS.TIMBU_KEYS.IMAGE_BASE_URL}/${i?.photos?.[0]?.url}`}
                      category={`Production`}
                      date={`18 April, 2022`}
                      description={i?.subtitle}
                      title={i?.title}
                      link={`/blogs/${i?.id}`}
                    />
                  </div>
                ))}
            </div>
          </ContentLoader>
        </EmptyContentWrapper>
      </div>
    </main>
  );
};

export default SingleBlogExternal;
