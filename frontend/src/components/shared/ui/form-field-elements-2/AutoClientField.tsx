import { InputProps } from '@/lib/types/form-input-props.types';
import { FieldValues, Path } from 'react-hook-form';
import { Link } from 'react-router-dom';

const AutoClientField = <TFieldValues extends FieldValues>({
   formMethods,
}: InputProps<TFieldValues>): JSX.Element => {
   const { watch } = formMethods;

   const clientName = watch('client' as Path<TFieldValues>);
   const clientId = watch('clientId' as Path<TFieldValues>);

   if (clientName && clientId) {
      return <p className="cursor-default select-none">{clientName}</p>;
   }

   return <span className="text-gray-500">Select a project</span>;
};

export default AutoClientField;