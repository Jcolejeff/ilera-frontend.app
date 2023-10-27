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
import { useState } from 'react';
import PatientsRecords from './Records';
import PatientsReports from './Reports';

type filterTypes = 'visits records' | 'visits reports';

interface Filter {
  name: filterTypes;
  icon: JSX.Element;
}
const PatientsFilter: Filter[] = [
  { name: 'visits records', icon: <Icon name='profileIcon' /> },
  { name: 'visits reports', icon: <Icon name='padLockV2' /> },
];

interface Tabs {
  title: filterTypes;
}

const DisplayTab = ({ title }: Tabs) => {
  const components: Record<filterTypes, JSX.Element> = {
    'visits records': <PatientsRecords />,
    'visits reports': <PatientsReports />,
  };

  return components[title];
};

const VisitsPage = () => {
  const navigate = useNavigate();
  const [currFilter, setCurrFilter] = useState<filterTypes>('visits records');

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
    <div className='container flex h-full w-full max-w-[150.75rem]  flex-col overflow-auto px-container-base py-[2.1rem]'>
      {/* to be refactored */}
      <div className='flex justify-between '>
        <p className='text-base font-semibold text-primary-1'>Visits</p>
        <DropdownMenu>
          <DropdownMenuTrigger
            className={`focus-within:outline-0 focus-within:ring-0 focus:ring-0 active:ring-0`}
          >
            <Icon name='menu' />
          </DropdownMenuTrigger>
          <DropdownMenuContent className='mr-[1.5rem] bg-white   shadow-5'>
            {PatientsFilter?.map((i, idx) => (
              <DropdownMenuItem key={idx} className=''>
                <button
                  key={idx}
                  className={`${
                    i?.name === currFilter
                      ? `bg-primary-1  text-white`
                      : `bg-transparent text-secondary-2 hover:text-primary-1`
                  } flex h-full  w-max items-center rounded-[5px] px-[1.5rem]  py-3 text-start transition-all ease-in-out `}
                  onClick={() => setCurrFilter(i?.name)}
                >
                  <span className='mt-[3px] whitespace-nowrap text-start text-[13px] font-semibold capitalize leading-3 tracking-[0.15px] md:mt-0 lg:text-[13px]'>
                    {i?.name}
                  </span>
                </button>
              </DropdownMenuItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
      <div className='relative grid w-full'>
        {/* ... */}

        <div className='mt-7'>
          <DisplayTab title={currFilter} />
        </div>
      </div>
    </div>
  );
};

export default VisitsPage;
