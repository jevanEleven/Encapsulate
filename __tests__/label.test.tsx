import { render, screen } from "@testing-library/react";
import { Label } from "@/components/ui/label";

describe("Label", () => {
  it("renders a default label", () => {
    render(<Label>Label</Label>);

    // Ensure the label is in the document
    const label = screen.getByText("Label");

    // Use Jest's `toBeTruthy` matcher to check if the label exists
    expect(label).toBeTruthy();
  });
});
