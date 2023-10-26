import React from 'react';
interface Iprop {
  text: string;
  title: string;
}

const TextInfoSTack = ({ text, title }: Iprop) => {
  return (
    <article className='flex flex-col'>
      <p>
        <span className='text-xs text-gray-400'>{title}</span>
      </p>
      <p>
        <span className='text-sm font-semibold text-gray-500'>{text}</span>
      </p>
    </article>
  );
};

export default TextInfoSTack;
