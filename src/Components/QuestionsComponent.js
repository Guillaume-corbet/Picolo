import React from "react";
import _, { random } from 'lodash'
import "../Style/QuestionComponent.css";

import allData from '../allData.js'
import { Button } from "@mui/material";

function QuestionsComponent({categories, players, setStatus}) {

    const initData = (data, players, categories) => {
        let newData = _.cloneDeep(data[categories])
        let x = 0
        let y = 0
        while (x < newData['difficulty'].length) {
            while (y < newData['difficulty'][x].length) {
                if (players.length > newData['difficulty'][x][y]['player_Max'] || players.length < newData['difficulty'][x][y]['player_Min']) {
                    console.log("data removed")
                    newData['difficulty'][x].splice(y, 1)
                    y = y - 1
                }
                y = y + 1
            }
            x = x + 1;
        }
        return (newData)
    }

    const [data, setData] = React.useState(initData(allData, players, categories));
    const [winSip, setWinSip] = React.useState(1)
    const [loseSip, setLoseSip] = React.useState(1)
    const [difficulty, setDifficulty] = React.useState(0)
    const [goodRules, setGoodRules] = React.useState("")
    const [nb, setNb] = React.useState(-1)
    const [questionStatus, setQuestionStatus] = React.useState("playing")

    const generateRandomInteger = (min, max) => {
        const minCeiled = Math.ceil(min);
        const maxFloored = Math.floor(max);
        return Math.floor(Math.random() * (maxFloored - minCeiled + 1) + minCeiled);
    }

    let countPlayer = (rules) => {
        return rules.split("{NAME_").length - 1
    }

    const choosePlayer = (players, number) => {
        let x = 0
        let choosenPlayer = []
        let copyPlayers = _.cloneDeep(players)
        while (x < number) {
            let nb = generateRandomInteger(0, copyPlayers.length - 1)
            choosenPlayer.push(copyPlayers[nb])
            copyPlayers.splice(nb, 1)
            x = x + 1
        }
         return (choosenPlayer)
    }

    const changeRules = (rules, players, newWinSip, newLoseSip) => {
        let choosenPlayer = choosePlayer(players, countPlayer(rules))
        let newRules = rules
        if (newWinSip > 1)
            newRules = newRules.replaceAll("{SHOT_WIN}", newWinSip + " gorgées")
        else
            newRules = newRules.replaceAll("{SHOT_WIN}", newWinSip + " gorgée")
        if (newLoseSip > 1)
            newRules = newRules.replaceAll("{SHOT_LOSE}", newLoseSip + " gorgées")
        else
            newRules = newRules.replaceAll("{SHOT_LOSE}", newLoseSip + " gorgée")
        for (let x = 0;x < choosenPlayer.length; x++) {
            newRules = newRules.replaceAll("{NAME_" + (x + 1) + "}", choosenPlayer[x])
        }
        return (newRules)
    }

    const nextQuestion = () => {
        let newNb = 0
        let newDifficulty = difficulty
        if (data["difficulty"][newDifficulty].length == 0 || nb + 1 > 19) {
            setQuestionStatus("difficulty")
            setNb(0)
            setDifficulty(difficulty + 1)
            newDifficulty = difficulty + 1
            while (newDifficulty < 5 && data["difficulty"][newDifficulty].length == 0) {
                newDifficulty = newDifficulty + 1
                setDifficulty(newDifficulty)
                if (newDifficulty == 5)
                break
            }
        } else {
            setNb(nb + 1)
            newNb = nb + 1
        }
        if (newDifficulty == 5) {
            setQuestionStatus("end")
            return;
        }
        let randomNumber = generateRandomInteger(0, data["difficulty"][newDifficulty].length - 1)
        let newWinSip = generateRandomInteger(data["difficulty"][newDifficulty][randomNumber].min_Sip_Win, data["difficulty"][newDifficulty][randomNumber].max_Sip_Win)
        let newLoseSip = generateRandomInteger(data["difficulty"][newDifficulty][randomNumber].min_Sip_Lose, data["difficulty"][newDifficulty][randomNumber].max_Sip_Lose)
        setWinSip(newWinSip)
        setLoseSip(newLoseSip)
        setGoodRules(changeRules(data["difficulty"][newDifficulty][randomNumber].rules, players, newWinSip, newLoseSip))
        data["difficulty"][newDifficulty].splice(randomNumber, 1)
    }

    React.useEffect(() => {
        nextQuestion()
    },[])

    return (
        <div className='gameQuestion'>
            {
                questionStatus == "playing" ?
                    <div>
                        <p>Difficulty : {difficulty + 1}</p>
                        <br></br>
                        <p>{goodRules}</p>
                        <br></br>
                        <Button variant="contained" onClick={() => {nextQuestion()}}>Question suivante</Button>
                    </div>
                : questionStatus == "difficulty" ?
                    <div>
                        <p>Changement de difficulté</p>
                        <Button variant="contained" onClick={() => {setQuestionStatus("playing")}} >Continuer</Button>
                    </div>
                :
                    <div className="endAccueil">
                        <p>Partie fini j'espère que vous avez bien bu et kiffer jouer à ce jeu. Penser à nous ajouter sur instagram:</p>
                        <br></br>
                        <a href="https://www.instagram.com/guillaume_corbet_/">Guillaume</a>
                        <br></br>
                        <br></br>
                        <a href="https://www.instagram.com/guahblyat/">Gabriel</a>
                        <br></br>
                        <br></br>
                    </div>
            }
            <Button variant="contained" onClick={() => {setStatus("CreatePlayer")}}>Accueil</Button>
        </div>
    );
}

export default QuestionsComponent