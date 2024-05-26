import { render } from "@testing-library/react";
import React from "react";
import { Input, MultiFileInput, TextArea } from "@/components/ui/input"

describe("Form Inputs", () => {
  it("renders a default Input component", () => {
    const { container } = render(<Input />);
    expect(container).toMatchSnapshot();
  });

  it("renders a default MultiFileInput component", () => {
    const { container } = render(<MultiFileInput />);
    expect(container).toMatchSnapshot();
  });

  it("renders a default TextArea component", () => {
    const { container } = render(<TextArea />);
    expect(container).toMatchSnapshot();
  });
});