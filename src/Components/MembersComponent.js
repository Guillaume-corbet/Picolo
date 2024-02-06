function MembersComponent({setStatus, setPlayer}) {
    return (
        <div>
            <p>MembersComponent</p>
            <button onClick={() => {setStatus("ChooseCategories")}}> Suivant </button>
        </div>
    );
}

export default MembersComponent