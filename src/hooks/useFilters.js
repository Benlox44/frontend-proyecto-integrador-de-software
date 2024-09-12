import { useMemo, useState } from 'react';

const useFilters = (courses) => {
  const [filter, setFilter] = useState({ category: 'all', sort: 'default' });

  const filteredCourses = useMemo(() => {
    let result = courses;
    if (filter.category !== 'all') {
      result = result.filter(course => course.category === filter.category);
    }
    switch (filter.sort) {
      case 'price-asc':
        return result.sort((a, b) => a.price - b.price);
      case 'price-desc':
        return result.sort((a, b) => b.price - a.price);
      case 'alpha':
        return result.sort((a, b) => a.title.localeCompare(b.title));
      default:
        return result;
    }
  }, [filter, courses]);

  return { filter, setFilter, filteredCourses };
};

export default useFilters;
