import {
   TextAreaForm,
   TextInputForm,
} from 'src/components/shared/ui/form-field-elements';
import { SalesDocumentPayload } from 'freelanceman-common/src/schemas';
import { UseFormReturn } from 'react-hook-form';

const AdjustmentsField = ({
   formMethods,
}: {
   formMethods: UseFormReturn<SalesDocumentPayload>;
}) => {
   return (
      <fieldset className="h-2/7 rounded-xl border border-tertiary p-3">
         <div className="flex flex-col">
            <div className="flex flex-col gap-2 peer order-2">
               <div className="flex gap-2">
                  <TextInputForm
                     fieldName="adjustment"
                     label="Adjustments"
                     formMethods={formMethods}
                     className="flex-1"
                  />
                  <TextInputForm
                     fieldName="discount"
                     label="Discount"
                     formMethods={formMethods}
                     className="flex-1"
                  />
                  <TextInputForm
                     fieldName="tax"
                     label="Tax"
                     formMethods={formMethods}
                     className="flex-1"
                  />
               </div>
               <TextAreaForm
                  fieldName="note"
                  label="Additional Notes"
                  formMethods={formMethods}
               />
            </div>
            <h2 className="text-lg text-secondary peer-focus-within:text-primary order-1">
               Adjustments & Notes
            </h2>
         </div>
      </fieldset>
   );
};

export default AdjustmentsField;
