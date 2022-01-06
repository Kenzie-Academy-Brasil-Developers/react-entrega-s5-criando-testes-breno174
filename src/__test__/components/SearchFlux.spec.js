import React from "react";
import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import Search from "../../components/Search";
import App from "../../App";
import axios from "axios";
import userEvent from "@testing-library/user-event";
import Providers from "../../providers/index";
import {
  LocateCepProvider,
  LocateCepContext,
  ceps,
  setCepNumber,
  cepNumber,
  handleSearch,
  setCeps,
} from "../../providers/CepProvider";
import api from "../../services";
import MockAdapter from "axios-mock-adapter";

/*
jest.mock("api-mock", () => ({
  ...jest.requireActual("api-mock"),
  Link: ({ children }) => children,
  useHistory: () => ({
    push: jest.fn(),
  }),
}));
*/

/**
 * render(<Provider><element></Provider>)
 */

//jest.mock("axios");
//const mockedAxios = axios;

const apiMock = new MockAdapter(api);

describe("page search flow test", () => {
  it("shold be able to type a CEP", async () => {
    apiMock.onGet("60410505").replyOnce(200, {
      complemento: "de 351/352 a 1298/1299",
      bairro: "Jardim América",
      cidade: "Fortaleza",
      logradouro: "Rua Júlio César",
      estado_info: {
        area_km2: "148.887,632",
        codigo_ibge: "23",
        nome: "Ceará",
      },
      cep: "60410505",
      cidade_info: {
        area_km2: "314,93",
        codigo_ibge: "2304400",
      },
      estado: "CE",
    });

    render(
      <LocateCepProvider>
        <App />
      </LocateCepProvider>
    );
    //render(<Providers />);
    //render(<LocateCepProvider />);
    /*
    render(
      <LocateCepContext.Provider
        value={{ ceps, setCepNumber, cepNumber, handleSearch, setCeps }}
      >
        {<Search />}
      </LocateCepContext.Provider>
    );
   */

    //mockedAxios.get.mockResolvedValueOnce({ data: { dadosCep } });

    const butonElement = screen.getByText("Buscar pelo CEP");
    const inputElement = screen.getByPlaceholderText("Insira o CEP");

    fireEvent.change(inputElement, { target: { value: "60410505" } });
    //fireEvent.change(setCepNumber("60410505"));
    fireEvent.click(butonElement);

    await waitFor(() => {
      //expect(inputElement).toHaveValue(Number("60410505"));
      const bairro = screen.getByText("Bairro");
      expect(bairro).toBeInTheDocument();
    });
  });
  /*
  it("shold not be able to type a CEP", async () => {
    render(
      <LocateCepProvider>
        <Search />
      </LocateCepProvider>
    );

    const butonElement = screen.getByText("Buscar pelo CEP");
    const inputElement = screen.getByPlaceholderText("Insira o CEP");

    fireEvent.change(inputElement, { target: { value: "abracadabra" } });
    await waitFor(() => {
      expect(inputElement).not.toHaveValue("abracadabra");
      fireEvent.click(butonElement);
    });
  });
  */
});
