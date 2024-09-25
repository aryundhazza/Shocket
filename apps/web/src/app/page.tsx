import { Carousel } from '@/components/carousel';
import { carouselImages } from '../utils/image';
import { NextPage } from 'next';
import Wrapper from '@/components/wrapper';
import EventsPage from './event/page';

const Home: NextPage = () => (
  <Wrapper>
    <div className="container mx-auto px-10">
      <div className="w-full h-full">
        <Carousel images={carouselImages.map((image) => image.src)} />
        <div className="pt-8">
          <EventsPage />
        </div>
      </div>
    </div>
  </Wrapper>
);

export default Home;
