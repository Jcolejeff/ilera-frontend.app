import UserSettings from './UserSettings';
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

const Timeline = () => {
  const [currFilter, setCurrFilter] = useState<filterTypes>('user settings');

  return (
    <div className=''>
      {/* to be refactored */}
      <p className='text-base font-semibold'>Timeline</p>
      <div className='flex gap-4 '>
        {settingsFilters?.map((i, idx) => (
          <button
            key={idx}
            className={`${
              i?.name === currFilter
                ? ` border-b border-black`
                : `bg-transparent text-secondary-2 hover:text-primary-1`
            } flex h-full  w-max items-center   py-3 text-start transition-all ease-in-out `}
            onClick={() => setCurrFilter(i?.name)}
          >
            <span className='mt-[3px] text-[13px] capitalize leading-3 tracking-[0.15px] md:mt-0 lg:text-[13px]'>
              {i?.name}
            </span>
          </button>
        ))}
      </div>
      <div className='relative grid h-full w-full '>
        {/* ... */}

        <div className='mt-4 h-full rounded-lg border  p-3'>
          <DisplayTab title={currFilter} />
        </div>
      </div>
    </div>
  );
};

export default Timeline;
