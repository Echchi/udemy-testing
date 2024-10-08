import {render, screen} from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Options from "../../entry/Options.jsx";

test("updates scoop subtotal when scoops change", async ()=>{
    const user = userEvent.setup()
    render(<Options optionType={"scoops"}
    />);

    // make sure total starts out at $0.00
    const scoopsSubtotal = screen.getByText("Scoops total : $", {exact : false})
    expect(scoopsSubtotal).toHaveTextContent("0.00")

    // update vanilla scoops to 1, and check subtotal
const vanillaInput =await screen.findByRole('spinbutton',{name : 'Vanilla'})

    await user.clear(vanillaInput);
    await user.type(vanillaInput, '1');
    expect(scoopsSubtotal).toHaveTextContent("2.00")

    // update chocolate scoops to 2 and check subtotal

    const ChocolateInput = await screen.findByRole("spinbutton", {name : "Chocolate"})

    await user.clear(ChocolateInput);
    await user.type(ChocolateInput, "2");
    expect(scoopsSubtotal).toHaveTextContent("6.00")
})