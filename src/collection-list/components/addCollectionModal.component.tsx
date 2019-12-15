import React, { useState } from "react";
import styled from "styled-components";

type AddCollectionModalProps = {
  onCollectionCreate: (collectionName: string) => void;
};

const AddCollectionModalComponent: React.FC<AddCollectionModalProps> = ({
  onCollectionCreate
}) => {
  const [collectionName, setCollectionName] = useState("");

  return (
    <AddCollectionForm
      onSubmit={evt => {
        evt.preventDefault();
        onCollectionCreate(collectionName);
      }}
    >
      <CollectionNameInput
        id="newCollectionName"
        type="text"
        value={collectionName}
        onChange={evt => setCollectionName(evt.target.value)}
      />

      <CreateCollectionButton id="createCollection">
        Criar
      </CreateCollectionButton>
    </AddCollectionForm>
  );
};

const AddCollectionForm = styled.form``;

const CollectionNameInput = styled.input``;

const CreateCollectionButton = styled.input``;

export default AddCollectionModalComponent;
