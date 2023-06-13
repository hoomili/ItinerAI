import { useReducer } from "react";
import reducer from "./reducer";

export const ACTIONS = {
  FAV_PHOTO_ADDED: 'FAV_PHOTO_ADDED',
  FAV_PHOTO_REMOVED: 'FAV_PHOTO_REMOVED',
};

//setting initial values for the state
const init = {
  modal: false,
  modalPhoto: null,
  isFavPhotoExist: false,
  updateToFavPhotoIds: [],
  id: null,
};

const useApplicationData = () => {

  const [state, dispatch] = useReducer(reducer, init);

  // exporting all the required functions and states
  const allStates = {
    onPhotoSelect,
    favPhotoId,
    onClosePhotoDetailsModal,
    setId,
    ...state
  };
  return allStates;
};
export default useApplicationData;