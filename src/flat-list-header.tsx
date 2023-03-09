import { FC, ReactNode } from 'react';

export interface FlatListHeaderProps {
  title: string | ReactNode;
  right?: ReactNode;
  className?: string;
}

export const FlatListHeader: FC<FlatListHeaderProps> = ({ title, right, className }) => {
  return (
    <div className={`flat-list-header ${className ?? ''}`}>
      {typeof title === 'string' ? <div className="flat-list-header__title">{title}</div> : title}
      {right != null && <div>{right}</div>}
    </div>
  );
};
