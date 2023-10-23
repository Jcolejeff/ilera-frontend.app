import PatientsRecords from './Records';
import PatientsReports from './Reports';
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

type filterTypes = 'patients records' | 'patients reports';

interface Filter {
  name: filterTypes;
  icon: JSX.Element;
}
const PatientsFilter: Filter[] = [
  { name: 'patients records', icon: <Icon name='profileIcon' /> },
  { name: 'patients reports', icon: <Icon name='padLockV2' /> },
];

interface Tabs {
  title: filterTypes;
}

const DisplayTab = ({ title }: Tabs) => {
  const components: Record<filterTypes, JSX.Element> = {
    'patients records': <PatientsRecords />,
    'patients reports': <PatientsReports />,
  };

  return components[title];
};

const PatientsPage = () => {
  const [currFilter, setCurrFilter] = useState<filterTypes>('patients records');

  return (
    <div className='container flex h-full w-full max-w-[150.75rem]  flex-col overflow-auto px-container-base py-[2.1rem]'>
      {/* to be refactored */}
      <div className='flex justify-between '>
        <p className='text-base font-semibold text-primary-1'>Patients</p>
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

export default PatientsPage;
