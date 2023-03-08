import { FC, ReactNode } from 'react';
import { FlatListItem } from './flat-list-item';

export interface FlatListErrorMessageProps {
  children: ReactNode;
  icon: ReactNode;
  className?: string;
}

export const FlatListErrorMessage: FC<FlatListErrorMessageProps> = ({
  children,
  icon,
  className,
}) => {
  return (
    <FlatListItem
      className={`flat-list-error-message ${className}`}
      left={icon}
      title={children?.toString() ?? ''}
    />
  );
};
