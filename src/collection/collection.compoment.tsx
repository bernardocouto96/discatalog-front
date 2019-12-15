import React from "react";

import { Collection, Disc } from "../types/collection.types";
import EditDiscModalComponent from "./components/editDiscModal.component";

type CollectionComponentProps = {
  collection: Collection;
  hasError: boolean;
  showEditModal: boolean;
  discToBeEdited: Disc;
  onDiscDelete: (discId: string) => void;
  onEditButtonClick: (disc: Disc) => void;
  onDiscEdit: (disc: Disc) => void;
};

const CollectionComponent: React.FC<CollectionComponentProps> = ({
  collection,
  hasError,
  showEditModal,
  discToBeEdited,
  onDiscDelete,
  onEditButtonClick,
  onDiscEdit
}) => {
  return hasError ? (
    <div id="error">
      <p className="errorMessage">
        Ops! A coleção que tentou acessar não existe
      </p>
    </div>
  ) : (
    <ul id="discs">
      {collection.discs.map(disc => (
        <li key={disc.discId}>
          {disc.name}
          <button
            id={`edit-${disc.discId}`}
            onClick={() => onEditButtonClick(disc)}
          >
            editar disco
          </button>
          <button
            id={`delete-${disc.discId}`}
            onClick={() => onDiscDelete(disc.discId)}
          >
            excluir disco
          </button>
        </li>
      ))}
      {showEditModal && (
        <EditDiscModalComponent disc={discToBeEdited} onFormSend={onDiscEdit} />
      )}
    </ul>
  );
};

export default CollectionComponent;
