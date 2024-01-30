import { http, HttpResponse } from 'msw'
import {render, screen} from "@testing-library/react";
import OrderEntry from "../OrderEntry.jsx";
import {server} from "../../../mocks/server.js";

test.only('handle error for scoops and toppings routes', async ()=>{
server.resetHandlers(
    http.get("http://localhost:3030/scoops", ()=>{
        return new HttpResponse(null, {status : 500})
    }),
    http.get("http://localhost:3030/toppings", ()=>{
        return new HttpResponse(null, {status : 500})
    })
)

    render (<OrderEntry/>);

const alerts= await screen.findAllByRole("alert")
expect(alerts).toHaveLength(2)
})