import { cn } from 'lib/utils';
import Icon from 'utils/Icon';

interface IEmptyContentWrapper {
  className?: string;
  isEmpty?: boolean;
  children: React.ReactNode;
  customMessage?: string;
}

const EmptyContentWrapper = ({
  className,
  customMessage,
  isEmpty,
  children,
}: IEmptyContentWrapper) => {
  return isEmpty ? (
    <div
      className={cn('flex flex-col items-center justify-center flex-grow w-full gap-4', className)}
    >
      <div>
        <Icon name='alienPlants' svgProp={{ className: 'max-w-full ' }} />
      </div>
      <p className='text-primary-1 text-[14px] leading-[20px] tracking-[0.15px]'>
        {customMessage ? customMessage : `This is currently unavailable, pls check back`}
      </p>
    </div>
  ) : (
    <>{children}</>
  );
};

export default EmptyContentWrapper;
