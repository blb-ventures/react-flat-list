import { FC, useMemo } from 'react';
import { FlatListMapItemProps } from './flat-list';
import { FlatListItem, FlatListItemProps } from './flat-list-item';

export interface BaseObjectFlatListItemData<DataType extends Record<string, any>> {
  label: string;
  formatter?: (value: unknown) => string | null;
  flatListItemProps?: Partial<FlatListItemProps> | ((obj: DataType) => Partial<FlatListItemProps>);
}

export interface KeyBasedObjectFlatListItemData<DataType extends Record<string, any>>
  extends BaseObjectFlatListItemData<DataType> {
  key: keyof DataType;
}

export interface FnBasedObjectFlatListItemData<DataType extends Record<string, any>>
  extends BaseObjectFlatListItemData<DataType> {
  getValue: (obj: DataType) => unknown;
}

export type ObjectFlatListItemData<DataType extends Record<string, any>> =
  | KeyBasedObjectFlatListItemData<DataType>
  | FnBasedObjectFlatListItemData<DataType>;

export interface ObjectFlatListItemExtra<DataType extends Record<string, any>> {
  obj?: DataType;
  fallbackValue?: string;
  flatListItemProps?: Partial<FlatListItemProps>;
  FlatListComponent?: FC<FlatListItemProps>;
}

type ObjectFlatListItemProps<DataType extends Record<string, any>> = FlatListMapItemProps<
  ObjectFlatListItemData<DataType>,
  ObjectFlatListItemExtra<DataType>
>;

export const isKeyData = <DataType extends Record<string, any>>(
  data: ObjectFlatListItemData<DataType>,
): data is KeyBasedObjectFlatListItemData<DataType> => {
  return 'key' in data;
};

export const ObjectFlatListItem = <DataType extends Record<string, any>>({
  data,
  extra,
}: ObjectFlatListItemProps<DataType>) => {
  const formattedValue = useMemo(() => {
    if (extra.obj == null) return null;
    const value = isKeyData(data) ? extra.obj[data.key] : data.getValue(extra.obj);
    if (data.formatter) return data.formatter(value);
    return value != null ? String(value) : null;
  }, [data, extra.obj]);
  const Component = extra.FlatListComponent ?? FlatListItem;
  return extra.obj == null ? null : (
    <Component
      subtitleLeft={data.label}
      title={formattedValue ?? extra.fallbackValue ?? '-'}
      {...extra.flatListItemProps}
      {...(typeof data.flatListItemProps === 'function'
        ? data.flatListItemProps(extra.obj)
        : data.flatListItemProps)}
    />
  );
};
