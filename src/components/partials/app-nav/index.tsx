import Icon from 'utils/Icon';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from 'components/shadcn/dropdown-menu';
import { ItitleLinks, routePathTypes } from 'types';
import { useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
// import { useWindowSize } from 'usehooks-ts';
import Menu from '../Menu';
import useStore from 'store';
import { firstCharsOfWords } from 'helper';

export type IDropNavTitles = 'Profile' | 'Chat' | 'Settings' | 'Subscription' | 'FAQ' | 'Logout';

interface extendedRoutesInterface extends ItitleLinks<IDropNavTitles, routePathTypes> {
  icons: JSX.Element;
}

interface IDropNavLinks {
  level1: extendedRoutesInterface[];
  level2: extendedRoutesInterface[];
  level3: extendedRoutesInterface[];
}

export const menuLinks: IDropNavLinks = {
  level1: [{ icons: <Icon name='profileIcon' />, link: `profile`, title: `Profile` }],
  level2: [
    { icons: <Icon name='settingIcon' />, link: `settings`, title: `Settings` },
    { icons: <Icon name='cashIcon' />, link: `subscriptions`, title: `Subscription` },
    { icons: <Icon name='infoIcon' />, link: `faqs`, title: `FAQ` },
  ],
  level3: [{ icons: <Icon name='exitIcon' />, link: `logout`, title: `Logout` }],
};

const AppNav = () => {
  const navigate = useNavigate();
  const { authDetails, loggedIn } = useStore((store) => store);

  const tags = useMemo(() => {
    const chatCount = 2;
    return {
      Chat: chatCount ? (
        <div className='grid h-[20px] w-[20px] place-items-center rounded-[64px] bg-danger-1 text-[12px] leading-[20px] tracking-[0.14px] text-white'>
          {chatCount}
        </div>
      ) : (
        <></>
      ),
    } as Record<IDropNavTitles, JSX.Element>;
  }, []);

  return (
    <>
      <nav
        className={` containter sticky left-0  right-0 z-40 h-max  w-full border-b border-b-extraColor-borderBottom-3 transition-all duration-300 ease-in-out md:h-[4rem] md:border-0 md:px-container-base md:pt-[0.75rem]`}
      >
        <div className='hidden   h-full w-full justify-end  rounded-[8px]   bg-white py-[2rem]  md:flex md:px-container-base'>
          <div className='flex items-center gap-[1.125rem]'>
            <div className='flex flex-grow items-center rounded-lg border px-6 '>
              <input
                className='form-input mx-2 flex-grow border-0  placeholder:text-sm placeholder:font-bold placeholder:text-textColor-disabled focus:!ring-0'
                placeholder='Search Patients'
              />
              <Icon name='searchIcon' svgProp={{ className: 'text-primary-9' }} />
            </div>

            <DropdownMenu>
              <DropdownMenuTrigger
                className={`focus-within:outline-0 focus-within:ring-0 focus:ring-0 active:ring-0`}
              >
                <article className='flex gap-3'>
                  <div
                    style={{ outline: '#7EB024 solid 1px' }}
                    className='flex  items-center justify-center  rounded-md bg-primary-1 p-2 outline-offset-[3px] md:p-2 md:px-4'
                  >
                    <p className='text-base font-extrabold uppercase text-white md:text-xl'>
                      {firstCharsOfWords('bridge' || ' ')[0]}
                    </p>
                  </div>
                  <div>
                    <p className='font-semibold'>
                      <span className='font-bold'>Bridge </span>Clinic
                    </p>
                    <p className='text-sm text-gray-400'>Oladimeji Ajayi</p>
                  </div>
                </article>

                {/* <Icon name='demoDp' /> */}
              </DropdownMenuTrigger>
              <DropdownMenuContent className='mr-[1.5rem] w-[14.375rem]  bg-white shadow-5'>
                <DropdownMenuLabel className='flex items-center gap-[0.625rem] !px-[1.25rem] !py-[0.875rem]'>
                  <Icon name='demoDp' />
                  <div className='flex flex-col text-[14px] tracking-[0.15px]'>
                    <h6 className='font-inter font-[600] text-textColor-primary'>
                      {authDetails?.data?.first_name} {authDetails?.data?.last_name}
                    </h6>
                    <span className='text-[12px] font-[400] leading-[14px] tracking-[0.4px] text-textColor-disabled'>
                      User
                    </span>
                  </div>
                </DropdownMenuLabel>
                <DropdownMenuSeparator className='border-b border-b-extraColor-divider' />
                {menuLinks['level1']?.map((i, idx) => (
                  <DropdownMenuItem
                    onClick={() => {
                      navigate(`/app/${i?.link}`);
                    }}
                    key={idx}
                    className='flex cursor-pointer items-center gap-[0.75rem] !px-[1.25rem] !py-[0.75rem] text-[14px] leading-[21px] tracking-[0.15px] text-textColor-primary'
                  >
                    <div className='flex items-center'>{i?.icons}</div>
                    <div className='flex flex-grow justify-between'>
                      {' '}
                      <span>{i?.title}</span>
                      {tags[i?.title]}
                    </div>
                  </DropdownMenuItem>
                ))}

                <DropdownMenuSeparator className='border-b border-b-extraColor-divider' />

                {menuLinks['level3']?.map((i, idx) => (
                  <DropdownMenuItem
                    onClick={() => navigate(`/${i?.link}`)}
                    key={idx}
                    className='flex cursor-pointer items-center gap-[0.75rem] !px-[1.25rem] !py-[0.75rem] text-[14px] leading-[21px] tracking-[0.15px] text-textColor-primary'
                  >
                    <div className='flex items-center'>{i?.icons}</div>
                    <span>{i?.title}</span>
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>

            {/* <Icon name='notificationIcon' /> */}
          </div>
        </div>
        <div className='flex  w-full items-center justify-between px-container-base py-[.875rem] md:hidden '>
          <div
            className='flex cursor-pointer items-center gap-[0.39rem] md:gap-[0.625rem]'
            onClick={() => navigate(`/`)}
          >
            <h4 className='text-[16px] font-[600] leading-[20px] tracking-[0.15px] text-primary-8 md:text-[24px] md:font-[500] md:leading-[24px]'>
              ilera
            </h4>
          </div>
          <div className='flex items-center'>{/* <Menu /> */}</div>
        </div>
      </nav>
    </>
  );
};

export default AppNav;
