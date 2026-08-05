import { delay, http, HttpResponse } from 'msw';

export const handlers = [
  http.get(`${process.env.NEXT_PUBLIC_API_URL}/users`, async () => {
    await delay(2000);

    return HttpResponse.json([
      {
        id: '1',
        name: 'Hieu',
      },
    ]);
  }),

  http.post(`${process.env.NEXT_PUBLIC_API_URL}/users`, async ({ request }) => {
    await delay(1000);

    const body = await request.json();

    console.log('MSW POST body:', body);

    return HttpResponse.json(
      {
        id: crypto.randomUUID(),
        ...(body as object),
      },
      {
        status: 201,
      },
    );
  }),
];
