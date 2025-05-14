import React, { useState } from "react";

function Choice({ text, handleClick}){
    return(
        <button className="choice" onClick={handleClick}> {text} </button>
    )
}

export default function UnlimitedMachineGuessr({}){
    return(
        <div className="game-container">
            <Choice />            
        </div>
    )    
}