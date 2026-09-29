import { CreateUserData, UpdateUserData, DeleteUserData, GetCurrentUserData, ListUsersData, CreateDepartmentData, UpdateDepartmentData, UpdateDepartmentVariables, DeleteDepartmentData, DeleteDepartmentVariables, GetDepartmentData, GetDepartmentVariables, ListDepartmentsData, CreateOfficialData, CreateOfficialVariables, UpdateOfficialData, UpdateOfficialVariables, DeleteOfficialData, DeleteOfficialVariables, GetOfficialData, GetOfficialVariables, ListOfficialsData, CreateReportData, CreateReportVariables, UpdateReportStatusData, UpdateReportStatusVariables, DeleteReportData, DeleteReportVariables, GetReportData, GetReportVariables, ListUserReportsData, CreateSubscriptionData, CreateSubscriptionVariables, DeleteSubscriptionData, DeleteSubscriptionVariables, ListMySubscriptionsData } from '../';
import { UseDataConnectQueryResult, useDataConnectQueryOptions, UseDataConnectMutationResult, useDataConnectMutationOptions} from '@tanstack-query-firebase/react/data-connect';
import { UseQueryResult, UseMutationResult} from '@tanstack/react-query';
import { DataConnect } from 'firebase/data-connect';
import { FirebaseError } from 'firebase/app';


export function useCreateUser(options?: useDataConnectMutationOptions<CreateUserData, FirebaseError, void>): UseDataConnectMutationResult<CreateUserData, undefined>;
export function useCreateUser(dc: DataConnect, options?: useDataConnectMutationOptions<CreateUserData, FirebaseError, void>): UseDataConnectMutationResult<CreateUserData, undefined>;

export function useUpdateUser(options?: useDataConnectMutationOptions<UpdateUserData, FirebaseError, void>): UseDataConnectMutationResult<UpdateUserData, undefined>;
export function useUpdateUser(dc: DataConnect, options?: useDataConnectMutationOptions<UpdateUserData, FirebaseError, void>): UseDataConnectMutationResult<UpdateUserData, undefined>;

export function useDeleteUser(options?: useDataConnectMutationOptions<DeleteUserData, FirebaseError, void>): UseDataConnectMutationResult<DeleteUserData, undefined>;
export function useDeleteUser(dc: DataConnect, options?: useDataConnectMutationOptions<DeleteUserData, FirebaseError, void>): UseDataConnectMutationResult<DeleteUserData, undefined>;

export function useGetCurrentUser(options?: useDataConnectQueryOptions<GetCurrentUserData>): UseDataConnectQueryResult<GetCurrentUserData, undefined>;
export function useGetCurrentUser(dc: DataConnect, options?: useDataConnectQueryOptions<GetCurrentUserData>): UseDataConnectQueryResult<GetCurrentUserData, undefined>;

export function useListUsers(options?: useDataConnectQueryOptions<ListUsersData>): UseDataConnectQueryResult<ListUsersData, undefined>;
export function useListUsers(dc: DataConnect, options?: useDataConnectQueryOptions<ListUsersData>): UseDataConnectQueryResult<ListUsersData, undefined>;

export function useCreateDepartment(options?: useDataConnectMutationOptions<CreateDepartmentData, FirebaseError, void>): UseDataConnectMutationResult<CreateDepartmentData, undefined>;
export function useCreateDepartment(dc: DataConnect, options?: useDataConnectMutationOptions<CreateDepartmentData, FirebaseError, void>): UseDataConnectMutationResult<CreateDepartmentData, undefined>;

export function useUpdateDepartment(options?: useDataConnectMutationOptions<UpdateDepartmentData, FirebaseError, UpdateDepartmentVariables>): UseDataConnectMutationResult<UpdateDepartmentData, UpdateDepartmentVariables>;
export function useUpdateDepartment(dc: DataConnect, options?: useDataConnectMutationOptions<UpdateDepartmentData, FirebaseError, UpdateDepartmentVariables>): UseDataConnectMutationResult<UpdateDepartmentData, UpdateDepartmentVariables>;

export function useDeleteDepartment(options?: useDataConnectMutationOptions<DeleteDepartmentData, FirebaseError, DeleteDepartmentVariables>): UseDataConnectMutationResult<DeleteDepartmentData, DeleteDepartmentVariables>;
export function useDeleteDepartment(dc: DataConnect, options?: useDataConnectMutationOptions<DeleteDepartmentData, FirebaseError, DeleteDepartmentVariables>): UseDataConnectMutationResult<DeleteDepartmentData, DeleteDepartmentVariables>;

export function useGetDepartment(vars: GetDepartmentVariables, options?: useDataConnectQueryOptions<GetDepartmentData>): UseDataConnectQueryResult<GetDepartmentData, GetDepartmentVariables>;
export function useGetDepartment(dc: DataConnect, vars: GetDepartmentVariables, options?: useDataConnectQueryOptions<GetDepartmentData>): UseDataConnectQueryResult<GetDepartmentData, GetDepartmentVariables>;

export function useListDepartments(options?: useDataConnectQueryOptions<ListDepartmentsData>): UseDataConnectQueryResult<ListDepartmentsData, undefined>;
export function useListDepartments(dc: DataConnect, options?: useDataConnectQueryOptions<ListDepartmentsData>): UseDataConnectQueryResult<ListDepartmentsData, undefined>;

export function useCreateOfficial(options?: useDataConnectMutationOptions<CreateOfficialData, FirebaseError, CreateOfficialVariables>): UseDataConnectMutationResult<CreateOfficialData, CreateOfficialVariables>;
export function useCreateOfficial(dc: DataConnect, options?: useDataConnectMutationOptions<CreateOfficialData, FirebaseError, CreateOfficialVariables>): UseDataConnectMutationResult<CreateOfficialData, CreateOfficialVariables>;

export function useUpdateOfficial(options?: useDataConnectMutationOptions<UpdateOfficialData, FirebaseError, UpdateOfficialVariables>): UseDataConnectMutationResult<UpdateOfficialData, UpdateOfficialVariables>;
export function useUpdateOfficial(dc: DataConnect, options?: useDataConnectMutationOptions<UpdateOfficialData, FirebaseError, UpdateOfficialVariables>): UseDataConnectMutationResult<UpdateOfficialData, UpdateOfficialVariables>;

export function useDeleteOfficial(options?: useDataConnectMutationOptions<DeleteOfficialData, FirebaseError, DeleteOfficialVariables>): UseDataConnectMutationResult<DeleteOfficialData, DeleteOfficialVariables>;
export function useDeleteOfficial(dc: DataConnect, options?: useDataConnectMutationOptions<DeleteOfficialData, FirebaseError, DeleteOfficialVariables>): UseDataConnectMutationResult<DeleteOfficialData, DeleteOfficialVariables>;

export function useGetOfficial(vars: GetOfficialVariables, options?: useDataConnectQueryOptions<GetOfficialData>): UseDataConnectQueryResult<GetOfficialData, GetOfficialVariables>;
export function useGetOfficial(dc: DataConnect, vars: GetOfficialVariables, options?: useDataConnectQueryOptions<GetOfficialData>): UseDataConnectQueryResult<GetOfficialData, GetOfficialVariables>;

export function useListOfficials(options?: useDataConnectQueryOptions<ListOfficialsData>): UseDataConnectQueryResult<ListOfficialsData, undefined>;
export function useListOfficials(dc: DataConnect, options?: useDataConnectQueryOptions<ListOfficialsData>): UseDataConnectQueryResult<ListOfficialsData, undefined>;

export function useCreateReport(options?: useDataConnectMutationOptions<CreateReportData, FirebaseError, CreateReportVariables>): UseDataConnectMutationResult<CreateReportData, CreateReportVariables>;
export function useCreateReport(dc: DataConnect, options?: useDataConnectMutationOptions<CreateReportData, FirebaseError, CreateReportVariables>): UseDataConnectMutationResult<CreateReportData, CreateReportVariables>;

export function useUpdateReportStatus(options?: useDataConnectMutationOptions<UpdateReportStatusData, FirebaseError, UpdateReportStatusVariables>): UseDataConnectMutationResult<UpdateReportStatusData, UpdateReportStatusVariables>;
export function useUpdateReportStatus(dc: DataConnect, options?: useDataConnectMutationOptions<UpdateReportStatusData, FirebaseError, UpdateReportStatusVariables>): UseDataConnectMutationResult<UpdateReportStatusData, UpdateReportStatusVariables>;

export function useDeleteReport(options?: useDataConnectMutationOptions<DeleteReportData, FirebaseError, DeleteReportVariables>): UseDataConnectMutationResult<DeleteReportData, DeleteReportVariables>;
export function useDeleteReport(dc: DataConnect, options?: useDataConnectMutationOptions<DeleteReportData, FirebaseError, DeleteReportVariables>): UseDataConnectMutationResult<DeleteReportData, DeleteReportVariables>;

export function useGetReport(vars: GetReportVariables, options?: useDataConnectQueryOptions<GetReportData>): UseDataConnectQueryResult<GetReportData, GetReportVariables>;
export function useGetReport(dc: DataConnect, vars: GetReportVariables, options?: useDataConnectQueryOptions<GetReportData>): UseDataConnectQueryResult<GetReportData, GetReportVariables>;

export function useListUserReports(options?: useDataConnectQueryOptions<ListUserReportsData>): UseDataConnectQueryResult<ListUserReportsData, undefined>;
export function useListUserReports(dc: DataConnect, options?: useDataConnectQueryOptions<ListUserReportsData>): UseDataConnectQueryResult<ListUserReportsData, undefined>;

export function useCreateSubscription(options?: useDataConnectMutationOptions<CreateSubscriptionData, FirebaseError, CreateSubscriptionVariables>): UseDataConnectMutationResult<CreateSubscriptionData, CreateSubscriptionVariables>;
export function useCreateSubscription(dc: DataConnect, options?: useDataConnectMutationOptions<CreateSubscriptionData, FirebaseError, CreateSubscriptionVariables>): UseDataConnectMutationResult<CreateSubscriptionData, CreateSubscriptionVariables>;

export function useDeleteSubscription(options?: useDataConnectMutationOptions<DeleteSubscriptionData, FirebaseError, DeleteSubscriptionVariables>): UseDataConnectMutationResult<DeleteSubscriptionData, DeleteSubscriptionVariables>;
export function useDeleteSubscription(dc: DataConnect, options?: useDataConnectMutationOptions<DeleteSubscriptionData, FirebaseError, DeleteSubscriptionVariables>): UseDataConnectMutationResult<DeleteSubscriptionData, DeleteSubscriptionVariables>;

export function useListMySubscriptions(options?: useDataConnectQueryOptions<ListMySubscriptionsData>): UseDataConnectQueryResult<ListMySubscriptionsData, undefined>;
export function useListMySubscriptions(dc: DataConnect, options?: useDataConnectQueryOptions<ListMySubscriptionsData>): UseDataConnectQueryResult<ListMySubscriptionsData, undefined>;
