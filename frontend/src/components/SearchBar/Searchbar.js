function SearchBar(props) {

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