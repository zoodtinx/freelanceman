import {
   CreateEventDto,
   EditEventDto,
   EventFilterDto,
} from 'freelanceman-common';

export async function getEvents(accessToken: string, filter: EventFilterDto) {}
export async function getEvent(accessToken: string, eventId: string) {}
export async function createEvent(
   accessToken: string,
   payload: CreateEventDto
) {}
export async function editEvent(accessToken: string, payload: EditEventDto) {}
export async function deleteEvent(accessToken: string, eventId: string) {}
