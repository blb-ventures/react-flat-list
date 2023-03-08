/* eslint-disable react/jsx-no-useless-fragment */
/* eslint-disable jsx-a11y/anchor-is-valid */
import { FC, ReactNode } from 'react';

export interface LinkWrapperProps {
  url?: string;
  children: ReactNode;
  className?: string;
  isExternal?: boolean;
  downloadName?: string;
  LinkComponent?: FC<{ href: string; className?: string; children?: ReactNode }>;
}

export const LinkWrapper: FC<LinkWrapperProps> = ({
  children,
  url,
  className,
  isExternal,
  downloadName,
  LinkComponent,
}) => {
  if (url == null) return <>{children}</>;
  const isPath = !url.startsWith('http');
  const external = isExternal || downloadName != null || !isPath;
  const Link = LinkComponent ?? 'a';
  return external ? (
    <a
      className={`flat-list-item-link ${className ?? ''}`}
      download={downloadName}
      href={url}
      rel="nofollow noreferrer"
      target="_blank"
    >
      {children}
    </a>
  ) : (
    <Link className={`flat-list-item-link ${className ?? ''}`} href={url}>
      {children}
    </Link>
  );
};
