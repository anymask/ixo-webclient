import {
  CreateEntitySettingsActionTypes,
  CreateEntitySettingsActions,
  CreateEntitySettingsState,
} from './types';
import * as reduxUtils from '../../common/redux/utils';

export const initialState: CreateEntitySettingsState = {
  creator: {
    displayName: undefined,
    location: undefined,
    email: undefined,
    website: undefined,
    mission: undefined,
    creatorId: undefined,
    credential: undefined,
    fileSrc: undefined,
    uploading: false,
  },
  owner: {
    displayName: undefined,
    location: undefined,
    email: undefined,
    website: undefined,
    mission: undefined,
    ownerId: undefined,
    fileSrc: undefined,
    uploading: false,
  },
  status: {
    startDate: undefined,
    endDate: undefined,
    stage: undefined,
    status: undefined,
  },
  privacy: {
    entityView: undefined,
    pageView: undefined,
  },
  requiredCredentials: {},
  filters: {},
  displayCredentials: {},
  validation: {},
};

export const reducer = (
  state = initialState,
  action: CreateEntitySettingsActionTypes,
): CreateEntitySettingsState => {
  switch (action.type) {
    case CreateEntitySettingsActions.UpdateOwner:
      return {
        ...state,
        owner: {
          ...state.owner,
          ...action.payload,
        },
      };
    case CreateEntitySettingsActions.UploadOwnerImagePending:
      return {
        ...state,
        owner: {
          ...state.owner,
          uploading: true,
        },
      };
    case CreateEntitySettingsActions.UploadOwnerImageSuccess:
      return {
        ...state,
        owner: {
          ...state.owner,
          uploading: false,
          fileSrc: action.payload.fileSrc,
        },
      };
    case CreateEntitySettingsActions.UploadOwnerImageFailure:
      return {
        ...state,
        owner: {
          ...state.owner,
          uploading: false,
        },
      };
    case CreateEntitySettingsActions.UpdateCreator:
      return {
        ...state,
        creator: {
          ...state.creator,
          ...action.payload,
        },
      };
    case CreateEntitySettingsActions.UploadCreatorImagePending:
      return {
        ...state,
        creator: {
          ...state.creator,
          uploading: true,
        },
      };
    case CreateEntitySettingsActions.UploadCreatorImageSuccess:
      return {
        ...state,
        creator: {
          ...state.creator,
          uploading: false,
          fileSrc: action.payload.fileSrc,
        },
      };
    case CreateEntitySettingsActions.UploadCreatorImageFailure:
      return {
        ...state,
        creator: {
          ...state.creator,
          uploading: false,
        },
      };
    case CreateEntitySettingsActions.UpdateStatus:
      return {
        ...state,
        status: action.payload,
      };
    case CreateEntitySettingsActions.UpdatePrivacy:
      return {
        ...state,
        privacy: action.payload,
      };
    case CreateEntitySettingsActions.AddRequiredCredentialSection:
      return {
        ...state,
        requiredCredentials: {
          ...state.requiredCredentials,
          ...{
            [action.payload.id]: {
              ...action.payload,
              credential: undefined,
              issuer: undefined,
            },
          },
        },
      };
    case CreateEntitySettingsActions.RemoveRequiredCredentialSection:
      return {
        ...state,
        requiredCredentials: reduxUtils.omitKey(
          state.requiredCredentials,
          action.payload.id,
        ),
      };
    case CreateEntitySettingsActions.UpdateRequiredCredential:
      return {
        ...state,
        requiredCredentials: {
          ...state.requiredCredentials,
          ...{ [action.payload.id]: action.payload },
        },
      };
    case CreateEntitySettingsActions.UpdateFilters:
      return {
        ...state,
        filters: action.payload,
      };
    case CreateEntitySettingsActions.AddDisplayCredentialSection:
      return {
        ...state,
        displayCredentials: {
          ...state.displayCredentials,
          ...{
            [action.payload.id]: {
              ...action.payload,
              credential: undefined,
              badge: undefined,
            },
          },
        },
      };
    case CreateEntitySettingsActions.RemoveDisplayCredentialSection:
      return {
        ...state,
        displayCredentials: reduxUtils.omitKey(
          state.displayCredentials,
          action.payload.id,
        ),
      };
    case CreateEntitySettingsActions.UpdateDisplayCredential:
      return {
        ...state,
        displayCredentials: {
          ...state.displayCredentials,
          ...{ [action.payload.id]: action.payload },
        },
      };
    case CreateEntitySettingsActions.Validated:
      return {
        ...state,
        validation: {
          ...state.validation,
          ...{
            [action.payload.identifier]: {
              identifier: action.payload.identifier,
              validated: true,
              errors: [],
            },
          },
        },
      };
    case CreateEntitySettingsActions.ValidationError:
      return {
        ...state,
        validation: {
          ...state.validation,
          ...{
            [action.payload.identifier]: {
              identifier: action.payload.identifier,
              validated: false,
              errors: action.payload.errors,
            },
          },
        },
      };
  }

  return state;
};
