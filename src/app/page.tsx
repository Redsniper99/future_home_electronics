import { Box } from '@mui/material';
import Hero from '@/components/home/Hero';
import PromoFlyers from '@/components/home/PromoFlyers';
import FeaturedCategories from '@/components/home/FeaturedCategories';
import FeaturedProducts from '@/components/home/FeaturedProducts';
import DealsSection from '@/components/home/DealsSection';
import BrandStrip from '@/components/home/BrandStrip';

export default function Home() {
  return (
    <Box>
      <Hero />
      <PromoFlyers />
      <FeaturedCategories />
      <FeaturedProducts />
      <DealsSection />
      <BrandStrip />
    </Box>
  );
}

