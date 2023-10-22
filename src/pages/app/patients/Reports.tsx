import { cn } from 'lib/utils';
import sections from './tempData';
const PatientsReports = () => {
  return (
    <section>
      <h3 className='font-semibold text-primary-1'>Patients Reports</h3>
      <section className='mt-12 grid grid-cols-[1fr_1fr]  gap-[2rem] rounded-lg md:grid-cols-[1fr_1fr_1fr]  xxl:grid-cols-[1fr_1fr_1fr_1fr]'>
        {sections.map((item, key) => {
          return (
            <article
              className={cn(
                `} cursor-pointer rounded-lg border px-5 py-6 opacity-50 transition-all duration-500 ease-in-out`,
              )}
              key={key}
            >
              <div className='flex flex-col gap-1  px-2'>
                <h3 className='text-sm font-semibold'>{item.heading}</h3>
                <p>
                  <span className='font-bold md:text-[1.5rem]'>{item.count}</span>
                  {/* <span className='text-[0.8rem] font-semibold'>%</span> */}
                </p>
                <p className='text-[0.79rem] leading-[130%] tracking-[0.02rem] md:leading-[1.2rem] md:tracking-[0.0125rem]'>
                  {item.paragraph}
                </p>
              </div>
            </article>
          );
        })}
      </section>
    </section>
  );
};

export default PatientsReports;
