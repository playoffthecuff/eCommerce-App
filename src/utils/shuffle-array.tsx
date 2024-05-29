import { ProductSummary } from '../types/types';

const shuffleArray = (array: ProductSummary[]) => {
  return array.sort(() => Math.random() - 0.5);
};

export default shuffleArray;
