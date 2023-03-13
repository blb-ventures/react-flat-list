export interface FlatListSubHeaderProps {
  title: string;
  className?: string;
}

export const FlatListSubHeader = ({ title, className }: FlatListSubHeaderProps) => (
  <div className={`flat-list-sub-header ${className ?? ''}`}>
    <div className="flat-list-sub-header-title">{title}</div>
  </div>
);
