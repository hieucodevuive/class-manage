'use client';

import { useForm, useWatch } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';

import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
} from '@/components/ui/field';

import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { useEffect } from 'react';

/* -------------------------------------------------------------------------- */
/*                                   Schema                                   */
/* -------------------------------------------------------------------------- */

export const classSchema = z.object({
  name: z
    .string()
    .min(1, 'Vui lòng nhập tên lớp')
    .max(100, 'Tên lớp không quá 100 ký tự'),

  code: z
    .string()
    .min(1, 'Vui lòng nhập mã lớp')
    .max(20, 'Mã lớp không quá 20 ký tự'),

  description: z.string().max(500, 'Mô tả không quá 500 ký tự').optional(),

  subject: z.string().min(1, 'Vui lòng nhập môn học'),

  grade: z.number().min(10, 'Khối không hợp lệ').max(12, 'Khối không hợp lệ'),

  schedule: z.string().min(1, 'Vui lòng nhập lịch học'),

  startDate: z.string().min(1, 'Vui lòng chọn ngày bắt đầu'),

  endDate: z.string().optional(),

  pricePerSession: z.number().min(0, 'Giá / buổi không được âm'),
});

interface ClassFormProps {
  mode: 'create' | 'edit';
  classId?: string;
}

export type ClassFormValues = z.infer<typeof classSchema>;

/* -------------------------------------------------------------------------- */
/*                                  Component                                 */
/* -------------------------------------------------------------------------- */

export default function ClassForm({ mode, classId }: ClassFormProps) {
  const form = useForm<ClassFormValues>({
    resolver: zodResolver(classSchema),

    defaultValues: {
      name: '',
      code: '',
      description: '',
      subject: 'Ngữ văn',
      grade: 10,
      schedule: '',
      startDate: '',
      endDate: '',
      pricePerSession: 0,
    },
  });

  const subject = useWatch({
    control: form.control,
    name: 'subject',
  });

  const grade = useWatch({
    control: form.control,
    name: 'grade',
  });

  useEffect(() => {
    if (mode !== 'edit' || !classId) {
      return;
    }

    const fetchClass = async () => {
      try {
        const data = await getClassById(classId);

        // Đổ dữ liệu API vào toàn bộ form
        form.reset(data);
      } catch (error) {
        console.error('Failed to fetch class:', error);
      }
    };

    fetchClass();
  }, [mode, classId, form]);

  const onSubmit = (values: ClassFormValues) => {
    if (mode === 'create') {
      const payload = {
        ...values,
        studentCount: 0,
        status: 'ACTIVE',
      };

      console.log('Create class:', payload);
      return;
    }

    const payload = {
      id: classId,
      ...values,
    };

    console.log('Update class:', payload);
  };

  return (
    <form onSubmit={form.handleSubmit(onSubmit)} className="w-full">
      <div className="bg-background w-full rounded-xl border">
        {/* Header */}
        <div className="border-b px-5 py-4">
          <h3 className="font-semibold">
            {mode === 'create'
              ? 'Thông tin lớp học'
              : 'Chỉnh sửa thông tin lớp học'}
          </h3>

          <p className="text-muted-foreground text-sm">
            {mode === 'create'
              ? 'Nhập thông tin để tạo lớp học mới.'
              : 'Nhập thông tin để chỉnh sửa lớp học.'}
          </p>
        </div>

        {/* Form */}
        <div className="p-5">
          <FieldGroup className="grid gap-5 md:grid-cols-2">
            {/* Tên lớp */}
            <Field data-invalid={!!form.formState.errors.name}>
              <FieldLabel htmlFor="name">Tên lớp</FieldLabel>

              <Input
                id="name"
                placeholder="VD: Văn 10A"
                {...form.register('name')}
              />

              <FieldError>{form.formState.errors.name?.message}</FieldError>
            </Field>

            {/* Mã lớp */}
            <Field data-invalid={!!form.formState.errors.code}>
              <FieldLabel htmlFor="code">Mã lớp</FieldLabel>

              <Input
                id="code"
                placeholder="VD: VAN10A"
                {...form.register('code')}
              />

              <FieldError>{form.formState.errors.code?.message}</FieldError>
            </Field>

            {/* Môn học */}
            <Field data-invalid={!!form.formState.errors.subject}>
              <FieldLabel htmlFor="subject">Môn học</FieldLabel>

              <Select
                value={subject}
                onValueChange={(value) => {
                  if (!value) return;

                  form.setValue('subject', value, {
                    shouldValidate: true,
                  });
                }}
              >
                <SelectTrigger id="subject" className="w-full">
                  <SelectValue placeholder="Chọn môn học" />
                </SelectTrigger>

                <SelectContent>
                  <SelectItem value="Ngữ văn">Ngữ văn</SelectItem>

                  <SelectItem value="Toán">Toán</SelectItem>

                  <SelectItem value="Tiếng Anh">Tiếng Anh</SelectItem>
                </SelectContent>
              </Select>

              <FieldError>{form.formState.errors.subject?.message}</FieldError>
            </Field>

            {/* Khối */}
            <Field data-invalid={!!form.formState.errors.grade}>
              <FieldLabel htmlFor="grade">Khối</FieldLabel>

              <Select
                value={String(grade)}
                onValueChange={(value) => {
                  if (!value) return;

                  form.setValue('grade', Number(value), {
                    shouldValidate: true,
                  });
                }}
              >
                <SelectTrigger id="grade" className="w-full">
                  <SelectValue placeholder="Chọn khối" />
                </SelectTrigger>

                <SelectContent>
                  <SelectItem value="10">Khối 10</SelectItem>

                  <SelectItem value="11">Khối 11</SelectItem>

                  <SelectItem value="12">Khối 12</SelectItem>
                </SelectContent>
              </Select>

              <FieldError>{form.formState.errors.grade?.message}</FieldError>
            </Field>

            {/* Lịch học */}
            <Field data-invalid={!!form.formState.errors.schedule}>
              <FieldLabel htmlFor="schedule">Lịch học</FieldLabel>

              <Input
                id="schedule"
                placeholder="VD: Thứ 2, 4, 6 - 18:00"
                {...form.register('schedule')}
              />

              <FieldError>{form.formState.errors.schedule?.message}</FieldError>
            </Field>

            {/* Giá / buổi */}
            <Field data-invalid={!!form.formState.errors.pricePerSession}>
              <FieldLabel htmlFor="pricePerSession">Giá / buổi</FieldLabel>

              <Input
                id="pricePerSession"
                type="number"
                min={0}
                placeholder="VD: 100000"
                {...form.register('pricePerSession', {
                  valueAsNumber: true,
                })}
              />

              <FieldError>
                {form.formState.errors.pricePerSession?.message}
              </FieldError>
            </Field>

            {/* Ngày bắt đầu */}
            <Field data-invalid={!!form.formState.errors.startDate}>
              <FieldLabel htmlFor="startDate">Ngày bắt đầu</FieldLabel>

              <Input
                id="startDate"
                type="date"
                {...form.register('startDate')}
              />

              <FieldError>
                {form.formState.errors.startDate?.message}
              </FieldError>
            </Field>

            {/* Ngày kết thúc */}
            <Field data-invalid={!!form.formState.errors.endDate}>
              <FieldLabel htmlFor="endDate">Ngày kết thúc</FieldLabel>

              <Input id="endDate" type="date" {...form.register('endDate')} />

              <FieldError>{form.formState.errors.endDate?.message}</FieldError>
            </Field>

            {/* Mô tả */}
            <Field
              data-invalid={!!form.formState.errors.description}
              className="md:col-span-2"
            >
              <FieldLabel htmlFor="description">Mô tả</FieldLabel>

              <Textarea
                id="description"
                placeholder="Nhập mô tả về lớp học..."
                rows={4}
                {...form.register('description')}
              />

              <FieldError>
                {form.formState.errors.description?.message}
              </FieldError>
            </Field>
          </FieldGroup>
        </div>

        {/* Actions */}
        <div className="flex justify-end gap-2 border-t px-5 py-4">
          <Button type="button" variant="outline" onClick={() => form.reset()}>
            Hủy
          </Button>

          <Button type="submit">
            {mode === 'create' ? 'Tạo lớp học' : 'Lưu thay đổi'}
          </Button>
        </div>
      </div>
    </form>
  );
}

const getClassById = async (classId: string): Promise<ClassFormValues> => {
  // Fake API: sau này thay bằng API thật
  console.log('Fetching class:', classId);

  await new Promise((resolve) => setTimeout(resolve, 500));

  return {
    name: 'Ngữ văn 10A',
    code: 'VAN10A',
    description: 'Lớp học nâng cao môn Ngữ văn',
    subject: 'Ngữ văn',
    grade: 10,
    schedule: 'Thứ 2, 4, 6 - 18:00',
    startDate: '2026-09-01',
    endDate: '2026-12-31',
    pricePerSession: 100000,
  };
};
