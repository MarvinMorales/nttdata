import React from "react";
import EditWindow from "./EditWindow";
import { ModalProps } from "../interfaces/pokemon";
import "../styles/EdiModal.css";

export default function EditModal({
  open,
  pokemonName,
  handleCloseModal,
  handleCreateNewPokemon,
  handleManageData
}: ModalProps): JSX.Element {
  return (
    <div style={{ display: open ? "flex" : "none" }} className="modal">
      <p className="close" onClick={handleCloseModal}>
        Close
      </p>
      <div className="edit-window">
        <EditWindow
          pokemonName={pokemonName}
          handleCreateNewPokemon={handleCreateNewPokemon}
          handleCancel={handleCloseModal}
          handleManageData={handleManageData}
        />
      </div>
    </div>
  );
}
