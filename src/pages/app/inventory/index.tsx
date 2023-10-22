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

const InventoryPage = () => {
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
    <div className='container flex w-full flex-col px-container-base py-[1.875rem]'>
      <FunkyPagesHero
        // description='Find out what goes on behind the scenes of blockbuster movies'
        title='Inventory'
      />
      <PlanGuard page='inventory'>
        <div></div>
      </PlanGuard>
    </div>
  );
};

export default InventoryPage;
