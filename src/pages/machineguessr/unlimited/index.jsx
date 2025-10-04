import React, { useState, useCallback,useEffect } from "react";
import { machinesdata } from "../../../data/machine_data";
import PlayArea from "../../../components/ui/PlayArea";
import GameDisplay from "../../../components/ui/GameDisplay";

const MACHINES = Object.keys(machinesdata).map(key =>({name:key}));

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
            {/*<GameDisplay health={health} machineImage={""}/> */ }
            <p>Score: {score} Health: {health}</p>
            <p>{currentMachine.name}</p>
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