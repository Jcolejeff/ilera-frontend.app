import { Skeleton } from 'components/shadcn/skeleton';
import { cn } from 'lib/utils';

interface IInlineLoader {
  isLoading: boolean;
  children: React.ReactNode;
  className?: string;
}

const InlineLoader = ({ children, isLoading, className }: IInlineLoader) => {
  return isLoading ? (
    <Skeleton className={cn('w-[6rem] h-[1.5rem]', className)} />
  ) : (
    <>{children}</>
  );
};

export default InlineLoader;
