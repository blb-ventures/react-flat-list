import { FC, ReactNode } from 'react';

export const FlatListEmptyMessage: FC<{ children: ReactNode; className?: string }> = ({
  children,
  className,
}) => <div className={`flat-list-empty-message ${className ?? ''}`}>{children}</div>;
