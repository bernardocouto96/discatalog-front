import React, { useState } from "react";

import { Disc } from "../../types/collection.types";

type DiscModalProps = {
  disc: Disc;
  textProps: { sendButton: string };
  onFormSend: (formFields: Disc) => void;
};

const DiscModalComponent: React.FC<DiscModalProps> = ({
  disc,
  textProps,
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
        id="formDiscName"
        type="text"
        value={formFields.name}
        onChange={evt =>
          setFormFields({ ...formFields, name: evt.target.value })
        }
      />
      <input
        id="formDiscArtist"
        type="text"
        value={formFields.artist}
        onChange={evt =>
          setFormFields({ ...formFields, artist: evt.target.value })
        }
      />
      <input
        id="formDiscGenre"
        type="text"
        value={formFields.genre}
        onChange={evt =>
          setFormFields({ ...formFields, genre: evt.target.value })
        }
      />
      <input
        id="formDiscReleaseYear"
        type="text"
        value={formFields.releaseYear}
        onChange={evt =>
          setFormFields({ ...formFields, releaseYear: evt.target.value })
        }
      />
      <button id="sendDisc">{textProps.sendButton}</button>
    </form>
  );
};

export default DiscModalComponent;
