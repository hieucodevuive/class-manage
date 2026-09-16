'use client';

import { useState } from 'react';

import { useForm } from 'react-hook-form';

import { zodResolver } from '@hookform/resolvers/zod';

import { z } from 'zod';

import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
} from '@/components/ui/field';

import { Input } from '@/components/ui/input';

import { Button } from '@/components/ui/button';

import { Eye, EyeOff, GraduationCap } from 'lucide-react';

/* -------------------------------------------------------------------------- */
/*                                   Schema                                   */
/* -------------------------------------------------------------------------- */

const loginSchema = z.object({
  username: z.string().trim().min(1, 'Vui lòng nhập tài khoản'),

  password: z.string().min(1, 'Vui lòng nhập mật khẩu'),
});

type LoginFormValues = z.infer<typeof loginSchema>;

/* -------------------------------------------------------------------------- */
/*                                  Component                                 */
/* -------------------------------------------------------------------------- */

export default function LoginPage() {
  const [showPassword, setShowPassword] = useState(false);

  const form = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      username: '',
      password: '',
    },
  });

  const onSubmit = (values: LoginFormValues) => {
    console.log('Login:', values);
  };

  return (
    <main className="bg-muted/30 flex min-h-screen items-center justify-center p-5">
      <div className="w-full max-w-md">
        {/* Logo / Brand */}
        <div className="mb-8 flex flex-col items-center text-center">
          <div className="bg-primary text-primary-foreground mb-4 flex size-12 items-center justify-center rounded-xl">
            <GraduationCap className="size-6" />
          </div>

          <h1 className="text-2xl font-semibold tracking-tight">
            Quản lý lớp học
          </h1>

          <p className="text-muted-foreground mt-2 text-sm">
            Đăng nhập để tiếp tục quản lý lớp học
          </p>
        </div>

        {/* Login Card */}
        <div className="bg-background rounded-xl border shadow-sm">
          <div className="border-b px-6 py-5">
            <h2 className="font-semibold">Đăng nhập tài khoản</h2>

            <p className="text-muted-foreground mt-1 text-sm">
              Nhập thông tin tài khoản của bạn để đăng nhập.
            </p>
          </div>

          <form onSubmit={form.handleSubmit(onSubmit)} className="p-6">
            <FieldGroup className="gap-5">
              {/* Username */}
              <Field data-invalid={!!form.formState.errors.username}>
                <FieldLabel htmlFor="username">Tài khoản</FieldLabel>

                <Input
                  id="username"
                  type="text"
                  placeholder="Nhập tài khoản"
                  autoComplete="username"
                  {...form.register('username')}
                />

                <FieldError>
                  {form.formState.errors.username?.message}
                </FieldError>
              </Field>

              {/* Password */}
              <Field data-invalid={!!form.formState.errors.password}>
                <FieldLabel htmlFor="password">Mật khẩu</FieldLabel>

                <div className="relative">
                  <Input
                    id="password"
                    type={showPassword ? 'text' : 'password'}
                    placeholder="Nhập mật khẩu"
                    autoComplete="current-password"
                    className="pr-10"
                    {...form.register('password')}
                  />

                  <button
                    type="button"
                    onClick={() => setShowPassword((value) => !value)}
                    className="text-muted-foreground hover:text-foreground absolute top-1/2 right-3 -translate-y-1/2"
                    aria-label={showPassword ? 'Ẩn mật khẩu' : 'Hiện mật khẩu'}
                  >
                    {showPassword ? (
                      <EyeOff className="size-4" />
                    ) : (
                      <Eye className="size-4" />
                    )}
                  </button>
                </div>

                <FieldError>
                  {form.formState.errors.password?.message}
                </FieldError>
              </Field>

              {/* Submit */}
              <Button
                type="submit"
                className="w-full"
                disabled={form.formState.isSubmitting}
              >
                {form.formState.isSubmitting
                  ? 'Đang đăng nhập...'
                  : 'Đăng nhập'}
              </Button>
            </FieldGroup>
          </form>
        </div>

        {/* Footer */}
        <p className="text-muted-foreground mt-6 text-center text-xs">
          © {new Date().getFullYear()} Quản lý lớp học
        </p>
      </div>
    </main>
  );
}
