export interface Pokemon {
  id: number;
  name: string;
  image: string;
  attack: string;
  defense: string;
  hp: number;
  type: string;
  id_author: number;
}

export interface NewPokemon {
  name: string | null;
  image: string | null;
  attack: number | null;
  defense: number | null;
  type: string | null;
  idAuthor: number;
  hp: number | null;
  created_at: string | null;
  updated_at: string | null;
}

export interface EditWindowProps {
  pokemonName: string | null;
  handleCreateNewPokemon: any;
  handleCancel: () => void;
  handleManageData: () => void | ((arg: number) => void);
}

export interface ModalProps extends EditWindowProps {
  handleCloseModal: () => void;
  open: boolean;
  image: string | null;
}

export interface DeletedPokemon {
  data: Pokemon[];
  success: boolean;
  type: string;
}
