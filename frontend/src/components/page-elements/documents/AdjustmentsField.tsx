import {
   Label,
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
                  <div className="flex-1">
                     <Label className="pb-0">Discount (%)</Label>
                     <TextInputForm
                        fieldName="discountPercent"
                        formMethods={formMethods}
                        className="flex-1"
                        number
                     />
                  </div>
                  <div className="flex-1">
                     <Label className="pb-0">Discount (flat rate)</Label>
                     <TextInputForm
                        fieldName="discountFlat"
                        formMethods={formMethods}
                        className="flex-1"
                        number
                     />
                  </div>
                  <div className="flex-1">
                     <Label className="pb-0">Tax (%)</Label>
                     <TextInputForm
                        fieldName="tax"
                        formMethods={formMethods}
                        className="flex-1"
                        number
                     />
                  </div>
               </div>
               <div>
                  <Label className="pb-0">Additional Notes</Label>
                  <TextAreaForm
                     fieldName="note"
                     formMethods={formMethods}
                     className="resize-none"
                  />
               </div>
            </div>
            <h2 className="text-lg text-secondary peer-focus-within:text-primary order-1">
               Adjustments & Notes
            </h2>
         </div>
      </fieldset>
   );
};

export default AdjustmentsField;
