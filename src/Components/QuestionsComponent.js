import React from "react";
import _, { random } from 'lodash'
import "../Style/QuestionComponent.css";

import allData from '../allData.js'
import { Button } from "@mui/material";

function QuestionsComponent({categories, players}) {

    const [data, setData] = React.useState(_.cloneDeep(allData[categories]));
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
        newRules = newRules.replaceAll("{SHOT_WIN}", newWinSip)
        newRules = newRules.replaceAll("{SHOT_LOSE}", newLoseSip)
        for (let x = 0;x < choosenPlayer.length; x++) {
            newRules = newRules.replaceAll("{NAME_" + (x + 1) + "}", choosenPlayer[x])
        }
        return (newRules)
    }

    const nextQuestion = () => {
        let newNb = 0
        let newDifficulty = difficulty
        if (data["difficulty"][newDifficulty].length == 0 || nb + 1 > 19) {
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
                    <p>difficulty</p>
                :
                    <p>END</p>
            }
        </div>
    );
}

export default QuestionsComponent