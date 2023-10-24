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
import { billingData, dashboardData } from './dashboardData';
import { cn } from 'lib/utils';
import Chart from './Chart/chart';
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
      {/* <FunkyPagesHero
        // description='Find advertisements and track your activities here'
        title=' Dashboard'
      /> */}
      <PlanGuard page='dashboard'>
        <>
          <div className='flex items-center justify-between'>
            <h3 className='text-primary-1'>Dashboard</h3>
            <div className='flex gap-3'>
              <button className=' flex  items-center justify-center gap-2  rounded-[5px] bg-primary-1  px-4 py-2 text-base font-semibold text-white transition-all duration-300 ease-in-out hover:opacity-90'>
                New patient
              </button>
              <button className=' flex  items-center justify-center gap-2  rounded-[5px] bg-primary-1  px-4 py-2 text-base font-semibold text-white transition-all duration-300 ease-in-out hover:opacity-90'>
                New Appointment
              </button>
            </div>
          </div>

          <section className='mt-12 grid grid-cols-[1fr_1fr]  gap-[2rem] rounded-lg md:grid-cols-[1fr_1fr]  xxl:grid-cols-[1fr_1fr_1fr_1fr]'>
            {dashboardData.map((report, index) => {
              return (
                <article key={index}>
                  <span className='text-sm'>{report.heading}</span>
                  <div
                    className={cn(
                      `} mt-[1rem] flex cursor-pointer rounded-lg border px-5 py-6 opacity-50 transition-all duration-500 ease-in-out`,
                    )}
                  >
                    {report.items.map((item, key) => {
                      return (
                        <div className='flex flex-col gap-1  px-2' key={key}>
                          <h3 className='text-sm font-semibold'>{item.subHeading}</h3>
                          <p>
                            <span className='font-bold md:text-[1.5rem]'>{item.count}</span>
                            {/* <span className='text-[0.8rem] font-semibold'>%</span> */}
                          </p>
                          <p className='text-[0.79rem] leading-[130%] tracking-[0.02rem] md:leading-[1.2rem] md:tracking-[0.0125rem]'>
                            {item.paragraph}
                          </p>
                        </div>
                      );
                    })}
                  </div>
                </article>
              );
            })}
          </section>

          <section className='mt-12 grid grid-cols-[1fr]  gap-[2rem] rounded-lg '>
            {billingData.map((report, index) => {
              return (
                <article key={index}>
                  <span className='text-sm'>{report.heading}</span>
                  <div
                    className={cn(
                      `} mt-[1rem] flex grid cursor-pointer grid-cols-[1fr_1fr] gap-[2rem] rounded-lg rounded-lg border px-5 py-6 opacity-50 transition-all  duration-500 ease-in-out md:grid-cols-[1fr_1fr_1fr_1fr]  xxl:grid-cols-[1fr_1fr_1fr_1fr]`,
                    )}
                  >
                    {report.items.map((item, key) => {
                      return (
                        <div className='flex flex-col gap-1  px-2' key={key}>
                          <h3 className='text-sm font-semibold'>{item.subHeading}</h3>
                          <p>
                            <span className='font-bold md:text-[1.5rem]'>{item.count}</span>
                            {/* <span className='text-[0.8rem] font-semibold'>%</span> */}
                          </p>
                          <p className='text-[0.79rem] leading-[130%] tracking-[0.02rem] md:leading-[1.2rem] md:tracking-[0.0125rem]'>
                            {item.paragraph}
                          </p>
                        </div>
                      );
                    })}
                    <Chart />
                  </div>
                </article>
              );
            })}
          </section>
        </>
      </PlanGuard>
    </div>
  );
};

export default Dashboard;
