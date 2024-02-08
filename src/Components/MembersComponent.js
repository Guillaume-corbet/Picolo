import React from 'react';
import { Button, TextField } from "@mui/material";
import DeleteIcon from '@mui/icons-material/Delete'

function MembersComponent({setStatus, setPlayer, player}) {

    const [name, setName] = React.useState("");

    const addPlayer = () => {
        setPlayer([...player, name])
        setName("")
    }

    const testPlayer = () => {
        setPlayer(["Guillaume", "Gabriel", "Simon", "Bruno"])
    }

    const removePlayer = (index) => {
        setPlayer(oldValues => {
            return oldValues.filter((_, i) => i !== index)
        })
    }

    return (
        <div>
            <br></br>
            <TextField id="input_player_name" label="Nom du joueur" value={name} onChange={(event) => {setName(event.target.value)}}/>
            <Button variant="contained" disabled={player.length > 7 || name.length === 0} onClick={() => {addPlayer()}}> Ajouter un joueur</Button>
            <Button variant="contained" disabled={player.length < 2} onClick={() => {setStatus("ChooseCategories")}}> Suivant </Button>
            <Button variant="contained" onClick={() => {testPlayer()}}>Test Value</Button>
            <h1>Players :</h1>
            {
                player.map((item, index) => (
                    <Button variant='contained' startIcon={<DeleteIcon />} key={index} onClick={() => {removePlayer(index)}}>
                        {item}
                    </Button>
                ))
            }
        </div>
    );
}

export default MembersComponent