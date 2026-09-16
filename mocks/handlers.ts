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

  http.get(`${process.env.NEXT_PUBLIC_API_URL}/classes`, async () => {
    await delay(2000);

    return HttpResponse.json([
      {
        id: 'CL001',
        name: 'Lớp Văn 10A',
        code: 'VAN10A',
        description: 'Lớp Ngữ văn khối 10',
        subject: 'Ngữ văn',
        grade: 10,
        schedule: 'Thứ 2, 4, 6 - 19:00',
        startDate: '2026-09-01',
        endDate: '',
        pricePerSession: 150000,
        studentCount: 12,
        status: 'ACTIVE',
      },
      {
        id: 'CL002',
        name: 'Lớp Văn 11A',
        code: 'VAN11A',
        description: 'Lớp Ngữ văn khối 11',
        subject: 'Ngữ văn',
        grade: 11,
        schedule: 'Thứ 3, 5, 7 - 19:00',
        startDate: '2026-09-01',
        endDate: '',
        pricePerSession: 180000,
        studentCount: 10,
        status: 'ACTIVE',
      },
      {
        id: 'CL003',
        name: 'Lớp Văn 12A',
        code: 'VAN12A',
        description: 'Lớp Ngữ văn khối 12',
        subject: 'Ngữ văn',
        grade: 12,
        schedule: 'Thứ 2, 4, 6 - 20:00',
        startDate: '2026-09-01',
        endDate: '',
        pricePerSession: 200000,
        studentCount: 8,
        status: 'ACTIVE',
      },
    ]);
  }),

  http.get(`${process.env.NEXT_PUBLIC_API_URL}/students`, async () => {
    await delay(2000);

    return HttpResponse.json([
      {
        id: 'ST001',
        name: 'Nguyễn Văn An',
        school: 'THPT Nguyễn Du',
        grade: 10,
        parentName: 'Nguyễn Văn Bình',
        phone: '0912345678',
        classId: 'CL001',
        status: 'ACTIVE',
      },
      {
        id: 'ST002',
        name: 'Trần Thị Mai',
        school: 'THPT Lê Quý Đôn',
        grade: 10,
        parentName: 'Trần Văn Minh',
        phone: '0987654321',
        classId: 'CL001',
        status: 'ACTIVE',
      },
      {
        id: 'ST003',
        name: 'Lê Hoàng Nam',
        school: 'THPT Nguyễn Trãi',
        grade: 11,
        parentName: 'Lê Văn Hoàng',
        phone: '0901234567',
        classId: 'CL002',
        status: 'ACTIVE',
      },
      {
        id: 'ST004',
        name: 'Phạm Ngọc Anh',
        school: 'THPT Chu Văn An',
        grade: 11,
        parentName: 'Phạm Văn Hùng',
        phone: '0934567890',
        classId: 'CL002',
        status: 'ACTIVE',
      },
      {
        id: 'ST005',
        name: 'Đỗ Minh Đức',
        school: 'THPT Kim Liên',
        grade: 12,
        parentName: 'Đỗ Văn Nam',
        phone: '0978123456',
        classId: 'CL003',
        status: 'ACTIVE',
      },
    ]);
  }),
];
