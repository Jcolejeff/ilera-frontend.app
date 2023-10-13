import AssetCard from 'components/general/AssetCard';
import FunkyPagesHero from 'components/general/FunkyPagesHero';
import PillTabs from 'components/general/PillTabs';
import SearchComboBox from 'components/general/SearchComboBox';
import PlanGuard from 'guards/PlanGuard';
import { useEffect, useState } from 'react';
import filmImg from 'assets/image/assetFilmImg.png';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from 'components/shadcn/dialog';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import { shimmer, toBase64 } from 'utils/general/shimmer';
import { Button } from 'components/shadcn/ui/button';
import productService from 'services/product';
import { processError } from 'helper/error';
import { useQuery } from '@tanstack/react-query';
import { apiInterface, productInterface } from 'types';
import ContentLoader from 'components/general/ContentLoader';
import assetImg from 'assets/image/assetFilmImg.png';
import CONSTANTS from 'constant';
import { filterStringsContainingDoc, filterStringsContainingImageExtensions } from 'helper';
import FileSaver from 'file-saver';
import { useSearchParams } from 'react-router-dom';

type filterTypes =
  | 'All'
  | 'Pre-Production'
  | 'Post-production'
  | 'Distribution and Marketing'
  | 'Starred';

const generalFilters: filterTypes[] = [
  'All',
  'Pre-Production',
  'Distribution and Marketing',
  'Starred',
];

const AssetsTemplates = () => {
  const [currFilter, setCurrFilter] = useState<filterTypes>('All');
  const [templateExpanded, setTemplateExpanded] = useState(false);
  const [currentFocusedTemplate, setCurrentFocusedTemplate] = useState<productInterface | null>(
    null,
  );
  const [downloadConfirmationOpen, setDownloadConfirmationOpen] = useState(false);
  const [stagedFile, setStagedFile] = useState('');
  const [searchparams] = useSearchParams();

  const { data, isLoading } = useQuery<apiInterface<productInterface[]>>({
    queryKey: ['get-assets-templates'],
    queryFn: () =>
      productService.getProduct({
        organization_id: import.meta.env.VITE_TIMBU_ORG_ID,
      }),
    onError: (err) => {
      processError(err);
    },
  });

  const doFileDownLoad = () => {
    setDownloadConfirmationOpen(false);
    FileSaver.saveAs(stagedFile);
  };

  useEffect(() => {
    const targetedId = searchparams.get('open');
    if (targetedId) {
      const item = data?.items?.find((i) => i?.id === targetedId);
      if (item) {
        setCurrentFocusedTemplate(item);
        setTemplateExpanded(true);
      }
    }
  }, [searchparams, data]);

  return (
    <>
      <Dialog open={downloadConfirmationOpen} onOpenChange={setDownloadConfirmationOpen}>
        <DialogContent className='bg-white h-full sm:h-max flex flex-col justify-center'>
          <DialogHeader>
            <DialogTitle className='text-center my-[0.63rem] text-primary-9/[0.87] text-[1.2rem] font-[500] leading-[2rem]'>
              Confirm
            </DialogTitle>
            <DialogDescription className='text-center text-[0.875rem] text-primary-9/60 tracking-[0.00938rem] leading-[1.3125rem] max-w-[19rem] mx-auto'>
              Are you sure you would like to export this template?
            </DialogDescription>
          </DialogHeader>
          <div className='my-[2rem] flex items-center justify-between'>
            <Button
              onClick={() => setDownloadConfirmationOpen(false)}
              className='py-4 px-[2rem] border  bg-primary-1 hover:bg-primary-1 text-white hover:bg-opacity-90 transition-opacity'
            >
              No, Cancel
            </Button>
            <Button
              onClick={() => doFileDownLoad()}
              className='py-4 px-[2rem] border border-primary-1 bg-white text-primary-9 hover:bg-primary-1/10'
            >
              Yes, Continue
            </Button>
          </div>
        </DialogContent>
      </Dialog>
      <Dialog open={templateExpanded} onOpenChange={setTemplateExpanded}>
        <DialogContent className='bg-white py-0 w-full h-full sm:h-max md:min-w-[40rem] xl:min-w-[59.75rem]'>
          <DialogHeader>
            <DialogTitle className='py-[1.25rem] border-b border-b-secondary-16 text-[1.2rem]'>
              {currentFocusedTemplate?.name}
            </DialogTitle>
          </DialogHeader>
          <div className='w-full flex flex-col items-center p-[2rem]'>
            <div className='w-full h-[20rem] md:max-w-[30rem] border border-slate-50 overflow-hidden'>
              <LazyLoadImage
                placeholderSrc={`data:image/svg+xml;base64,${toBase64(shimmer(700, 475))}`}
                src={`${CONSTANTS?.TIMBU_KEYS?.IMAGE_BASE_URL}/${
                  filterStringsContainingImageExtensions(
                    currentFocusedTemplate?.photos?.map((i) => i?.url) as string[],
                  )?.[0]
                }`}
                className='w-full h-full  transition-transform duration-300 ease-in-out bg-top bg-cover group-hover:scale-105'
                alt=' '
                effect='blur'
              />
            </div>
            <div className='mb-[1.5rem]'></div>
            <div className='w-full flex flex-col md:max-w-[34rem]'>
              <h4 className='text-secondary-14 text-[1.125re] font-[700] leading-[1.5rem] '>
                {currentFocusedTemplate?.name}
              </h4>
              <p className='text-primary-9/50 leading-[1.5rem] mb-4'>Asset type: Word Document</p>
              <p className='text-[0.875rem] text-primary-9/60 leading-[1.3125rem] tracking-[0.00938rem] '>
                {currentFocusedTemplate?.description}
              </p>
            </div>
          </div>
          <div className='w-full flex items-center justify-between pb-[2rem]'>
            <Button
              onClick={() => setTemplateExpanded(false)}
              className='py-4 px-[2rem] border border-primary-1 bg-white text-primary-9 hover:bg-primary-1/10'
            >
              Cancel
            </Button>
            <Button
              onClick={() => {
                setStagedFile(
                  `${CONSTANTS?.TIMBU_KEYS?.IMAGE_BASE_URL}/${
                    filterStringsContainingDoc(
                      currentFocusedTemplate?.photos?.map((i) => i?.url) as string[],
                    )?.[0]
                  }`,
                );
                setTemplateExpanded(false);
                setDownloadConfirmationOpen(true);
              }}
              className='py-4 px-[2rem] border  bg-primary-1 hover:bg-primary-1 text-white hover:bg-opacity-90 transition-opacity'
            >
              Download this Asset
            </Button>
          </div>
        </DialogContent>
      </Dialog>
      <div className='container w-full px-container-base flex flex-col py-[1.875rem]'>
        <FunkyPagesHero
          description='Find and download fimmaking assets you need'
          title='Assets & Templates'
        />
        <PlanGuard page='assets-templates'>
          <>
            <div className='w-full max-w-[800px] relative mx-auto my-[1.5rem] md:my-0 md:mb-[1.75rem] md:-top-[1.5rem]'>
              <SearchComboBox />
            </div>
            <div className='flex justify-center w-full mb-[1.5rem]'>
              <PillTabs
                tabs={generalFilters}
                currActive={currFilter}
                onSelect={(i) => setCurrFilter(i)}
              />
            </div>
            <ContentLoader numberOfBlocks={4} isLoading={isLoading}>
              <div className='grid w-full grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-x-[1.5rem] gap-y-[3.875rem]'>
                {data?.items?.map((i, idx) => (
                  <div
                    onClick={() => {
                      setTemplateExpanded(true);
                    }}
                    key={idx}
                    className='w-full h-full'
                  >
                    <AssetCard
                      desc='Storytelling blueprint for movies.'
                      image={`${CONSTANTS?.TIMBU_KEYS?.IMAGE_BASE_URL}/${
                        filterStringsContainingImageExtensions(
                          i?.photos?.map((i) => i?.url) as string[],
                        )?.[0]
                      }`}
                      title={i?.name}
                      onClick={() => {
                        setCurrentFocusedTemplate(i);
                        setTemplateExpanded(true);
                      }}
                    />
                  </div>
                ))}
              </div>
            </ContentLoader>
          </>
        </PlanGuard>
      </div>
    </>
  );
};

export default AssetsTemplates;
