export default function Choice({ text, handleClick }){
    return(
        <button className="choice" onClick={handleClick}> {text} </button>
    )
}
