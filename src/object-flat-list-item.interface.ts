import { FlatListItemProps } from './flat-list-item';

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
