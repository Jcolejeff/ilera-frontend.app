import CONSTANTS from 'constant';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import { useNavigate } from 'react-router-dom';
import { shimmer, toBase64 } from 'utils/general/shimmer';

interface IBlogCard {
  blogImage: string;
  category: string;
  date: string;
  title: string;
  description: string;
  authorImg: string;
  authorName: string;
  authorRole: string;
  link?: string;
}

const BlogCard = ({
  authorImg,
  authorName,
  authorRole,
  blogImage,
  category,
  date,
  description,
  title,
  link = `/${CONSTANTS.ROUTES.blogs}/test-blog`,
}: IBlogCard) => {
  const navigate = useNavigate();

  return (
    <div
      onClick={() => navigate(link)}
      className='flex flex-col justify-between w-full cursor-pointer h-max group shadow-md rounded-[8px]  transition-all ease-in-out duration-300'
    >
      <div className='flex flex-col'>
        <div
          className='relative w-full h-[10rem]  rounded-t-[8px]  overflow-hidden cursor-cardCursor
        after:w-full after:h-full after:absolute after:bg-transparent hover:after:bg-black/40 after:transition-all after:duration-300 after:top-0 after:left-0 transition-all ease-in-out duration-300
        '
        >
          <LazyLoadImage
            placeholderSrc={`data:image/svg+xml;base64,${toBase64(shimmer(700, 475))}`}
            src={blogImage}
            alt=' '
            className='w-full object-cover h-full transition-transform duration-300 ease-in-out bg-top bg-cover group-hover:scale-105'
          />
        </div>
        <div className='flex  flex-col w-full gap-2  px-4 py-4'>
          <h5 className='  text-[1.15rem] leading-[27px] font-[700]'>{title}</h5>

          <p className='text-primary-1 text-[14px] leading-[21px] tracking-[0.1px] font-[600] '>
            <span className='font-light'> Times used</span> : {category}
          </p>
          <p className='text-secondary-2 text-[14px] leading-[21px] tracking-[0.1px] font-[300] '>
            <span className=''>Last Edited</span> {date}
          </p>
        </div>
      </div>
    </div>
  );
};

export default BlogCard;
