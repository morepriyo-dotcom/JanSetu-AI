import { ConnectorConfig, DataConnect, QueryRef, QueryPromise, ExecuteQueryOptions, MutationRef, MutationPromise, DataConnectSettings } from 'firebase/data-connect';

export const connectorConfig: ConnectorConfig;
export const dataConnectSettings: DataConnectSettings;

export type TimestampString = string;
export type UUIDString = string;
export type Int64String = string;
export type DateString = string;




export interface CreateDepartmentData {
  department_insert: Department_Key;
}

export interface CreateOfficialData {
  official_insert: Official_Key;
}

export interface CreateOfficialVariables {
  name: string;
  title: string;
  deptId: UUIDString;
}

export interface CreateReportData {
  report_insert: Report_Key;
}

export interface CreateReportVariables {
  title: string;
  desc: string;
  cat: string;
  geo: string;
}

export interface CreateSubscriptionData {
  followerSubscription_insert: FollowerSubscription_Key;
}

export interface CreateSubscriptionVariables {
  type: string;
  targetId: UUIDString;
}

export interface CreateUserData {
  user_insert: User_Key;
}

export interface DeleteDepartmentData {
  department_delete?: Department_Key | null;
}

export interface DeleteDepartmentVariables {
  id: UUIDString;
}

export interface DeleteOfficialData {
  official_delete?: Official_Key | null;
}

export interface DeleteOfficialVariables {
  id: UUIDString;
}

export interface DeleteReportData {
  report_delete?: Report_Key | null;
}

export interface DeleteReportVariables {
  id: UUIDString;
}

export interface DeleteSubscriptionData {
  followerSubscription_delete?: FollowerSubscription_Key | null;
}

export interface DeleteSubscriptionVariables {
  id: UUIDString;
}

export interface DeleteUserData {
  user_delete?: User_Key | null;
}

export interface Department_Key {
  id: UUIDString;
  __typename?: 'Department_Key';
}

export interface FollowerSubscription_Key {
  id: UUIDString;
  __typename?: 'FollowerSubscription_Key';
}

export interface GetCurrentUserData {
  user?: {
    id: UUIDString;
    name: string;
    email: string;
  } & User_Key;
}

export interface GetDepartmentData {
  department?: {
    name: string;
    contactEmail: string;
  };
}

export interface GetDepartmentVariables {
  id: UUIDString;
}

export interface GetOfficialData {
  official?: {
    name: string;
    positionTitle: string;
  };
}

export interface GetOfficialVariables {
  id: UUIDString;
}

export interface GetReportData {
  report?: {
    title: string;
    status: string;
    submitter: {
      name: string;
    };
  };
}

export interface GetReportVariables {
  id: UUIDString;
}

export interface ListDepartmentsData {
  departments: ({
    name: string;
    officeLocation?: string | null;
  })[];
}

export interface ListMySubscriptionsData {
  followerSubscriptions: ({
    targetType: string;
    targetId: UUIDString;
  })[];
}

export interface ListOfficialsData {
  officials: ({
    name: string;
    positionTitle: string;
  })[];
}

export interface ListUserReportsData {
  reports: ({
    title: string;
    status: string;
    createdAt: TimestampString;
  })[];
}

export interface ListUsersData {
  users: ({
    id: UUIDString;
    name: string;
    role: string;
  } & User_Key)[];
}

export interface Official_Key {
  id: UUIDString;
  __typename?: 'Official_Key';
}

export interface Report_Key {
  id: UUIDString;
  __typename?: 'Report_Key';
}

export interface UpdateDepartmentData {
  department_update?: Department_Key | null;
}

export interface UpdateDepartmentVariables {
  id: UUIDString;
  email: string;
}

export interface UpdateOfficialData {
  official_update?: Official_Key | null;
}

export interface UpdateOfficialVariables {
  id: UUIDString;
  title: string;
}

export interface UpdateReportStatusData {
  report_update?: Report_Key | null;
}

export interface UpdateReportStatusVariables {
  id: UUIDString;
  status: string;
}

export interface UpdateUserData {
  user_update?: User_Key | null;
}

export interface User_Key {
  id: UUIDString;
  __typename?: 'User_Key';
}

interface CreateUserRef {
  /* Allow users to create refs without passing in DataConnect */
  (): MutationRef<CreateUserData, undefined>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect): MutationRef<CreateUserData, undefined>;
  operationName: string;
}
export const createUserRef: CreateUserRef;

export function createUser(): MutationPromise<CreateUserData, undefined>;
export function createUser(dc: DataConnect): MutationPromise<CreateUserData, undefined>;

interface UpdateUserRef {
  /* Allow users to create refs without passing in DataConnect */
  (): MutationRef<UpdateUserData, undefined>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect): MutationRef<UpdateUserData, undefined>;
  operationName: string;
}
export const updateUserRef: UpdateUserRef;

export function updateUser(): MutationPromise<UpdateUserData, undefined>;
export function updateUser(dc: DataConnect): MutationPromise<UpdateUserData, undefined>;

interface DeleteUserRef {
  /* Allow users to create refs without passing in DataConnect */
  (): MutationRef<DeleteUserData, undefined>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect): MutationRef<DeleteUserData, undefined>;
  operationName: string;
}
export const deleteUserRef: DeleteUserRef;

export function deleteUser(): MutationPromise<DeleteUserData, undefined>;
export function deleteUser(dc: DataConnect): MutationPromise<DeleteUserData, undefined>;

interface GetCurrentUserRef {
  /* Allow users to create refs without passing in DataConnect */
  (): QueryRef<GetCurrentUserData, undefined>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect): QueryRef<GetCurrentUserData, undefined>;
  operationName: string;
}
export const getCurrentUserRef: GetCurrentUserRef;

export function getCurrentUser(options?: ExecuteQueryOptions): QueryPromise<GetCurrentUserData, undefined>;
export function getCurrentUser(dc: DataConnect, options?: ExecuteQueryOptions): QueryPromise<GetCurrentUserData, undefined>;

interface ListUsersRef {
  /* Allow users to create refs without passing in DataConnect */
  (): QueryRef<ListUsersData, undefined>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect): QueryRef<ListUsersData, undefined>;
  operationName: string;
}
export const listUsersRef: ListUsersRef;

export function listUsers(options?: ExecuteQueryOptions): QueryPromise<ListUsersData, undefined>;
export function listUsers(dc: DataConnect, options?: ExecuteQueryOptions): QueryPromise<ListUsersData, undefined>;

interface CreateDepartmentRef {
  /* Allow users to create refs without passing in DataConnect */
  (): MutationRef<CreateDepartmentData, undefined>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect): MutationRef<CreateDepartmentData, undefined>;
  operationName: string;
}
export const createDepartmentRef: CreateDepartmentRef;

export function createDepartment(): MutationPromise<CreateDepartmentData, undefined>;
export function createDepartment(dc: DataConnect): MutationPromise<CreateDepartmentData, undefined>;

interface UpdateDepartmentRef {
  /* Allow users to create refs without passing in DataConnect */
  (vars: UpdateDepartmentVariables): MutationRef<UpdateDepartmentData, UpdateDepartmentVariables>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect, vars: UpdateDepartmentVariables): MutationRef<UpdateDepartmentData, UpdateDepartmentVariables>;
  operationName: string;
}
export const updateDepartmentRef: UpdateDepartmentRef;

export function updateDepartment(vars: UpdateDepartmentVariables): MutationPromise<UpdateDepartmentData, UpdateDepartmentVariables>;
export function updateDepartment(dc: DataConnect, vars: UpdateDepartmentVariables): MutationPromise<UpdateDepartmentData, UpdateDepartmentVariables>;

interface DeleteDepartmentRef {
  /* Allow users to create refs without passing in DataConnect */
  (vars: DeleteDepartmentVariables): MutationRef<DeleteDepartmentData, DeleteDepartmentVariables>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect, vars: DeleteDepartmentVariables): MutationRef<DeleteDepartmentData, DeleteDepartmentVariables>;
  operationName: string;
}
export const deleteDepartmentRef: DeleteDepartmentRef;

export function deleteDepartment(vars: DeleteDepartmentVariables): MutationPromise<DeleteDepartmentData, DeleteDepartmentVariables>;
export function deleteDepartment(dc: DataConnect, vars: DeleteDepartmentVariables): MutationPromise<DeleteDepartmentData, DeleteDepartmentVariables>;

interface GetDepartmentRef {
  /* Allow users to create refs without passing in DataConnect */
  (vars: GetDepartmentVariables): QueryRef<GetDepartmentData, GetDepartmentVariables>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect, vars: GetDepartmentVariables): QueryRef<GetDepartmentData, GetDepartmentVariables>;
  operationName: string;
}
export const getDepartmentRef: GetDepartmentRef;

export function getDepartment(vars: GetDepartmentVariables, options?: ExecuteQueryOptions): QueryPromise<GetDepartmentData, GetDepartmentVariables>;
export function getDepartment(dc: DataConnect, vars: GetDepartmentVariables, options?: ExecuteQueryOptions): QueryPromise<GetDepartmentData, GetDepartmentVariables>;

interface ListDepartmentsRef {
  /* Allow users to create refs without passing in DataConnect */
  (): QueryRef<ListDepartmentsData, undefined>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect): QueryRef<ListDepartmentsData, undefined>;
  operationName: string;
}
export const listDepartmentsRef: ListDepartmentsRef;

export function listDepartments(options?: ExecuteQueryOptions): QueryPromise<ListDepartmentsData, undefined>;
export function listDepartments(dc: DataConnect, options?: ExecuteQueryOptions): QueryPromise<ListDepartmentsData, undefined>;

interface CreateOfficialRef {
  /* Allow users to create refs without passing in DataConnect */
  (vars: CreateOfficialVariables): MutationRef<CreateOfficialData, CreateOfficialVariables>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect, vars: CreateOfficialVariables): MutationRef<CreateOfficialData, CreateOfficialVariables>;
  operationName: string;
}
export const createOfficialRef: CreateOfficialRef;

export function createOfficial(vars: CreateOfficialVariables): MutationPromise<CreateOfficialData, CreateOfficialVariables>;
export function createOfficial(dc: DataConnect, vars: CreateOfficialVariables): MutationPromise<CreateOfficialData, CreateOfficialVariables>;

interface UpdateOfficialRef {
  /* Allow users to create refs without passing in DataConnect */
  (vars: UpdateOfficialVariables): MutationRef<UpdateOfficialData, UpdateOfficialVariables>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect, vars: UpdateOfficialVariables): MutationRef<UpdateOfficialData, UpdateOfficialVariables>;
  operationName: string;
}
export const updateOfficialRef: UpdateOfficialRef;

export function updateOfficial(vars: UpdateOfficialVariables): MutationPromise<UpdateOfficialData, UpdateOfficialVariables>;
export function updateOfficial(dc: DataConnect, vars: UpdateOfficialVariables): MutationPromise<UpdateOfficialData, UpdateOfficialVariables>;

interface DeleteOfficialRef {
  /* Allow users to create refs without passing in DataConnect */
  (vars: DeleteOfficialVariables): MutationRef<DeleteOfficialData, DeleteOfficialVariables>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect, vars: DeleteOfficialVariables): MutationRef<DeleteOfficialData, DeleteOfficialVariables>;
  operationName: string;
}
export const deleteOfficialRef: DeleteOfficialRef;

export function deleteOfficial(vars: DeleteOfficialVariables): MutationPromise<DeleteOfficialData, DeleteOfficialVariables>;
export function deleteOfficial(dc: DataConnect, vars: DeleteOfficialVariables): MutationPromise<DeleteOfficialData, DeleteOfficialVariables>;

interface GetOfficialRef {
  /* Allow users to create refs without passing in DataConnect */
  (vars: GetOfficialVariables): QueryRef<GetOfficialData, GetOfficialVariables>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect, vars: GetOfficialVariables): QueryRef<GetOfficialData, GetOfficialVariables>;
  operationName: string;
}
export const getOfficialRef: GetOfficialRef;

export function getOfficial(vars: GetOfficialVariables, options?: ExecuteQueryOptions): QueryPromise<GetOfficialData, GetOfficialVariables>;
export function getOfficial(dc: DataConnect, vars: GetOfficialVariables, options?: ExecuteQueryOptions): QueryPromise<GetOfficialData, GetOfficialVariables>;

interface ListOfficialsRef {
  /* Allow users to create refs without passing in DataConnect */
  (): QueryRef<ListOfficialsData, undefined>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect): QueryRef<ListOfficialsData, undefined>;
  operationName: string;
}
export const listOfficialsRef: ListOfficialsRef;

export function listOfficials(options?: ExecuteQueryOptions): QueryPromise<ListOfficialsData, undefined>;
export function listOfficials(dc: DataConnect, options?: ExecuteQueryOptions): QueryPromise<ListOfficialsData, undefined>;

interface CreateReportRef {
  /* Allow users to create refs without passing in DataConnect */
  (vars: CreateReportVariables): MutationRef<CreateReportData, CreateReportVariables>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect, vars: CreateReportVariables): MutationRef<CreateReportData, CreateReportVariables>;
  operationName: string;
}
export const createReportRef: CreateReportRef;

export function createReport(vars: CreateReportVariables): MutationPromise<CreateReportData, CreateReportVariables>;
export function createReport(dc: DataConnect, vars: CreateReportVariables): MutationPromise<CreateReportData, CreateReportVariables>;

interface UpdateReportStatusRef {
  /* Allow users to create refs without passing in DataConnect */
  (vars: UpdateReportStatusVariables): MutationRef<UpdateReportStatusData, UpdateReportStatusVariables>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect, vars: UpdateReportStatusVariables): MutationRef<UpdateReportStatusData, UpdateReportStatusVariables>;
  operationName: string;
}
export const updateReportStatusRef: UpdateReportStatusRef;

export function updateReportStatus(vars: UpdateReportStatusVariables): MutationPromise<UpdateReportStatusData, UpdateReportStatusVariables>;
export function updateReportStatus(dc: DataConnect, vars: UpdateReportStatusVariables): MutationPromise<UpdateReportStatusData, UpdateReportStatusVariables>;

interface DeleteReportRef {
  /* Allow users to create refs without passing in DataConnect */
  (vars: DeleteReportVariables): MutationRef<DeleteReportData, DeleteReportVariables>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect, vars: DeleteReportVariables): MutationRef<DeleteReportData, DeleteReportVariables>;
  operationName: string;
}
export const deleteReportRef: DeleteReportRef;

export function deleteReport(vars: DeleteReportVariables): MutationPromise<DeleteReportData, DeleteReportVariables>;
export function deleteReport(dc: DataConnect, vars: DeleteReportVariables): MutationPromise<DeleteReportData, DeleteReportVariables>;

interface GetReportRef {
  /* Allow users to create refs without passing in DataConnect */
  (vars: GetReportVariables): QueryRef<GetReportData, GetReportVariables>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect, vars: GetReportVariables): QueryRef<GetReportData, GetReportVariables>;
  operationName: string;
}
export const getReportRef: GetReportRef;

export function getReport(vars: GetReportVariables, options?: ExecuteQueryOptions): QueryPromise<GetReportData, GetReportVariables>;
export function getReport(dc: DataConnect, vars: GetReportVariables, options?: ExecuteQueryOptions): QueryPromise<GetReportData, GetReportVariables>;

interface ListUserReportsRef {
  /* Allow users to create refs without passing in DataConnect */
  (): QueryRef<ListUserReportsData, undefined>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect): QueryRef<ListUserReportsData, undefined>;
  operationName: string;
}
export const listUserReportsRef: ListUserReportsRef;

export function listUserReports(options?: ExecuteQueryOptions): QueryPromise<ListUserReportsData, undefined>;
export function listUserReports(dc: DataConnect, options?: ExecuteQueryOptions): QueryPromise<ListUserReportsData, undefined>;

interface CreateSubscriptionRef {
  /* Allow users to create refs without passing in DataConnect */
  (vars: CreateSubscriptionVariables): MutationRef<CreateSubscriptionData, CreateSubscriptionVariables>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect, vars: CreateSubscriptionVariables): MutationRef<CreateSubscriptionData, CreateSubscriptionVariables>;
  operationName: string;
}
export const createSubscriptionRef: CreateSubscriptionRef;

export function createSubscription(vars: CreateSubscriptionVariables): MutationPromise<CreateSubscriptionData, CreateSubscriptionVariables>;
export function createSubscription(dc: DataConnect, vars: CreateSubscriptionVariables): MutationPromise<CreateSubscriptionData, CreateSubscriptionVariables>;

interface DeleteSubscriptionRef {
  /* Allow users to create refs without passing in DataConnect */
  (vars: DeleteSubscriptionVariables): MutationRef<DeleteSubscriptionData, DeleteSubscriptionVariables>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect, vars: DeleteSubscriptionVariables): MutationRef<DeleteSubscriptionData, DeleteSubscriptionVariables>;
  operationName: string;
}
export const deleteSubscriptionRef: DeleteSubscriptionRef;

export function deleteSubscription(vars: DeleteSubscriptionVariables): MutationPromise<DeleteSubscriptionData, DeleteSubscriptionVariables>;
export function deleteSubscription(dc: DataConnect, vars: DeleteSubscriptionVariables): MutationPromise<DeleteSubscriptionData, DeleteSubscriptionVariables>;

interface ListMySubscriptionsRef {
  /* Allow users to create refs without passing in DataConnect */
  (): QueryRef<ListMySubscriptionsData, undefined>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect): QueryRef<ListMySubscriptionsData, undefined>;
  operationName: string;
}
export const listMySubscriptionsRef: ListMySubscriptionsRef;

export function listMySubscriptions(options?: ExecuteQueryOptions): QueryPromise<ListMySubscriptionsData, undefined>;
export function listMySubscriptions(dc: DataConnect, options?: ExecuteQueryOptions): QueryPromise<ListMySubscriptionsData, undefined>;

