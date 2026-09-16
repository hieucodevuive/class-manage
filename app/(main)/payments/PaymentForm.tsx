'use client';

import { useEffect } from 'react';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm, useWatch } from 'react-hook-form';
import { z } from 'zod';

import { QUERY_KEYS } from '@/lib/react-query/query-keys';
import { useAppQuery } from '@/lib/react-query/use-app-query';
import { studentService } from '@/services/student.service';
import { classService } from '@/services/class.service';

import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
} from '@/components/ui/field';

import { Input } from '@/components/ui/input';

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

import { Textarea } from '@/components/ui/textarea';

import { Button } from '@/components/ui/button';

const paymentSchema = z.object({
  studentId: z.string().min(1, 'Vui lòng chọn học sinh'),

  classId: z.string().min(1, 'Vui lòng chọn lớp học'),

  amount: z.number().min(1, 'Số tiền phải lớn hơn 0'),

  paymentDate: z.string().min(1, 'Vui lòng chọn ngày thanh toán'),

  method: z.string().min(1, 'Vui lòng chọn phương thức thanh toán'),

  note: z.string().max(500, 'Ghi chú không quá 500 ký tự').optional(),
});

type PaymentFormValues = z.infer<typeof paymentSchema>;

interface PaymentFormProps {
  mode: 'create' | 'edit';
  paymentId?: string;
}

const defaultValues: PaymentFormValues = {
  studentId: '',
  classId: '',
  amount: 0,
  paymentDate: '',
  method: '',
  note: '',
};

export default function PaymentForm({ mode, paymentId }: PaymentFormProps) {
  const form = useForm<PaymentFormValues>({
    resolver: zodResolver(paymentSchema),
    defaultValues,
  });

  const {
    data: students,
    isLoading: isLoadingStudents,
    isError: isStudentsError,
    error: studentsError,
  } = useAppQuery(
    QUERY_KEYS.STUDENTS.ALL,
    () => studentService.getStudents(),
    {},
  );

  const { data: classes, isLoading: isLoadingClasses } = useAppQuery(
    QUERY_KEYS.CLASSES.ALL,
    () => classService.getClasses(),
    {},
  );

  const selectedStudentId = useWatch({
    control: form.control,
    name: 'studentId',
  });

  const selectedClassId = useWatch({
    control: form.control,
    name: 'classId',
  });

  const selectedMethod = useWatch({
    control: form.control,
    name: 'method',
  });

  /**
   * Khi chọn học sinh:
   * studentId -> tìm student -> lấy classId -> set vào form
   */
  useEffect(() => {
    if (!selectedStudentId || !students) {
      form.setValue('classId', '');
      return;
    }

    const selectedStudent = students.find(
      (student) => student.id === selectedStudentId,
    );

    if (!selectedStudent) {
      form.setValue('classId', '');
      return;
    }

    form.setValue('classId', selectedStudent.classId, {
      shouldValidate: true,
      shouldDirty: true,
    });
  }, [selectedStudentId, students, form]);

  /**
   * Edit mode
   *
   * Tạm thời chưa gọi API payment.
   * Khi có paymentService.getPaymentById()
   * thì xử lý reset form tại đây.
   */
  useEffect(() => {
    if (mode !== 'edit' || !paymentId) {
      return;
    }

    const fetchPayment = async () => {
      try {
        const data = await getPaymentById(paymentId);
        form.reset(data);
      } catch (error) {
        console.error('Failed to fetch payment:', error);
      }
    };

    fetchPayment();
  }, [mode, paymentId, form]);

  const selectedClass = classes?.find((item) => item.id === selectedClassId);

  const onSubmit = (values: PaymentFormValues) => {
    if (mode === 'create') {
      const payload = {
        ...values,
        id: crypto.randomUUID(),
      };

      console.log('Create payment:', payload);

      return;
    }

    const payload = {
      id: paymentId,
      ...values,
    };

    console.log('Update payment:', payload);
  };

  if (isStudentsError) {
    return (
      <div className="bg-background w-full rounded-xl border p-5">
        <p className="text-destructive text-sm">
          Không thể tải danh sách học sinh.
        </p>

        {studentsError && (
          <p className="text-muted-foreground mt-1 text-sm">
            {studentsError instanceof Error
              ? studentsError.message
              : 'Đã xảy ra lỗi không xác định.'}
          </p>
        )}
      </div>
    );
  }

  return (
    <form onSubmit={form.handleSubmit(onSubmit)} className="w-full">
      <div className="bg-background w-full rounded-xl border">
        {/* Header */}
        <div className="border-b px-5 py-4">
          <h2 className="text-base font-semibold">
            {mode === 'create'
              ? 'Tạo khoản thanh toán'
              : 'Chỉnh sửa khoản thanh toán'}
          </h2>

          <p className="text-muted-foreground mt-1 text-sm">
            {mode === 'create'
              ? 'Nhập thông tin khoản thanh toán của học sinh.'
              : 'Cập nhật thông tin khoản thanh toán.'}
          </p>
        </div>

        {/* Form fields */}
        <div className="p-5">
          <FieldGroup className="grid gap-5 md:grid-cols-2">
            {/* Student */}
            <Field>
              <FieldLabel>Học sinh</FieldLabel>

              <Select
                value={selectedStudentId}
                onValueChange={(value) => {
                  if (!value) {
                    return;
                  }
                  form.setValue('studentId', value, {
                    shouldValidate: true,
                    shouldDirty: true,
                  });
                }}
                disabled={isLoadingStudents || mode === 'edit'}
              >
                <SelectTrigger>
                  <SelectValue
                    placeholder={
                      isLoadingStudents
                        ? 'Đang tải học sinh...'
                        : 'Chọn học sinh'
                    }
                  >
                    {
                      students?.find(
                        (student) => student.id === selectedStudentId,
                      )?.name
                    }
                  </SelectValue>
                </SelectTrigger>

                <SelectContent>
                  {students?.map((student) => (
                    <SelectItem key={student.id} value={student.id}>
                      {student.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>

              <FieldError errors={[form.formState.errors.studentId]} />
            </Field>

            {/* Class */}
            <Field>
              <FieldLabel>Lớp học</FieldLabel>

              <Input
                value={selectedClass?.name ?? ''}
                placeholder={
                  isLoadingClasses
                    ? 'Đang tải lớp học...'
                    : 'Lớp học sẽ được tự động xác định'
                }
                disabled
                readOnly
              />

              <FieldError errors={[form.formState.errors.classId]} />
            </Field>

            {/* Amount */}
            <Field>
              <FieldLabel>Số tiền</FieldLabel>

              <Input
                type="number"
                min={1}
                placeholder="Nhập số tiền"
                {...form.register('amount', {
                  valueAsNumber: true,
                })}
              />

              <FieldError errors={[form.formState.errors.amount]} />
            </Field>

            {/* Payment date */}
            <Field>
              <FieldLabel>Ngày thanh toán</FieldLabel>

              <Input type="date" {...form.register('paymentDate')} />

              <FieldError errors={[form.formState.errors.paymentDate]} />
            </Field>

            {/* Payment method */}
            <Field>
              <FieldLabel>Phương thức thanh toán</FieldLabel>

              <Select
                value={selectedMethod}
                onValueChange={(value) => {
                  if (!value) {
                    return;
                  }
                  form.setValue('method', value, {
                    shouldValidate: true,
                    shouldDirty: true,
                  });
                }}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Chọn phương thức" />
                </SelectTrigger>

                <SelectContent>
                  <SelectItem value="CASH">Tiền mặt</SelectItem>

                  <SelectItem value="BANK_TRANSFER">Chuyển khoản</SelectItem>
                </SelectContent>
              </Select>

              <FieldError errors={[form.formState.errors.method]} />
            </Field>

            {/* Note */}
            <Field className="md:col-span-2">
              <FieldLabel>Ghi chú</FieldLabel>

              <Textarea
                placeholder="Nhập ghi chú nếu có..."
                {...form.register('note')}
              />

              <FieldError errors={[form.formState.errors.note]} />
            </Field>
          </FieldGroup>
        </div>

        {/* Actions */}
        <div className="flex justify-end gap-2 border-t px-5 py-4">
          <Button
            type="button"
            variant="outline"
            onClick={() => {
              form.reset();
            }}
          >
            Xóa
          </Button>

          <Button type="submit" disabled={form.formState.isSubmitting}>
            {mode === 'create' ? 'Tạo thanh toán' : 'Lưu thay đổi'}
          </Button>
        </div>
      </div>
    </form>
  );
}

const getPaymentById = async (
  paymentId: string,
): Promise<PaymentFormValues> => {
  // Fake API: sau này thay bằng API thật

  console.log('Fetching payment:', paymentId);

  await new Promise((resolve) => setTimeout(resolve, 500));

  return {
    studentId: 'ST001',
    classId: 'CL001',
    amount: 500000,
    paymentDate: '2026-09-16',
    method: 'CASH',
    note: 'Học phí tháng 9',
  };
};
