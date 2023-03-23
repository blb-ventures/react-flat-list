import {
  KeyBasedObjectFlatListItemData,
  ObjectFlatListItemData,
} from './object-flat-list-item.interface';

export const isKeyData = <DataType>(
  data: ObjectFlatListItemData<DataType>,
): data is KeyBasedObjectFlatListItemData<DataType> => {
  return 'key' in data;
};
