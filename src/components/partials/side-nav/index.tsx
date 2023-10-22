import ManageSubscriptions from 'components/modal/ManageSubscriptions';
import CONSTANTS from 'constant';
import usePlan from 'hooks/business-logic/usePlan';
import { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import useStore from 'store';
import { ItitleLinks, planTypes, routePathTypes } from 'types';
import Icon from 'utils/Icon';
import { cn } from 'lib/utils';

type ISideNavTitles =
  | 'Blogs'
  | 'General Forums'
  | 'Professional Forums'
  | 'Behind The Scenes'
  | 'Assets and Templates'
  | 'CV Profile'
  | 'Consultancy'
  | 'Advertise a Service'
  | 'Online Training'
  | 'Master Classes'
  | 'Bi-annual Bootcamps'
  | 'Dashboard'
  | 'Visits'
  | 'Patients'
  | 'Appointment'
  | 'Consultation'
  | 'Billing'
  | 'Inventory'
  | 'Laboratory'
  | 'Reports'
  | 'Settings';

interface extendedRouteInterface extends ItitleLinks<ISideNavTitles, routePathTypes> {
  icons: JSX.Element;
  plan: planTypes;
}

interface ISideNavLinks {
  discussions: extendedRouteInterface[];
}

export const sideNavLinks: extendedRouteInterface[] = [
  {
    link: 'dashboard',
    title: 'Dashboard',
    icons: (
      <Icon
        svgProp={{
          width: 22.75,
          height: 22.75,
          className: 'text-current',
        }}
        name='dashboardIcon'
      />
    ),
    plan: CONSTANTS.PLAN_PERMISSIONS.dashboard,
  },
  {
    link: 'visits',
    title: 'Visits',
    icons: (
      <Icon
        svgProp={{
          width: 22.75,
          height: 22.75,
          className: 'text-current',
        }}
        name='fileIcon'
      />
    ),
    plan: CONSTANTS.PLAN_PERMISSIONS['visits'],
  },

  {
    link: 'patients',
    title: 'Patients',
    icons: (
      <Icon
        svgProp={{
          width: 22.75,
          height: 22.75,
          className: 'text-current',
        }}
        name='patients'
      />
    ),
    plan: CONSTANTS.PLAN_PERMISSIONS.patients,
  },
  {
    link: 'appointment',
    title: 'Appointment',
    icons: (
      <Icon
        svgProp={{
          width: 22.75,
          height: 22.75,
          className: 'text-current',
        }}
        name='appointment'
      />
    ),
    plan: CONSTANTS.PLAN_PERMISSIONS.appointment,
  },
  {
    link: 'consultation',
    title: 'Consultation',
    icons: (
      <Icon
        svgProp={{
          width: 22.75,
          height: 22.75,
          className: 'text-current',
        }}
        name='consult'
      />
    ),
    plan: CONSTANTS.PLAN_PERMISSIONS.consultation,
  },
  {
    link: 'billing',
    title: 'Billing',
    icons: (
      <Icon
        svgProp={{
          width: 22.75,
          height: 22.75,
          className: 'text-current',
        }}
        name='billing'
      />
    ),
    plan: CONSTANTS.PLAN_PERMISSIONS.billing,
  },
  {
    link: 'inventory',
    title: 'Inventory',
    icons: (
      <Icon
        svgProp={{
          width: 22.75,
          height: 22.75,
          className: 'text-current',
        }}
        name='inventory'
      />
    ),
    plan: CONSTANTS.PLAN_PERMISSIONS.inventory,
  },
  {
    link: 'laboratory',
    title: 'Laboratory',
    icons: (
      <Icon
        svgProp={{
          width: 22.75,
          height: 22.75,
          className: 'text-current',
        }}
        name='lab'
      />
    ),
    plan: CONSTANTS.PLAN_PERMISSIONS.laboratory,
  },
  {
    link: 'reports',
    title: 'Reports',
    icons: (
      <Icon
        svgProp={{
          width: 22.75,
          height: 22.75,
          className: 'text-current',
        }}
        name='reports'
      />
    ),
    plan: CONSTANTS.PLAN_PERMISSIONS.reports,
  },
  {
    link: 'settings',
    title: 'Settings',
    icons: (
      <Icon
        svgProp={{
          width: 22.75,
          height: 22.75,
          className: 'text-current',
        }}
        name='settingIcon'
      />
    ),
    plan: CONSTANTS.PLAN_PERMISSIONS.settings,
  },
];

export const planTokens: Record<planTypes, { name: string; icon: JSX.Element }> = {
  starter: {
    icon: <Icon svgProp={{ width: 32, height: 32 }} name='studentIcon' />,
    name: 'Nollywood Starter',
  },
  master: {
    icon: <Icon svgProp={{ width: 32, height: 32 }} name='masterCrown' />,
    name: 'Nollywood Master',
  },
  professional: {
    icon: <Icon svgProp={{ width: 32, height: 32 }} name='masterCrown' />,
    name: 'Nollywood Pro',
  },
  student: {
    icon: <Icon svgProp={{ width: 32, height: 32 }} name='studentIcon' />,
    name: 'Nollywood Student',
  },
};

const SideNav = () => {
  const [navOpen, setNavOpen] = useState(true);
  const currentUserPlan = useStore((state) => state.plan);
  const navigate = useNavigate();

  const { isAllowed } = usePlan({ currUserPlan: currentUserPlan });

  const location = useLocation();

  return (
    <div
      className={`sticky bottom-0 top-0 ${
        navOpen ? ` w-[260px]` : `w-[100px]`
      } relative flex h-full flex-col py-[1.65rem] shadow-3 transition-[width] duration-300 ease-in-out`}
    >
      <button
        onClick={() => setNavOpen((prev) => !prev)}
        className='absolute -right-[11px] top-[1.5rem] z-10 h-[25px] w-[25px] rounded-[30px] bg-primary-1 ring-[7px] ring-primary-15'
      />
      <div className='pb-[2.5rem]'>
        <div
          // onClick={() => navigate(`/app/dashboard`)}
          className='flex cursor-pointer items-center gap-[0.625rem] px-[1rem]'
        >
          <h4
            className={cn(
              ` text-[16px] font-[700] leading-[20px] tracking-[0.15px] text-primary-1   md:font-[700] md:leading-[24px] ${
                navOpen ? `opacity-100 md:px-4 md:text-[25px]` : `opacity-100  md:text-[19px]`
              }  transition-all duration-300 ease-in-out`,
            )}
          >
            ilera
          </h4>
        </div>
      </div>
      <div className='no-scrollbar flex flex-grow flex-col gap-[1.125rem] overflow-y-auto overflow-x-hidden'>
        <div className='mb-[1.125rem] flex flex-col gap-2'>
          {sideNavLinks?.map((i, idx) => (
            <div className='px-4' key={idx}>
              <div
                onClick={() => navigate(`/app/${i?.link}`)}
                className={`flex cursor-pointer items-center gap-[0.625rem] rounded-[6px] px-4 py-[0.3rem]  hover:bg-primary-light hover:text-primary-1 2xl:py-2
                ${isAllowed(i?.plan) ? `text-secondary-9` : `text-secondary-13`} 
                ${
                  location?.pathname === `/app/${i?.link}`
                    ? `font-semibold !text-primary-1 shadow-md`
                    : ``
                }
                group
                transition duration-300 hover:text-primary-1`}
              >
                <div className='flex items-center'>
                  {!isAllowed(i?.plan) ? (
                    <Icon
                      svgProp={{
                        width: 22.75,
                        height: 22.75,
                      }}
                      name='padLock'
                    />
                  ) : (
                    i?.icons
                  )}
                </div>
                <h6
                  className={`whitespace-nowrap text-[13px] font-[600] leading-[24px]  tracking-[0.15px]
              ${navOpen ? `opacity-100` : `scale-0 opacity-0`}
              duration-300`}
                >
                  {i?.title}
                </h6>
              </div>
            </div>
          ))}
        </div>
      </div>
      <div
        className={`flex flex-col gap-4 px-[1.8rem]
              ${navOpen ? `opacity-100` : `scale-0 opacity-0`}
              transition-all duration-300 ease-in-out`}
      >
        <button>
          <div className='flex items-center gap-4 text-primary-1'>
            <Icon
              svgProp={{
                width: 22.75,
                height: 22.75,
              }}
              name='help'
            />
            <h6
              className={`whitespace-nowrap text-[13px] font-[600] leading-[24px] tracking-[0.15px]  text-primary-1
              ${navOpen ? `opacity-100` : `scale-0 opacity-0`}
              duration-300`}
            >
              Help
            </h6>
          </div>
        </button>
        <button>
          <div className='flex items-center gap-4 text-primary-1'>
            <Icon
              svgProp={{
                width: 22.75,
                height: 22.75,
              }}
              name='BookmarkIcon'
            />
            <h6
              className={`whitespace-nowrap text-[13px] font-[600] leading-[24px] tracking-[0.15px]  text-primary-1
              ${navOpen ? `opacity-100` : `scale-0 opacity-0`}
              duration-300`}
            >
              Documentation
            </h6>
          </div>
        </button>
      </div>
    </div>
  );
};

export default SideNav;
