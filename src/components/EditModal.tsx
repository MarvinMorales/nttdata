import React from "react";
import EditWindow from "./EditWindow";
import { ModalProps } from "../interfaces/pokemon";
import "../styles/EdiModal.css";

export default function EditModal({
  open,
  pokemonName,
  handleCloseModal,
  handleCreateNewPokemon,
  handleManageData,
  ...props
}: Partial<ModalProps>): JSX.Element {
  const { image: pokemonPhoto } = props;
  return (
    <div style={{ display: open ? "flex" : "none" }} className="modal">
      <div>
        <p className="close" onClick={handleCloseModal}>
          Close
        </p>
        {pokemonPhoto ? (
          <div className="modalImage">
            <div className="imageContainer">
              <img
                src={pokemonPhoto}
                alt="PokemonImage"
                className="pokemonImg"
              />
            </div>
          </div>
        ) : (
          <div className="edit-window">
            <EditWindow
              pokemonName={pokemonName}
              handleCreateNewPokemon={handleCreateNewPokemon}
              handleCancel={handleCloseModal}
              handleManageData={handleManageData}
            />
          </div>
        )}
      </div>
      `
    </div>
  );
}
