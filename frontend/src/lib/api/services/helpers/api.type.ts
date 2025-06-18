export interface MutationHandler {
   mutationKey: string;
   invalidationKeys: string[];
   mutationFn: (token: string, payload: any) => Promise<any>;
}

export interface MutationCallbacks {
   errorCallback?: (err: Error) => void;
   successCallback?: () => void;
   optimisticUpdate?: {
      enable: boolean;
      key: string[];
      type: UpdaterType;
   };
}

type UpdaterType = 'create' | 'edit' | 'delete';
