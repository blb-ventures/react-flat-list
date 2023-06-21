export interface FlatListSubHeaderProps {
  title: string;
  className?: string;
}

export const FlatListSubHeader = ({ title, className }: FlatListSubHeaderProps) => (
  <div className={`flat-list-subheader ${className ?? ''}`}>
    <div className="flat-list-subheader-title">{title}</div>
  </div>
);
