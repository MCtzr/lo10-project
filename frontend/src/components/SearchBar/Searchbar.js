
import Dictaphone from '../SpeechRecognition/Dictaphone';

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
      <Dictaphone onSpeech={props.onWriting} searchFunction={props.search}/>
    </div>
  );
};

export default SearchBar;