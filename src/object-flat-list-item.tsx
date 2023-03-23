import { useMemo } from 'react';
import { FlatListMapItemProps } from './flat-list';
import { FlatListItem, FlatListItemProps } from './flat-list-item';

export interface BaseObjectFlatListItemData<DataType> {
  label: string;
  formatter?: (value: unknown) => string | null;
  flatListItemProps?: Partial<FlatListItemProps> | ((obj: DataType) => Partial<FlatListItemProps>);
}

export interface KeyBasedObjectFlatListItemData<DataType>
  extends BaseObjectFlatListItemData<DataType> {
  key: keyof DataType;
}

export interface FnBasedObjectFlatListItemData<DataType>
  extends BaseObjectFlatListItemData<DataType> {
  getValue: (obj: DataType) => unknown;
}

export type ObjectFlatListItemData<DataType> =
  | KeyBasedObjectFlatListItemData<DataType>
  | FnBasedObjectFlatListItemData<DataType>;

export interface ObjectFlatListItemExtra<DataType> {
  obj?: DataType;
  fallbackValue?: string;
  flatListItemProps?: Partial<FlatListItemProps>;
}

type ObjectFlatListItemProps<DataType> = FlatListMapItemProps<
  ObjectFlatListItemData<DataType>,
  ObjectFlatListItemExtra<DataType>
>;

const isKeyData = <DataType extends Record<string, any>>(
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
  }, [data, extra]);
  return extra.obj == null ? null : (
    <FlatListItem
      subtitleLeft={data.label}
      title={formattedValue ?? extra.fallbackValue ?? '-'}
      {...extra.flatListItemProps}
      {...(typeof data.flatListItemProps === 'function'
        ? data.flatListItemProps(extra.obj)
        : data.flatListItemProps)}
    />
  );
};
