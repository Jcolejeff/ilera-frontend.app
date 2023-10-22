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

const AppointmentPage = () => {
  // const [currFilter, setCurrFilter] = useState<filterTypes>('All');
  // const [templateExpanded, setTemplateExpanded] = useState(false);
  // const [currentFocusedTemplate, setCurrentFocusedTemplate] = useState<productInterface | null>(
  //   null,
  // );
  // const [downloadConfirmationOpen, setDownloadConfirmationOpen] = useState(false);
  // const [stagedFile, setStagedFile] = useState('');
  // const [searchparams] = useSearchParams();

  // const { data, isLoading } = useQuery<apiInterface<productInterface[]>>({
  //   queryKey: ['get-assets-templates'],
  //   queryFn: () =>
  //     productService.getProduct({
  //       organization_id: import.meta.env.VITE_TIMBU_ORG_ID,
  //     }),
  //   onError: (err) => {
  //     processError(err);
  //   },
  // });

  // const doFileDownLoad = () => {
  //   setDownloadConfirmationOpen(false);
  //   FileSaver.saveAs(stagedFile);
  // };

  // useEffect(() => {
  //   const targetedId = searchparams.get('open');
  //   if (targetedId) {
  //     const item = data?.items?.find((i) => i?.id === targetedId);
  //     if (item) {
  //       setCurrentFocusedTemplate(item);
  //       setTemplateExpanded(true);
  //     }
  //   }
  // }, [searchparams, data]);

  return (
    <>
      {/* <Dialog open={downloadConfirmationOpen} onOpenChange={setDownloadConfirmationOpen}>
        <DialogContent className='flex h-full flex-col justify-center bg-white sm:h-max'>
          <DialogHeader>
            <DialogTitle className='my-[0.63rem] text-center text-[1.2rem] font-[500] leading-[2rem] text-primary-9/[0.87]'>
              Confirm
            </DialogTitle>
            <DialogDescription className='mx-auto max-w-[19rem] text-center text-[0.875rem] leading-[1.3125rem] tracking-[0.00938rem] text-primary-9/60'>
              Are you sure you would like to export this template?
            </DialogDescription>
          </DialogHeader>
          <div className='my-[2rem] flex items-center justify-between'>
            <Button
              onClick={() => setDownloadConfirmationOpen(false)}
              className='border bg-primary-1 px-[2rem]  py-4 text-white transition-opacity hover:bg-primary-1 hover:bg-opacity-90'
            >
              No, Cancel
            </Button>
            <Button
              onClick={() => doFileDownLoad()}
              className='border border-primary-1 bg-white px-[2rem] py-4 text-primary-9 hover:bg-primary-1/10'
            >
              Yes, Continue
            </Button>
          </div>
        </DialogContent>
      </Dialog>
      <Dialog open={templateExpanded} onOpenChange={setTemplateExpanded}>
        <DialogContent className='h-full w-full bg-white py-0 sm:h-max md:min-w-[40rem] xl:min-w-[59.75rem]'>
          <DialogHeader>
            <DialogTitle className='border-b border-b-secondary-16 py-[1.25rem] text-[1.2rem]'>
              {currentFocusedTemplate?.name}
            </DialogTitle>
          </DialogHeader>
          <div className='flex w-full flex-col items-center p-[2rem]'>
            <div className='h-[20rem] w-full overflow-hidden border border-slate-50 md:max-w-[30rem]'>
              <LazyLoadImage
                placeholderSrc={`data:image/svg+xml;base64,${toBase64(shimmer(700, 475))}`}
                src={`${CONSTANTS?.TIMBU_KEYS?.IMAGE_BASE_URL}/${
                  filterStringsContainingImageExtensions(
                    currentFocusedTemplate?.photos?.map((i) => i?.url) as string[],
                  )?.[0]
                }`}
                className='h-full w-full  bg-cover bg-top transition-transform duration-300 ease-in-out group-hover:scale-105'
                alt=' '
                effect='blur'
              />
            </div>
            <div className='mb-[1.5rem]'></div>
            <div className='flex w-full flex-col md:max-w-[34rem]'>
              <h4 className='font-[700] leading-[1.5rem] text-[1.125re] text-secondary-14 '>
                {currentFocusedTemplate?.name}
              </h4>
              <p className='mb-4 leading-[1.5rem] text-primary-9/50'>Asset type: Word Document</p>
              <p className='text-[0.875rem] leading-[1.3125rem] tracking-[0.00938rem] text-primary-9/60 '>
                {currentFocusedTemplate?.description}
              </p>
            </div>
          </div>
          <div className='flex w-full items-center justify-between pb-[2rem]'>
            <Button
              onClick={() => setTemplateExpanded(false)}
              className='border border-primary-1 bg-white px-[2rem] py-4 text-primary-9 hover:bg-primary-1/10'
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
              className='border bg-primary-1 px-[2rem]  py-4 text-white transition-opacity hover:bg-primary-1 hover:bg-opacity-90'
            >
              Download this Asset
            </Button>
          </div>
        </DialogContent>
      </Dialog> */}
      <div className='container flex w-full flex-col px-container-base py-[1.875rem]'>
        <FunkyPagesHero
          // description='Find and download fimmaking assets you need'
          title='Appointment'
        />
        <PlanGuard page='appointment'>
          <>
            {/* <div className='relative mx-auto my-[1.5rem] w-full max-w-[800px] md:-top-[1.5rem] md:my-0 md:mb-[1.75rem]'>
              <SearchComboBox />
            </div>
            <div className='mb-[1.5rem] flex w-full justify-center'>
              <PillTabs
                tabs={generalFilters}
                currActive={currFilter}
                onSelect={(i) => setCurrFilter(i)}
              />
            </div>
            <ContentLoader numberOfBlocks={4} isLoading={isLoading}>
              <div className='grid w-full grid-cols-1 gap-x-[1.5rem] gap-y-[3.875rem] sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4'>
                {data?.items?.map((i, idx) => (
                  <div
                    onClick={() => {
                      setTemplateExpanded(true);
                    }}
                    key={idx}
                    className='h-full w-full'
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
            </ContentLoader> */}
          </>
        </PlanGuard>
      </div>
    </>
  );
};

export default AppointmentPage;
