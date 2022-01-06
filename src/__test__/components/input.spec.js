import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Input from "../../components/Search";
import {
  LocateCepProvider,
  LocateCepContext,
  ceps,
  setCepNumber,
  cepNumber,
  handleSearch,
  setCeps,
} from "../../providers/CepProvider";
import Providers from "../../providers";
import Search from "../../components/Search";

/*
jest.mock("../../providers/CepProvider");

const mockedProvider = () => ({
  LocateCepProvider: {
    setCepnumber: jest.fn(),
  }
})
*/

/*
jest.mock("react-input", () => ({ options, value, onChange }) => {
  function setCepNumber(event) {
    const option = options.find(
      (option) => option.value === event.currentTarget.value
    );
    onChange(option);
  }

  return <input data-testid="select" value={value} onChange={setCepNumber} />;
});
*/

describe("Input Component", () => {
  test("should be able to render an input", async () => {
    render(
      <Input
        type="number"
        placeholder="Insira o CEP"
        register={() => {}}
        onChange={(event) => setCepNumber(event.target.value)}
      />
    );

    expect(screen.getByPlaceholderText("Insira o CEP")).toBeTruthy();

    const inputElement = screen.getByPlaceholderText("Insira o CEP");
    expect(inputElement).toBeTruthy();
  });

  test("Change input value", async () => {
    /*
    render(
      <Input
        type="number"
        placeholder="Insira o CEP"
        register={() => {}}
        onChange={(event) => setCepNumber(event.target.value)}
      />
    );
    */
    render(
      <LocateCepProvider>
        <Search />
      </LocateCepProvider>
    );
    const inputElement = screen.getByPlaceholderText("Insira o CEP");

    fireEvent.change(inputElement, { target: { value: "60410505" } });
    //userEvent.type(inputElement, "60410505");
    //fireEvent.change(inputElement, "60410505");

    expect(inputElement.value).toBe("60410505");
    /*
    await waitFor(() => {
      //expect(inputElement.props.value).toEqual("60410505");
      //expect(inputElement).toHaveValue(Number("60410505"));
    });
    */
  });
});
