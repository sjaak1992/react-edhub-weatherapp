import React, {useState} from 'react';
import './SearchBar.css';



function SearchBar({setLocationHandler}) {
//Props meegeven als parameter, deze zitten in callback functie app. props. nu zijn ze gedestructered
    // function SearchBar (props)
    // console.log(props) om te kijken of deze goed zijn doorgegeven

    const [query, setQuery] = useState('');

    function handleClick (){
    setLocationHandler(query);
    }

    function keyPressCheck (e){
        if(e.keycode === 13){
         setLocationHandler(query);
        }
    }


    return (

        <span className="searchbar">
      <input
          onKeyUp={keyPressCheck}
          onChange={(e) => setQuery(e.target.value)}
          value={query}
          type="text"
          name="search"
          placeholder="Zoek een stad in Nederland"
      />

      <button
          type="button"
          onClick={handleClick}

      >
        Zoek
      </button>
    </span>
    );
}

export default SearchBar;
