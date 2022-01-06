import React from "react";
import { fireEvent, render, screen } from "@testing-library/react";
import Button from "../../components/Search";

describe("Button component", () => {
  test("Shold be able to render an Button", () => {
    render(
      <Button primary disable={false}>
        Buscar pelo CEP
      </Button>
    );

    const butonElement = screen.getByText("Buscar pelo CEP");

    fireEvent.click(butonElement);
  });
});
