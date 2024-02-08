import React from "react";
import _ from 'lodash'

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
        newRules = newRules.replace("{SHOT_WIN}", newWinSip)
        newRules = newRules.replace("{SHOT_LOSE}", newLoseSip)
        for (let x = 0;x < choosenPlayer.length; x++) {
            newRules = newRules.replace("{NAME_" + (x + 1) + "}", choosenPlayer[x])
        }
        return (newRules)
    }

    const nextQuestion = () => {
        let newNb = 0
        let newDifficulty = difficulty
        if (nb + 1 === data["difficulty"][newDifficulty].length || nb + 1 > 19) {
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
        let newWinSip = generateRandomInteger(data["difficulty"][newDifficulty][newNb].min_Sip_Win, data["difficulty"][newDifficulty][newNb].max_Sip_Win)
        let newLoseSip = generateRandomInteger(data["difficulty"][newDifficulty][newNb].min_Sip_Lose, data["difficulty"][newDifficulty][newNb].max_Sip_Lose)
        setWinSip(newWinSip)
        setLoseSip(newLoseSip)
        setGoodRules(changeRules(data["difficulty"][newDifficulty][newNb].rules, players, newWinSip, newLoseSip))
    }

    React.useEffect(() => {
        nextQuestion()
    },[])

    return (
        <div>
            {
                questionStatus == "playing" ?
                    <div>
                        <p>Difficulty : {difficulty + 1}</p>
                        <br></br>
                        <p>{goodRules}</p>
                        <br></br>
                        <Button variant="contained" onClick={() => {nextQuestion()}}>Question suivante</Button>
                    </div>
                :
                    <p>END</p>
            }
        </div>
    );
}

export default QuestionsComponent