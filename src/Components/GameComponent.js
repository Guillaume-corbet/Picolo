import React from 'react';
import "../Style/GameComponent.css";

import MembersComponent from "./MembersComponent"
import CategoriesComponent from "./CategoriesComponent"
import QuestionsComponent from "./QuestionsComponent"

function GameComponent() {

    const [status, setStatus] = React.useState("CreatePlayer");
    const [player, setPlayer] = React.useState([]);
    const [categories, setCategories] = React.useState("");

    return (
        <div className='gameFond'>
            {
                status === "CreatePlayer" ?
                    <MembersComponent setStatus={setStatus} setPlayer={setPlayer} player={player}/>
                : status === "ChooseCategories" ?
                    <CategoriesComponent setStatus={setStatus} setCategories={setCategories} categories={categories} />
                :
                    <QuestionsComponent categories={categories} players={player} setStatus={setStatus} />
            }
        </div>
    );
}

export default GameComponent