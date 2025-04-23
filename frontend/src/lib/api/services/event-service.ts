import { fetchProMax } from '@/lib/api/services/helpers/fetch-helper';
import {
   CreateEventDto,
   EditEventDto,
   EventFilterDto,
} from 'freelanceman-common';

export async function getEvents(accessToken: string, filter: EventFilterDto) {
   return await fetchProMax({
      accessToken,
      apiEndpoint: 'events/search',
      method: 'POST',
      model: 'event',
      requestPayload: filter,
   });
}

export async function getEvent(accessToken: string, eventId: string) {
   return await fetchProMax({
      accessToken,
      apiEndpoint: `events/${eventId}`,
      method: 'GET',
      model: 'event',
   }); 
}

export async function createEvent(
   accessToken: string,
   payload: CreateEventDto
) {
   return await fetchProMax({
      accessToken,
      apiEndpoint: 'events',
      method: 'POST',
      model: 'event',
      requestPayload: payload,
   });
}

export async function editEvent(accessToken: string, payload: EditEventDto) {
   return await fetchProMax({
      accessToken,
      apiEndpoint: `events/${payload.id}`,
      method: 'PATCH',
      model: 'event',
      requestPayload: payload,
   });
}
export async function deleteEvent(accessToken: string, eventId: string) {
   return await fetchProMax({
      accessToken,
      apiEndpoint: `events/${eventId}`,
      method: 'DELETE',
      model: 'event',
   });
}
