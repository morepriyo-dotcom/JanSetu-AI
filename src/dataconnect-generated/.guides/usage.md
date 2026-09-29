# Basic Usage

Always prioritize using a supported framework over using the generated SDK
directly. Supported frameworks simplify the developer experience and help ensure
best practices are followed.




### React
For each operation, there is a wrapper hook that can be used to call the operation.

Here are all of the hooks that get generated:
```ts
import { useCreateUser, useUpdateUser, useDeleteUser, useGetCurrentUser, useListUsers, useCreateDepartment, useUpdateDepartment, useDeleteDepartment, useGetDepartment, useListDepartments } from '@dataconnect/generated/react';
// The types of these hooks are available in react/index.d.ts

const { data, isPending, isSuccess, isError, error } = useCreateUser();

const { data, isPending, isSuccess, isError, error } = useUpdateUser();

const { data, isPending, isSuccess, isError, error } = useDeleteUser();

const { data, isPending, isSuccess, isError, error } = useGetCurrentUser();

const { data, isPending, isSuccess, isError, error } = useListUsers();

const { data, isPending, isSuccess, isError, error } = useCreateDepartment();

const { data, isPending, isSuccess, isError, error } = useUpdateDepartment(updateDepartmentVars);

const { data, isPending, isSuccess, isError, error } = useDeleteDepartment(deleteDepartmentVars);

const { data, isPending, isSuccess, isError, error } = useGetDepartment(getDepartmentVars);

const { data, isPending, isSuccess, isError, error } = useListDepartments();

```

Here's an example from a different generated SDK:

```ts
import { useListAllMovies } from '@dataconnect/generated/react';

function MyComponent() {
  const { isLoading, data, error } = useListAllMovies();
  if(isLoading) {
    return <div>Loading...</div>
  }
  if(error) {
    return <div> An Error Occurred: {error} </div>
  }
}

// App.tsx
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import MyComponent from './my-component';

function App() {
  const queryClient = new QueryClient();
  return <QueryClientProvider client={queryClient}>
    <MyComponent />
  </QueryClientProvider>
}
```



## Advanced Usage
If a user is not using a supported framework, they can use the generated SDK directly.

Here's an example of how to use it with the first 5 operations:

```js
import { createUser, updateUser, deleteUser, getCurrentUser, listUsers, createDepartment, updateDepartment, deleteDepartment, getDepartment, listDepartments } from '@dataconnect/generated';


// Operation CreateUser: 
const { data } = await CreateUser(dataConnect);

// Operation UpdateUser: 
const { data } = await UpdateUser(dataConnect);

// Operation DeleteUser: 
const { data } = await DeleteUser(dataConnect);

// Operation GetCurrentUser: 
const { data } = await GetCurrentUser(dataConnect);

// Operation ListUsers: 
const { data } = await ListUsers(dataConnect);

// Operation CreateDepartment: 
const { data } = await CreateDepartment(dataConnect);

// Operation UpdateDepartment:  For variables, look at type UpdateDepartmentVars in ../index.d.ts
const { data } = await UpdateDepartment(dataConnect, updateDepartmentVars);

// Operation DeleteDepartment:  For variables, look at type DeleteDepartmentVars in ../index.d.ts
const { data } = await DeleteDepartment(dataConnect, deleteDepartmentVars);

// Operation GetDepartment:  For variables, look at type GetDepartmentVars in ../index.d.ts
const { data } = await GetDepartment(dataConnect, getDepartmentVars);

// Operation ListDepartments: 
const { data } = await ListDepartments(dataConnect);


```