'use client';

import { useEffect, useState } from 'react';

import { useForm } from 'react-hook-form';

import { zodResolver } from '@hookform/resolvers/zod';

import { z } from 'zod';

import { Camera, UserRound } from 'lucide-react';

import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
} from '@/components/ui/field';

import { Input } from '@/components/ui/input';

import { Button } from '@/components/ui/button';

/* -------------------------------------------------------------------------- */
/*                                   Schema                                   */
/* -------------------------------------------------------------------------- */

const profileSchema = z.object({
  name: z
    .string()
    .trim()
    .min(1, 'Vui lòng nhập tên giáo viên')
    .max(100, 'Tên giáo viên không quá 100 ký tự'),

  username: z.string().trim().min(1, 'Tài khoản không hợp lệ'),
});

type ProfileFormValues = z.infer<typeof profileSchema>;

/* -------------------------------------------------------------------------- */
/*                                  Component                                 */
/* -------------------------------------------------------------------------- */

export default function ProfilePage() {
  const [avatar, setAvatar] = useState<string>('');

  const form = useForm<ProfileFormValues>({
    resolver: zodResolver(profileSchema),
    defaultValues: {
      name: 'Phạm Thị Ngọc Trang',
      username: 'teacher',
    },
  });

  const handleAvatarChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];

    if (!file) return;

    const imageUrl = URL.createObjectURL(file);

    setAvatar((currentAvatar) => {
      if (currentAvatar) {
        URL.revokeObjectURL(currentAvatar);
      }

      return imageUrl;
    });
  };

  useEffect(() => {
    return () => {
      if (avatar) {
        URL.revokeObjectURL(avatar);
      }
    };
  }, [avatar]);

  const onSubmit = (values: ProfileFormValues) => {
    const payload = {
      ...values,
      avatar,
    };

    console.log('Update profile:', payload);
  };

  const handleCancel = () => {
    form.reset({
      name: 'Phạm Thị Ngọc Trang',
      username: 'teacher',
    });

    setAvatar('');
  };

  return (
    <div className="w-full">
      <div className="mb-6">
        <h1 className="text-2xl font-semibold tracking-tight">Hồ sơ cá nhân</h1>

        <p className="text-muted-foreground mt-1 text-sm">
          Quản lý thông tin tài khoản và hồ sơ giáo viên.
        </p>
      </div>

      <form onSubmit={form.handleSubmit(onSubmit)} className="w-full">
        <div className="bg-background w-full rounded-xl border">
          {/* Header */}
          <div className="border-b px-5 py-4">
            <h3 className="font-semibold">Thông tin giáo viên</h3>

            <p className="text-muted-foreground mt-1 text-sm">
              Cập nhật thông tin hiển thị của bạn.
            </p>
          </div>

          {/* Form */}
          <div className="p-5">
            <FieldGroup className="gap-6">
              {/* Avatar */}
              <Field>
                <FieldLabel>Ảnh đại diện</FieldLabel>

                <div className="flex items-center gap-5">
                  <div className="bg-muted relative flex size-20 shrink-0 items-center justify-center overflow-hidden rounded-full border">
                    {avatar ? (
                      <img
                        src={avatar}
                        alt="Ảnh đại diện"
                        className="size-full object-cover"
                      />
                    ) : (
                      <UserRound className="text-muted-foreground size-9" />
                    )}
                  </div>

                  <div>
                    <label
                      htmlFor="avatar"
                      className="hover:bg-muted inline-flex h-9 cursor-pointer items-center gap-2 rounded-md border px-3 text-sm font-medium transition-colors"
                    >
                      <Camera className="size-4" />
                      Đổi ảnh
                    </label>

                    <Input
                      id="avatar"
                      type="file"
                      accept="image/*"
                      className="hidden"
                      onChange={handleAvatarChange}
                    />

                    <p className="text-muted-foreground mt-2 text-xs">
                      JPG, PNG hoặc WEBP. Kích thước tối đa 5MB.
                    </p>
                  </div>
                </div>
              </Field>

              {/* Name */}
              <Field data-invalid={!!form.formState.errors.name}>
                <FieldLabel htmlFor="name">Tên giáo viên</FieldLabel>

                <Input
                  id="name"
                  placeholder="VD: Phạm Thị Ngọc Trang"
                  {...form.register('name')}
                />

                <FieldError>{form.formState.errors.name?.message}</FieldError>
              </Field>

              {/* Username */}
              <Field data-invalid={!!form.formState.errors.username}>
                <FieldLabel htmlFor="username">Tài khoản</FieldLabel>

                <Input
                  id="username"
                  {...form.register('username')}
                  disabled
                  readOnly
                />

                <p className="text-muted-foreground text-xs">
                  Tài khoản dùng để đăng nhập và không thể thay đổi.
                </p>

                <FieldError>
                  {form.formState.errors.username?.message}
                </FieldError>
              </Field>
            </FieldGroup>
          </div>

          {/* Actions */}
          <div className="flex justify-end gap-2 border-t px-5 py-4">
            <Button type="button" variant="outline" onClick={handleCancel}>
              Hủy
            </Button>

            <Button type="submit" disabled={form.formState.isSubmitting}>
              {form.formState.isSubmitting ? 'Đang lưu...' : 'Lưu thay đổi'}
            </Button>
          </div>
        </div>
      </form>
    </div>
  );
}
