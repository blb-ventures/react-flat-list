import { FlatListMapItemProps } from './flat-list';
import { FlatListItem, FlatListItemProps } from './flat-list-item';

export interface BaseObjectFlatListItemData {
  label: string;
  formatter?: (value: unknown) => string | null;
  flatListItemProps?: Partial<FlatListItemProps>;
}

export interface KeyBasedObjectFlatListItemData<DataType extends Record<string, unknown>>
  extends BaseObjectFlatListItemData {
  key: keyof DataType;
}

export interface FnBasedObjectFlatListItemData<DataType extends Record<string, unknown>>
  extends BaseObjectFlatListItemData {
  getValue: (obj: DataType) => unknown;
}

export type ObjectFlatListItemData<DataType extends Record<string, unknown>> =
  | KeyBasedObjectFlatListItemData<DataType>
  | FnBasedObjectFlatListItemData<DataType>;

export interface ObjectFlatListItemExtra<DataType extends Record<string, unknown>> {
  obj?: DataType;
  fallbackValue?: string;
  flatListItemProps?: Partial<FlatListItemProps>;
}

type ObjectFlatListItemProps<DataType extends Record<string, unknown>> = FlatListMapItemProps<
  ObjectFlatListItemData<DataType>,
  ObjectFlatListItemExtra<DataType>
>;

export const ObjectFlatListItem = <DataType extends Record<string, unknown>>({
  data,
  extra,
}: ObjectFlatListItemProps<DataType>) => {
  if (extra.obj == null) return null;
  const value = 'key' in data ? extra.obj[data.key] : data.getValue(extra.obj);
  const formattedValue =
    data.formatter != null ? data.formatter(value) : value != null ? String(value) : undefined;
  return (
    <FlatListItem
      subtitleLeft={data.label}
      title={formattedValue ?? extra.fallbackValue ?? '-'}
      {...extra.flatListItemProps}
      {...data.flatListItemProps}
    />
  );
};
