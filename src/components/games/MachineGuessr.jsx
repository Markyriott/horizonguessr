import React, { useState, useCallback,useEffect } from "react";
import { machinesdata } from "../../data/machine_data";

const MACHINES = Object.keys(machinesdata).map(key =>({name:key}));

function Choice({ text, handleClick }){
    return(
        <button className="choice" onClick={handleClick}> {text} </button>
    )
}

function PlayArea({ answer, options, answerCheck, difficulty}){
    const handleClick = (selectedOption)=>{
        if (answer == selectedOption){
            answerCheck(true);
        } else {answerCheck(false)}
    }

    const handleSubmit = (inputMachine) =>{
        if (answer.toLowerCase() == inputMachine.trim().toLowerCase()){
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

export default function UnlimitedMachineGuessr({  }){
    const [currentMachine, setCurrentMachine] = useState([]);
    const [options, setOptions] = useState([]);
    const [score, setScore] = useState(0);
    const [health, setHealth] = useState(3);

    useEffect(()=>{
        getQuestion();
    }, [])
    
    const getQuestion = useCallback(() => {
        const question = generateQuestion(MACHINES, 3, currentMachine);
        setCurrentMachine(question[0]);
        setOptions(question[1]);
    }, [currentMachine, score])


    const resetGame = () =>{
        setScore(0);
        setHealth(3);
        getQuestion();
    }
    const handleAnswer = (answer) => {
        if (answer){
            console.log("YOU WON! GENERATING NEXT QUESTION!");
            setScore(score + 1);
            getQuestion();
        } else {
            if (health > 1){
                setHealth(health - 1);
                console.log(`current health: ${health - 1}`);
            } else {
                console.log('lost... resetting...');
                resetGame();
            }
        }
    }


    return(
        <div className="game-container">
            <h2>{currentMachine.name}</h2>
            <PlayArea answer = {currentMachine.name} options = {options} answerCheck = {handleAnswer} difficulty={0} />
        </div>
    )    
}

function shuffleArray(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}

function generateQuestion(arr, numOptions, lastOption){
  const shuffled = shuffleArray([...arr]);

  const getNextOption = () => shuffled[shuffled.length - 1] === lastOption ? shuffled[shuffled.length - 2] : shuffled[shuffled.length - 1];
  const nextOption = getNextOption();

  const specificIndex = shuffled.findIndex((item) => item.name === nextOption.name);

  if (specificIndex >= numOptions + 1) {
      const randomIndex = Math.floor(Math.random() * (numOptions + 1));
      [shuffled[specificIndex], shuffled[randomIndex]] = [shuffled[randomIndex], shuffled[specificIndex]];
  }
  const options = shuffled.slice(0, numOptions + 1);
  return [nextOption, options];
}