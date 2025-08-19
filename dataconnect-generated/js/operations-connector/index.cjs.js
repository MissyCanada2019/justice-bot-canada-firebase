const { queryRef, executeQuery, mutationRef, executeMutation, validateArgs } = require('firebase/data-connect');

const connectorConfig = {
  connector: 'operations',
  service: 'justice-bot-canada551055-service',
  location: 'northamerica-northeast1'
};
exports.connectorConfig = connectorConfig;

const listLegalMattersRef = (dc) => {
  const { dc: dcInstance} = validateArgs(connectorConfig, dc, undefined);
  dcInstance._useGeneratedSdk();
  return queryRef(dcInstance, 'ListLegalMatters');
}
listLegalMattersRef.operationName = 'ListLegalMatters';
exports.listLegalMattersRef = listLegalMattersRef;

exports.listLegalMatters = function listLegalMatters(dc) {
  return executeQuery(listLegalMattersRef(dc));
};

const createLegalMatterRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return mutationRef(dcInstance, 'CreateLegalMatter', inputVars);
}
createLegalMatterRef.operationName = 'CreateLegalMatter';
exports.createLegalMatterRef = createLegalMatterRef;

exports.createLegalMatter = function createLegalMatter(dcOrVars, vars) {
  return executeMutation(createLegalMatterRef(dcOrVars, vars));
};

const getCourtFormsRef = (dc) => {
  const { dc: dcInstance} = validateArgs(connectorConfig, dc, undefined);
  dcInstance._useGeneratedSdk();
  return queryRef(dcInstance, 'GetCourtForms');
}
getCourtFormsRef.operationName = 'GetCourtForms';
exports.getCourtFormsRef = getCourtFormsRef;

exports.getCourtForms = function getCourtForms(dc) {
  return executeQuery(getCourtFormsRef(dc));
};

const createUserRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return mutationRef(dcInstance, 'CreateUser', inputVars);
}
createUserRef.operationName = 'CreateUser';
exports.createUserRef = createUserRef;

exports.createUser = function createUser(dcOrVars, vars) {
  return executeMutation(createUserRef(dcOrVars, vars));
};
