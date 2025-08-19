import { queryRef, executeQuery, mutationRef, executeMutation, validateArgs } from 'firebase/data-connect';

export const connectorConfig = {
  connector: 'operations',
  service: 'justice-bot-canada551055-service',
  location: 'northamerica-northeast1'
};

export const listLegalMattersRef = (dc) => {
  const { dc: dcInstance} = validateArgs(connectorConfig, dc, undefined);
  dcInstance._useGeneratedSdk();
  return queryRef(dcInstance, 'ListLegalMatters');
}
listLegalMattersRef.operationName = 'ListLegalMatters';

export function listLegalMatters(dc) {
  return executeQuery(listLegalMattersRef(dc));
}

export const createLegalMatterRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return mutationRef(dcInstance, 'CreateLegalMatter', inputVars);
}
createLegalMatterRef.operationName = 'CreateLegalMatter';

export function createLegalMatter(dcOrVars, vars) {
  return executeMutation(createLegalMatterRef(dcOrVars, vars));
}

export const getCourtFormsRef = (dc) => {
  const { dc: dcInstance} = validateArgs(connectorConfig, dc, undefined);
  dcInstance._useGeneratedSdk();
  return queryRef(dcInstance, 'GetCourtForms');
}
getCourtFormsRef.operationName = 'GetCourtForms';

export function getCourtForms(dc) {
  return executeQuery(getCourtFormsRef(dc));
}

export const createUserRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return mutationRef(dcInstance, 'CreateUser', inputVars);
}
createUserRef.operationName = 'CreateUser';

export function createUser(dcOrVars, vars) {
  return executeMutation(createUserRef(dcOrVars, vars));
}

