'use client';

import Link from 'next/link';
import { Fragment } from 'react';
import { Home } from 'lucide-react';
import { usePathname } from 'next/navigation';

import { breadcrumbMap } from '@/configs/breadcrumb';

import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from '@/components/ui/breadcrumb';

export function CBreadCrumb() {
  const pathname = usePathname();
  const segments = pathname.split('/').filter(Boolean);

  if (pathname === '/') {
    return null;
  }

  return (
    <Breadcrumb className="mt-2">
      <BreadcrumbList>
        <BreadcrumbItem>
          <BreadcrumbLink
            render={
              <Link href="/">
                <Home size={16} />
              </Link>
            }
          />
        </BreadcrumbItem>

        {segments.map((segment, index) => {
          const isLast = index === segments.length - 1;
          const href = '/' + segments.slice(0, index + 1).join('/');
          const title = breadcrumbMap[segment] ?? segment;

          return (
            <Fragment key={href}>
              <BreadcrumbSeparator />

              <BreadcrumbItem>
                {isLast ? (
                  <BreadcrumbPage>{title}</BreadcrumbPage>
                ) : (
                  <BreadcrumbLink render={<Link href={href}>{title}</Link>} />
                )}
              </BreadcrumbItem>
            </Fragment>
          );
        })}
      </BreadcrumbList>
    </Breadcrumb>
  );
}
