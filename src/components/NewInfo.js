import React, {useEffect, useState} from "react";
const NewInfo = () =>{
    const [temp,setTemp] = useState(0);
    useEffect(()=>{
        console.log("upadated")
        setTimeout(()=>{
            setTemp(prevState=>{
                return prevState+1;
            })
        },10000)
    },[temp])
    return (
        <div>{temp}</div>
    );
}

export default NewInfo;