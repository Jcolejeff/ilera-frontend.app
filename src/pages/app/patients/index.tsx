import FunkyPagesHero from 'components/general/FunkyPagesHero';
import PlanGuard from 'guards/PlanGuard';
import { useState } from 'react';
import InputAddComboBox from 'components/general/InputAddComboBox';
import LinksFilter from 'components/general/LinksFilter';
import PillTabs from 'components/general/PillTabs';
import CommentThreadCard from 'components/general/CommentThreadCard';
type filterTypes = 'Trending' | 'Recently added' | 'Your Threads' | 'Starred' | 'Interactions';

const generalFilters: filterTypes[] = [
  'Trending',
  'Recently added',
  'Your Threads',
  'Starred',
  'Interactions',
];

const PatientsPage = () => {
  const [currFilter, setCurrFilter] = useState<filterTypes>('Trending');

  return (
    <div className='container flex w-full flex-col px-container-base py-[1.875rem]'>
      <FunkyPagesHero
        // description='Ask Professionals and Masters  questions you need answers to by creating a thread'
        title='Patients'
      />
      <PlanGuard page='patients'>
        <>
          {/* <div className='relative mx-auto my-[1.5rem] w-full max-w-[800px] md:-top-[1.5rem] md:my-0 md:mb-[1rem]'>
            <InputAddComboBox placeholder='Add a new thread...' />
          </div>
          <div className='mb-[1.5rem] flex w-full justify-center'>
            <PillTabs
              tabs={generalFilters}
              currActive={currFilter}
              onSelect={(i) => setCurrFilter(i)}
            />
          </div>
          <div className='mb-[1.5rem] flex w-full justify-center'>
            <LinksFilter
              tabs={[
                {
                  link: ``,
                  sublinks: [
                    { title: `Best tv shows`, link: `` },
                    { link: ``, title: `Awards` },
                  ],
                  title: `General`,
                },
                {
                  link: ``,
                  sublinks: [],
                  title: `Production`,
                },
                {
                  link: ``,
                  sublinks: [],
                  title: `Post-production`,
                },
                {
                  link: ``,
                  sublinks: [],
                  title: `Distribution and Marketing`,
                },
                {
                  link: ``,
                  sublinks: [],
                  title: `Animation/vfx`,
                },
              ]}
            />
          </div>
          <CommentThreadCard /> */}
        </>
      </PlanGuard>
    </div>
  );
};

export default PatientsPage;
