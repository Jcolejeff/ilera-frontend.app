import 'keen-slider/keen-slider.min.css';
import { KeenSliderPlugin, useKeenSlider } from 'keen-slider/react';
import { cn } from 'lib/utils';
import { useState } from 'react';

interface ICarousel {
  perView: number | 'auto' | (() => number | 'auto');
  spacing: number;
  className?: string;
  children: React.ReactNode;
}

const Carousel = ({ perView, spacing, className, children }: ICarousel) => {
  const [currentSlide, setCurrentSlide] = useState<any>(0);
  const [loaded, setLoaded] = useState<any>(false);

  const MutationPlugin: KeenSliderPlugin = (slider) => {
    const observer = new MutationObserver(function (mutations) {
      mutations.forEach(function (mutation) {
        slider.update({
          slides: {
            perView,
            spacing,
            origin: 'auto',
          },
        });
      });
    });
    const config = { childList: true };
    slider.on('created', () => {
      observer.observe(slider.container, config);
    });
    slider.on('destroyed', () => {
      observer.disconnect();
    });
  };

  const [sliderRef, instanceRef] = useKeenSlider(
    {
      slideChanged(slider) {
        setCurrentSlide(slider.track.details.rel);
      },
      detailsChanged: (s) => {},
      mode: 'free-snap',
      slides: {
        perView,
        spacing,
        origin: 'auto',
      },
      initial: 0,
      created() {
        setLoaded(true);
      },
    },
    [],
  );

  return (
    <div className={cn(`relative`, className)}>
      <div ref={sliderRef} className='keen-slider'>
        {children}
      </div>
      {loaded && instanceRef.current && (
        <>
          <span
            onClick={(e: any) => e.stopPropagation() || instanceRef.current?.prev()}
            className='w-[50px] h-[50px] grid place-items-center absolute top-[30%] translate-y-[-50px] cursor-pointer bg-black/30 rounded-[50px] hover:bg-black/50 active:bg-black/30 transition-colors duration-300 ease-in-out -left-[1rem] text-white'
          >
            <svg
              xmlns='http://www.w3.org/2000/svg'
              fill='none'
              viewBox='0 0 24 24'
              strokeWidth={1.5}
              stroke='currentColor'
              className='w-6 h-6'
            >
              <path strokeLinecap='round' strokeLinejoin='round' d='M15.75 19.5L8.25 12l7.5-7.5' />
            </svg>
          </span>
          <span
            onClick={(e: any) => e.stopPropagation() || instanceRef?.current?.next()}
            className='w-[50px] h-[50px] grid place-items-center absolute top-[30%] translate-y-[-50px] cursor-pointer bg-black/30 rounded-[50px]  hover:bg-black/50 active:bg-black/30 transition-colors duration-300 ease-in-out left-auto right-[1rem] text-white'
          >
            <svg
              xmlns='http://www.w3.org/2000/svg'
              fill='none'
              viewBox='0 0 24 24'
              strokeWidth={1.5}
              stroke='currentColor'
              className='w-6 h-6'
            >
              <path strokeLinecap='round' strokeLinejoin='round' d='M8.25 4.5l7.5 7.5-7.5 7.5' />
            </svg>
          </span>
        </>
      )}
    </div>
  );
};

export default Carousel;

const Child = ({ className, children }: { className?: string; children: React.ReactNode }) => {
  return <div className={cn(`keen-slider__slide !min-w-max`, className)}>{children}</div>;
};

Carousel.Child = Child;
