import { useQuery } from '@tanstack/react-query';
import { useEffect } from 'react';

import { logger } from '@lichens-innovation/react-native-common';

import { fetchCloudDropdownOptions } from './cloud-dropdown-picker.utils';

export const useCloudDropdownOptions = () => {
  const { data, isLoading, isError, error } = useQuery({
    queryKey: ['cloudDropdownOptions'],
    queryFn: fetchCloudDropdownOptions,
    staleTime: Infinity,
    retry: false,
  });

  useEffect(() => {
    if (error) {
      logger.warn('Failed to fetch cloud dropdown options', { error });
    }
  }, [error]);

  return {
    options: data ?? [],
    isOptionsLoading: isLoading,
    isOptionsError: isError,
    optionsError: error,
  };
};
