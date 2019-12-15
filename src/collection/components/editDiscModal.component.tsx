import React, { useState } from "react";

import { Disc } from "../../types/collection.types";

type EditDiscModalProps = {
  disc: Disc;
  onFormSend: (formFields: Disc) => void;
};

const EditDiscModalComponent: React.FC<EditDiscModalProps> = ({
  disc,
  onFormSend
}) => {
  const [formFields, setFormFields] = useState({
    name: disc.name,
    artist: disc.artist,
    genre: disc.genre,
    releaseYear: disc.releaseYear
  });

  return (
    <form
      onSubmit={evt => {
        evt.preventDefault();
        onFormSend({ ...disc, ...formFields });
      }}
    >
      <input
        id="editName"
        type="text"
        value={formFields.name}
        onChange={evt =>
          setFormFields({ ...formFields, name: evt.target.value })
        }
      />
      <input
        id="editArtist"
        type="text"
        value={formFields.artist}
        onChange={evt =>
          setFormFields({ ...formFields, artist: evt.target.value })
        }
      />
      <input
        id="editGenre"
        type="text"
        value={formFields.genre}
        onChange={evt =>
          setFormFields({ ...formFields, genre: evt.target.value })
        }
      />
      <input
        id="editReleaseYear"
        type="text"
        value={formFields.releaseYear}
        onChange={evt =>
          setFormFields({ ...formFields, releaseYear: evt.target.value })
        }
      />
      <button id="sendEdit">editar</button>
    </form>
  );
};

export default EditDiscModalComponent;
