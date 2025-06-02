import { getUser, deleteUser, editUser, setVisited } from '@/lib/api/services/user-service';
import { useAppQuery } from '@/lib/api/services/helpers/useAppQuery';
import { useAppMutation } from '@/lib/api/services/helpers/useAppMutation';
import { MutationCallbacks } from '@/lib/api/services/helpers/api.type';

export const useUserQuery = (enabled?: boolean) => {
   return useAppQuery(['user'], (token) => getUser(token), enabled);
};

export const useEditUser = (callbacks?: MutationCallbacks) => {
   return useAppMutation(
      {
         mutationKey: 'editUser',
         invalidationKeys: ['user'],
         mutationFn: editUser,
      },
      callbacks
   );
};

export const useDeleteUser = (callbacks?: MutationCallbacks) => {
   return useAppMutation(
      {
         mutationKey: 'deleteUser',
         invalidationKeys: ['user'],
         mutationFn: deleteUser,
      },
      callbacks
   );
};

export const useSetVisited = (callbacks?: MutationCallbacks) => {
   return useAppMutation(
      {
         mutationKey: 'setVisited',
         invalidationKeys: ['user'],
         mutationFn: setVisited,
      },
      callbacks
   );
};