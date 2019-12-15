import React, { useState } from "react";

type AddCollectionModalProps = {
  onCollectionCreate: (collectionName: string) => void;
};

const AddCollectionModalComponent: React.FC<AddCollectionModalProps> = ({
  onCollectionCreate
}) => {
  const [collectionName, setCollectionName] = useState("");

  return (
    <form
      onSubmit={evt => {
        evt.preventDefault();
        onCollectionCreate(collectionName);
      }}
    >
      <input
        id="newCollectionName"
        type="text"
        value={collectionName}
        onChange={evt => setCollectionName(evt.target.value)}
      />

      <button id="createCollection">Criar</button>
    </form>
  );
};

export default AddCollectionModalComponent;
