import ManageSubscriptions from 'components/modal/ManageSubscriptions';
import CONSTANTS from 'constant';
import usePlan from 'hooks/business-logic/usePlan';
import { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import useStore from 'store';
import { ItitleLinks, planTypes, routePathTypes } from 'types';
import Icon from 'utils/Icon';

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
  | 'Bi-annual Bootcamps';

interface extendedRouteInterface extends ItitleLinks<ISideNavTitles, routePathTypes> {
  icons: JSX.Element;
  plan: planTypes;
}

interface ISideNavLinks {
  discussions: extendedRouteInterface[];
  features: extendedRouteInterface[];
  trainings: extendedRouteInterface[];
}

export const sideNavLinks: ISideNavLinks = {
  discussions: [
    {
      link: 'blogs',
      title: 'Blogs',
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
      plan: CONSTANTS.PLAN_PERMISSIONS['blogs'],
    },
    {
      link: 'general-forums',
      title: 'General Forums',
      icons: (
        <Icon
          name='gForumIcon'
          svgProp={{
            width: 22.75,
            height: 22.75,
            className: 'text-current',
          }}
        />
      ),
      plan: CONSTANTS.PLAN_PERMISSIONS['general-forums'],
    },
    {
      link: 'professional-forums',
      title: 'Professional Forums',
      icons: (
        <Icon
          svgProp={{
            width: 22.75,
            height: 22.75,
            className: 'text-current',
          }}
          name='pForumIcon'
        />
      ),
      plan: CONSTANTS.PLAN_PERMISSIONS['professional-forums'],
    },
  ],
  features: [
    {
      link: 'bts',
      title: 'Behind The Scenes',
      icons: (
        <Icon
          svgProp={{
            width: 22.75,
            height: 22.75,
            className: 'text-current',
          }}
          name='btsIcon'
        />
      ),
      plan: CONSTANTS.PLAN_PERMISSIONS['bts'],
    },
    {
      link: 'assets-templates',
      title: 'Assets and Templates',
      icons: (
        <Icon
          name='palleteIcon'
          svgProp={{
            width: 22.75,
            height: 22.75,
            className: 'text-current',
          }}
        />
      ),
      plan: CONSTANTS.PLAN_PERMISSIONS['assets-templates'],
    },
    {
      link: 'cv-profile',
      title: 'CV Profile',
      icons: (
        <Icon
          svgProp={{
            width: 22.75,
            height: 22.75,
            className: 'text-current',
          }}
          name='cvIcon'
        />
      ),
      plan: CONSTANTS.PLAN_PERMISSIONS['cv-profile'],
    },
    {
      link: 'consultancy',
      title: 'Consultancy',
      icons: (
        <Icon
          svgProp={{
            width: 22.75,
            height: 22.75,
            className: 'text-current',
          }}
          name='consultancyIcon'
        />
      ),
      plan: CONSTANTS.PLAN_PERMISSIONS['consultancy'],
    },
    {
      link: 'service-ad',
      title: 'Advertise a Service',
      icons: (
        <Icon
          svgProp={{
            width: 22.75,
            height: 22.75,
            className: 'text-current',
          }}
          name='bigTIcon'
        />
      ),
      plan: CONSTANTS.PLAN_PERMISSIONS['service-ad'],
    },
  ],
  trainings: [
    {
      link: 'online-training',
      title: 'Online Training',
      icons: (
        <Icon
          svgProp={{
            width: 22.75,
            height: 22.75,
            className: 'text-current',
          }}
          name='onlineTrainingIcon'
        />
      ),
      plan: CONSTANTS.PLAN_PERMISSIONS['online-training'],
    },
    {
      link: 'master-classes',
      title: 'Master Classes',
      icons: (
        <Icon
          svgProp={{
            width: 22.75,
            height: 22.75,
            className: 'text-current',
          }}
          name='masterClassesIcon'
        />
      ),
      plan: CONSTANTS.PLAN_PERMISSIONS['master-classes'],
    },
    {
      link: 'bootcamps',
      title: 'Bi-annual Bootcamps',
      icons: (
        <Icon
          svgProp={{
            width: 22.75,
            height: 22.75,
            className: 'text-current',
          }}
          name='threeDotIcon'
        />
      ),
      plan: CONSTANTS.PLAN_PERMISSIONS['bootcamps'],
    },
  ],
};

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
  const [navOpen, setNavOpen] = useState(false);
  const currentUserPlan = useStore((state) => state.plan);
  const navigate = useNavigate();

  const { isAllowed } = usePlan({ currUserPlan: currentUserPlan });

  const location = useLocation();

  return (
    <div
      className={`sticky bottom-0 top-0 ${
        navOpen ? ` w-[260px]` : `w-[86px]`
      } relative flex h-full flex-col py-[1.65rem] shadow-3 transition-[width] duration-300 ease-in-out`}
    >
      <button
        onClick={() => setNavOpen((prev) => !prev)}
        className='absolute -right-[11px] top-[2rem] z-10 h-[22px] w-[22px] rounded-[30px] bg-primary-1 ring-[7px] ring-primary-15'
      />
      <div className='pb-[2.5rem]'>
        <div
          onClick={() => navigate(`/app/dashboard`)}
          className='flex cursor-pointer items-center gap-[0.625rem] px-[1.66rem]'
        >
          <div className='flex items-center'>
            <Icon name='nfmLogo' svgProp={{ width: 34.75, height: 34.75 }} />
          </div>
          <h4
            className={`text-[16px] font-[700] leading-[20px] tracking-[0.15px] text-primary-1  md:text-[19px] md:font-[700] md:leading-[24px] ${
              navOpen ? `opacity-100` : `scale-0 opacity-0`
            }  duration-300`}
          >
            Ilera
          </h4>
        </div>
      </div>
      <div className='no-scrollbar flex flex-grow flex-col gap-[1.125rem] overflow-y-auto overflow-x-hidden'>
        <div className='px-4 '>
          <div
            onClick={() => navigate(`/app/${CONSTANTS.ROUTES.dashboard}`)}
            className={`flex items-center gap-[0.625rem] px-4 py-[0.625rem] hover:bg-primary-light 
            ${
              isAllowed(`student`) ? `text-secondary-9` : `text-secondary-13`
            } hover:text-primary-1 ${
              location?.pathname === `/app/${CONSTANTS.ROUTES.dashboard}`
                ? `!bg-primary-light !text-primary-1`
                : ``
            }
            group cursor-pointer rounded-[6px] transition duration-300`}
          >
            <div className='flex items-center'>
              {!isAllowed(`student`) ? (
                <Icon
                  svgProp={{
                    width: 22.75,
                    height: 22.75,
                  }}
                  name='padLock'
                />
              ) : (
                <Icon
                  name='dashboardIcon'
                  svgProp={{
                    width: 22.75,
                    height: 22.75,
                  }}
                />
              )}
            </div>
            <h6
              className={`text-[16px] font-[400] leading-[24px] tracking-[0.15px] 
          ${navOpen ? `opacity-100` : `scale-0 opacity-0`}
          duration-300`}
            >
              Dashboard
            </h6>
          </div>
        </div>
        <div
          className={`relative flex ${
            navOpen ? `opacity-100` : `opacity-0`
          } transition-opacity duration-300`}
        >
          <div className='absolute left-0 top-1/3 w-4 border border-action-disabledBg' />
          <div className='px-8 text-[12px] font-[400] leading-[14px] tracking-[0.4px] text-textColor-disabled'>
            {`Discussions`?.toUpperCase()}
          </div>
        </div>
        <div className='mb-[1.125rem] flex flex-col'>
          {sideNavLinks['discussions']?.map((i, idx) => (
            <div className='px-4' key={idx}>
              <div
                onClick={() => navigate(`/app/${i?.link}`)}
                className={`flex cursor-pointer items-center gap-[0.625rem] rounded-[6px] px-4 py-[0.625rem] hover:bg-primary-light
                ${isAllowed(i?.plan) ? `text-secondary-9` : `text-secondary-13`} 
                ${
                  location?.pathname === `/app/${i?.link}`
                    ? `!bg-primary-light !text-primary-1`
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
                  className={`whitespace-nowrap text-[16px] font-[400] leading-[24px]  tracking-[0.15px]
              ${navOpen ? `opacity-100` : `scale-0 opacity-0`}
              duration-300`}
                >
                  {i?.title}
                </h6>
              </div>
            </div>
          ))}
        </div>
        <div
          className={`relative flex ${
            navOpen ? `opacity-100` : `opacity-0`
          } transition-opacity duration-300`}
        >
          <div className='absolute left-0 top-1/3 w-4 border border-action-disabledBg' />
          <div className='px-8 text-[12px] font-[400] leading-[14px] tracking-[0.4px] text-textColor-disabled'>
            {`FEATURES`?.toUpperCase()}
          </div>
        </div>
        <div className='mb-[1.125rem] flex  flex-col'>
          {sideNavLinks['features']?.map((i, idx) => (
            <div className='px-4' key={idx}>
              <div
                onClick={() => navigate(`/app/${i?.link}`)}
                className={`flex cursor-pointer items-center gap-[0.625rem] rounded-[6px] px-4 py-[0.625rem] hover:bg-primary-light
                ${isAllowed(i?.plan) ? `text-secondary-9` : `text-secondary-13`} 
                ${
                  location?.pathname === `/app/${i?.link}`
                    ? `!bg-primary-light !text-primary-1`
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
                  className={`whitespace-nowrap text-[16px] font-[400] leading-[24px]   tracking-[0.15px]
              ${navOpen ? `opacity-100` : `scale-0 opacity-0`}
              duration-300`}
                >
                  {i?.title}
                </h6>
              </div>
            </div>
          ))}
        </div>
        <div
          className={`relative flex ${
            navOpen ? `opacity-100` : `opacity-0`
          } transition-opacity duration-300`}
        >
          <div className='absolute left-0 top-1/3 w-4 border border-action-disabledBg' />
          <div className='px-8 text-[12px] font-[400] leading-[14px] tracking-[0.4px] text-textColor-disabled'>
            {`trainings`?.toUpperCase()}
          </div>
        </div>
        <div className='mb-[1.125rem] flex  flex-col'>
          {sideNavLinks['trainings']?.map((i, idx) => (
            <div className='px-4' key={idx}>
              <div
                onClick={() => navigate(`/app/${i?.link}`)}
                className={`flex cursor-pointer items-center gap-[0.625rem] rounded-[6px] px-4 py-[0.625rem] transition hover:bg-primary-light
                ${isAllowed(i?.plan) ? `text-secondary-9` : `text-secondary-13`} 
                ${
                  location?.pathname === `/app/${i?.link}`
                    ? `!bg-primary-light !text-primary-1`
                    : ``
                }
                group
                duration-300 hover:text-primary-1`}
              >
                <div className='flex items-center'>
                  {' '}
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
                  className={`whitespace-nowrap text-[16px] font-[400] leading-[24px]  tracking-[0.15px]
              ${navOpen ? `opacity-100` : `scale-0 opacity-0`}
              duration-300`}
                >
                  {i?.title}
                </h6>
              </div>
            </div>
          ))}
        </div>
        <div
          className={`relative flex ${
            navOpen ? `opacity-100` : `opacity-0`
          } transition-opacity duration-300`}
        >
          <div className='absolute left-0 top-1/3 w-4 border border-action-disabledBg' />
          <div className='px-8 text-[12px] font-[400] leading-[14px] tracking-[0.4px] text-textColor-disabled'>
            {`SUBSCRIPTION`?.toUpperCase()}
          </div>
        </div>
        <div className='w-full px-4 '>
          <div
            className={`group h-[60px] w-full  cursor-pointer rounded-[8px] bg-primary-1 px-3 text-white transition duration-300`}
          >
            <ManageSubscriptions
              triggerClassName='w-full h-full'
              trigger={
                <div className='flex h-full w-full items-center gap-[0.8rem]'>
                  <div className='flex items-center'>{planTokens[currentUserPlan]?.icon}</div>
                  <h6
                    className={`whitespace-nowrap text-[16px] font-[600] leading-[24px] tracking-[0.15px] ${
                      navOpen ? `opacity-100` : `scale-0 opacity-0`
                    } duration-300`}
                  >
                    {planTokens[currentUserPlan]?.name}
                  </h6>
                </div>
              }
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default SideNav;
