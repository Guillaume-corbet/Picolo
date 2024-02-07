import React from 'react';

import MembersComponent from "./MembersComponent"
import CategoriesComponent from "./CategoriesComponent"
import QuestionsComponent from "./QuestionsComponent"

function GameComponent() {

    const [status, setStatus] = React.useState("CreatePlayer");
    const [player, setPlayer] = React.useState([]);

    return (
        <div>
            {
                status === "CreatePlayer" ?
                    <MembersComponent setStatus={setStatus} setPlayer={setPlayer} player={player}/>
                : status === "ChooseCategories" ?
                    <CategoriesComponent setStatus={setStatus} />
                :
                    <QuestionsComponent setStatus={setStatus} />
            }
        </div>
    );
}

export default GameComponent