'use client';

import NextLink from 'next/link';
import { memo, ReactNode } from 'react';
import { classNames } from 'lib/utils';

interface CustomLinkProps {
  href: string;
  children: ReactNode;
  className?: string;
  shallow?: boolean;
  prefetch?: boolean;
  // Allow additional props, but limit their use
}

export function Link({
  href,
  children,
  className,
  shallow = true,
  prefetch = true,
  ...rest
}: CustomLinkProps) {
  return (
    <NextLink
      href={href}
      shallow={shallow}
      prefetch={prefetch}
      className={classNames(className)}
      {...rest}
    >
      {children}
    </NextLink>
  );
}

export default memo(Link);
