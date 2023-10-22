import Icon from 'utils/Icon';

interface IFunkyPagesHero {
  title: string;
  description?: string;
  customBgClass?: string;
}

const FunkyPagesHero = ({ description, title, customBgClass }: IFunkyPagesHero) => {
  return (
    <div className='relative  min-h-[10rem] w-full overflow-hidden rounded-[16px]'>
      <div className={`absolute h-full w-full bg-primary-1 ${customBgClass ? customBgClass : ``}`}>
        <Icon name='funkyPagesHero' />
      </div>
      <div className='absolute flex h-full w-full items-center justify-center px-2 md:items-start'>
        <div className='z-[1] mt-8 flex h-max w-max  flex-col items-center md:mt-[4.1875rem]'>
          <h4 className='relative text-center text-[32px] font-[700] leading-[40px] tracking-[0.15px] text-white'>
            {title}
            <div className='absolute -left-[1.5rem] -top-[1.5rem]'>
              <Icon name='funkyPagesTextTop' />
            </div>
          </h4>
          <p className=' text-center text-[14px] font-[300] leading-[21px] text-primary-10'>
            {description}
          </p>
        </div>
      </div>
    </div>
  );
};

export default FunkyPagesHero;
