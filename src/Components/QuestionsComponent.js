function QuestionsComponent({setStatus}) {
    return (
        <div>
            <p>QuestionsComponent</p>
            <button onClick={() => {setStatus("CreatePlayer")}}> Suivant </button>
        </div>
    );
}

export default QuestionsComponent