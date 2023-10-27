import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from 'components/shadcn/accordion';
import Icon from 'utils/Icon';
import { ArrowBigRightDash } from 'lucide-react';
import { ArrowBigRight } from 'lucide-react';
import { ArrowRightCircle } from 'lucide-react';

export default function SampleAccordion() {
  return (
    <Accordion type='single' collapsible className='w-full shadow-md'>
      <AccordionItem value='item-1' className='border-0'>
        <AccordionTrigger className='bg-slate-200/50 px-6'>
          <div>
            <p className='text-start text-lg font-semibold text-gray-700'>Step sankdkdk</p>
          </div>
        </AccordionTrigger>
        <AccordionContent>
          <div className='flex items-center justify-between'>
            <div className='flex items-center gap-2'>
              <div className='flex items-center gap-2'>
                <p className='text-sm text-gray-700'>Edit</p>
              </div>
            </div>
          </div>
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  );
}
