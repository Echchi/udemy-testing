import axios from "axios";
import {useEffect, useState} from "react";
import ScoopOption from "./ScoopOption.jsx";
import {Row} from "react-bootstrap";
import ToppingOption from "./ToppingOption.jsx";
import AlertBanner from "../common/AlertBanners.jsx";
export default function Options({optionType}){
    const [items, setItems] = useState([])
    const [error, setError] = useState(false)
    // optionType is 'scoops' or 'toppings'
    useEffect(()=>{
        axios.get(`http://localhost:3030/${optionType}`).then(res => setItems(res.data)).catch((error)=>{
            setError(true)
        })
    },[optionType])
    if(error){
        return <AlertBanner/>
    }

    // TODO : replace 'null' with ToppingIiotion when available
    const ItemComponent = optionType === "scoops"? ScoopOption : ToppingOption;
    const optionItems = items.map((item)=>(
        <ItemComponent key={item.name} name={item.name} imagePath={item.imagePath}/>
    ))
    return <Row>{optionItems}</Row>
}