
export interface Contact {
   id: string,
   name: string,
   company: string,
   type: 'client' | 'partner'
   role: string,
   phoneNumber: string[],
   email: string[],
   details: string,
   avatar:string
}
