function CategoriesComponent({setStatus}) {
    return (
        <div>
            <p>CategoriesComponent</p>
            <button onClick={() => {setStatus("Question")}}> Commencer </button>
        </div>
    );
}

export default CategoriesComponent