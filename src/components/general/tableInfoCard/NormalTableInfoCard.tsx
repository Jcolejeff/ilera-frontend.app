import React from 'react';
import { cn } from 'lib/utils';

interface Props {
  title: string;
  value: number;
  description: string;
}

const NormalTableInfoCard = ({ title, value, description }: Props) => {
  return (
    <article
      className={cn(
        `} cursor-pointer rounded-lg  px-5 py-6 opacity-50 transition-all duration-500 ease-in-out`,
      )}
    >
      <div className='flex flex-col gap-1  px-2'>
        <h3 className='text-sm font-semibold'>{title}</h3>
        <p>
          <span className='font-bold md:text-[1.5rem]'>{value}</span>
          {/* <span className='text-[0.8rem] font-semibold'>%</span> */}
        </p>
        <p className='text-[0.79rem] leading-[130%] tracking-[0.02rem] md:leading-[1.2rem] md:tracking-[0.0125rem]'>
          {' '}
          {description}
        </p>
      </div>
    </article>
  );
};

export default NormalTableInfoCard;
