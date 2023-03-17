import { FC, ReactElement, ReactNode } from 'react';

// ExtraType is defined to undefined to avoid breaking types for map components
// that do not want to use the extra props
// DataType is defined to Record<string, any> to avoid breaking types for map components
export interface FlatListMapItemProps<DataType extends Record<string, any>, ExtraType = undefined> {
  data: DataType;
  index: number;
  collection: DataType[];
  extra: ExtraType;
}

type ObjectKey<O, T> = { [K in keyof O]: O[K] extends T ? K : never }[keyof O & string];

export interface BaseFlatListProps<
  DataType extends Record<Key, any>,
  ExtraType,
  Key extends ObjectKey<DataType, string | number>,
> {
  className?: string;
  extraClassName?: string;
  data?: DataType[];
  dataKey: Key | ((item: DataType) => string | number);
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
  DataType extends Record<Key, any>,
  ExtraType,
  Key extends ObjectKey<DataType, string | number>,
> = ExtraType extends Record<string, any>
  ? BaseFlatListProps<DataType, ExtraType, Key>
  : Omit<BaseFlatListProps<DataType, ExtraType, Key>, 'extra'> & { extra?: ExtraType };

export const FlatList = <
  DataType extends Record<Key, any>,
  Key extends ObjectKey<DataType, string | number>,
  ExtraType = Record<string, any>,
>({
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
}: FlatListProps<DataType, ExtraType, Key>) => {
  return (
    <div className={`flat-list ${className ?? ''} ${loading ? 'flat-list-loading' : ''}`}>
      {HeaderComponent}
      {data != null && data.length > 0 && !loading ? (
        <ul>
          {data.map((it, idx) => {
            const key = typeof dataKey === 'string' ? it[dataKey] : dataKey(it);
            return (
              <ListItemComponent
                key={typeof key === 'string' || typeof key === 'number' ? key : idx}
                collection={data}
                data={it}
                extra={extra ?? ({} as ExtraType)}
                index={idx}
              />
            );
          })}
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
