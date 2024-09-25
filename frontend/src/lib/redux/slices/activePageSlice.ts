import { createSlice } from "@reduxjs/toolkit";

const activePageSlice = createSlice({
   name: 'activePage',
   initialState: 'projects',
   reducers: {
      goToProjectPage: () => {
         return 'projects';
      },
      goToActionsPage: () => {
         return 'actions';
      },
      goToClientsPage: () => {
         return 'clients';
      },
      goToFilesPage: () => {
         return 'files';
      },
      goToDocumentsPage: () => {
         return 'documents';
      },
      goToThisProject: (_state, action) => {
         return action.payload;
      }
   }
})

export const { goToActionsPage, goToClientsPage, goToFilesPage, goToDocumentsPage, goToProjectPage, goToThisProject } = activePageSlice.actions;
export default activePageSlice.reducer;