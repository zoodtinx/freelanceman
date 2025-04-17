import { UseMutationResult } from '@tanstack/react-query';
import { UseFormSetValue } from 'react-hook-form';

export const handleDialogMutationError = (
   mutationApi: UseMutationResult<any, any, any>,
   setValue: UseFormSetValue<any>,
) => {
   if (mutationApi.isError) {
      const { error } = mutationApi;
      setValue('mutationError', error.message);
      return;
   }
};
