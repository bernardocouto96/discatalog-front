import React from "react";

import { Collection, Disc } from "../types/collection.types";
import DiscModal from "./components/discModal.component";
import { emptyDisc } from "../types/collection.creators";

type CollectionComponentProps = {
  collection: Collection;
  hasError: boolean;
  showEditModal: boolean;
  showCreateModal: boolean;
  discToBeEdited: Disc;
  onDiscDelete: (discId: string) => void;
  onEditButtonClick: (disc: Disc) => void;
  onCreateButtonClick: () => void;
  onDiscEdit: (disc: Disc) => void;
  onDiscCreate: (disc: Disc) => void;
};

const CollectionComponent: React.FC<CollectionComponentProps> = ({
  collection,
  hasError,
  showEditModal,
  showCreateModal,
  discToBeEdited,
  onDiscDelete,
  onEditButtonClick,
  onCreateButtonClick,
  onDiscEdit,
  onDiscCreate
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
      <li>
        <button id="createDisc" onClick={onCreateButtonClick}>
          adicionar disco
        </button>
      </li>
      {showEditModal && (
        <DiscModal
          disc={discToBeEdited}
          textProps={{ sendButton: "Editar" }}
          onFormSend={onDiscEdit}
        />
      )}
      {showCreateModal && (
        <DiscModal
          disc={emptyDisc}
          textProps={{ sendButton: "Criar" }}
          onFormSend={onDiscCreate}
        />
      )}
    </ul>
  );
};

export default CollectionComponent;
