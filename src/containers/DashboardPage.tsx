/** 
 * I would like to get the schema for the body requests of the Pokemon API 
 */

import React, { useState, useEffect, useCallback } from "react";
import { FiSearch, FiPlus } from "react-icons/fi";
import { MdClose, MdFileUpload, MdOutlineEditNote, MdDeleteOutline } from "react-icons/md";
import services from "../services/backend";
import { Pokemon } from "../interfaces/pokemon";

import configuration from "../data/configuration.json";
import frontData from "../data/containers/dashboard-page-data.json";
import "../styles/DashboardPage.css";

export default function DashboardPage(): JSX.Element {
   const { title, 
      inputPlaceholder, 
      buttonValue, 
      dataRows, 
      subtitle, 
      saveButton, 
      closeButton,
      inputTextLabels,
      skills,
      range,
      imagePlaceHolder,
      namePlaceHolder,
      pokemonTypes,
   } = frontData;

   const [addNew, setAddNew] = useState<boolean>(false);
   const [min, max] = range;
   const [ataque, defensa] = skills;
   const [name, image] = inputTextLabels;
   const lastItem: number = dataRows.length - 1;
   const pokemonTypeLength: number = pokemonTypes.length;
   // @ts-ignore
   const { authorId } = configuration;
   const { createNewPokemon, getPokemons, updatePokemon, deletePokemon } = services;
   const [pokemonList, setPokemonList] = useState<Pokemon[]>([]);
   const [pokemonName, setPokemonName] = useState<string>("");
   const [newPokemon, setNewPokemon] = useState<Pokemon>({
      id: 0,
      name: "",
      image: "",
      attack: "",
      defense: "",
      hp: 0,
      type: "",
      id_author: authorId,
   });

   useEffect(() => {
      getPokemons()
      .then(({ data }) => setPokemonList(data))
      .catch(err => console.log(err))
   }, [setPokemonList]);

   const handleAddNew = useCallback(() => setAddNew(!addNew), [setAddNew]);
   const handleChange = useCallback(({ target }: any) => setPokemonName(target.value), []);
   const handleCreateNewPokemon = useCallback(({ target }: any) => {
      setNewPokemon({ ...newPokemon, [target.name]: target.value })
   }, [setNewPokemon, newPokemon]);

   const handleSaveData = useCallback(() => {
      setNewPokemon({ 
         ...newPokemon, 
         id: pokemonList[pokemonList.length - 1].id + 1,
         type: pokemonTypes[Math.floor(Math.random() * pokemonTypeLength)],
         hp: Math.floor(Math.random() * 100),
      });
      createNewPokemon(newPokemon)
      .then(({ data }) => console.log(data))
      .catch(err => console.log(err))
   }, [setNewPokemon, createNewPokemon]);

   const handleUpdatePokemon = useCallback(() => {
      updatePokemon(newPokemon, 4446)
      .then(({ data }) => console.log("Updated", data))
      .catch(err => console.log(err));
   }, []);

   const handleDeletePokemon = useCallback(() => {
      deletePokemon(4446)
      .then(({ data }) => console.log("Deleted", data))
      .catch(err => console.log(err));
   }, []);

   // const filteringData = () => {
   //    const arr = pokemonList.filter((item: Pokemon) => 
   //    item.name.toLowerCase()
   //    .startsWith(pokemonName.toLowerCase()));
   //    return arr.map((item, index) =>
   //       <p key={index} className="pokemonRow">{item?.name}</p>
   //    );
   // }

   return (
      <div className="mainContainer">
         <section className="section1">
            <p className="title">{title}</p>
            <div className="boxContainer">
               <div className="inputContainer">
                  <FiSearch className="searchIcon"/>
                  <input 
                  type="text" 
                  className="pokemonName" 
                  onChange={handleChange} 
                  placeholder={inputPlaceholder} />
                  {/* {(pokemonName.length !== 0) && (
                     <div className="options">{filteringData()}</div>
                  )} */}
               </div>
               <button className="newButton" onClick={handleAddNew}>
                  <FiPlus className="plusIcon"/>
                  {buttonValue}
               </button>
            </div>
         </section>
         <section className="section2">
            {dataRows.map((item: string, index: number) => (
               index !== lastItem && (
                  <div key={index} className="boxData">
                     <div className="titleData t1">{item}</div>
                     <div className="titleData g">Valor</div>
                  </div>
               )
            ))}
            <div className="boxData">
               <div className="titleData t1">{dataRows[lastItem]}</div>
               <div className="titleData g actionarea">
                  <MdOutlineEditNote className="actionIcons"/>
                  <MdDeleteOutline className="actionIcons"/>
               </div>
            </div>
         </section>
         {addNew && (
            <section className="section3">
            <p className="title subtitle">{subtitle}</p>
            <div className="section3Container">
            <div className="boxSection">
               <label>
                  {name}
                  <input 
                  type="text" 
                  name="name"
                  className="newInputs" 
                  onChange={handleCreateNewPokemon} 
                  placeholder={namePlaceHolder} />
               </label>
               <label className="label2">
                  {image}
                  <input 
                  type="text"
                  name="image" 
                  className="newInputs" 
                  onChange={handleCreateNewPokemon}
                  placeholder={imagePlaceHolder} />
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
                  onChange={handleCreateNewPokemon} />
                  <label className="ranges">{max}</label>
               </div>
               <div className="rangeRow">
                  <label>{defensa}</label>
                  <p className="ranges">{min}</p>
                  <input 
                  type="range" 
                  name="defense" 
                  defaultValue={0}
                  onChange={handleCreateNewPokemon} />
                  <label className="ranges">{max}</label>
               </div>
            </div>
            </div>
            <div className="buttons">
               <button 
               className="newButton b" 
               onClick={handleSaveData}>
                  <MdFileUpload className="plusIcon"/>
                  {saveButton}
               </button>
               <button 
               className="newButton b" 
               onClick={handleAddNew}>
                  <MdClose className="plusIcon"/>
                  {closeButton}
               </button>
            </div>
         </section>
         )}
      </div>
   );
}