import {render, screen} from "@testing-library/react";

import Options from "../Options.jsx";

test("displays image from each scoop option from server",async()=>{

render(<Options optionType="scoops"/>)
    // find the images
    const scoopImages = await screen.findAllByRole('img', {name : /scoop$/i})
    expect(scoopImages).toHaveLength(2);

// confirm alt text of images

    const altText  = scoopImages.map((ele)=>ele.alt);
    expect(altText).toEqual(["Chocolate scoop", "Vanilla scoop"])
})