import React, { useEffect } from 'react';

function SearchBar(props) {
  //data = Object.values(data)[0];
  //const [searchQuery, setSearchQuery] = useState();
  //const [searchResults, setSearchResults] = useState([data]);

  //const handleSearch = (e) => {
  //    const query = e.target.value;
  //    setSearchQuery(query);
  //
  //  const filteredResults = data.filter((item) => {
  //      const museeName = item.nom_officiel_du_musee;
  //      return museeName && museeName.toLowerCase().includes(query.toLowerCase());
  //    });
  //    setSearchResults([filteredResults]);
  //};


  const handleSearch = (e) => {
    props.search(props.searchQuery)
    props.onWriting(e.target.value)
  };

  return (
    <div className='searchbar'>
      <input
        type="text"
        value={props.searchQuery}
        onChange={handleSearch}
        placeholder="Rechercher..."
      />
    </div>
  );
};

export default SearchBar;