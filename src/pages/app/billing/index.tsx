import FunkyPagesHero from 'components/general/FunkyPagesHero';
import PlanGuard from 'guards/PlanGuard';

const BillingPage = () => {
  return (
    <div className='container flex w-full flex-col px-container-base py-[1.875rem]'>
      <FunkyPagesHero
        // description='Access bi-annual bootcamps and register!'
        title='Billing'
      />
      <PlanGuard page='billing'>
        <div></div>
      </PlanGuard>
    </div>
  );
};
export default BillingPage;
