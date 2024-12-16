export const formDefaultValue = (actionType: string) => {
   let defaultStatus;
   if (actionType === 'event') {
      defaultStatus = 'scheduled';
   } else if (actionType === 'task') {
      defaultStatus = 'planned';
   }
   return {
      name: '',
      details: '',
      status: defaultStatus,
      dueDate: '',
      project: '',
      projectId: '',
      client: '',
      clientId: '',
      link: '',
   };
};
