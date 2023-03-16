import { FlatListMapItemProps } from './flat-list';
import { FlatListItem, FlatListItemProps } from './flat-list-item';

export interface BaseObjectFlatListItemData<DataType extends Record<string, unknown>> {
  label: string;
  formatter?: (value: unknown) => string | null;
  flatListItemProps?: Partial<FlatListItemProps> | ((obj: DataType) => Partial<FlatListItemProps>);
}

export interface KeyBasedObjectFlatListItemData<DataType extends Record<string, unknown>>
  extends BaseObjectFlatListItemData<DataType> {
  key: keyof DataType;
}

export interface FnBasedObjectFlatListItemData<DataType extends Record<string, unknown>>
  extends BaseObjectFlatListItemData<DataType> {
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

const isKeyData = <DataType extends Record<string, unknown>>(
  data: ObjectFlatListItemData<DataType>,
): data is KeyBasedObjectFlatListItemData<DataType> => {
  return 'key' in data;
};

export const ObjectFlatListItem = <DataType extends Record<string, unknown>>({
  data,
  extra,
}: ObjectFlatListItemProps<DataType>) => {
  if (extra.obj == null) return null;
  const value = isKeyData(data) ? extra.obj[data.key] : data.getValue(extra.obj);
  let formattedValue: string | null = null;
  if (data.formatter) {
    formattedValue = data.formatter(value);
  } else {
    formattedValue = value != null ? String(value) : null;
  }
  return (
    <FlatListItem
      subtitleLeft={data.label}
      title={formattedValue ?? extra.fallbackValue ?? '-'}
      {...extra.flatListItemProps}
      {...data.flatListItemProps}
    />
  );
};
