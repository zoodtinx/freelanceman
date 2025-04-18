import { fetchProMax } from '@/lib/api/services/helpers/fetch-helper';
import { CreateTaskDto, EditTaskDto, TaskFilterDto } from 'freelanceman-common';

export async function getTasks(accessToken: string, filter: TaskFilterDto) {
   return await fetchProMax({
      accessToken,
      apiEndpoint: 'tasks/search',
      method: 'POST',
      model: 'task',
      requestPayload: filter,
   });
}

export async function getTask(accessToken: string, filter: TaskFilterDto) {}

export async function createTask(accessToken: string, payload: CreateTaskDto) {}

export async function editTask(accessToken: string, payload: EditTaskDto) {
   return await fetchProMax({
      accessToken,
      apiEndpoint: `tasks/${payload.id}`,
      requestPayload: payload,
      method: 'PATCH',
      model: 'task',
   });
}

export async function deleteTask(accessToken: string, taskId: string) {
   return await fetchProMax({
      accessToken,
      apiEndpoint: `tasks/${taskId}`,
      method: 'DELETE',
      model: 'task',
   });
}
