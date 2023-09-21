import { FC, useMemo } from 'react';

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
  dataKey: Key | ((item: DataType, index: number) => string | number);
  HeaderElement?: JSX.Element;
  FooterElement?: JSX.Element;
  EmptyListElement?: JSX.Element;
  ErrorElement?: JSX.Element;
  LoadingElement?: JSX.Element;
  ListItemComponent:
    | FC<FlatListMapItemProps<DataType, ExtraType>>
    | ((props: FlatListMapItemProps<DataType, ExtraType>) => JSX.Element);
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
  FooterElement,
  HeaderElement,
  ListItemComponent,
  EmptyListElement,
  ErrorElement,
  LoadingElement,
  data,
  dataKey,
  extra,
  loading,
  error,
}: FlatListProps<DataType, ExtraType, Key>) => {
  const content = useMemo(() => {
    if (loading) {
      return (
        LoadingElement ?? (
          <div className="flat-list-loading-container">
            <div className="flat-list-loading" />
          </div>
        )
      );
    }
    if (error && ErrorElement) return ErrorElement;
    if ((data == null || data.length === 0) && EmptyListElement) return EmptyListElement;
    return data != null ? (
      <ul>
        {data.map((it, idx) => {
          const key = typeof dataKey === 'string' ? it[dataKey] : dataKey(it, idx);
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
    ) : null;
  }, [
    error,
    ErrorElement,
    loading,
    data,
    EmptyListElement,
    ListItemComponent,
    dataKey,
    extra,
    LoadingElement,
  ]);
  return (
    <div className={`flat-list ${className ?? ''} ${loading ? 'flat-list-is-loading' : ''}`}>
      {HeaderElement}
      {content}
      {FooterElement}
    </div>
  );
};
