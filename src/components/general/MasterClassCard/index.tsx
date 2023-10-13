import { LazyLoadImage } from 'react-lazy-load-image-component';
import { shimmer, toBase64 } from 'utils/general/shimmer';
import { useNavigate } from 'react-router-dom';
import Icon from 'utils/Icon';
import img from 'assets/image/masterCardbg.png';
import CONSTANTS from 'constant';

interface IMasterClassCard {
  adImage: string;
  price: string;
  title: string;
  description: string;
  link?: string;
  location: string;
  expiryDate?: string;
}

const MasterClassCard = ({
  adImage,
  description,
  location,
  price,
  title,
  link = `/${CONSTANTS.ROUTES['master-classes']}/a7f1477dc36041aabd2c40d5c8598e3f`,
}: IMasterClassCard) => {
  const navigate = useNavigate();
  console.log(link);

  return (
    <div
      onClick={() => navigate(link)}
      className='flex flex-col justify-between w-full cursor-pointer h-max group'
    >
      <div className='flex flex-col'>
        <div
          className='relative w-full h-[16.93rem] mb-[1rem] rounded-[8px] border-b- border-b-warning-1 overflow-hidden 
          cursor-cardCursor
        after:w-full after:h-full after:absolute after:bg-transparent hover:after:bg-black/40 after:transition-all after:duration-300 after:top-0 after:left-0 transition-all ease-in-out duration-300
        '
        >
          <LazyLoadImage
            placeholderSrc={`data:image/svg+xml;base64,${toBase64(shimmer(700, 475))}`}
            src={adImage}
            alt=' '
            className='w-full h-full object-cover transition-transform duration-300 ease-in-out bg-top bg-cover group-hover:scale-105'
          />
          <img
            src={img}
            className='absolute bottom-0 left-0 right-0  w-full rounded-lg transition-transform duration-300 ease-in-out bg-top bg-cover group-hover:scale-105'
          />
        </div>

        <div className='flex items-center justify-between w-full mb-4'>
          <span className='text-primary-1 text-[14px] leading-[21px] tracking-[0.1px] font-[600] '>
            Coming Up: {price}
          </span>
          <span className='text-secondary-2 text-[14px] leading-[21px] tracking-[0.1px] font-[300] '></span>
        </div>
        <h5 className='mb-4 text-primary-12 text-lg leading-[27px] font-[700]'>{title}</h5>
        <p className='mb-4 text-secondary-2 text-[13px] leading-[18px] tracking-[0.1px] font-[300]'>
          {description}
        </p>
      </div>
      <div className='flex items-center gap-2'>
        <Icon name='location' svgProp={{ width: '1.5rem', height: '1.5rem' }} />
        <span className='font-[600] text-primary-9 text-sm'>{location}</span>
      </div>
    </div>
  );
};

export default MasterClassCard;
