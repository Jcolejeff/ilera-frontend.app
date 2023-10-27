import Activities from './Activities';
import Tests from './Tests';
import Consultation from './Consultation';
import Billing from './Billing';
import Visits from './Visits';
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

type filterTypes = 'activities' | 'Visits' | 'Tests ' | 'Billing' | 'Consultation';

interface Filter {
  name: filterTypes;
  icon: JSX.Element;
}
const settingsFilters: Filter[] = [
  { name: 'activities', icon: <Icon name='profileIcon' /> },
  { name: 'Visits', icon: <Icon name='padLockV2' /> },
  { name: 'Tests ', icon: <Icon name='fileIcon' /> },
  { name: 'Billing', icon: <Icon name='notificationIcon' /> },
  { name: 'Consultation', icon: <Icon name='linkIcon' /> },
];

interface Tabs {
  title: filterTypes;
}

const DisplayTab = ({ title }: Tabs) => {
  const components: Record<filterTypes, JSX.Element> = {
    activities: <Activities />,
    Visits: <Visits />,
    'Tests ': <Tests />,
    Billing: <Billing />,
    Consultation: <Consultation />,
  };

  return components[title];
};

const Timeline = () => {
  const [currFilter, setCurrFilter] = useState<filterTypes>('activities');

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
