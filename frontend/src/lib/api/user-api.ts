import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import {
   editUser,
   getUser,
   getAllUsers,
   createUser,
   deleteUser,
} from './mock/mock-user-service';

export const useUserApi = () => {
   return {
      createUser: useCreateUser(),
      deleteUser: useDeleteUser(),
      editUser: useEditUser(),
   };
};

export const useAllUsersQuery = (searchOptions: UserSearchOption = {}) => {
   return useQuery({
      queryKey: ['users', searchOptions],
      queryFn: () => getAllUsers(searchOptions),
   });
};

export const useUsersQuery = (searchOptions: UserSearchOption = {}) => {
   return useQuery({
      queryKey: ['users', JSON.stringify(searchOptions)],
      queryFn: () => getAllUsers(searchOptions),
   });
};

export const useUserQuery = (userId: string) => {
   return useQuery<User, Error, User>({
      queryKey: ['users', userId],
      queryFn: () => getUser(userId),
   });
};

export const useCreateUser = () => {
   const queryClient = useQueryClient();

   return useMutation({
      mutationKey: ['createUser'],
      mutationFn: async (newUser: CreateUserDto) => await createUser(newUser),
      onMutate: async (newUser: CreateUserDto) => {
         await queryClient.cancelQueries({ queryKey: ['users'] });
         const previousUsers = queryClient.getQueryData(['users']);

         queryClient.setQueryData(['users'], (old: User[]) => [
            ...(old || []),
            { ...newUser, id: 'temp-id' },
         ]);

         return { previousUsers };
      },
      onError: (err, newUser, context) => {
         console.log('New user ', newUser);
         console.log(err);
         if (context?.previousUsers) {
            queryClient.setQueryData(['users'], context.previousUsers);
         }
      },
      onSettled: () => {
         queryClient.invalidateQueries({ queryKey: ['users'] });
      },
   });
};

interface EditUserMutationPayload {
   userId: string;
   userPayload: EditUserDto;
}

export const useEditUser = () => {
   const queryClient = useQueryClient();

   return useMutation({
      mutationKey: ['editUser'],
      mutationFn: async ({ userId, userPayload }: EditUserMutationPayload) => {
         await editUser(userId, userPayload);
      },
      onMutate: async ({ userId, userPayload }) => {
         await queryClient.cancelQueries({ queryKey: ['users'] });
         const previousUsers = queryClient.getQueryData(['users']);

         if (previousUsers) {
            queryClient.setQueryData(['users'], (old: User[]) =>
               old?.map((user) => (user.id === userId ? userPayload : user))
            );
         }

         return { previousUsers };
      },
      onError: (err, newUserPayload, context) => {
         console.log('New user ', newUserPayload);
         console.log(err);
         if (context?.previousUsers) {
            queryClient.setQueryData(['users'], context.previousUsers);
         }
      },
      onSettled: () => {
         queryClient.invalidateQueries({ queryKey: ['users'] });
      },
   });
};

export const useDeleteUser = () => {
   const queryClient = useQueryClient();

   return useMutation({
      mutationKey: ['deleteUser'],
      mutationFn: async (userId: string) => {
         await deleteUser(userId);
      },
      onMutate: async (userId: string) => {
         await queryClient.cancelQueries({ queryKey: ['users'] });
         const previousUsers = queryClient.getQueryData(['users']);

         if (previousUsers) {
            queryClient.setQueryData(['users'], (old: User[]) =>
               old?.filter((user) => user.id !== userId)
            );
         }

         return { previousUsers };
      },
      onError: (err, userIds, context) => {
         console.log('User deleting ', userIds);
         console.log(err);
         if (context?.previousUsers) {
            queryClient.setQueryData(['users'], context.previousUsers);
         }
      },
      onSettled: () => {
         queryClient.invalidateQueries({ queryKey: ['users'] });
      },
   });
};
