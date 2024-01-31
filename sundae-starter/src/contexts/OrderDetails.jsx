import {createContext,useContext, useState} from "react";
import {pricePerItem} from "../constants/index.js";

const OrderDetails = createContext();

// create custom hook to check whether we're in a provider

export function useOrderDetails(){
    const contextValue = useContext(OrderDetails);

    if(!contextValue){
        throw new Error (
            "useOrderDetails must be called from within an OrderDetailsProvider"
        )
    }

    return contextValue
}

export function OrderDetailsProvider(props){
    const [optionCounts, setOptionCounts] = useState({
        scoops : {}, // example : { Chocolate : 1, Vanilla :2 }
        toppings : {} // example : { "Gummi Bear" : 1 }
    })
    function updateItemCount (itemName, newItemCount, optionType){
        // make a copy existing state
        const newOptionCounts = {...optionCounts};

        // update the copy with the new information
        newOptionCounts[optionType][itemName]= newItemCount

        // update the state with the updated copy
        setOptionCounts(newOptionCounts)
    }
    function resetOrder(){
        setOptionCounts({scoops:  {}, toppings:  {}})
    }

    // optionCounts state 값에서 총액을 구하는 함수
    function calculateTotal(optionType){
// 옵션 타입에 따라 요소별 개수 배열을 가져온다 (예. [1, 2])
        const countsArray = Object.values(optionCounts[optionType]);

        // 각각 요소의 개수 배열의 합계
        const totalCount = countsArray.reduce((total,value)=>(total + value , 0))

        // 옵션 타입에 따라 각각 요소의 가격을 곱해준다
        return totalCount * pricePerItem[optionType]
    }

    const totals = {
        scoops : calculateTotal("scoops"),
        toppins : calculateTotal("toppings")
    }

const value={optionCounts,updateItemCount, resetOrder, totals}

    return <OrderDetails.Provider value={value} {...props}/>
}