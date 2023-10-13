import BtsCard from 'components/general/BtsCard';
import FunkyPagesHero from 'components/general/FunkyPagesHero';
import LinksFilter from 'components/general/LinksFilter';
import SearchComboBox from 'components/general/SearchComboBox';
import PlanGuard from 'guards/PlanGuard';
import filmImg from 'assets/image/heyyou.png?format=webp&w=240&h=153&imagetools';
import { useNavigate } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { apiInterface, contentApiItemInterface } from 'types';
import contentService from 'services/content';
import { processError } from 'helper/error';
import CONSTANTS from 'constant';
import ContentLoader from 'components/general/ContentLoader';
import EmptyContentWrapper from 'components/Hocs/EmptyContentWrapper';

const BtsInternal = () => {
  const navigate = useNavigate();

  const { data, isLoading } = useQuery<any, any, apiInterface<contentApiItemInterface[]>>({
    queryKey: ['get-bts'],
    queryFn: () =>
      contentService.getContent({
        organization_id: import.meta.env.VITE_TIMBU_ORG_ID,
        category: CONSTANTS.TIMBU_KEYS.BTS_ID,
      }),
    onError: (err) => {
      processError(err);
    },
  });

  return (
    <div className='container w-full px-container-base flex flex-col py-[1.875rem]'>
      <FunkyPagesHero
        description='Find out what goes on behind the scenes of blockbuster movies'
        title='BTS'
      />
      <PlanGuard page='bts'>
        <EmptyContentWrapper
          isEmpty={!isLoading && data?.items && data?.items?.length < 1}
          customMessage='No Bts Content Currently, Pls Check Back'
        >
          <>
            <div className='w-full max-w-[800px] relative mx-auto my-[1.5rem] md:my-0 md:mb-[1rem] md:-top-[1.5rem]'>
              <SearchComboBox />
            </div>
            <div className='flex justify-center w-full mb-[2.5rem]'>
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
            <ContentLoader isLoading={isLoading} numberOfBlocks={6}>
              <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-x-[1.5rem] gap-y-[2.5rem]'>
                {data?.items?.map((i, idx) => (
                  <div key={idx} className='w-full h-full'>
                    <BtsCard
                      btsImage={`${CONSTANTS.TIMBU_KEYS.IMAGE_BASE_URL}/${i?.photos[0]?.url}`}
                      category={`BTS`}
                      title={`${i?.title}`}
                      description={`${i?.subtitle}`}
                      link={`${i?.id}`}
                    />
                  </div>
                ))}
              </div>
            </ContentLoader>
          </>
        </EmptyContentWrapper>
      </PlanGuard>
    </div>
  );
};

export default BtsInternal;
