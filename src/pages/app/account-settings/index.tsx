import UserSettings from 'pages/app/account-settings/UserSettings';
import BillingAndPlan from './BillingAndPlan';
import Connections from './Connections';
import Notification from './Notification';
import Security from './Security';
import PlanGuard from 'guards/PlanGuard';
import { useState } from 'react';
import Icon from 'utils/Icon';

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from 'components/shadcn/dropdown-menu';

type filterTypes =
  | 'user settings'
  | 'role settings'
  | 'Laboratory Tests '
  | 'Company Services'
  | 'Insurance List';

interface Filter {
  name: filterTypes;
  icon: JSX.Element;
}
const settingsFilters: Filter[] = [
  { name: 'user settings', icon: <Icon name='profileIcon' /> },
  { name: 'role settings', icon: <Icon name='padLockV2' /> },
  { name: 'Laboratory Tests ', icon: <Icon name='fileIcon' /> },
  { name: 'Company Services', icon: <Icon name='notificationIcon' /> },
  { name: 'Insurance List', icon: <Icon name='linkIcon' /> },
];

interface Tabs {
  title: filterTypes;
}

const DisplayTab = ({ title }: Tabs) => {
  const components: Record<filterTypes, JSX.Element> = {
    'user settings': <UserSettings />,
    'role settings': <Security />,
    'Laboratory Tests ': <BillingAndPlan />,
    'Company Services': <Notification />,
    'Insurance List': <Connections />,
  };

  return components[title];
};

const AccountSettings = () => {
  const [currFilter, setCurrFilter] = useState<filterTypes>('user settings');

  return (
    <div className='container flex h-full w-full  flex-col overflow-auto px-container-base py-[2.1rem]'>
      {/* to be refactored */}
      <div className='flex justify-between '>
        <p className='text-base font-semibold text-primary-1'>Settings</p>{' '}
        <DropdownMenu>
          <DropdownMenuTrigger
            className={`focus-within:outline-0 focus-within:ring-0 focus:ring-0 active:ring-0`}
          >
            <Icon name='menu' />
          </DropdownMenuTrigger>
          <DropdownMenuContent className='mr-[1.5rem] w-[20.375rem]  bg-white shadow-5'>
            {settingsFilters?.map((i, idx) => (
              <DropdownMenuItem
                key={idx}
                className='flex cursor-pointer items-center gap-[0.75rem] !px-[1.25rem] !py-[0.75rem] text-[14px] leading-[21px] tracking-[0.15px] text-textColor-primary'
              >
                <button
                  key={idx}
                  className={`${
                    i?.name === currFilter
                      ? `bg-primary-1 text-white`
                      : `bg-transparent text-secondary-2 hover:text-primary-1`
                  } flex  h-full w-max items-center rounded-[5px]  px-[2.5rem] py-3 transition-all ease-in-out `}
                  onClick={() => setCurrFilter(i?.name)}
                >
                  <span className='mt-[3px] whitespace-nowrap text-[13px] capitalize leading-3 tracking-[0.15px] md:mt-0 lg:text-[13px]'>
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

export default AccountSettings;
