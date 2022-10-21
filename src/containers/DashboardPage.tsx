import React, { useState, useEffect, useCallback } from "react";
import { FiSearch, FiPlus } from "react-icons/fi";
import services from "../services/backend";
import EditWindow from "../components/EditWindow";
import EditModal from "../components/EditModal";
import { FiImage } from "react-icons/fi";
import { MdOutlineEditNote, MdDeleteOutline } from "react-icons/md";
import { Pokemon, NewPokemon } from "../interfaces/pokemon";

import configuration from "../data/configuration.json";
import frontData from "../data/containers/dashboard-page-data.json";
import "../styles/DashboardPage.css";

export default function DashboardPage(): JSX.Element {
  const {
    title,
    inputPlaceholder,
    buttonValue,
    dataRows,
    pokemonTypes,
    titlesIndex
  } = frontData;

  // @ts-ignore
  const {
    createNewPokemon,
    getPokemons,
    updatePokemon,
    deletePokemon
  } = services;

  const [addNew, setAddNew] = useState<boolean>(false);
  const CURRENT_DATE: Date = new Date();
  const pokemonTypeLength: number = pokemonTypes.length;
  const { authorId } = configuration;
  const [showModal, setShowModal] = useState<boolean>(false);
  const [selectedPokemon, setSelectedPokemon] = useState<number[]>([]);
  const [pokemonList, setPokemonList] = useState<Pokemon[]>([]);
  const [pokemonName, setPokemonName] = useState<string>("");
  const [pokeName, setPokeName] = useState<string | null>("");
  const [newPokemon, setNewPokemon] = useState<NewPokemon>({
    name: null,
    image: null,
    attack: null,
    defense: null,
    type: null,
    idAuthor: authorId,
    hp: null,
    created_at: CURRENT_DATE.toString(),
    updated_at: CURRENT_DATE.toString()
  });

  useEffect(() => {
    getPokemons()
      .then(({ data }) => setPokemonList(data))
      .catch((err) => console.log(err));
  }, [setPokemonList, getPokemons]);

  const handleAddNew = useCallback(() => setAddNew((addNew) => !addNew), [
    setAddNew
  ]);

  const handleModalVisibility = useCallback(
    () => setShowModal((showModal) => !showModal),
    [setShowModal]
  );

  const handleChange = useCallback(
    ({ target }: any) => setPokemonName(target.value),
    []
  );

  // handling text change for Pokemon Schema
  const handleFillPokemonSchema = useCallback(
    (event: any) => {
      const { target } = event;
      setNewPokemon({ ...newPokemon, [target.name]: target.value });
    },
    [setNewPokemon, newPokemon]
  );

  // Creating a new Pokemon
  const handleCreatePokemon = useCallback(() => {
    setTimeout(() => {
      createNewPokemon({
        ...newPokemon,
        type: pokemonTypes[Math.floor(Math.random() * pokemonTypeLength)],
        hp: Math.floor(Math.random() * 100)
      }).then(({ data }) => {
        setPokemonList([...pokemonList, data]);
        setAddNew(false);
      }).catch((err) => console.error(err));
    }, 200);
  }, [
    createNewPokemon,
    newPokemon,
    pokemonList,
    pokemonTypeLength,
    pokemonTypes
  ]);

  // Updating Pokemon Data
  const handleUpdatePokemon = useCallback(
    () => {
      const id = pokemonList.filter((elem) => elem.name === pokeName)[0].id;
      updatePokemon({
          ...newPokemon,
          type: pokemonTypes[Math.floor(Math.random() * pokemonTypeLength)],
          hp: Math.floor(Math.random() * 100)
        }, id)
        .then(({ data }) => {
          if (data) {
            const copy = pokemonList.filter((elem) => elem.id !== id);
            copy.push(data);
            setPokemonList(copy);
            setPokeName(null);
          }
        })
        .catch((err) => console.error(err));
    },
    [
      updatePokemon, 
      setPokeName, 
      pokemonList, 
      newPokemon, 
      pokemonTypes,
      pokeName,
      pokemonTypeLength
    ]
  );

  const handleUpdateModal = (id: number) => {
    handleModalVisibility();
    const pokem = pokemonList.find((elem: Pokemon) => elem.id === id);
    if (pokem) setPokeName(pokem?.name);
  };

  // Deleting Pokemon from server
  const handleDeletePokemon = useCallback(
    (id: number) => {
      deletePokemon(id)
        .then(({ data }) => {
          if (data) {
            setSelectedPokemon(
              selectedPokemon.filter((elem: number) => elem !== id)
            );
            setPokemonList(
              pokemonList.filter((elem: Pokemon) => elem.id !== id)
            );
          }
        })
        .catch((err) => console.error(err));
    },
    [deletePokemon, setSelectedPokemon, selectedPokemon, pokemonList]
  );

  // Filtering data for real time searching results
  const filteringData = useCallback(() => {
    return pokemonList.filter((item: Pokemon) =>
      item.name.toLowerCase().startsWith(pokemonName.toLowerCase())
    );
  }, [pokemonList, pokemonName]);

  const handleSelect = useCallback(
    (id: number) => {
      setSelectedPokemon([...selectedPokemon, id]);
      setTimeout(() => setPokemonName(""), 100);
    },
    [selectedPokemon, setPokemonName]
  );

  return (
    <div className="mainContainer">
      <section className="section1">
        <p onClick={() => console.log(selectedPokemon)} className="title">
          {title}
        </p>
        <div className="boxContainer">
          <div className="inputContainer">
            <FiSearch className="searchIcon" />
            <input
              type="text"
              className="pokemonName"
              onChange={handleChange}
              value={pokemonName}
              placeholder={inputPlaceholder}
            />
            {pokemonName.length !== 0 && pokemonName !== null && (
              <div className="options">
                {filteringData().map((elem: Pokemon, index: number) => (
                  <p
                    key={index}
                    onClick={() => handleSelect(elem?.id)}
                    className="pokemonRow"
                  >
                    {elem?.name}
                  </p>
                ))}
              </div>
            )}
          </div>
          <button
            data-testid="addNewPokemonButton"
            className="newButton"
            onClick={handleAddNew}
          >
            <FiPlus className="plusIcon" />
            {buttonValue}
          </button>
        </div>
      </section>
      <section className="section2">
        {dataRows.map((title_: string, index: number) => (
          <p key={index} className="titleStyle">
            {title_}
          </p>
        ))}
      </section>
      <section className="sectionRows">
        {selectedPokemon.length !== 0 &&
          pokemonList
            .filter(
              (elem_: Pokemon, index: number) =>
                elem_.id === selectedPokemon[index]
            )
            .map((item: Pokemon) => {
              return titlesIndex.map((elem: string, ind: number) => (
                <p key={ind} className="titleStyle">
                  {ind === 1 && <FiImage className="pic" />}
                  {ind !== 1 && ind !== 4 && item[elem]}
                  {ind === 4 && (
                    <div key={ind} className="imgContainer">
                      <MdOutlineEditNote
                        onClick={() => handleUpdateModal(item?.id)}
                        className="pic"
                      />
                      <MdDeleteOutline
                        onClick={() => handleDeletePokemon(item.id)}
                        className="pic"
                      />
                    </div>
                  )}
                </p>
              ));
            })}
      </section>
      {addNew && (
        <EditWindow
          data-testid="addNewPokemonWindow"
          handleCreateNewPokemon={handleFillPokemonSchema}
          handleManageData={handleCreatePokemon}
          handleCancel={handleAddNew}
        />
      )}
      <EditModal
        open={showModal}
        handleCancel={handleModalVisibility}
        handleCloseModal={handleModalVisibility}
        pokemonName={pokeName}
        handleCreateNewPokemon={handleFillPokemonSchema}
        handleManageData={handleUpdatePokemon}
      />
    </div>
  );
}
