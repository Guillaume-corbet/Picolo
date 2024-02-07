import React from 'react';
import { Button, TextField } from "@mui/material";

function MembersComponent({setStatus, setPlayer, player}) {

    const [name, setName] = React.useState("");

    const addPlayer = () => {
        setPlayer([...player, name])
        setName("")
    }

    return (
        <div>
            <br></br>
            <TextField id="input_player_name" label="Nom du joueur" value={name} onChange={(event) => {setName(event.target.value)}}/>
            <Button variant="contained" disabled={player.length > 7 || name.length === 0} onClick={() => {addPlayer()}}> Ajouter un joueur</Button>
            <Button variant="contained" disabled={player.length < 2} onClick={() => {setStatus("ChooseCategories")}}> Suivant </Button>
            <h1>Players :</h1>
            {
                player.map((item, index) => (
                    <p key={index}>
                        {item}
                    </p>
                ))
            }
        </div>
    );
}

export default MembersComponent