import { FlatListMapItemProps } from './flat-list';
import { FlatListItem, FlatListItemProps } from './flat-list-item';

export interface BaseObjectFlatListItemData {
  label: string;
  formatter?: (value: unknown) => string;
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
}

type ObjectFlatListItemProps<DataType extends Record<string, unknown>> = FlatListMapItemProps<
  ObjectFlatListItemData<DataType>,
  ObjectFlatListItemExtra<DataType>
> & { flatListItemProps: Partial<FlatListItemProps> };

export const ObjectFlatListItem = <DataType extends Record<string, unknown>>({
  data,
  extra,
  flatListItemProps,
}: ObjectFlatListItemProps<DataType>) => {
  if (extra.obj == null || data == null) return null;
  const value = 'key' in data ? extra.obj[data.key] : data.getValue(extra.obj);
  if (value != null && typeof value !== 'string' && data.formatter == null) {
    throw new Error(`Missing formatter for item labeled: ${data.label}`);
  }
  const formattedValue = data.formatter != null ? data.formatter(value) : (value as string);
  return (
    <FlatListItem
      subtitleLeft={data.label}
      title={formattedValue ?? extra.fallbackValue ?? '-'}
      {...flatListItemProps}
    />
  );
};
