import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash } from "@fortawesome/free-solid-svg-icons";

const ItineraryDeleteButton = () => {
  return (
    <div>
      <button onClick={handleDelete}>
        <FontAwesomeIcon icon={faTrash} />
      </button>
    </div>
  );
};

export default ItineraryDeleteButton;
