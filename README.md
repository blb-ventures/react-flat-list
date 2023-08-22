# React Flat List

A React.js component to help render a list of components.

The idea behind this library is to create Item Components that display a single element given a specific data type and can be reused on multiple lists. Or a single behavior that can accept multiple data types.

## Install

```bash
npm i @blb-ventures/resource
# or
yarn add @blb-ventures/resource
# or
pnpm i @blb-ventures/resource
```

## Usage and Examples

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

#### Output with Error

#### Output for empty list
