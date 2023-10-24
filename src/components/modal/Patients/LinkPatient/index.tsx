import { Dialog, DialogContent, DialogTrigger } from 'components/shadcn/dialog';
import { Calculator, Calendar, CreditCard, Settings, Smile, User } from 'lucide-react';

import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
  CommandShortcut,
} from 'components/shadcn/ui/command';
import { useState } from 'react';
import Icon from 'utils/Icon';
import { useNavigate } from 'react-router-dom';

interface Iprop {
  trigger: JSX.Element;
  triggerClassName?: string;
  title?: string;
}

const LinkPatientsModal = ({ trigger, triggerClassName, title }: Iprop) => {
  const [modalOpen, setModalOpen] = useState(false);
  const navigate = useNavigate();

  return (
    <Dialog onOpenChange={(i) => setModalOpen(i)} open={modalOpen}>
      <DialogTrigger className={triggerClassName}>{trigger}</DialogTrigger>
      <DialogContent className='no-scrollbar mt-4 w-full max-w-full overflow-auto  overflow-x-hidden bg-white  px-6  md:!max-w-[1000px] lg:px-[3rem]'>
        <div className='flex w-full flex-col '>
          <div className='flex w-full flex-col   gap-[0.87rem] py-6'>
            {/* <Icon name='saveIcon' svgProp={{ className: 'w-20 h-16 text-gray-500' }} /> */}
            <p className='text-xl font-semibold'>Link Patient</p>
            <p className='font-semibold'>Search</p>
            <Command className='rounded-lg  shadow-md'>
              <CommandInput placeholder='Type to search name...' />
              <CommandList>
                <CommandEmpty>No results found.</CommandEmpty>

                <CommandSeparator />
                <CommandGroup heading='Results'>
                  <CommandItem>
                    <span>John Doe</span>
                  </CommandItem>
                  <CommandItem>
                    <span>John Doe</span>
                  </CommandItem>
                  <CommandItem>
                    <span>John Doe</span>
                  </CommandItem>
                </CommandGroup>
              </CommandList>
            </Command>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default LinkPatientsModal;
