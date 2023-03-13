import { FC, ReactElement, ReactNode } from 'react';

// ExtraType is defined to undefined to avoid breaking types for map components
// that do not want to use the extra props
export interface FlatListMapItemProps<DataType extends Record<string, any>, ExtraType = undefined> {
  data: DataType;
  index: number;
  collection: DataType[];
  extra: ExtraType;
}

export interface BaseFlatListProps<DataType extends Record<string, any>, ExtraType> {
  className?: string;
  extraClassName?: string;
  data?: DataType[];
  dataKey: string | ((item: DataType) => string);
  HeaderComponent?: ReactNode;
  FooterComponent?: ReactNode;
  EmptyListComponent?: ReactNode;
  ErrorComponent?: ReactNode;
  ListItemComponent:
    | FC<FlatListMapItemProps<DataType, ExtraType>>
    | ((props: FlatListMapItemProps<DataType, ExtraType>) => ReactElement);
  // A extra data that is passed to every item
  extra: ExtraType;
  loading?: boolean;
  error?: boolean;
}

// Makes "extra" a required prop if the ExtraType is object-like.
// The ExtraType comes from ListItemComponent type
export type FlatListProps<
  DataType extends Record<string, any>,
  ExtraType,
> = ExtraType extends Record<string, any>
  ? BaseFlatListProps<DataType, ExtraType>
  : Omit<BaseFlatListProps<DataType, ExtraType>, 'extra'> & { extra?: ExtraType };

export const FlatList = <DataType extends Record<string, any>, ExtraType = Record<string, any>>({
  className,
  FooterComponent,
  HeaderComponent,
  ListItemComponent,
  EmptyListComponent,
  ErrorComponent,
  data,
  dataKey,
  extra,
  loading,
  error,
}: FlatListProps<DataType, ExtraType>) => {
  return (
    <div className={`flat-list ${className ?? ''} ${loading ? 'flat-list-loading' : ''}`}>
      {HeaderComponent}
      {data != null && data.length > 0 && !loading ? (
        <ul>
          {data.map((it, idx) => (
            <ListItemComponent
              /* eslint-disable @typescript-eslint/no-unnecessary-condition */
              key={loading ? idx : typeof dataKey === 'string' ? it[dataKey] : dataKey(it)}
              collection={data}
              data={it}
              extra={extra ?? ({} as ExtraType)}
              index={idx}
            />
          ))}
        </ul>
      ) : ErrorComponent != null && error ? (
        ErrorComponent
      ) : (
        EmptyListComponent
      )}
      {FooterComponent}
    </div>
  );
};
