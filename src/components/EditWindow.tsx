import React from "react";
import { EditWindowProps } from "../interfaces/pokemon";
import { MdClose, MdFileUpload } from "react-icons/md";
import frontData from "../data/containers/dashboard-page-data.json";

export default function EditWindow({
  handleCreateNewPokemon,
  handleManageData,
  handleCancel,
  ...props
}: Partial<EditWindowProps>): JSX.Element {
  const {
    subtitle,
    namePlaceHolder,
    imagePlaceHolder,
    saveButton,
    skills,
    inputTextLabels,
    closeButton,
    range
  } = frontData;

  const [min, max] = range;
  const [ataque, defensa] = skills;
  const [name, image] = inputTextLabels;
  const { pokemonName } = props;
  return (
    <section className="section3">
      <p className="title subtitle">{pokemonName || subtitle}</p>
      <div className="section3Container">
        <div className="boxSection">
          <label>
            {name}
            <input
              type="text"
              name="name"
              className="newInputs"
              onChange={handleCreateNewPokemon}
              placeholder={namePlaceHolder}
            />
          </label>
          <label className="label2">
            {image}
            <input
              type="text"
              name="image"
              className="newInputs"
              onChange={handleCreateNewPokemon}
              placeholder={imagePlaceHolder}
            />
          </label>
        </div>
        <div className="boxSection">
          <div className="rangeRow">
            <label>{ataque}</label>
            <p className="ranges">{min}</p>
            <input
              type="range"
              name="attack"
              defaultValue={0}
              onChange={handleCreateNewPokemon}
            />
            <label className="ranges">{max}</label>
          </div>
          <div className="rangeRow">
            <label>{defensa}</label>
            <p className="ranges">{min}</p>
            <input
              type="range"
              name="defense"
              defaultValue={0}
              onChange={handleCreateNewPokemon}
            />
            <label className="ranges">{max}</label>
          </div>
        </div>
      </div>
      <div className="buttons">
        <button className="newButton b" onClick={handleManageData}>
          <MdFileUpload className="plusIcon" />
          {saveButton}
        </button>
        <button className="newButton b" onClick={handleCancel}>
          <MdClose className="plusIcon" />
          {closeButton}
        </button>
      </div>
    </section>
  );
}
