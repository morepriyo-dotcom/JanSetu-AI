# Generated TypeScript README
This README will guide you through the process of using the generated JavaScript SDK package for the connector `example`. It will also provide examples on how to use your generated SDK to call your Data Connect queries and mutations.

**If you're looking for the `React README`, you can find it at [`dataconnect-generated/react/README.md`](./react/README.md)**

***NOTE:** This README is generated alongside the generated SDK. If you make changes to this file, they will be overwritten when the SDK is regenerated.*

# Table of Contents
- [**Overview**](#generated-javascript-readme)
- [**Accessing the connector**](#accessing-the-connector)
  - [*Connecting to the local Emulator*](#connecting-to-the-local-emulator)
- [**Queries**](#queries)
  - [*GetCurrentUser*](#getcurrentuser)
  - [*ListUsers*](#listusers)
  - [*GetDepartment*](#getdepartment)
  - [*ListDepartments*](#listdepartments)
  - [*GetOfficial*](#getofficial)
  - [*ListOfficials*](#listofficials)
  - [*GetReport*](#getreport)
  - [*ListUserReports*](#listuserreports)
  - [*ListMySubscriptions*](#listmysubscriptions)
- [**Mutations**](#mutations)
  - [*CreateUser*](#createuser)
  - [*UpdateUser*](#updateuser)
  - [*DeleteUser*](#deleteuser)
  - [*CreateDepartment*](#createdepartment)
  - [*UpdateDepartment*](#updatedepartment)
  - [*DeleteDepartment*](#deletedepartment)
  - [*CreateOfficial*](#createofficial)
  - [*UpdateOfficial*](#updateofficial)
  - [*DeleteOfficial*](#deleteofficial)
  - [*CreateReport*](#createreport)
  - [*UpdateReportStatus*](#updatereportstatus)
  - [*DeleteReport*](#deletereport)
  - [*CreateSubscription*](#createsubscription)
  - [*DeleteSubscription*](#deletesubscription)

# Accessing the connector
A connector is a collection of Queries and Mutations. One SDK is generated for each connector - this SDK is generated for the connector `example`. You can find more information about connectors in the [Data Connect documentation](https://firebase.google.com/docs/data-connect#how-does).

You can use this generated SDK by importing from the package `@dataconnect/generated` as shown below. Both CommonJS and ESM imports are supported.

You can also follow the instructions from the [Data Connect documentation](https://firebase.google.com/docs/data-connect/web-sdk#set-client).

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig } from '@dataconnect/generated';

const dataConnect = getDataConnect(connectorConfig);
```

## Connecting to the local Emulator
By default, the connector will connect to the production service.

To connect to the emulator, you can use the following code.
You can also follow the emulator instructions from the [Data Connect documentation](https://firebase.google.com/docs/data-connect/web-sdk#instrument-clients).

```typescript
import { connectDataConnectEmulator, getDataConnect } from 'firebase/data-connect';
import { connectorConfig } from '@dataconnect/generated';

const dataConnect = getDataConnect(connectorConfig);
connectDataConnectEmulator(dataConnect, 'localhost', 9399);
```

After it's initialized, you can call your Data Connect [queries](#queries) and [mutations](#mutations) from your generated SDK.

# Queries

There are two ways to execute a Data Connect Query using the generated Web SDK:
- Using a Query Reference function, which returns a `QueryRef`
  - The `QueryRef` can be used as an argument to `executeQuery()`, which will execute the Query and return a `QueryPromise`
- Using an action shortcut function, which returns a `QueryPromise`
  - Calling the action shortcut function will execute the Query and return a `QueryPromise`

The following is true for both the action shortcut function and the `QueryRef` function:
- The `QueryPromise` returned will resolve to the result of the Query once it has finished executing
- If the Query accepts arguments, both the action shortcut function and the `QueryRef` function accept a single argument: an object that contains all the required variables (and the optional variables) for the Query
- Both functions can be called with or without passing in a `DataConnect` instance as an argument. If no `DataConnect` argument is passed in, then the generated SDK will call `getDataConnect(connectorConfig)` behind the scenes for you.

Below are examples of how to use the `example` connector's generated functions to execute each query. You can also follow the examples from the [Data Connect documentation](https://firebase.google.com/docs/data-connect/web-sdk#using-queries).

## GetCurrentUser
You can execute the `GetCurrentUser` query using the following action shortcut function, or by calling `executeQuery()` after calling the following `QueryRef` function, both of which are defined in [dataconnect-generated/index.d.ts](./index.d.ts):
```typescript
getCurrentUser(options?: ExecuteQueryOptions): QueryPromise<GetCurrentUserData, undefined>;

interface GetCurrentUserRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (): QueryRef<GetCurrentUserData, undefined>;
}
export const getCurrentUserRef: GetCurrentUserRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `QueryRef` function.
```typescript
getCurrentUser(dc: DataConnect, options?: ExecuteQueryOptions): QueryPromise<GetCurrentUserData, undefined>;

interface GetCurrentUserRef {
  ...
  (dc: DataConnect): QueryRef<GetCurrentUserData, undefined>;
}
export const getCurrentUserRef: GetCurrentUserRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the getCurrentUserRef:
```typescript
const name = getCurrentUserRef.operationName;
console.log(name);
```

### Variables
The `GetCurrentUser` query has no variables.
### Return Type
Recall that executing the `GetCurrentUser` query returns a `QueryPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `GetCurrentUserData`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:
```typescript
export interface GetCurrentUserData {
  user?: {
    id: UUIDString;
    name: string;
    email: string;
  } & User_Key;
}
```
### Using `GetCurrentUser`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, getCurrentUser } from '@dataconnect/generated';


// Call the `getCurrentUser()` function to execute the query.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await getCurrentUser();

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await getCurrentUser(dataConnect);

console.log(data.user);

// Or, you can use the `Promise` API.
getCurrentUser().then((response) => {
  const data = response.data;
  console.log(data.user);
});
```

### Using `GetCurrentUser`'s `QueryRef` function

```typescript
import { getDataConnect, executeQuery } from 'firebase/data-connect';
import { connectorConfig, getCurrentUserRef } from '@dataconnect/generated';


// Call the `getCurrentUserRef()` function to get a reference to the query.
const ref = getCurrentUserRef();

// You can also pass in a `DataConnect` instance to the `QueryRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = getCurrentUserRef(dataConnect);

// Call `executeQuery()` on the reference to execute the query.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeQuery(ref);

console.log(data.user);

// Or, you can use the `Promise` API.
executeQuery(ref).then((response) => {
  const data = response.data;
  console.log(data.user);
});
```

## ListUsers
You can execute the `ListUsers` query using the following action shortcut function, or by calling `executeQuery()` after calling the following `QueryRef` function, both of which are defined in [dataconnect-generated/index.d.ts](./index.d.ts):
```typescript
listUsers(options?: ExecuteQueryOptions): QueryPromise<ListUsersData, undefined>;

interface ListUsersRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (): QueryRef<ListUsersData, undefined>;
}
export const listUsersRef: ListUsersRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `QueryRef` function.
```typescript
listUsers(dc: DataConnect, options?: ExecuteQueryOptions): QueryPromise<ListUsersData, undefined>;

interface ListUsersRef {
  ...
  (dc: DataConnect): QueryRef<ListUsersData, undefined>;
}
export const listUsersRef: ListUsersRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the listUsersRef:
```typescript
const name = listUsersRef.operationName;
console.log(name);
```

### Variables
The `ListUsers` query has no variables.
### Return Type
Recall that executing the `ListUsers` query returns a `QueryPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `ListUsersData`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:
```typescript
export interface ListUsersData {
  users: ({
    id: UUIDString;
    name: string;
    role: string;
  } & User_Key)[];
}
```
### Using `ListUsers`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, listUsers } from '@dataconnect/generated';


// Call the `listUsers()` function to execute the query.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await listUsers();

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await listUsers(dataConnect);

console.log(data.users);

// Or, you can use the `Promise` API.
listUsers().then((response) => {
  const data = response.data;
  console.log(data.users);
});
```

### Using `ListUsers`'s `QueryRef` function

```typescript
import { getDataConnect, executeQuery } from 'firebase/data-connect';
import { connectorConfig, listUsersRef } from '@dataconnect/generated';


// Call the `listUsersRef()` function to get a reference to the query.
const ref = listUsersRef();

// You can also pass in a `DataConnect` instance to the `QueryRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = listUsersRef(dataConnect);

// Call `executeQuery()` on the reference to execute the query.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeQuery(ref);

console.log(data.users);

// Or, you can use the `Promise` API.
executeQuery(ref).then((response) => {
  const data = response.data;
  console.log(data.users);
});
```

## GetDepartment
You can execute the `GetDepartment` query using the following action shortcut function, or by calling `executeQuery()` after calling the following `QueryRef` function, both of which are defined in [dataconnect-generated/index.d.ts](./index.d.ts):
```typescript
getDepartment(vars: GetDepartmentVariables, options?: ExecuteQueryOptions): QueryPromise<GetDepartmentData, GetDepartmentVariables>;

interface GetDepartmentRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (vars: GetDepartmentVariables): QueryRef<GetDepartmentData, GetDepartmentVariables>;
}
export const getDepartmentRef: GetDepartmentRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `QueryRef` function.
```typescript
getDepartment(dc: DataConnect, vars: GetDepartmentVariables, options?: ExecuteQueryOptions): QueryPromise<GetDepartmentData, GetDepartmentVariables>;

interface GetDepartmentRef {
  ...
  (dc: DataConnect, vars: GetDepartmentVariables): QueryRef<GetDepartmentData, GetDepartmentVariables>;
}
export const getDepartmentRef: GetDepartmentRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the getDepartmentRef:
```typescript
const name = getDepartmentRef.operationName;
console.log(name);
```

### Variables
The `GetDepartment` query requires an argument of type `GetDepartmentVariables`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:

```typescript
export interface GetDepartmentVariables {
  id: UUIDString;
}
```
### Return Type
Recall that executing the `GetDepartment` query returns a `QueryPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `GetDepartmentData`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:
```typescript
export interface GetDepartmentData {
  department?: {
    name: string;
    contactEmail: string;
  };
}
```
### Using `GetDepartment`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, getDepartment, GetDepartmentVariables } from '@dataconnect/generated';

// The `GetDepartment` query requires an argument of type `GetDepartmentVariables`:
const getDepartmentVars: GetDepartmentVariables = {
  id: ..., 
};

// Call the `getDepartment()` function to execute the query.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await getDepartment(getDepartmentVars);
// Variables can be defined inline as well.
const { data } = await getDepartment({ id: ..., });

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await getDepartment(dataConnect, getDepartmentVars);

console.log(data.department);

// Or, you can use the `Promise` API.
getDepartment(getDepartmentVars).then((response) => {
  const data = response.data;
  console.log(data.department);
});
```

### Using `GetDepartment`'s `QueryRef` function

```typescript
import { getDataConnect, executeQuery } from 'firebase/data-connect';
import { connectorConfig, getDepartmentRef, GetDepartmentVariables } from '@dataconnect/generated';

// The `GetDepartment` query requires an argument of type `GetDepartmentVariables`:
const getDepartmentVars: GetDepartmentVariables = {
  id: ..., 
};

// Call the `getDepartmentRef()` function to get a reference to the query.
const ref = getDepartmentRef(getDepartmentVars);
// Variables can be defined inline as well.
const ref = getDepartmentRef({ id: ..., });

// You can also pass in a `DataConnect` instance to the `QueryRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = getDepartmentRef(dataConnect, getDepartmentVars);

// Call `executeQuery()` on the reference to execute the query.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeQuery(ref);

console.log(data.department);

// Or, you can use the `Promise` API.
executeQuery(ref).then((response) => {
  const data = response.data;
  console.log(data.department);
});
```

## ListDepartments
You can execute the `ListDepartments` query using the following action shortcut function, or by calling `executeQuery()` after calling the following `QueryRef` function, both of which are defined in [dataconnect-generated/index.d.ts](./index.d.ts):
```typescript
listDepartments(options?: ExecuteQueryOptions): QueryPromise<ListDepartmentsData, undefined>;

interface ListDepartmentsRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (): QueryRef<ListDepartmentsData, undefined>;
}
export const listDepartmentsRef: ListDepartmentsRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `QueryRef` function.
```typescript
listDepartments(dc: DataConnect, options?: ExecuteQueryOptions): QueryPromise<ListDepartmentsData, undefined>;

interface ListDepartmentsRef {
  ...
  (dc: DataConnect): QueryRef<ListDepartmentsData, undefined>;
}
export const listDepartmentsRef: ListDepartmentsRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the listDepartmentsRef:
```typescript
const name = listDepartmentsRef.operationName;
console.log(name);
```

### Variables
The `ListDepartments` query has no variables.
### Return Type
Recall that executing the `ListDepartments` query returns a `QueryPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `ListDepartmentsData`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:
```typescript
export interface ListDepartmentsData {
  departments: ({
    name: string;
    officeLocation?: string | null;
  })[];
}
```
### Using `ListDepartments`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, listDepartments } from '@dataconnect/generated';


// Call the `listDepartments()` function to execute the query.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await listDepartments();

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await listDepartments(dataConnect);

console.log(data.departments);

// Or, you can use the `Promise` API.
listDepartments().then((response) => {
  const data = response.data;
  console.log(data.departments);
});
```

### Using `ListDepartments`'s `QueryRef` function

```typescript
import { getDataConnect, executeQuery } from 'firebase/data-connect';
import { connectorConfig, listDepartmentsRef } from '@dataconnect/generated';


// Call the `listDepartmentsRef()` function to get a reference to the query.
const ref = listDepartmentsRef();

// You can also pass in a `DataConnect` instance to the `QueryRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = listDepartmentsRef(dataConnect);

// Call `executeQuery()` on the reference to execute the query.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeQuery(ref);

console.log(data.departments);

// Or, you can use the `Promise` API.
executeQuery(ref).then((response) => {
  const data = response.data;
  console.log(data.departments);
});
```

## GetOfficial
You can execute the `GetOfficial` query using the following action shortcut function, or by calling `executeQuery()` after calling the following `QueryRef` function, both of which are defined in [dataconnect-generated/index.d.ts](./index.d.ts):
```typescript
getOfficial(vars: GetOfficialVariables, options?: ExecuteQueryOptions): QueryPromise<GetOfficialData, GetOfficialVariables>;

interface GetOfficialRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (vars: GetOfficialVariables): QueryRef<GetOfficialData, GetOfficialVariables>;
}
export const getOfficialRef: GetOfficialRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `QueryRef` function.
```typescript
getOfficial(dc: DataConnect, vars: GetOfficialVariables, options?: ExecuteQueryOptions): QueryPromise<GetOfficialData, GetOfficialVariables>;

interface GetOfficialRef {
  ...
  (dc: DataConnect, vars: GetOfficialVariables): QueryRef<GetOfficialData, GetOfficialVariables>;
}
export const getOfficialRef: GetOfficialRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the getOfficialRef:
```typescript
const name = getOfficialRef.operationName;
console.log(name);
```

### Variables
The `GetOfficial` query requires an argument of type `GetOfficialVariables`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:

```typescript
export interface GetOfficialVariables {
  id: UUIDString;
}
```
### Return Type
Recall that executing the `GetOfficial` query returns a `QueryPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `GetOfficialData`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:
```typescript
export interface GetOfficialData {
  official?: {
    name: string;
    positionTitle: string;
  };
}
```
### Using `GetOfficial`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, getOfficial, GetOfficialVariables } from '@dataconnect/generated';

// The `GetOfficial` query requires an argument of type `GetOfficialVariables`:
const getOfficialVars: GetOfficialVariables = {
  id: ..., 
};

// Call the `getOfficial()` function to execute the query.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await getOfficial(getOfficialVars);
// Variables can be defined inline as well.
const { data } = await getOfficial({ id: ..., });

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await getOfficial(dataConnect, getOfficialVars);

console.log(data.official);

// Or, you can use the `Promise` API.
getOfficial(getOfficialVars).then((response) => {
  const data = response.data;
  console.log(data.official);
});
```

### Using `GetOfficial`'s `QueryRef` function

```typescript
import { getDataConnect, executeQuery } from 'firebase/data-connect';
import { connectorConfig, getOfficialRef, GetOfficialVariables } from '@dataconnect/generated';

// The `GetOfficial` query requires an argument of type `GetOfficialVariables`:
const getOfficialVars: GetOfficialVariables = {
  id: ..., 
};

// Call the `getOfficialRef()` function to get a reference to the query.
const ref = getOfficialRef(getOfficialVars);
// Variables can be defined inline as well.
const ref = getOfficialRef({ id: ..., });

// You can also pass in a `DataConnect` instance to the `QueryRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = getOfficialRef(dataConnect, getOfficialVars);

// Call `executeQuery()` on the reference to execute the query.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeQuery(ref);

console.log(data.official);

// Or, you can use the `Promise` API.
executeQuery(ref).then((response) => {
  const data = response.data;
  console.log(data.official);
});
```

## ListOfficials
You can execute the `ListOfficials` query using the following action shortcut function, or by calling `executeQuery()` after calling the following `QueryRef` function, both of which are defined in [dataconnect-generated/index.d.ts](./index.d.ts):
```typescript
listOfficials(options?: ExecuteQueryOptions): QueryPromise<ListOfficialsData, undefined>;

interface ListOfficialsRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (): QueryRef<ListOfficialsData, undefined>;
}
export const listOfficialsRef: ListOfficialsRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `QueryRef` function.
```typescript
listOfficials(dc: DataConnect, options?: ExecuteQueryOptions): QueryPromise<ListOfficialsData, undefined>;

interface ListOfficialsRef {
  ...
  (dc: DataConnect): QueryRef<ListOfficialsData, undefined>;
}
export const listOfficialsRef: ListOfficialsRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the listOfficialsRef:
```typescript
const name = listOfficialsRef.operationName;
console.log(name);
```

### Variables
The `ListOfficials` query has no variables.
### Return Type
Recall that executing the `ListOfficials` query returns a `QueryPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `ListOfficialsData`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:
```typescript
export interface ListOfficialsData {
  officials: ({
    name: string;
    positionTitle: string;
  })[];
}
```
### Using `ListOfficials`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, listOfficials } from '@dataconnect/generated';


// Call the `listOfficials()` function to execute the query.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await listOfficials();

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await listOfficials(dataConnect);

console.log(data.officials);

// Or, you can use the `Promise` API.
listOfficials().then((response) => {
  const data = response.data;
  console.log(data.officials);
});
```

### Using `ListOfficials`'s `QueryRef` function

```typescript
import { getDataConnect, executeQuery } from 'firebase/data-connect';
import { connectorConfig, listOfficialsRef } from '@dataconnect/generated';


// Call the `listOfficialsRef()` function to get a reference to the query.
const ref = listOfficialsRef();

// You can also pass in a `DataConnect` instance to the `QueryRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = listOfficialsRef(dataConnect);

// Call `executeQuery()` on the reference to execute the query.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeQuery(ref);

console.log(data.officials);

// Or, you can use the `Promise` API.
executeQuery(ref).then((response) => {
  const data = response.data;
  console.log(data.officials);
});
```

## GetReport
You can execute the `GetReport` query using the following action shortcut function, or by calling `executeQuery()` after calling the following `QueryRef` function, both of which are defined in [dataconnect-generated/index.d.ts](./index.d.ts):
```typescript
getReport(vars: GetReportVariables, options?: ExecuteQueryOptions): QueryPromise<GetReportData, GetReportVariables>;

interface GetReportRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (vars: GetReportVariables): QueryRef<GetReportData, GetReportVariables>;
}
export const getReportRef: GetReportRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `QueryRef` function.
```typescript
getReport(dc: DataConnect, vars: GetReportVariables, options?: ExecuteQueryOptions): QueryPromise<GetReportData, GetReportVariables>;

interface GetReportRef {
  ...
  (dc: DataConnect, vars: GetReportVariables): QueryRef<GetReportData, GetReportVariables>;
}
export const getReportRef: GetReportRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the getReportRef:
```typescript
const name = getReportRef.operationName;
console.log(name);
```

### Variables
The `GetReport` query requires an argument of type `GetReportVariables`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:

```typescript
export interface GetReportVariables {
  id: UUIDString;
}
```
### Return Type
Recall that executing the `GetReport` query returns a `QueryPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `GetReportData`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:
```typescript
export interface GetReportData {
  report?: {
    title: string;
    status: string;
    submitter: {
      name: string;
    };
  };
}
```
### Using `GetReport`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, getReport, GetReportVariables } from '@dataconnect/generated';

// The `GetReport` query requires an argument of type `GetReportVariables`:
const getReportVars: GetReportVariables = {
  id: ..., 
};

// Call the `getReport()` function to execute the query.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await getReport(getReportVars);
// Variables can be defined inline as well.
const { data } = await getReport({ id: ..., });

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await getReport(dataConnect, getReportVars);

console.log(data.report);

// Or, you can use the `Promise` API.
getReport(getReportVars).then((response) => {
  const data = response.data;
  console.log(data.report);
});
```

### Using `GetReport`'s `QueryRef` function

```typescript
import { getDataConnect, executeQuery } from 'firebase/data-connect';
import { connectorConfig, getReportRef, GetReportVariables } from '@dataconnect/generated';

// The `GetReport` query requires an argument of type `GetReportVariables`:
const getReportVars: GetReportVariables = {
  id: ..., 
};

// Call the `getReportRef()` function to get a reference to the query.
const ref = getReportRef(getReportVars);
// Variables can be defined inline as well.
const ref = getReportRef({ id: ..., });

// You can also pass in a `DataConnect` instance to the `QueryRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = getReportRef(dataConnect, getReportVars);

// Call `executeQuery()` on the reference to execute the query.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeQuery(ref);

console.log(data.report);

// Or, you can use the `Promise` API.
executeQuery(ref).then((response) => {
  const data = response.data;
  console.log(data.report);
});
```

## ListUserReports
You can execute the `ListUserReports` query using the following action shortcut function, or by calling `executeQuery()` after calling the following `QueryRef` function, both of which are defined in [dataconnect-generated/index.d.ts](./index.d.ts):
```typescript
listUserReports(options?: ExecuteQueryOptions): QueryPromise<ListUserReportsData, undefined>;

interface ListUserReportsRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (): QueryRef<ListUserReportsData, undefined>;
}
export const listUserReportsRef: ListUserReportsRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `QueryRef` function.
```typescript
listUserReports(dc: DataConnect, options?: ExecuteQueryOptions): QueryPromise<ListUserReportsData, undefined>;

interface ListUserReportsRef {
  ...
  (dc: DataConnect): QueryRef<ListUserReportsData, undefined>;
}
export const listUserReportsRef: ListUserReportsRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the listUserReportsRef:
```typescript
const name = listUserReportsRef.operationName;
console.log(name);
```

### Variables
The `ListUserReports` query has no variables.
### Return Type
Recall that executing the `ListUserReports` query returns a `QueryPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `ListUserReportsData`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:
```typescript
export interface ListUserReportsData {
  reports: ({
    title: string;
    status: string;
    createdAt: TimestampString;
  })[];
}
```
### Using `ListUserReports`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, listUserReports } from '@dataconnect/generated';


// Call the `listUserReports()` function to execute the query.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await listUserReports();

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await listUserReports(dataConnect);

console.log(data.reports);

// Or, you can use the `Promise` API.
listUserReports().then((response) => {
  const data = response.data;
  console.log(data.reports);
});
```

### Using `ListUserReports`'s `QueryRef` function

```typescript
import { getDataConnect, executeQuery } from 'firebase/data-connect';
import { connectorConfig, listUserReportsRef } from '@dataconnect/generated';


// Call the `listUserReportsRef()` function to get a reference to the query.
const ref = listUserReportsRef();

// You can also pass in a `DataConnect` instance to the `QueryRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = listUserReportsRef(dataConnect);

// Call `executeQuery()` on the reference to execute the query.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeQuery(ref);

console.log(data.reports);

// Or, you can use the `Promise` API.
executeQuery(ref).then((response) => {
  const data = response.data;
  console.log(data.reports);
});
```

## ListMySubscriptions
You can execute the `ListMySubscriptions` query using the following action shortcut function, or by calling `executeQuery()` after calling the following `QueryRef` function, both of which are defined in [dataconnect-generated/index.d.ts](./index.d.ts):
```typescript
listMySubscriptions(options?: ExecuteQueryOptions): QueryPromise<ListMySubscriptionsData, undefined>;

interface ListMySubscriptionsRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (): QueryRef<ListMySubscriptionsData, undefined>;
}
export const listMySubscriptionsRef: ListMySubscriptionsRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `QueryRef` function.
```typescript
listMySubscriptions(dc: DataConnect, options?: ExecuteQueryOptions): QueryPromise<ListMySubscriptionsData, undefined>;

interface ListMySubscriptionsRef {
  ...
  (dc: DataConnect): QueryRef<ListMySubscriptionsData, undefined>;
}
export const listMySubscriptionsRef: ListMySubscriptionsRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the listMySubscriptionsRef:
```typescript
const name = listMySubscriptionsRef.operationName;
console.log(name);
```

### Variables
The `ListMySubscriptions` query has no variables.
### Return Type
Recall that executing the `ListMySubscriptions` query returns a `QueryPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `ListMySubscriptionsData`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:
```typescript
export interface ListMySubscriptionsData {
  followerSubscriptions: ({
    targetType: string;
    targetId: UUIDString;
  })[];
}
```
### Using `ListMySubscriptions`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, listMySubscriptions } from '@dataconnect/generated';


// Call the `listMySubscriptions()` function to execute the query.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await listMySubscriptions();

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await listMySubscriptions(dataConnect);

console.log(data.followerSubscriptions);

// Or, you can use the `Promise` API.
listMySubscriptions().then((response) => {
  const data = response.data;
  console.log(data.followerSubscriptions);
});
```

### Using `ListMySubscriptions`'s `QueryRef` function

```typescript
import { getDataConnect, executeQuery } from 'firebase/data-connect';
import { connectorConfig, listMySubscriptionsRef } from '@dataconnect/generated';


// Call the `listMySubscriptionsRef()` function to get a reference to the query.
const ref = listMySubscriptionsRef();

// You can also pass in a `DataConnect` instance to the `QueryRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = listMySubscriptionsRef(dataConnect);

// Call `executeQuery()` on the reference to execute the query.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeQuery(ref);

console.log(data.followerSubscriptions);

// Or, you can use the `Promise` API.
executeQuery(ref).then((response) => {
  const data = response.data;
  console.log(data.followerSubscriptions);
});
```

# Mutations

There are two ways to execute a Data Connect Mutation using the generated Web SDK:
- Using a Mutation Reference function, which returns a `MutationRef`
  - The `MutationRef` can be used as an argument to `executeMutation()`, which will execute the Mutation and return a `MutationPromise`
- Using an action shortcut function, which returns a `MutationPromise`
  - Calling the action shortcut function will execute the Mutation and return a `MutationPromise`

The following is true for both the action shortcut function and the `MutationRef` function:
- The `MutationPromise` returned will resolve to the result of the Mutation once it has finished executing
- If the Mutation accepts arguments, both the action shortcut function and the `MutationRef` function accept a single argument: an object that contains all the required variables (and the optional variables) for the Mutation
- Both functions can be called with or without passing in a `DataConnect` instance as an argument. If no `DataConnect` argument is passed in, then the generated SDK will call `getDataConnect(connectorConfig)` behind the scenes for you.

Below are examples of how to use the `example` connector's generated functions to execute each mutation. You can also follow the examples from the [Data Connect documentation](https://firebase.google.com/docs/data-connect/web-sdk#using-mutations).

## CreateUser
You can execute the `CreateUser` mutation using the following action shortcut function, or by calling `executeMutation()` after calling the following `MutationRef` function, both of which are defined in [dataconnect-generated/index.d.ts](./index.d.ts):
```typescript
createUser(): MutationPromise<CreateUserData, undefined>;

interface CreateUserRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (): MutationRef<CreateUserData, undefined>;
}
export const createUserRef: CreateUserRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `MutationRef` function.
```typescript
createUser(dc: DataConnect): MutationPromise<CreateUserData, undefined>;

interface CreateUserRef {
  ...
  (dc: DataConnect): MutationRef<CreateUserData, undefined>;
}
export const createUserRef: CreateUserRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the createUserRef:
```typescript
const name = createUserRef.operationName;
console.log(name);
```

### Variables
The `CreateUser` mutation has no variables.
### Return Type
Recall that executing the `CreateUser` mutation returns a `MutationPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `CreateUserData`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:
```typescript
export interface CreateUserData {
  user_insert: User_Key;
}
```
### Using `CreateUser`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, createUser } from '@dataconnect/generated';


// Call the `createUser()` function to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await createUser();

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await createUser(dataConnect);

console.log(data.user_insert);

// Or, you can use the `Promise` API.
createUser().then((response) => {
  const data = response.data;
  console.log(data.user_insert);
});
```

### Using `CreateUser`'s `MutationRef` function

```typescript
import { getDataConnect, executeMutation } from 'firebase/data-connect';
import { connectorConfig, createUserRef } from '@dataconnect/generated';


// Call the `createUserRef()` function to get a reference to the mutation.
const ref = createUserRef();

// You can also pass in a `DataConnect` instance to the `MutationRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = createUserRef(dataConnect);

// Call `executeMutation()` on the reference to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeMutation(ref);

console.log(data.user_insert);

// Or, you can use the `Promise` API.
executeMutation(ref).then((response) => {
  const data = response.data;
  console.log(data.user_insert);
});
```

## UpdateUser
You can execute the `UpdateUser` mutation using the following action shortcut function, or by calling `executeMutation()` after calling the following `MutationRef` function, both of which are defined in [dataconnect-generated/index.d.ts](./index.d.ts):
```typescript
updateUser(): MutationPromise<UpdateUserData, undefined>;

interface UpdateUserRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (): MutationRef<UpdateUserData, undefined>;
}
export const updateUserRef: UpdateUserRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `MutationRef` function.
```typescript
updateUser(dc: DataConnect): MutationPromise<UpdateUserData, undefined>;

interface UpdateUserRef {
  ...
  (dc: DataConnect): MutationRef<UpdateUserData, undefined>;
}
export const updateUserRef: UpdateUserRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the updateUserRef:
```typescript
const name = updateUserRef.operationName;
console.log(name);
```

### Variables
The `UpdateUser` mutation has no variables.
### Return Type
Recall that executing the `UpdateUser` mutation returns a `MutationPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `UpdateUserData`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:
```typescript
export interface UpdateUserData {
  user_update?: User_Key | null;
}
```
### Using `UpdateUser`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, updateUser } from '@dataconnect/generated';


// Call the `updateUser()` function to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await updateUser();

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await updateUser(dataConnect);

console.log(data.user_update);

// Or, you can use the `Promise` API.
updateUser().then((response) => {
  const data = response.data;
  console.log(data.user_update);
});
```

### Using `UpdateUser`'s `MutationRef` function

```typescript
import { getDataConnect, executeMutation } from 'firebase/data-connect';
import { connectorConfig, updateUserRef } from '@dataconnect/generated';


// Call the `updateUserRef()` function to get a reference to the mutation.
const ref = updateUserRef();

// You can also pass in a `DataConnect` instance to the `MutationRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = updateUserRef(dataConnect);

// Call `executeMutation()` on the reference to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeMutation(ref);

console.log(data.user_update);

// Or, you can use the `Promise` API.
executeMutation(ref).then((response) => {
  const data = response.data;
  console.log(data.user_update);
});
```

## DeleteUser
You can execute the `DeleteUser` mutation using the following action shortcut function, or by calling `executeMutation()` after calling the following `MutationRef` function, both of which are defined in [dataconnect-generated/index.d.ts](./index.d.ts):
```typescript
deleteUser(): MutationPromise<DeleteUserData, undefined>;

interface DeleteUserRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (): MutationRef<DeleteUserData, undefined>;
}
export const deleteUserRef: DeleteUserRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `MutationRef` function.
```typescript
deleteUser(dc: DataConnect): MutationPromise<DeleteUserData, undefined>;

interface DeleteUserRef {
  ...
  (dc: DataConnect): MutationRef<DeleteUserData, undefined>;
}
export const deleteUserRef: DeleteUserRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the deleteUserRef:
```typescript
const name = deleteUserRef.operationName;
console.log(name);
```

### Variables
The `DeleteUser` mutation has no variables.
### Return Type
Recall that executing the `DeleteUser` mutation returns a `MutationPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `DeleteUserData`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:
```typescript
export interface DeleteUserData {
  user_delete?: User_Key | null;
}
```
### Using `DeleteUser`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, deleteUser } from '@dataconnect/generated';


// Call the `deleteUser()` function to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await deleteUser();

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await deleteUser(dataConnect);

console.log(data.user_delete);

// Or, you can use the `Promise` API.
deleteUser().then((response) => {
  const data = response.data;
  console.log(data.user_delete);
});
```

### Using `DeleteUser`'s `MutationRef` function

```typescript
import { getDataConnect, executeMutation } from 'firebase/data-connect';
import { connectorConfig, deleteUserRef } from '@dataconnect/generated';


// Call the `deleteUserRef()` function to get a reference to the mutation.
const ref = deleteUserRef();

// You can also pass in a `DataConnect` instance to the `MutationRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = deleteUserRef(dataConnect);

// Call `executeMutation()` on the reference to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeMutation(ref);

console.log(data.user_delete);

// Or, you can use the `Promise` API.
executeMutation(ref).then((response) => {
  const data = response.data;
  console.log(data.user_delete);
});
```

## CreateDepartment
You can execute the `CreateDepartment` mutation using the following action shortcut function, or by calling `executeMutation()` after calling the following `MutationRef` function, both of which are defined in [dataconnect-generated/index.d.ts](./index.d.ts):
```typescript
createDepartment(): MutationPromise<CreateDepartmentData, undefined>;

interface CreateDepartmentRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (): MutationRef<CreateDepartmentData, undefined>;
}
export const createDepartmentRef: CreateDepartmentRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `MutationRef` function.
```typescript
createDepartment(dc: DataConnect): MutationPromise<CreateDepartmentData, undefined>;

interface CreateDepartmentRef {
  ...
  (dc: DataConnect): MutationRef<CreateDepartmentData, undefined>;
}
export const createDepartmentRef: CreateDepartmentRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the createDepartmentRef:
```typescript
const name = createDepartmentRef.operationName;
console.log(name);
```

### Variables
The `CreateDepartment` mutation has no variables.
### Return Type
Recall that executing the `CreateDepartment` mutation returns a `MutationPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `CreateDepartmentData`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:
```typescript
export interface CreateDepartmentData {
  department_insert: Department_Key;
}
```
### Using `CreateDepartment`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, createDepartment } from '@dataconnect/generated';


// Call the `createDepartment()` function to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await createDepartment();

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await createDepartment(dataConnect);

console.log(data.department_insert);

// Or, you can use the `Promise` API.
createDepartment().then((response) => {
  const data = response.data;
  console.log(data.department_insert);
});
```

### Using `CreateDepartment`'s `MutationRef` function

```typescript
import { getDataConnect, executeMutation } from 'firebase/data-connect';
import { connectorConfig, createDepartmentRef } from '@dataconnect/generated';


// Call the `createDepartmentRef()` function to get a reference to the mutation.
const ref = createDepartmentRef();

// You can also pass in a `DataConnect` instance to the `MutationRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = createDepartmentRef(dataConnect);

// Call `executeMutation()` on the reference to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeMutation(ref);

console.log(data.department_insert);

// Or, you can use the `Promise` API.
executeMutation(ref).then((response) => {
  const data = response.data;
  console.log(data.department_insert);
});
```

## UpdateDepartment
You can execute the `UpdateDepartment` mutation using the following action shortcut function, or by calling `executeMutation()` after calling the following `MutationRef` function, both of which are defined in [dataconnect-generated/index.d.ts](./index.d.ts):
```typescript
updateDepartment(vars: UpdateDepartmentVariables): MutationPromise<UpdateDepartmentData, UpdateDepartmentVariables>;

interface UpdateDepartmentRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (vars: UpdateDepartmentVariables): MutationRef<UpdateDepartmentData, UpdateDepartmentVariables>;
}
export const updateDepartmentRef: UpdateDepartmentRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `MutationRef` function.
```typescript
updateDepartment(dc: DataConnect, vars: UpdateDepartmentVariables): MutationPromise<UpdateDepartmentData, UpdateDepartmentVariables>;

interface UpdateDepartmentRef {
  ...
  (dc: DataConnect, vars: UpdateDepartmentVariables): MutationRef<UpdateDepartmentData, UpdateDepartmentVariables>;
}
export const updateDepartmentRef: UpdateDepartmentRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the updateDepartmentRef:
```typescript
const name = updateDepartmentRef.operationName;
console.log(name);
```

### Variables
The `UpdateDepartment` mutation requires an argument of type `UpdateDepartmentVariables`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:

```typescript
export interface UpdateDepartmentVariables {
  id: UUIDString;
  email: string;
}
```
### Return Type
Recall that executing the `UpdateDepartment` mutation returns a `MutationPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `UpdateDepartmentData`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:
```typescript
export interface UpdateDepartmentData {
  department_update?: Department_Key | null;
}
```
### Using `UpdateDepartment`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, updateDepartment, UpdateDepartmentVariables } from '@dataconnect/generated';

// The `UpdateDepartment` mutation requires an argument of type `UpdateDepartmentVariables`:
const updateDepartmentVars: UpdateDepartmentVariables = {
  id: ..., 
  email: ..., 
};

// Call the `updateDepartment()` function to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await updateDepartment(updateDepartmentVars);
// Variables can be defined inline as well.
const { data } = await updateDepartment({ id: ..., email: ..., });

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await updateDepartment(dataConnect, updateDepartmentVars);

console.log(data.department_update);

// Or, you can use the `Promise` API.
updateDepartment(updateDepartmentVars).then((response) => {
  const data = response.data;
  console.log(data.department_update);
});
```

### Using `UpdateDepartment`'s `MutationRef` function

```typescript
import { getDataConnect, executeMutation } from 'firebase/data-connect';
import { connectorConfig, updateDepartmentRef, UpdateDepartmentVariables } from '@dataconnect/generated';

// The `UpdateDepartment` mutation requires an argument of type `UpdateDepartmentVariables`:
const updateDepartmentVars: UpdateDepartmentVariables = {
  id: ..., 
  email: ..., 
};

// Call the `updateDepartmentRef()` function to get a reference to the mutation.
const ref = updateDepartmentRef(updateDepartmentVars);
// Variables can be defined inline as well.
const ref = updateDepartmentRef({ id: ..., email: ..., });

// You can also pass in a `DataConnect` instance to the `MutationRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = updateDepartmentRef(dataConnect, updateDepartmentVars);

// Call `executeMutation()` on the reference to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeMutation(ref);

console.log(data.department_update);

// Or, you can use the `Promise` API.
executeMutation(ref).then((response) => {
  const data = response.data;
  console.log(data.department_update);
});
```

## DeleteDepartment
You can execute the `DeleteDepartment` mutation using the following action shortcut function, or by calling `executeMutation()` after calling the following `MutationRef` function, both of which are defined in [dataconnect-generated/index.d.ts](./index.d.ts):
```typescript
deleteDepartment(vars: DeleteDepartmentVariables): MutationPromise<DeleteDepartmentData, DeleteDepartmentVariables>;

interface DeleteDepartmentRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (vars: DeleteDepartmentVariables): MutationRef<DeleteDepartmentData, DeleteDepartmentVariables>;
}
export const deleteDepartmentRef: DeleteDepartmentRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `MutationRef` function.
```typescript
deleteDepartment(dc: DataConnect, vars: DeleteDepartmentVariables): MutationPromise<DeleteDepartmentData, DeleteDepartmentVariables>;

interface DeleteDepartmentRef {
  ...
  (dc: DataConnect, vars: DeleteDepartmentVariables): MutationRef<DeleteDepartmentData, DeleteDepartmentVariables>;
}
export const deleteDepartmentRef: DeleteDepartmentRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the deleteDepartmentRef:
```typescript
const name = deleteDepartmentRef.operationName;
console.log(name);
```

### Variables
The `DeleteDepartment` mutation requires an argument of type `DeleteDepartmentVariables`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:

```typescript
export interface DeleteDepartmentVariables {
  id: UUIDString;
}
```
### Return Type
Recall that executing the `DeleteDepartment` mutation returns a `MutationPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `DeleteDepartmentData`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:
```typescript
export interface DeleteDepartmentData {
  department_delete?: Department_Key | null;
}
```
### Using `DeleteDepartment`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, deleteDepartment, DeleteDepartmentVariables } from '@dataconnect/generated';

// The `DeleteDepartment` mutation requires an argument of type `DeleteDepartmentVariables`:
const deleteDepartmentVars: DeleteDepartmentVariables = {
  id: ..., 
};

// Call the `deleteDepartment()` function to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await deleteDepartment(deleteDepartmentVars);
// Variables can be defined inline as well.
const { data } = await deleteDepartment({ id: ..., });

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await deleteDepartment(dataConnect, deleteDepartmentVars);

console.log(data.department_delete);

// Or, you can use the `Promise` API.
deleteDepartment(deleteDepartmentVars).then((response) => {
  const data = response.data;
  console.log(data.department_delete);
});
```

### Using `DeleteDepartment`'s `MutationRef` function

```typescript
import { getDataConnect, executeMutation } from 'firebase/data-connect';
import { connectorConfig, deleteDepartmentRef, DeleteDepartmentVariables } from '@dataconnect/generated';

// The `DeleteDepartment` mutation requires an argument of type `DeleteDepartmentVariables`:
const deleteDepartmentVars: DeleteDepartmentVariables = {
  id: ..., 
};

// Call the `deleteDepartmentRef()` function to get a reference to the mutation.
const ref = deleteDepartmentRef(deleteDepartmentVars);
// Variables can be defined inline as well.
const ref = deleteDepartmentRef({ id: ..., });

// You can also pass in a `DataConnect` instance to the `MutationRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = deleteDepartmentRef(dataConnect, deleteDepartmentVars);

// Call `executeMutation()` on the reference to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeMutation(ref);

console.log(data.department_delete);

// Or, you can use the `Promise` API.
executeMutation(ref).then((response) => {
  const data = response.data;
  console.log(data.department_delete);
});
```

## CreateOfficial
You can execute the `CreateOfficial` mutation using the following action shortcut function, or by calling `executeMutation()` after calling the following `MutationRef` function, both of which are defined in [dataconnect-generated/index.d.ts](./index.d.ts):
```typescript
createOfficial(vars: CreateOfficialVariables): MutationPromise<CreateOfficialData, CreateOfficialVariables>;

interface CreateOfficialRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (vars: CreateOfficialVariables): MutationRef<CreateOfficialData, CreateOfficialVariables>;
}
export const createOfficialRef: CreateOfficialRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `MutationRef` function.
```typescript
createOfficial(dc: DataConnect, vars: CreateOfficialVariables): MutationPromise<CreateOfficialData, CreateOfficialVariables>;

interface CreateOfficialRef {
  ...
  (dc: DataConnect, vars: CreateOfficialVariables): MutationRef<CreateOfficialData, CreateOfficialVariables>;
}
export const createOfficialRef: CreateOfficialRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the createOfficialRef:
```typescript
const name = createOfficialRef.operationName;
console.log(name);
```

### Variables
The `CreateOfficial` mutation requires an argument of type `CreateOfficialVariables`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:

```typescript
export interface CreateOfficialVariables {
  name: string;
  title: string;
  deptId: UUIDString;
}
```
### Return Type
Recall that executing the `CreateOfficial` mutation returns a `MutationPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `CreateOfficialData`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:
```typescript
export interface CreateOfficialData {
  official_insert: Official_Key;
}
```
### Using `CreateOfficial`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, createOfficial, CreateOfficialVariables } from '@dataconnect/generated';

// The `CreateOfficial` mutation requires an argument of type `CreateOfficialVariables`:
const createOfficialVars: CreateOfficialVariables = {
  name: ..., 
  title: ..., 
  deptId: ..., 
};

// Call the `createOfficial()` function to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await createOfficial(createOfficialVars);
// Variables can be defined inline as well.
const { data } = await createOfficial({ name: ..., title: ..., deptId: ..., });

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await createOfficial(dataConnect, createOfficialVars);

console.log(data.official_insert);

// Or, you can use the `Promise` API.
createOfficial(createOfficialVars).then((response) => {
  const data = response.data;
  console.log(data.official_insert);
});
```

### Using `CreateOfficial`'s `MutationRef` function

```typescript
import { getDataConnect, executeMutation } from 'firebase/data-connect';
import { connectorConfig, createOfficialRef, CreateOfficialVariables } from '@dataconnect/generated';

// The `CreateOfficial` mutation requires an argument of type `CreateOfficialVariables`:
const createOfficialVars: CreateOfficialVariables = {
  name: ..., 
  title: ..., 
  deptId: ..., 
};

// Call the `createOfficialRef()` function to get a reference to the mutation.
const ref = createOfficialRef(createOfficialVars);
// Variables can be defined inline as well.
const ref = createOfficialRef({ name: ..., title: ..., deptId: ..., });

// You can also pass in a `DataConnect` instance to the `MutationRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = createOfficialRef(dataConnect, createOfficialVars);

// Call `executeMutation()` on the reference to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeMutation(ref);

console.log(data.official_insert);

// Or, you can use the `Promise` API.
executeMutation(ref).then((response) => {
  const data = response.data;
  console.log(data.official_insert);
});
```

## UpdateOfficial
You can execute the `UpdateOfficial` mutation using the following action shortcut function, or by calling `executeMutation()` after calling the following `MutationRef` function, both of which are defined in [dataconnect-generated/index.d.ts](./index.d.ts):
```typescript
updateOfficial(vars: UpdateOfficialVariables): MutationPromise<UpdateOfficialData, UpdateOfficialVariables>;

interface UpdateOfficialRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (vars: UpdateOfficialVariables): MutationRef<UpdateOfficialData, UpdateOfficialVariables>;
}
export const updateOfficialRef: UpdateOfficialRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `MutationRef` function.
```typescript
updateOfficial(dc: DataConnect, vars: UpdateOfficialVariables): MutationPromise<UpdateOfficialData, UpdateOfficialVariables>;

interface UpdateOfficialRef {
  ...
  (dc: DataConnect, vars: UpdateOfficialVariables): MutationRef<UpdateOfficialData, UpdateOfficialVariables>;
}
export const updateOfficialRef: UpdateOfficialRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the updateOfficialRef:
```typescript
const name = updateOfficialRef.operationName;
console.log(name);
```

### Variables
The `UpdateOfficial` mutation requires an argument of type `UpdateOfficialVariables`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:

```typescript
export interface UpdateOfficialVariables {
  id: UUIDString;
  title: string;
}
```
### Return Type
Recall that executing the `UpdateOfficial` mutation returns a `MutationPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `UpdateOfficialData`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:
```typescript
export interface UpdateOfficialData {
  official_update?: Official_Key | null;
}
```
### Using `UpdateOfficial`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, updateOfficial, UpdateOfficialVariables } from '@dataconnect/generated';

// The `UpdateOfficial` mutation requires an argument of type `UpdateOfficialVariables`:
const updateOfficialVars: UpdateOfficialVariables = {
  id: ..., 
  title: ..., 
};

// Call the `updateOfficial()` function to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await updateOfficial(updateOfficialVars);
// Variables can be defined inline as well.
const { data } = await updateOfficial({ id: ..., title: ..., });

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await updateOfficial(dataConnect, updateOfficialVars);

console.log(data.official_update);

// Or, you can use the `Promise` API.
updateOfficial(updateOfficialVars).then((response) => {
  const data = response.data;
  console.log(data.official_update);
});
```

### Using `UpdateOfficial`'s `MutationRef` function

```typescript
import { getDataConnect, executeMutation } from 'firebase/data-connect';
import { connectorConfig, updateOfficialRef, UpdateOfficialVariables } from '@dataconnect/generated';

// The `UpdateOfficial` mutation requires an argument of type `UpdateOfficialVariables`:
const updateOfficialVars: UpdateOfficialVariables = {
  id: ..., 
  title: ..., 
};

// Call the `updateOfficialRef()` function to get a reference to the mutation.
const ref = updateOfficialRef(updateOfficialVars);
// Variables can be defined inline as well.
const ref = updateOfficialRef({ id: ..., title: ..., });

// You can also pass in a `DataConnect` instance to the `MutationRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = updateOfficialRef(dataConnect, updateOfficialVars);

// Call `executeMutation()` on the reference to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeMutation(ref);

console.log(data.official_update);

// Or, you can use the `Promise` API.
executeMutation(ref).then((response) => {
  const data = response.data;
  console.log(data.official_update);
});
```

## DeleteOfficial
You can execute the `DeleteOfficial` mutation using the following action shortcut function, or by calling `executeMutation()` after calling the following `MutationRef` function, both of which are defined in [dataconnect-generated/index.d.ts](./index.d.ts):
```typescript
deleteOfficial(vars: DeleteOfficialVariables): MutationPromise<DeleteOfficialData, DeleteOfficialVariables>;

interface DeleteOfficialRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (vars: DeleteOfficialVariables): MutationRef<DeleteOfficialData, DeleteOfficialVariables>;
}
export const deleteOfficialRef: DeleteOfficialRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `MutationRef` function.
```typescript
deleteOfficial(dc: DataConnect, vars: DeleteOfficialVariables): MutationPromise<DeleteOfficialData, DeleteOfficialVariables>;

interface DeleteOfficialRef {
  ...
  (dc: DataConnect, vars: DeleteOfficialVariables): MutationRef<DeleteOfficialData, DeleteOfficialVariables>;
}
export const deleteOfficialRef: DeleteOfficialRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the deleteOfficialRef:
```typescript
const name = deleteOfficialRef.operationName;
console.log(name);
```

### Variables
The `DeleteOfficial` mutation requires an argument of type `DeleteOfficialVariables`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:

```typescript
export interface DeleteOfficialVariables {
  id: UUIDString;
}
```
### Return Type
Recall that executing the `DeleteOfficial` mutation returns a `MutationPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `DeleteOfficialData`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:
```typescript
export interface DeleteOfficialData {
  official_delete?: Official_Key | null;
}
```
### Using `DeleteOfficial`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, deleteOfficial, DeleteOfficialVariables } from '@dataconnect/generated';

// The `DeleteOfficial` mutation requires an argument of type `DeleteOfficialVariables`:
const deleteOfficialVars: DeleteOfficialVariables = {
  id: ..., 
};

// Call the `deleteOfficial()` function to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await deleteOfficial(deleteOfficialVars);
// Variables can be defined inline as well.
const { data } = await deleteOfficial({ id: ..., });

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await deleteOfficial(dataConnect, deleteOfficialVars);

console.log(data.official_delete);

// Or, you can use the `Promise` API.
deleteOfficial(deleteOfficialVars).then((response) => {
  const data = response.data;
  console.log(data.official_delete);
});
```

### Using `DeleteOfficial`'s `MutationRef` function

```typescript
import { getDataConnect, executeMutation } from 'firebase/data-connect';
import { connectorConfig, deleteOfficialRef, DeleteOfficialVariables } from '@dataconnect/generated';

// The `DeleteOfficial` mutation requires an argument of type `DeleteOfficialVariables`:
const deleteOfficialVars: DeleteOfficialVariables = {
  id: ..., 
};

// Call the `deleteOfficialRef()` function to get a reference to the mutation.
const ref = deleteOfficialRef(deleteOfficialVars);
// Variables can be defined inline as well.
const ref = deleteOfficialRef({ id: ..., });

// You can also pass in a `DataConnect` instance to the `MutationRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = deleteOfficialRef(dataConnect, deleteOfficialVars);

// Call `executeMutation()` on the reference to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeMutation(ref);

console.log(data.official_delete);

// Or, you can use the `Promise` API.
executeMutation(ref).then((response) => {
  const data = response.data;
  console.log(data.official_delete);
});
```

## CreateReport
You can execute the `CreateReport` mutation using the following action shortcut function, or by calling `executeMutation()` after calling the following `MutationRef` function, both of which are defined in [dataconnect-generated/index.d.ts](./index.d.ts):
```typescript
createReport(vars: CreateReportVariables): MutationPromise<CreateReportData, CreateReportVariables>;

interface CreateReportRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (vars: CreateReportVariables): MutationRef<CreateReportData, CreateReportVariables>;
}
export const createReportRef: CreateReportRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `MutationRef` function.
```typescript
createReport(dc: DataConnect, vars: CreateReportVariables): MutationPromise<CreateReportData, CreateReportVariables>;

interface CreateReportRef {
  ...
  (dc: DataConnect, vars: CreateReportVariables): MutationRef<CreateReportData, CreateReportVariables>;
}
export const createReportRef: CreateReportRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the createReportRef:
```typescript
const name = createReportRef.operationName;
console.log(name);
```

### Variables
The `CreateReport` mutation requires an argument of type `CreateReportVariables`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:

```typescript
export interface CreateReportVariables {
  title: string;
  desc: string;
  cat: string;
  geo: string;
}
```
### Return Type
Recall that executing the `CreateReport` mutation returns a `MutationPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `CreateReportData`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:
```typescript
export interface CreateReportData {
  report_insert: Report_Key;
}
```
### Using `CreateReport`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, createReport, CreateReportVariables } from '@dataconnect/generated';

// The `CreateReport` mutation requires an argument of type `CreateReportVariables`:
const createReportVars: CreateReportVariables = {
  title: ..., 
  desc: ..., 
  cat: ..., 
  geo: ..., 
};

// Call the `createReport()` function to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await createReport(createReportVars);
// Variables can be defined inline as well.
const { data } = await createReport({ title: ..., desc: ..., cat: ..., geo: ..., });

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await createReport(dataConnect, createReportVars);

console.log(data.report_insert);

// Or, you can use the `Promise` API.
createReport(createReportVars).then((response) => {
  const data = response.data;
  console.log(data.report_insert);
});
```

### Using `CreateReport`'s `MutationRef` function

```typescript
import { getDataConnect, executeMutation } from 'firebase/data-connect';
import { connectorConfig, createReportRef, CreateReportVariables } from '@dataconnect/generated';

// The `CreateReport` mutation requires an argument of type `CreateReportVariables`:
const createReportVars: CreateReportVariables = {
  title: ..., 
  desc: ..., 
  cat: ..., 
  geo: ..., 
};

// Call the `createReportRef()` function to get a reference to the mutation.
const ref = createReportRef(createReportVars);
// Variables can be defined inline as well.
const ref = createReportRef({ title: ..., desc: ..., cat: ..., geo: ..., });

// You can also pass in a `DataConnect` instance to the `MutationRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = createReportRef(dataConnect, createReportVars);

// Call `executeMutation()` on the reference to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeMutation(ref);

console.log(data.report_insert);

// Or, you can use the `Promise` API.
executeMutation(ref).then((response) => {
  const data = response.data;
  console.log(data.report_insert);
});
```

## UpdateReportStatus
You can execute the `UpdateReportStatus` mutation using the following action shortcut function, or by calling `executeMutation()` after calling the following `MutationRef` function, both of which are defined in [dataconnect-generated/index.d.ts](./index.d.ts):
```typescript
updateReportStatus(vars: UpdateReportStatusVariables): MutationPromise<UpdateReportStatusData, UpdateReportStatusVariables>;

interface UpdateReportStatusRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (vars: UpdateReportStatusVariables): MutationRef<UpdateReportStatusData, UpdateReportStatusVariables>;
}
export const updateReportStatusRef: UpdateReportStatusRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `MutationRef` function.
```typescript
updateReportStatus(dc: DataConnect, vars: UpdateReportStatusVariables): MutationPromise<UpdateReportStatusData, UpdateReportStatusVariables>;

interface UpdateReportStatusRef {
  ...
  (dc: DataConnect, vars: UpdateReportStatusVariables): MutationRef<UpdateReportStatusData, UpdateReportStatusVariables>;
}
export const updateReportStatusRef: UpdateReportStatusRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the updateReportStatusRef:
```typescript
const name = updateReportStatusRef.operationName;
console.log(name);
```

### Variables
The `UpdateReportStatus` mutation requires an argument of type `UpdateReportStatusVariables`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:

```typescript
export interface UpdateReportStatusVariables {
  id: UUIDString;
  status: string;
}
```
### Return Type
Recall that executing the `UpdateReportStatus` mutation returns a `MutationPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `UpdateReportStatusData`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:
```typescript
export interface UpdateReportStatusData {
  report_update?: Report_Key | null;
}
```
### Using `UpdateReportStatus`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, updateReportStatus, UpdateReportStatusVariables } from '@dataconnect/generated';

// The `UpdateReportStatus` mutation requires an argument of type `UpdateReportStatusVariables`:
const updateReportStatusVars: UpdateReportStatusVariables = {
  id: ..., 
  status: ..., 
};

// Call the `updateReportStatus()` function to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await updateReportStatus(updateReportStatusVars);
// Variables can be defined inline as well.
const { data } = await updateReportStatus({ id: ..., status: ..., });

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await updateReportStatus(dataConnect, updateReportStatusVars);

console.log(data.report_update);

// Or, you can use the `Promise` API.
updateReportStatus(updateReportStatusVars).then((response) => {
  const data = response.data;
  console.log(data.report_update);
});
```

### Using `UpdateReportStatus`'s `MutationRef` function

```typescript
import { getDataConnect, executeMutation } from 'firebase/data-connect';
import { connectorConfig, updateReportStatusRef, UpdateReportStatusVariables } from '@dataconnect/generated';

// The `UpdateReportStatus` mutation requires an argument of type `UpdateReportStatusVariables`:
const updateReportStatusVars: UpdateReportStatusVariables = {
  id: ..., 
  status: ..., 
};

// Call the `updateReportStatusRef()` function to get a reference to the mutation.
const ref = updateReportStatusRef(updateReportStatusVars);
// Variables can be defined inline as well.
const ref = updateReportStatusRef({ id: ..., status: ..., });

// You can also pass in a `DataConnect` instance to the `MutationRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = updateReportStatusRef(dataConnect, updateReportStatusVars);

// Call `executeMutation()` on the reference to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeMutation(ref);

console.log(data.report_update);

// Or, you can use the `Promise` API.
executeMutation(ref).then((response) => {
  const data = response.data;
  console.log(data.report_update);
});
```

## DeleteReport
You can execute the `DeleteReport` mutation using the following action shortcut function, or by calling `executeMutation()` after calling the following `MutationRef` function, both of which are defined in [dataconnect-generated/index.d.ts](./index.d.ts):
```typescript
deleteReport(vars: DeleteReportVariables): MutationPromise<DeleteReportData, DeleteReportVariables>;

interface DeleteReportRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (vars: DeleteReportVariables): MutationRef<DeleteReportData, DeleteReportVariables>;
}
export const deleteReportRef: DeleteReportRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `MutationRef` function.
```typescript
deleteReport(dc: DataConnect, vars: DeleteReportVariables): MutationPromise<DeleteReportData, DeleteReportVariables>;

interface DeleteReportRef {
  ...
  (dc: DataConnect, vars: DeleteReportVariables): MutationRef<DeleteReportData, DeleteReportVariables>;
}
export const deleteReportRef: DeleteReportRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the deleteReportRef:
```typescript
const name = deleteReportRef.operationName;
console.log(name);
```

### Variables
The `DeleteReport` mutation requires an argument of type `DeleteReportVariables`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:

```typescript
export interface DeleteReportVariables {
  id: UUIDString;
}
```
### Return Type
Recall that executing the `DeleteReport` mutation returns a `MutationPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `DeleteReportData`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:
```typescript
export interface DeleteReportData {
  report_delete?: Report_Key | null;
}
```
### Using `DeleteReport`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, deleteReport, DeleteReportVariables } from '@dataconnect/generated';

// The `DeleteReport` mutation requires an argument of type `DeleteReportVariables`:
const deleteReportVars: DeleteReportVariables = {
  id: ..., 
};

// Call the `deleteReport()` function to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await deleteReport(deleteReportVars);
// Variables can be defined inline as well.
const { data } = await deleteReport({ id: ..., });

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await deleteReport(dataConnect, deleteReportVars);

console.log(data.report_delete);

// Or, you can use the `Promise` API.
deleteReport(deleteReportVars).then((response) => {
  const data = response.data;
  console.log(data.report_delete);
});
```

### Using `DeleteReport`'s `MutationRef` function

```typescript
import { getDataConnect, executeMutation } from 'firebase/data-connect';
import { connectorConfig, deleteReportRef, DeleteReportVariables } from '@dataconnect/generated';

// The `DeleteReport` mutation requires an argument of type `DeleteReportVariables`:
const deleteReportVars: DeleteReportVariables = {
  id: ..., 
};

// Call the `deleteReportRef()` function to get a reference to the mutation.
const ref = deleteReportRef(deleteReportVars);
// Variables can be defined inline as well.
const ref = deleteReportRef({ id: ..., });

// You can also pass in a `DataConnect` instance to the `MutationRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = deleteReportRef(dataConnect, deleteReportVars);

// Call `executeMutation()` on the reference to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeMutation(ref);

console.log(data.report_delete);

// Or, you can use the `Promise` API.
executeMutation(ref).then((response) => {
  const data = response.data;
  console.log(data.report_delete);
});
```

## CreateSubscription
You can execute the `CreateSubscription` mutation using the following action shortcut function, or by calling `executeMutation()` after calling the following `MutationRef` function, both of which are defined in [dataconnect-generated/index.d.ts](./index.d.ts):
```typescript
createSubscription(vars: CreateSubscriptionVariables): MutationPromise<CreateSubscriptionData, CreateSubscriptionVariables>;

interface CreateSubscriptionRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (vars: CreateSubscriptionVariables): MutationRef<CreateSubscriptionData, CreateSubscriptionVariables>;
}
export const createSubscriptionRef: CreateSubscriptionRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `MutationRef` function.
```typescript
createSubscription(dc: DataConnect, vars: CreateSubscriptionVariables): MutationPromise<CreateSubscriptionData, CreateSubscriptionVariables>;

interface CreateSubscriptionRef {
  ...
  (dc: DataConnect, vars: CreateSubscriptionVariables): MutationRef<CreateSubscriptionData, CreateSubscriptionVariables>;
}
export const createSubscriptionRef: CreateSubscriptionRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the createSubscriptionRef:
```typescript
const name = createSubscriptionRef.operationName;
console.log(name);
```

### Variables
The `CreateSubscription` mutation requires an argument of type `CreateSubscriptionVariables`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:

```typescript
export interface CreateSubscriptionVariables {
  type: string;
  targetId: UUIDString;
}
```
### Return Type
Recall that executing the `CreateSubscription` mutation returns a `MutationPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `CreateSubscriptionData`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:
```typescript
export interface CreateSubscriptionData {
  followerSubscription_insert: FollowerSubscription_Key;
}
```
### Using `CreateSubscription`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, createSubscription, CreateSubscriptionVariables } from '@dataconnect/generated';

// The `CreateSubscription` mutation requires an argument of type `CreateSubscriptionVariables`:
const createSubscriptionVars: CreateSubscriptionVariables = {
  type: ..., 
  targetId: ..., 
};

// Call the `createSubscription()` function to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await createSubscription(createSubscriptionVars);
// Variables can be defined inline as well.
const { data } = await createSubscription({ type: ..., targetId: ..., });

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await createSubscription(dataConnect, createSubscriptionVars);

console.log(data.followerSubscription_insert);

// Or, you can use the `Promise` API.
createSubscription(createSubscriptionVars).then((response) => {
  const data = response.data;
  console.log(data.followerSubscription_insert);
});
```

### Using `CreateSubscription`'s `MutationRef` function

```typescript
import { getDataConnect, executeMutation } from 'firebase/data-connect';
import { connectorConfig, createSubscriptionRef, CreateSubscriptionVariables } from '@dataconnect/generated';

// The `CreateSubscription` mutation requires an argument of type `CreateSubscriptionVariables`:
const createSubscriptionVars: CreateSubscriptionVariables = {
  type: ..., 
  targetId: ..., 
};

// Call the `createSubscriptionRef()` function to get a reference to the mutation.
const ref = createSubscriptionRef(createSubscriptionVars);
// Variables can be defined inline as well.
const ref = createSubscriptionRef({ type: ..., targetId: ..., });

// You can also pass in a `DataConnect` instance to the `MutationRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = createSubscriptionRef(dataConnect, createSubscriptionVars);

// Call `executeMutation()` on the reference to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeMutation(ref);

console.log(data.followerSubscription_insert);

// Or, you can use the `Promise` API.
executeMutation(ref).then((response) => {
  const data = response.data;
  console.log(data.followerSubscription_insert);
});
```

## DeleteSubscription
You can execute the `DeleteSubscription` mutation using the following action shortcut function, or by calling `executeMutation()` after calling the following `MutationRef` function, both of which are defined in [dataconnect-generated/index.d.ts](./index.d.ts):
```typescript
deleteSubscription(vars: DeleteSubscriptionVariables): MutationPromise<DeleteSubscriptionData, DeleteSubscriptionVariables>;

interface DeleteSubscriptionRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (vars: DeleteSubscriptionVariables): MutationRef<DeleteSubscriptionData, DeleteSubscriptionVariables>;
}
export const deleteSubscriptionRef: DeleteSubscriptionRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `MutationRef` function.
```typescript
deleteSubscription(dc: DataConnect, vars: DeleteSubscriptionVariables): MutationPromise<DeleteSubscriptionData, DeleteSubscriptionVariables>;

interface DeleteSubscriptionRef {
  ...
  (dc: DataConnect, vars: DeleteSubscriptionVariables): MutationRef<DeleteSubscriptionData, DeleteSubscriptionVariables>;
}
export const deleteSubscriptionRef: DeleteSubscriptionRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the deleteSubscriptionRef:
```typescript
const name = deleteSubscriptionRef.operationName;
console.log(name);
```

### Variables
The `DeleteSubscription` mutation requires an argument of type `DeleteSubscriptionVariables`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:

```typescript
export interface DeleteSubscriptionVariables {
  id: UUIDString;
}
```
### Return Type
Recall that executing the `DeleteSubscription` mutation returns a `MutationPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `DeleteSubscriptionData`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:
```typescript
export interface DeleteSubscriptionData {
  followerSubscription_delete?: FollowerSubscription_Key | null;
}
```
### Using `DeleteSubscription`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, deleteSubscription, DeleteSubscriptionVariables } from '@dataconnect/generated';

// The `DeleteSubscription` mutation requires an argument of type `DeleteSubscriptionVariables`:
const deleteSubscriptionVars: DeleteSubscriptionVariables = {
  id: ..., 
};

// Call the `deleteSubscription()` function to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await deleteSubscription(deleteSubscriptionVars);
// Variables can be defined inline as well.
const { data } = await deleteSubscription({ id: ..., });

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await deleteSubscription(dataConnect, deleteSubscriptionVars);

console.log(data.followerSubscription_delete);

// Or, you can use the `Promise` API.
deleteSubscription(deleteSubscriptionVars).then((response) => {
  const data = response.data;
  console.log(data.followerSubscription_delete);
});
```

### Using `DeleteSubscription`'s `MutationRef` function

```typescript
import { getDataConnect, executeMutation } from 'firebase/data-connect';
import { connectorConfig, deleteSubscriptionRef, DeleteSubscriptionVariables } from '@dataconnect/generated';

// The `DeleteSubscription` mutation requires an argument of type `DeleteSubscriptionVariables`:
const deleteSubscriptionVars: DeleteSubscriptionVariables = {
  id: ..., 
};

// Call the `deleteSubscriptionRef()` function to get a reference to the mutation.
const ref = deleteSubscriptionRef(deleteSubscriptionVars);
// Variables can be defined inline as well.
const ref = deleteSubscriptionRef({ id: ..., });

// You can also pass in a `DataConnect` instance to the `MutationRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = deleteSubscriptionRef(dataConnect, deleteSubscriptionVars);

// Call `executeMutation()` on the reference to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeMutation(ref);

console.log(data.followerSubscription_delete);

// Or, you can use the `Promise` API.
executeMutation(ref).then((response) => {
  const data = response.data;
  console.log(data.followerSubscription_delete);
});
```

