import { render, screen, fireEvent } from "@testing-library/react";
import DashboardPage from "../containers/DashboardPage";

describe("Rendering DashboardPage", () => {
  let addNewButton: any;
  let addNewWindow: any;
  beforeEach(() => {
    render(<DashboardPage />);
    addNewButton = screen.getByTestId("addNewPokemonButton");
    addNewWindow = screen.getByTestId("addNewPokemonWindow");
  });

  test("Button is Showing the 'Add new Pokemn window'!", () => {
    fireEvent.click(addNewButton);
    expect(addNewWindow).toBeTruthy();
  });
});