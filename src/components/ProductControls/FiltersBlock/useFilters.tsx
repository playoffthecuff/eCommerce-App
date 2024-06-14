import { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { DEFAULT_PAGE, DEFAULT_PAGE_SIZE, MAX_PRODUCT_PRICE, catalogStore } from '../../../store/catalog-store';

import { FiltersData, Sort } from '../../../types/types';

export const useFilters = (filtersData: FiltersData) => {
  const [query, setQuery] = useSearchParams();
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [selectedColors, setSelectedColors] = useState<string[]>([]);
  const [selectedRating, setSelectedRating] = useState<number>(0);
  const [selectedWeight, setSelectedWeight] = useState<number[]>([]);
  const [selectedPriceRange, setSelectedPriceRange] = useState<number[]>([]);

  useEffect(() => {
    const categories = query.getAll('category').map((cat) => cat.toLowerCase());
    const colors = query.getAll('color');
    const rating = Number(query.get('rating')) || 1;
    const weight = query
      .getAll('weight')
      .map((str) => Number(str))
      .filter((num) => !Number.isNaN(num) && num >= 0);
    const minPrice = Number(query.get('min_price')) || filtersData?.minPrice || 0;
    const maxPrice = Number(query.get('max_price')) || filtersData?.maxPrice || MAX_PRODUCT_PRICE;

    const q = query.get('query') || undefined;
    const page = Number(query.get('page')) || DEFAULT_PAGE;
    const pageSize = Number(query.get('page_size')) || DEFAULT_PAGE_SIZE;
    const sortBy = query.get('sort_by') || '';
    const sortOrder = query.get('sort_order') || 'ASC';

    catalogStore.applyFilters({
      filters: {
        colors,
        categories,
        rating,
        weight,
        minPrice,
        maxPrice,
      },
      page: Number.isNaN(page) ? DEFAULT_PAGE : page,
      pageSize: Number.isNaN(pageSize) ? DEFAULT_PAGE_SIZE : pageSize,
      query: q || '',
      sorts: [{ field: sortBy.toLowerCase(), order: sortOrder.toUpperCase() } as Sort],
    });

    setSelectedCategories(categories);
    setSelectedColors(colors);
    setSelectedRating(rating);
    setSelectedWeight(weight);
    setSelectedPriceRange([minPrice, maxPrice]);
  }, [query, filtersData]);

  const updateQuery = (key: string, value: string) => {
    query.set(key, value);
    setQuery(query);
  };

  return {
    selectedCategories,
    setSelectedCategories,
    selectedColors,
    setSelectedColors,
    selectedRating,
    setSelectedRating,
    selectedWeight,
    setSelectedWeight,
    selectedPriceRange,
    setSelectedPriceRange,
    updateQuery,
  };
};
