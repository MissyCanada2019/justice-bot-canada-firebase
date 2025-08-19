import { ListLegalMattersData, CreateLegalMatterData, CreateLegalMatterVariables, GetCourtFormsData, CreateUserData, CreateUserVariables } from '../';
import { UseDataConnectQueryResult, useDataConnectQueryOptions, UseDataConnectMutationResult, useDataConnectMutationOptions} from '@tanstack-query-firebase/react/data-connect';
import { UseQueryResult, UseMutationResult} from '@tanstack/react-query';
import { DataConnect } from 'firebase/data-connect';
import { FirebaseError } from 'firebase/app';


export function useListLegalMatters(options?: useDataConnectQueryOptions<ListLegalMattersData>): UseDataConnectQueryResult<ListLegalMattersData, undefined>;
export function useListLegalMatters(dc: DataConnect, options?: useDataConnectQueryOptions<ListLegalMattersData>): UseDataConnectQueryResult<ListLegalMattersData, undefined>;

export function useCreateLegalMatter(options?: useDataConnectMutationOptions<CreateLegalMatterData, FirebaseError, CreateLegalMatterVariables>): UseDataConnectMutationResult<CreateLegalMatterData, CreateLegalMatterVariables>;
export function useCreateLegalMatter(dc: DataConnect, options?: useDataConnectMutationOptions<CreateLegalMatterData, FirebaseError, CreateLegalMatterVariables>): UseDataConnectMutationResult<CreateLegalMatterData, CreateLegalMatterVariables>;

export function useGetCourtForms(options?: useDataConnectQueryOptions<GetCourtFormsData>): UseDataConnectQueryResult<GetCourtFormsData, undefined>;
export function useGetCourtForms(dc: DataConnect, options?: useDataConnectQueryOptions<GetCourtFormsData>): UseDataConnectQueryResult<GetCourtFormsData, undefined>;

export function useCreateUser(options?: useDataConnectMutationOptions<CreateUserData, FirebaseError, CreateUserVariables>): UseDataConnectMutationResult<CreateUserData, CreateUserVariables>;
export function useCreateUser(dc: DataConnect, options?: useDataConnectMutationOptions<CreateUserData, FirebaseError, CreateUserVariables>): UseDataConnectMutationResult<CreateUserData, CreateUserVariables>;
