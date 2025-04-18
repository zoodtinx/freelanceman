export interface MutationCallbacks {
   errorCallback?: (err: Error) => void;
   successCallback?: () => void;
}