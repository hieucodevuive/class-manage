'use client';

import { useEffect } from 'react';
import { useForm, useWatch } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';

import { QUERY_KEYS } from '@/lib/react-query/query-keys';
import { useAppQuery } from '@/lib/react-query/use-app-query';
import { classService } from '@/services/class.service';

import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
} from '@/components/ui/field';

import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

/* -------------------------------------------------------------------------- */
/*                                   Schema                                   */
/* -------------------------------------------------------------------------- */

export const studentSchema = z.object({
  name: z
    .string()
    .trim()
    .min(1, 'Vui lòng nhập họ và tên học sinh')
    .max(100, 'Họ và tên không quá 100 ký tự'),

  school: z
    .string()
    .trim()
    .min(1, 'Vui lòng nhập trường đang học')
    .max(150, 'Tên trường không quá 150 ký tự'),

  grade: z
    .number()
    .min(6, 'Khối phải từ 6 đến 12')
    .max(12, 'Khối phải từ 6 đến 12'),

  parentName: z
    .string()
    .trim()
    .min(1, 'Vui lòng nhập tên phụ huynh')
    .max(100, 'Tên phụ huynh không quá 100 ký tự'),

  phone: z
    .string()
    .trim()
    .min(1, 'Vui lòng nhập số điện thoại')
    .regex(/^(0|\+84)[0-9]{9}$/, 'Số điện thoại không hợp lệ'),

  classId: z.string().min(1, 'Vui lòng chọn lớp học'),
});

/* -------------------------------------------------------------------------- */
/*                                    Types                                   */
/* -------------------------------------------------------------------------- */

export type StudentFormValues = z.infer<typeof studentSchema>;

interface StudentFormProps {
  mode: 'create' | 'edit';
  studentId?: string;
}

/* -------------------------------------------------------------------------- */
/*                                Default values                              */
/* -------------------------------------------------------------------------- */

const defaultValues: StudentFormValues = {
  name: '',
  school: '',
  grade: 10,
  parentName: '',
  phone: '',
  classId: '',
};

/* -------------------------------------------------------------------------- */
/*                                  Component                                 */
/* -------------------------------------------------------------------------- */

export default function StudentForm({ mode, studentId }: StudentFormProps) {
  const form = useForm<StudentFormValues>({
    resolver: zodResolver(studentSchema),
    defaultValues,
  });

  const {
    data: classes,
    isLoading: isLoadingClasses,
    isError: isClassesError,
    error: classesError,
  } = useAppQuery(QUERY_KEYS.CLASSES.ALL, () => classService.getClasses(), {});

  const grade = useWatch({
    control: form.control,
    name: 'grade',
  });

  const classId = useWatch({
    control: form.control,
    name: 'classId',
  });

  /* ------------------------------------------------------------------------ */
  /*                              Edit: Load student                          */
  /* ------------------------------------------------------------------------ */

  useEffect(() => {
    if (mode !== 'edit' || !studentId) {
      return;
    }

    const fetchStudent = async () => {
      try {
        const data = await getStudentById(studentId);

        form.reset(data);
      } catch (error) {
        console.error('Failed to fetch student:', error);
      }
    };

    fetchStudent();
  }, [mode, studentId, form]);

  /* ------------------------------------------------------------------------ */
  /*                                   Submit                                 */
  /* ------------------------------------------------------------------------ */

  const onSubmit = (values: StudentFormValues) => {
    if (mode === 'create') {
      const payload = {
        ...values,
        status: 'ACTIVE',
      };

      console.log('Create student:', payload);

      return;
    }

    const payload = {
      id: studentId,
      ...values,
    };

    console.log('Update student:', payload);
  };

  /* ------------------------------------------------------------------------ */
  /*                                    Render                                */
  /* ------------------------------------------------------------------------ */

  return (
    <form onSubmit={form.handleSubmit(onSubmit)} className="w-full">
      <div className="bg-background w-full rounded-xl border">
        {/* Header */}
        <div className="border-b px-5 py-4">
          <h3 className="font-semibold">
            {mode === 'create'
              ? 'Thông tin học sinh'
              : 'Chỉnh sửa thông tin học sinh'}
          </h3>

          <p className="text-muted-foreground text-sm">
            {mode === 'create'
              ? 'Nhập thông tin để tạo học sinh mới.'
              : 'Nhập thông tin để chỉnh sửa học sinh.'}
          </p>
        </div>

        {/* Form */}
        <div className="p-5">
          <FieldGroup className="grid gap-5 md:grid-cols-2">
            {/* Họ và tên */}
            <Field data-invalid={!!form.formState.errors.name}>
              <FieldLabel htmlFor="name">Họ và tên học sinh</FieldLabel>

              <Input
                id="name"
                placeholder="VD: Nguyễn Văn An"
                {...form.register('name')}
              />

              <FieldError>{form.formState.errors.name?.message}</FieldError>
            </Field>

            {/* Trường đang học */}
            <Field data-invalid={!!form.formState.errors.school}>
              <FieldLabel htmlFor="school">Trường đang học</FieldLabel>

              <Input
                id="school"
                placeholder="VD: THPT Nguyễn Du"
                {...form.register('school')}
              />

              <FieldError>{form.formState.errors.school?.message}</FieldError>
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
                    shouldDirty: true,
                  });
                }}
              >
                <SelectTrigger id="grade" className="w-full">
                  <SelectValue placeholder="Chọn khối" />
                </SelectTrigger>

                <SelectContent>
                  <SelectItem value="6">Khối 6</SelectItem>

                  <SelectItem value="7">Khối 7</SelectItem>

                  <SelectItem value="8">Khối 8</SelectItem>

                  <SelectItem value="9">Khối 9</SelectItem>

                  <SelectItem value="10">Khối 10</SelectItem>

                  <SelectItem value="11">Khối 11</SelectItem>

                  <SelectItem value="12">Khối 12</SelectItem>
                </SelectContent>
              </Select>

              <FieldError>{form.formState.errors.grade?.message}</FieldError>
            </Field>

            {/* Tên phụ huynh */}
            <Field data-invalid={!!form.formState.errors.parentName}>
              <FieldLabel htmlFor="parentName">Tên phụ huynh</FieldLabel>

              <Input
                id="parentName"
                placeholder="VD: Nguyễn Văn Bình"
                {...form.register('parentName')}
              />

              <FieldError>
                {form.formState.errors.parentName?.message}
              </FieldError>
            </Field>

            {/* Số điện thoại */}
            <Field data-invalid={!!form.formState.errors.phone}>
              <FieldLabel htmlFor="phone">Số điện thoại phụ huynh</FieldLabel>

              <Input
                id="phone"
                type="tel"
                placeholder="VD: 0912345678"
                {...form.register('phone')}
              />

              <FieldError>{form.formState.errors.phone?.message}</FieldError>
            </Field>

            {/* Lớp học */}
            <Field data-invalid={!!form.formState.errors.classId}>
              <FieldLabel htmlFor="classId">Lớp học</FieldLabel>

              <Select
                value={classId}
                onValueChange={(value) => {
                  if (!value) return;

                  form.setValue('classId', value, {
                    shouldValidate: true,
                    shouldDirty: true,
                  });
                }}
                disabled={isLoadingClasses || isClassesError}
              >
                <SelectTrigger id="classId" className="w-full">
                  <SelectValue
                    placeholder={
                      isLoadingClasses
                        ? 'Đang tải danh sách lớp...'
                        : 'Chọn lớp học'
                    }
                  />
                </SelectTrigger>

                <SelectContent>
                  {classes?.map((item) => (
                    <SelectItem key={item.id} value={item.id}>
                      {item.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>

              {isClassesError && (
                <FieldError>
                  {classesError?.message || 'Không thể tải danh sách lớp học'}
                </FieldError>
              )}

              <FieldError>{form.formState.errors.classId?.message}</FieldError>
            </Field>
          </FieldGroup>
        </div>

        {/* Actions */}
        <div className="flex justify-end gap-2 border-t px-5 py-4">
          <Button type="button" variant="outline" onClick={() => form.reset()}>
            Hủy
          </Button>

          <Button type="submit" disabled={form.formState.isSubmitting}>
            {mode === 'create' ? 'Tạo học sinh' : 'Lưu thay đổi'}
          </Button>
        </div>
      </div>
    </form>
  );
}

/* -------------------------------------------------------------------------- */
/*                                Fake API                                    */
/* -------------------------------------------------------------------------- */

const getStudentById = async (
  studentId: string,
): Promise<StudentFormValues> => {
  console.log('Fetching student:', studentId);

  await new Promise((resolve) => {
    setTimeout(resolve, 500);
  });

  return {
    name: 'Nguyễn Văn An',
    school: 'THPT Nguyễn Du',
    grade: 10,
    parentName: 'Nguyễn Văn Bình',
    phone: '0912345678',
    classId: 'CL001',
  };
};
