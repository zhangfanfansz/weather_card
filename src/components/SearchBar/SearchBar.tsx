import React, {useState} from "react";
import "./SearchBar.css";

interface SearchBarProps {
  handleCity: (city: string)=> void;
}



const SearchBar: React.FC<SearchBarProps> = (props) => {
  const [Keyword, setKeyword] = useState('');

  const handleInputChange = (e: any)=>{
    setKeyword(e.target.value);
  }
  
  return (
    <>
      <div className="search-bar">
        <input
          type="text"
          placeholder="Search for a city"
          value={Keyword}
          onChange={handleInputChange}
        />
        <button onClick={()=>{props.handleCity(Keyword)}}>Search</button>
      </div>
    </>
  )
}

export default SearchBar;