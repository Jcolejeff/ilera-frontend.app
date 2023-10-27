import { Dialog, DialogContent, DialogTrigger } from 'components/shadcn/dialog';

import AddAttachment from './addAttachmentForm';
import { useState } from 'react';

interface Iprops {
  trigger: JSX.Element;
  triggerClassName?: string;
  title?: string;
}

const AddAttachmentModal = ({ trigger, triggerClassName, title }: Iprops) => {
  const [modalOpen, setModalOpen] = useState(false);

  return (
    <Dialog onOpenChange={(i) => setModalOpen(i)} open={modalOpen}>
      <DialogTrigger className={triggerClassName}>{trigger}</DialogTrigger>
      <DialogContent className='h-screen max-w-full overflow-auto overflow-x-hidden bg-white  px-6 pt-[3rem] sm:w-[65vw] md:h-5/6 md:!max-w-[700px] lg:px-[2rem]'>
        <div className='flex w-full flex-col '>
          <h4 className='mb-[1.72rem] text-sm font-[500] leading-[28px] tracking-[0.17px] md:text-lg'>
            {title || `Attachment`}
          </h4>
          <div className='flex w-full flex-col gap-[0.87rem]'>
            <AddAttachment setModalOpen={setModalOpen} />
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default AddAttachmentModal;
