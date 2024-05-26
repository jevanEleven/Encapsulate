import { render } from "@testing-library/react";
import Navbar from "@/components/navbar";
import { Button } from "@/components/ui/button";

// this test is just to show that the snapshot is the same, it is useless
it("renders button unchanged", () => {
    const { container } = render(<Button />);
    expect(container).toMatchSnapshot();
});
