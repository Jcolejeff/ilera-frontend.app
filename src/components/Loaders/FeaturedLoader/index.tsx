import React from 'react';
import { Skeleton } from 'components/shadcn/skeleton';
import { cn } from 'lib/utils';

interface IFeaturedLoader {
  isLoading: boolean;
  children: React.ReactNode;
  className?: string;
}

const FeaturedLoader = ({ children, isLoading, className }: IFeaturedLoader) => {
  return isLoading ? (
    <div className={cn('flex flex-col items-center gap-8 lg:flex-row mb-[2.5rem]', className)}>
      <Skeleton className='w-full max-w-[424px] h-[17.5rem]' />
      <div className='flex w-full flex-col justify-center gap-4'>
        <Skeleton className='w-[20%] h-4' />
        <Skeleton className='w-full h-[2rem]' />
        <Skeleton className='w-full h-[4rem]' />
      </div>
    </div>
  ) : (
    <>{children}</>
  );
};

export default FeaturedLoader;
