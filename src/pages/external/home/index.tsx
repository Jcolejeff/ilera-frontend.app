import { LazyLoadImage } from 'react-lazy-load-image-component';
import heroImg from 'assets/image/heroImg.png?format=webp&w=560&h=528&imagetools';
import heroImgSmall from 'assets/image/heroImg.png?format=webp&w=380&h=360&imagetools';
import filmImg from 'assets/image/heyyou.png?format=webp&w=240&h=153&imagetools';
import blogImg from 'assets/image/blogImg.png?format=webp&w=330&h=280&imagetools';
import dpIcon from 'assets/image/demoDp.jpg?format=webp&imagetools';
import questionImage from 'assets/image/questionImg.png?format=webp&w=640&h=640&imagetools';
import questionImageSmall from 'assets/image/questionImg.png?format=webp&w=380&h=380&imagetools';
import Balancer from 'react-wrap-balancer';
import Icon from 'utils/Icon';
import CONSTANTS from 'constant';
import BlogCard from 'components/general/Card';
import BtsCard from 'components/general/BtsCard';
import BgTransitionSpan from 'components/animation/bg-transitions-span';
import { useNavigate } from 'react-router-dom';
import movie1 from 'assets/image/house-of-secrets.jpg?format=webp&w=240&h=153&imagetools';
import movie2 from 'assets/image/hey-you.jpg?format=webp&w=240&h=153&imagetools';
import movie3 from 'assets/image/king-of-thieves.jpg?format=webp&w=240&h=153&imagetools';
import movie4 from 'assets/image/the-man-for-the-job.jpg?format=webp&w=240&h=153&imagetools';
import { shimmer, toBase64 } from 'utils/general/shimmer';
import { apiInterface, contentApiItemInterface } from 'types';
import { useQuery } from '@tanstack/react-query';
import contentService from 'services/content';
import { processError } from 'helper/error';
import ContentLoader from 'components/general/ContentLoader';
import EmptyContentWrapper from 'components/Hocs/EmptyContentWrapper';
import Carousel from 'components/general/Carousel';

const fromTheMakersOf = [movie1, movie4, movie3, movie2];

const Home = () => {
  const navigate = useNavigate();

  // const { data: blogs, isLoading: blogLoading } = useQuery<
  //   any,
  //   any,
  //   apiInterface<contentApiItemInterface[]>
  // >({
  //   queryKey: ['get-blogs'],
  //   queryFn: () =>
  //     contentService.getContent({
  //       organization_id: import.meta.env.VITE_TIMBU_ORG_ID,
  //       category: CONSTANTS.TIMBU_KEYS.BLOG_ID,
  //     }),
  //   onError: (err) => {
  //     processError(err);
  //   },
  // });

  // const { data: bts, isLoading: btsLoading } = useQuery<
  //   any,
  //   any,
  //   apiInterface<contentApiItemInterface[]>
  // >({
  //   queryKey: ['get-bts'],
  //   queryFn: () =>
  //     contentService.getContent({
  //       organization_id: import.meta.env.VITE_TIMBU_ORG_ID,
  //       category: CONSTANTS.TIMBU_KEYS.BTS_ID,
  //     }),
  //   onError: (err) => {
  //     processError(err);
  //   },
  // });

  return <div></div>;
};

export default Home;
