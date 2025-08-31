import Choice from "./Choice";

export default function PlayArea({ answer, options, answerCheck, difficulty }){
    const handleClick = (selectedOption)=>{
        if (answer == selectedOption){
            answerCheck(true);
        } else {answerCheck(false)}
    }

    const handleSubmit = (inputAnswer) =>{
        if (answer.toLowerCase() == inputAnswer.trim().toLowerCase()){
            answerCheck(true);
        } else {answerCheck(false)}
    }

    return (
        <div className='play-area'>
            {difficulty <= 1 ?
            options.map((option)=>(
                <Choice
                    key={option.name}
                    text={option.name}
                    handleClick={()=>handleClick(option.name)}
                />
            )) : <p>Diff greater than 1</p>}
        </div>
    )
}