import { FC } from 'react';
import { FlatListMapItemProps } from './flat-list';
import { FlatListItem, FlatListItemProps } from './flat-list-item';

export const CommonFlatListItemMapper: FC<FlatListMapItemProps<FlatListItemProps>> = ({ data }) => (
  <FlatListItem {...data} />
);
