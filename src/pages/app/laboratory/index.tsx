import FunkyPagesHero from 'components/general/FunkyPagesHero';
import PlanGuard from 'guards/PlanGuard';

const Laboratory = () => {
  return (
    <div className='container flex w-full flex-col px-container-base py-[1.875rem]'>
      <FunkyPagesHero
        // description='Would you like to consult with Anthill Studios for a Project?!'
        title='Laboratory'
      />
      <PlanGuard page='laboratory'>
        <div></div>
      </PlanGuard>
    </div>
  );
};

export default Laboratory;
