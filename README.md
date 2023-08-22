# React Flat List

A React.js component to help render a list of components.

The idea behind this library is to create Item Components that display a single element given a specific data type and can be reused on multiple lists. Or a single behavior that can accept multiple data types. It was inspired by [React Native FlatList](https://reactnative.dev/docs/flatlist).

## Install

```bash
npm i @blb-ventures/resource
# or
yarn add @blb-ventures/resource
# or
pnpm i @blb-ventures/resource
```

## Usage and Examples

Components:

- FlatList: the list wrapper that renders an array of `data` using the `ListItemComponent`;
- FlatListHeader: A default header to render a title and some `ReactNode` to the right;
- FlatListSubHeader: A default ListItem with bigger text to separate sections of items;
- FlatListEmptyMessage: A muted text to render a message when the `data` array is empty;
- FlatListErrorMessage: A red text to render a message when there was an error trying to load the data;
- FlatListItem: a default list item;
- CommonFlatListItemMapper: A base `FlatListItem` that spreads the `data` directly into the `FlatListItem`;
- ObjectFlatListItem: A helper `FlatListItem` when you have an object and want the items to be mapping over the keys/values of the object; and
- LinkWrapper: It uses the `LinkComponent` to wrap around the `FlatListItem` content when a `url` is defined.

### Complete Example

```jsx
import {
  FlatList,
  FlatListEmptyMessage,
  FlatListErrorMessage,
  FlatListHeader,
  FlatListItem,
  FlatListMapItemProps,
} from '@blb-ventures/react-flat-list';
import AddOutlinedIcon from '@mui/icons-material/AddOutlined';
import PersonIcon from '@mui/icons-material/Person';
import { Avatar, Button } from '@mui/material';
import { FC } from 'react'

interface User {
  name: string;
  id: number;
  email: string;
  isAdmin: boolean;
  image: string | null;
}

const UserListItem: FC<FlatListMapItemProps<User>> = ({ data }) => (
  <FlatListItem
    imageLeft={data.image}
    imageLeftOptions={{ width: '40px', height: '40px', className: 'rounded-full' }}
    left={
      data.image == null && (
        <Avatar>
          <PersonIcon />
        </Avatar>
      )
    }
    leftOptions={{ style: { minWidth: '350px' } }}
    subtitleLeft={data.email}
    subtitleRight={data.isAdmin ? 'Admin' : 'User'}
    title={data.name}
    url={`/users/${data.id}`}
  />
);

const TestPage: FC = () => {
  const users: User[] = [
    {
      name: 'John Doe',
      id: 1,
      email: 'john.doe@example.com',
      isAdmin: false,
      image: '/images/john-doe.jpg',
    },
    {
      name: 'Jane Doe',
      id: 2,
      email: 'jane.doe@example.com',
      isAdmin: false,
      image: '/images/jane-doe.jpg',
    },
    { name: 'Admin', id: 3, email: 'admin@example.com', isAdmin: true, image: null },
  ];
  const error = false;
  return (
    <FlatList
      data={users}
      dataKey="id"
      EmptyListComponent={<FlatListEmptyMessage>There are no users.</FlatListEmptyMessage>}
      error={error}
      ErrorComponent={
        <FlatListErrorMessage>Error while trying to load users.</FlatListErrorMessage>
      }
      HeaderComponent={
        <FlatListHeader
          right={
            <Button
              onClick={() => {
                console.log('ADD USER');
              }}
              size="small"
              startIcon={<AddOutlinedIcon />}
              variant="contained"
            >
              Add User
            </Button>
          }
          title="All Users"
        />
      }
      ListItemComponent={UserListItem}
    />
  );
};
export default TestPage;
```

#### Output
![Screenshot 2023-08-21 at 7 30 07 PM](https://github.com/blb-ventures/react-flat-list/assets/810728/a1f07fe4-38ee-4ebd-b910-de061f38e25d)

#### Output with Error
![Screenshot 2023-08-21 at 7 29 08 PM](https://github.com/blb-ventures/react-flat-list/assets/810728/419c05b4-ad18-46a7-a669-ac51bb972c9f)

#### Output for empty list
![Screenshot 2023-08-21 at 7 29 32 PM](https://github.com/blb-ventures/react-flat-list/assets/810728/f3d3ddab-8744-4fdb-aaad-d9de3bb750b9)
