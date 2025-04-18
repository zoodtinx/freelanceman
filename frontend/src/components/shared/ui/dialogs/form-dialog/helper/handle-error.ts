import { UseMutationResult } from '@tanstack/react-query';
import { UseFormSetValue } from 'react-hook-form';

export const handleMutationError = (err: Error) =>
   setValue('mutationError', err.message);
