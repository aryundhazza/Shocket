import { IStatistik, IUserBuy, IUserGetRegistration, IUserGetTiket } from '@/type/user';
import { getUserId } from './server';
import { EventUpdate } from '@/type/event';

const base_url = process.env.BASE_URL_API || 'http://localhost:8000/api';

export const createEvent = async (formData: FormData, token: string) => {
  const res = await fetch(`${base_url}/createEvent`, {
    method: 'POST',
    body: formData,
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  console.log(res, 'res');
  const result = await res.json();
  return { result, ok: res.ok };
};

export const updateEvent = async (data: EventUpdate, token: string) => {
  console.log(data, 'FORMMMM');
  data.dateTime = new Date(data.dateTime).toISOString();

  const res = await fetch(`${base_url}/updateEvent`, {
    method: 'POST',
    body: JSON.stringify(data),
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
      // 'Content-Type': 'multipart/form-data' // Do not set Content-Type manually when using FormData
    },
  });

  const result = await res.json();
  return { result, ok: res.ok };
};

export const getMyEvents = async (
  search: string = '',
  page: number = 1,
  pageSize: number = 10,
  category: string = '',
) => {
  const organizerId = await getUserId();
  const res = await fetch(
    `${base_url}/myevents?organizerId=${organizerId}&search=${search}&page=${page}&category=${category}`,
    {
      method: 'GET',
      cache: 'no-cache',
      headers: {
        'Content-Type': 'application/json',
      },
    },
  );
  const result = await res.json();

  return {
    result,
    events: result.events,
    pagination: result.pagination,
    ok: res.ok,
  };
};

export const getEvents = async (
  search: string = '',
  page: number = 1,
  pageSize: number = 10,
  category: string = '',
) => {
  const res = await fetch(
    `${base_url}/events?search=${search}&page=${page}&category=${category}`,
    {
      method: 'GET',
      cache: 'no-cache',
      headers: {
        'Content-Type': 'application/json',
      },
    },
  );
  const result = await res.json();

  return {
    result,
    events: result.events,
    pagination: result.pagination,
    ok: res.ok,
  };
};

export const getEventSlug = async (slug: string) => {
  const res = await fetch(`${base_url}/events/${slug}`, {
    next: { revalidate: 0 },
  });
  const result = await res.json();

  return { result, event: result.events, ok: res.ok };
};

export const getRegistration = async (
  data: IUserGetRegistration | null,
  token?: string,
) => {
  const res = await fetch(`${base_url}/registration/${data?.organizerId}`, {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
  });

  const result = await res.json();
  return { result, ok: res.ok };
};

export const buyTicket = async (data: IUserBuy | null, token: string) => {
  const res = await fetch(`${base_url}/buy`, {
    method: 'POST',
    body: JSON.stringify(data),
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
  });

  const result = await res.json();
  return { result, ok: res.ok };
};

export const getTickets = async (
  data: IUserGetTiket | null,
  token?: string,
) => {
  const res = await fetch(`${base_url}/tikets/${data?.userId}`, {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
  });

  const result = await res.json();
  return { result, ok: res.ok };
};

export const getStatistik = async (
  data: IStatistik,
  token?: string,
) => {
  const res = await fetch(`${base_url}/dashboard/${data.userId}/${data.year}`, {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
  });

  const result = await res.json();
  return { result, ok: res.ok };
};
