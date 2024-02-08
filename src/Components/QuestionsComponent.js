import React from "react";
import _ from 'lodash'

import allData from '../allData.js'
import { Button } from "@mui/material";

function QuestionsComponent({categories, players}) {

    const [data, setData] = React.useState(_.cloneDeep(allData[categories]));
    const [winSip, setWinSip] = React.useState(1)
    const [loseSip, setLoseSip] = React.useState(1)
    const [difficulty, setDifficulty] = React.useState(1)
    const [goodRules, setGoodRules] = React.useState("")
    const [nb, setNb] = React.useState(-1)

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
        if (nb + 1 === data["difficulty"][0].length) {
            setNb(0)
        } else {
            setNb(nb + 1)
            newNb = nb + 1
        }
        let newWinSip = generateRandomInteger(data["difficulty"][0][newNb].min_Sip_Win, data["difficulty"][0][newNb].max_Sip_Win)
        let newLoseSip = generateRandomInteger(data["difficulty"][0][newNb].min_Sip_Lose, data["difficulty"][0][newNb].max_Sip_Lose)
        setWinSip(newWinSip)
        setLoseSip(newLoseSip)
        setGoodRules(changeRules(data["difficulty"][0][newNb].rules, players, newWinSip, newLoseSip))
    }

    React.useEffect(() => {
        nextQuestion()
    },[])

    return (
        <div>
            {goodRules}
            <Button variant="contained" onClick={() => {nextQuestion()}}>Question suivante</Button>
        </div>
    );
}

export default QuestionsComponent