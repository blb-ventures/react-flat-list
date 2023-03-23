import { useMemo } from 'react';
import { FlatListMapItemProps } from './flat-list';
import { FlatListItem } from './flat-list-item';
import { ObjectFlatListItemData, ObjectFlatListItemExtra } from './object-flat-list-item.interface';
import { isKeyData } from './object-flat-list-item.typeguard';

type ObjectFlatListItemProps<DataType> = FlatListMapItemProps<
  ObjectFlatListItemData<DataType>,
  ObjectFlatListItemExtra<DataType>
>;

export const ObjectFlatListItem = <
  const DataType extends Record<Keys, InnerData>,
  Keys extends keyof DataType & string,
  InnerData,
>({
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
