import { getUser, deleteUser, editUser } from '@/lib/api/services/user-service';
import { useAppQuery } from '@/lib/api/services/helpers/useAppQuery';
import { useAppMutation } from '@/lib/api/services/helpers/useAppMutation';
import { MutationCallbacks } from '@/lib/api/services/helpers/api.type';

export const useUserQuery = (userId: string) => {
   return useAppQuery(['user', userId], (token) => getUser(token, userId));
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
