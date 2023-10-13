import { useLocation, useNavigate } from 'react-router-dom';
import { ItitleLinks, routePathTypes } from 'types';
import Icon from 'utils/Icon';
import Menu from '../Menu';
import CONSTANTS from 'constant';
import BgTransitionSpan from 'components/animation/bg-transitions-span';
import CoolUnderline from 'components/animation/cool-underline';
import useStore from 'store';
import SearchComboBox from 'components/general/SearchComboBox';

export type navTitleTypes = 'Home' | 'Pricing' | 'Blogs' | 'FAQs' | 'About Us';

export const navLinks: ItitleLinks<navTitleTypes, routePathTypes>[] = [
  {
    link: '',
    title: 'Home',
  },
  {
    link: 'pricing',
    title: 'Pricing',
  },
  {
    link: 'blogs',
    title: 'Blogs',
  },
  {
    link: 'faqs',
    title: 'FAQs',
  },
  {
    link: 'about',
    title: 'About Us',
  },
];

export const ExternalNav = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const { loggedIn } = useStore((store) => store);

  return (
    <nav className='container sticky top-0 left-0 right-0 z-10 w-full bg-white border-b px-container-base lg:px-container-lg border-extraColor-borderBottom-3 md:border-0'>
      <div className='w-full  flex justify-between items-center py-[1.375rem] md:pt-[2rem] md:py-[1.5rem] md:border-b md:border-extraColor-borderBottom-1 transition-all ease-in-out duration-300'>
        <div className='flex items-center gap-[6rem]'>
          <div className='flex items-center gap-2 cursor-pointer' onClick={() => navigate(`/`)}>
            <Icon
              name='nfmLogo'
              svgProp={{ className: 'w-[28px] h-[28px] md:w-[30px] md:h-[30px]' }}
            />
            <h4 className='font-[700] md:font-[700] text-[16px] md:text-[19px] leading-[20px] md:leading-[24px] tracking-[0.15px] text-primary-8'>
              App Assistant
            </h4>
          </div>
        </div>
        <div className='w-4/12 max-w-[800px] relative  '>
          <SearchComboBox />
        </div>
        <div className='flex items-center gap-4 '>
          {loggedIn ? (
            <button
              onClick={() => navigate(`/app/${CONSTANTS.ROUTES.dashboard}`)}
              className='relative py-2 px-6 rounded-[160px] text-[16px] leading-[24px] tracking-[0.15px] text-primary-9 border border-primary-1 hidden md:inline-flex  hover:text-white transition-colors duration-300 ease-in-out overflow-hidden group'
            >
              <BgTransitionSpan className='-mx-6 -mt-2  bg-primary-1 rounded-[120px]' />
              <span className='relative'>Go to Dashboard</span>
            </button>
          ) : (
            <>
              <button
                onClick={() => navigate(CONSTANTS.ROUTES.login)}
                className='relative py-2 px-6 rounded-[160px] text-[16px] leading-[24px] tracking-[0.15px] text-primary-9 border border-primary-1 hidden md:inline-flex  hover:text-white transition-colors duration-300 ease-in-out overflow-hidden group'
              >
                <BgTransitionSpan className='-mx-6 -mt-2  bg-primary-1 rounded-[120px]' />
                <span className='relative'> Log In</span>
              </button>
              <button
                onClick={() => navigate(CONSTANTS.ROUTES['create-account'])}
                className='py-2 px-6 rounded-[160px] text-[16px] leading-[24px] tracking-[0.15px] text-white bg-primary-1 hidden md:flex hover:opacity-90 transition-opacity duration-300 ease-in-out'
              >
                Sign Up
              </button>
            </>
          )}
          <div className='flex items-center xl:hidden'>
            <Menu />
          </div>
        </div>
      </div>
    </nav>
  );
};
