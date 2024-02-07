import React from 'react';
import { Button } from '@mui/material';

function CategoriesComponent({setStatus, setCategories, categories}) {

    const ChooseCategories = (categories) => {
        setCategories(categories)
        setStatus("Question")
    }

    return (
        <div>
            <Button variant='contained' onClick={() => {ChooseCategories("normal")}}> Normal 😁 </Button>
            <Button variant='contained' onClick={() => {ChooseCategories("fun")}}> Fun 🥳 </Button>
            <Button variant='contained' onClick={() => {ChooseCategories("caliente")}}> Caliente 🥰 </Button>
        </div>
    );
}

export default CategoriesComponent