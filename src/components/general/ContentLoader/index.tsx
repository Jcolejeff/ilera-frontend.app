import { Skeleton } from 'components/shadcn/skeleton';
import { cn } from 'lib/utils';

interface IContentLoader {
  isLoading: boolean;
  children: React.ReactNode;
  className?: string;
  blocksClassName?: string;
  numberOfBlocks?: number;
}

const ContentLoader = ({
  isLoading,
  blocksClassName,
  className,
  children,
  numberOfBlocks = 3,
}: IContentLoader) => {
  return isLoading ? (
    <div
      className={cn(
        'w-full grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3  gap-x-[1.5rem] gap-y-[3.875rem]',
        className,
      )}
    >
      {[...Array(numberOfBlocks)]?.map((_, idx) => (
        <div key={idx} className={cn('w-full flex flex-col gap-4', blocksClassName)}>
          <Skeleton className='w-full h-[15rem]' />
          <Skeleton className='w-[80%] h-[2rem]' />
          <Skeleton className='w-full h-[2rem]' />
        </div>
      ))}
    </div>
  ) : (
    <>{children}</>
  );
};

export default ContentLoader;
