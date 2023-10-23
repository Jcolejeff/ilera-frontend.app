import ScrollToTop from 'components/animation/scroll-to-top';
import AppNav from 'components/partials/app-nav';
import SideNav from 'components/partials/side-nav';
import { useOutlet } from 'react-router-dom';

const AppLayout = () => {
  const outlet = useOutlet();

  return (
    <div className='flex h-full w-full '>
      <aside className='z-[1] hidden h-full w-max overflow-visible md:flex'>
        <SideNav />
      </aside>
      <main className='flex flex-grow flex-col bg-white'>
        <ScrollToTop />
        <AppNav />
        <section className='no-scrollbar relative mx-auto mt-10  h-full w-full max-w-[150.75rem] overflow-auto '>
          <ScrollToTop />
          {outlet}
        </section>
      </main>
    </div>
  );
};

export default AppLayout;
