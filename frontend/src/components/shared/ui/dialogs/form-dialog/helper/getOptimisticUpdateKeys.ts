export function getOptimisticUpdateKeys(entity: string) {
   switch (entity) {
      case 'user':
         return ['user'];
      case 'task':
         return ['tasks'];
      case 'event':
         return ['events'];
      case 'file':
         return ['files'];
      case 'project':
         return ['projects'];
      case 'clientContact':
         return ['clientContacts'];
      case 'partnerContact':
         return ['partnerContacts'];
      case 'client':
         return ['clients'];
      default:
         return [];
   }
}
