import { LazyLoadImage } from 'react-lazy-load-image-component';
import { useNavigate, useParams } from 'react-router-dom';
import blogImg from 'assets/image/blogImageBig.png?format=webp&imagetools';
import dpIcon from 'assets/image/demoDp.jpg?format=webp&imagetools';

import Icon from 'utils/Icon';
import { shimmer, toBase64 } from 'utils/general/shimmer';
import { useState } from 'react';
import BlogCard from 'components/general/Card';
import { useQuery } from '@tanstack/react-query';
import contentService from 'services/content';
import { processError } from 'helper/error';
import { apiInterface, apiInterfaceV2, contentApiItemInterface } from 'types';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import TextContentLoader from 'components/Loaders/TextContentLoader';
import InlineLoader from 'components/Loaders/InlineLoader';
import CONSTANTS from 'constant';
import ContentLoader from 'components/general/ContentLoader';
import { formatDate } from 'lib/utils';
import EmptyContentWrapper from 'components/Hocs/EmptyContentWrapper';

const SingleBlog = () => {
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
    <main className='relative w-full px-container-base '>
      <div className='my-[1.5rem] flex w-full flex-col rounded-[1rem] bg-white px-4 py-[1rem] sm:px-[2.5rem] sm:py-[2.25rem] '>
        <div
          onClick={() => navigate(-1)}
          className='mb-[1.37rem] flex w-max cursor-pointer items-center gap-1 rounded-[8px] px-[2px] py-1  transition-colors duration-300 ease-in-out hover:bg-slate-100 active:bg-slate-200'
        >
          <Icon
            name='arrowBack'
            svgProp={{ width: '1.5rem', height: '1.5rem', className: 'text-secondary-9' }}
          />
          <h5 className='text-secondary-9/[0.87]'>Go Back</h5>
        </div>
        <div className='mb-[1.6rem] flex w-full flex-col justify-between gap-4 md:flex-row'>
          <InlineLoader isLoading={isLoading}>
            <h5 className='text-[1.5rem] font-[500] leading-[113%] text-secondary-9/[0.87]'>
              {data?.data?.title}
            </h5>
          </InlineLoader>
          <div className='flex items-center gap-1'>
            <span className='leading-[175%] text-secondary-9/60'>Bookmark</span>
            <Icon name='BookmarkIcon' svgProp={{ className: 'text-secondary-1' }} />
          </div>
        </div>
        <div className='mb-4 h-[19.56rem] w-full overflow-hidden rounded-[8px]'>
          <LazyLoadImage
            placeholderSrc={`data:image/svg+xml;base64,${toBase64(shimmer(700, 475))}`}
            src={`${CONSTANTS.TIMBU_KEYS.IMAGE_BASE_URL}/${data?.data?.photos[0]?.url}`}
            className='h-full w-full  bg-cover bg-top transition-transform duration-300 ease-in-out group-hover:scale-105'
            alt=' '
            effect='blur'
          />
        </div>
        <div className='mb-2 flex w-full items-center justify-between'>
          <span className='leading-[1.25rem] tracking-[0.00938rem] text-secondary-9/60'>
            Created 16/2/2023 @ 12:22PM
          </span>
          <div
            onClick={() => setLiked(!liked)}
            className='flex cursor-pointer items-end gap-[0.5rem]'
          >
            <span className='leading-[1rem] tracking-[0.00938rem] text-secondary-9/60'>
              {liked ? `160` : `159`}
            </span>
            <Icon
              name='likeIcon'
              svgProp={{
                className: `${liked ? `text-danger-4` : `text-slate-400`} `,
              }}
            />
          </div>
        </div>

        <div className='my-4 w-full'>
          <TextContentLoader isLoading={isLoading} className='py-1'>
            <ReactMarkdown
              remarkPlugins={[remarkGfm]}
              components={{
                h1: ({ node, ...props }) => (
                  <h1
                    {...props}
                    className='my-[1rem] text-[1.2rem] font-[500] text-secondary-9/[0.87]'
                  />
                ),
                b: ({ node, ...props }) => <span {...props} className='' />,
                i: ({ node, ...props }) => <span {...props} className='' />,
                blockquote: ({ node, ...props }) => (
                  <span
                    {...props}
                    className='mb-[2.5rem] leading-[2rem] tracking-[0.00938rem] text-primary-9/[0.87]'
                  />
                ),
                ol: ({ node, ...props }) => <ol {...props} className='' />,
                ul: ({ node, ...props }) => <ul {...props} className='' />,
                a: ({ node, ...props }) => <a {...props} className='' />,
                img: ({ node, ...props }) => (
                  <div className='my-8 flex h-auto max-w-full items-center justify-center overflow-hidden'>
                    {' '}
                    <img {...props} className='h-full w-full' />
                  </div>
                ),
                p: ({ node, ...props }) => (
                  <p
                    {...props}
                    className='mb-[1.5rem] leading-[2rem] tracking-[0.00938rem] text-primary-9/[0.87]'
                  ></p>
                ),
              }}
            >{`${data?.data?.content}`}</ReactMarkdown>
          </TextContentLoader>
        </div>
        <div className='mb-[1.5rem] flex items-center gap-2'>
          <Icon name='gearIcon' svgProp={{ className: 'text-primary-1' }} />
          <span className='leading-[175%] tracking-[0.00938rem] text-primary-1'>
            Similar Articles
          </span>
        </div>
        <EmptyContentWrapper
          isEmpty={!similarLoading && similar?.items && similar?.items?.length < 2}
          customMessage='No Similar Items at the moment'
        >
          <ContentLoader isLoading={similarLoading}>
            <div className='grid grid-cols-1 gap-x-[1.5rem] gap-y-[2.5rem]  sm:grid-cols-2 md:grid-cols-3'>
              {similar?.items
                ?.filter((i) => i?.id !== id)
                ?.map((i, idx) => (
                  <div key={idx} className='h-full w-full'>
                    <BlogCard
                      authorImg={dpIcon}
                      authorName={`${i?.content_author?.first_name} ${i?.content_author?.last_name}`}
                      authorRole={`${i?.content_author?.email}`}
                      blogImage={`${CONSTANTS.TIMBU_KEYS.IMAGE_BASE_URL}/${i?.photos?.[0]?.url}`}
                      category={`Production`}
                      date={`${formatDate(i?.date_created)}`}
                      description={i?.subtitle}
                      title={i?.title}
                      link={`/app/blogs/${i?.id}`}
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

export default SingleBlog;
