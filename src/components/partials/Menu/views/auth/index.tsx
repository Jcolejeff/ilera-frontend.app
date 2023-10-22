import ManageSubscriptions from 'components/modal/ManageSubscriptions';
import { IDropNavTitles, menuLinks } from 'components/partials/app-nav';
import { planTokens, sideNavLinks } from 'components/partials/side-nav';
import { DropdownMenuSeparator } from 'components/shadcn/dropdown-menu';
import CONSTANTS from 'constant';
import usePlan from 'hooks/business-logic/usePlan';
import { useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import useStore from 'store';
import Icon from 'utils/Icon';

const AuthMenu = ({ close }: { close: () => void }) => {
  const nav = useNavigate();
  const currentUserPlan = useStore((state) => state.plan);

  const navigate = (i: string) => {
    close();
    nav(i);
  };
  const { isAllowed } = usePlan({ currUserPlan: currentUserPlan });

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
    <div className='flex h-full w-full flex-col gap-[2.125rem]'>
      <div className='flex flex-col'>
        {sideNavLinks?.map((i, idx) => (
          <div
            key={idx}
            onClick={() => navigate(`/app/${i?.link}`)}
            className={`group flex items-center gap-[0.625rem]  rounded-[8px] p-4 hover:bg-primary-6  ${
              isAllowed(i?.plan) ? `text-secondary-9` : `text-secondary-13`
            } cursor-pointer transition-all hover:text-primary-1`}
          >
            {!isAllowed(i?.plan) ? (
              <Icon
                svgProp={{
                  width: 20,
                  height: 20,
                }}
                name='padLock'
              />
            ) : (
              i?.icons
            )}
            <span className='text-[16px] font-[400] leading-[20px]'>{i?.title}</span>
          </div>
        ))}
      </div>

      <DropdownMenuSeparator className='border-b-2 border-extraColor-borderBottom-2' />
      <div className='flex flex-col '>
        <div className='mb-4 flex items-center gap-2 px-4'>
          <div className='h-max w-max rounded-[50px] border border-extraColor-borderBottom-2'>
            <Icon name='demoDp' />
          </div>
          <div className='flex flex-col text-[14px] tracking-[0.15px]'>
            <h6 className='font-inter font-[600] text-textColor-primary'>John Doe</h6>
            <span className='text-[12px] font-[400] leading-[14px] tracking-[0.4px] text-textColor-disabled'>
              User
            </span>
          </div>
        </div>
        {menuLinks['level1']?.map((i, idx) => (
          <div
            onClick={() => navigate(`/app/${i?.link}`)}
            key={idx}
            className='flex cursor-pointer items-center gap-[0.63rem]  p-4 text-[14px] leading-[21px] tracking-[0.15px] text-secondary-13 transition-colors duration-300 ease-in-out hover:text-textColor-primary'
          >
            <div className='flex items-center'>{i?.icons}</div>
            <div className='flex flex-grow justify-between'>
              {' '}
              <span>{i?.title}</span>
              {tags[i?.title]}
            </div>
          </div>
        ))}
        {menuLinks['level2']
          ?.filter((i) => i?.title === 'Settings')
          ?.map((i, idx) => (
            <div
              onClick={() => navigate(`/app/${i?.link}`)}
              key={idx}
              className='flex cursor-pointer items-center gap-[0.63rem]  p-4 text-[14px] leading-[21px] tracking-[0.15px] text-secondary-13 transition-colors duration-300 ease-in-out hover:text-textColor-primary'
            >
              <div className='flex items-center'>{i?.icons}</div>
              <div className='flex flex-grow justify-between'>
                {' '}
                <span>{i?.title}</span>
                {tags[i?.title]}
              </div>
            </div>
          ))}
        {menuLinks['level3']?.map((i, idx) => (
          <div
            onClick={() => navigate(`/app/${i?.link}`)}
            key={idx}
            className='flex cursor-pointer items-center gap-[0.63rem] p-4 text-[14px] leading-[21px] tracking-[0.15px] text-danger-2 transition-colors duration-300 ease-in-out hover:text-danger-1'
          >
            <div className='flex items-center'>{i?.icons}</div>
            <div className='flex flex-grow justify-between'>
              {' '}
              <span>{i?.title}</span>
              {tags[i?.title]}
            </div>
          </div>
        ))}
      </div>
      {/*     
      <div className='w-full px-4'>
        <ManageSubscriptions
          trigger={
            <button
              className={`group flex h-[60px] w-full cursor-pointer items-center gap-[0.8rem] rounded-[8px] bg-primary-1 px-3 text-white transition duration-300`}
            >
              <div className='flex items-center'>{planTokens[currentUserPlan]?.icon}</div>
              <h6
                className={`whitespace-nowrap text-[16px] font-[600] leading-[24px] tracking-[0.15px] duration-300`}
              >
                {planTokens[currentUserPlan]?.name}
              </h6>
            </button>
          }
        />
      </div> */}
    </div>
  );
};

export default AuthMenu;
