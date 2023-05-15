import React, { useState, useEffect } from 'react';
import Musees from './MuseesResearched/Musees';
import Searchbar from '../../../components/SearchBar/Searchbar';
import data from '../../../services/liste-musees.json';

function Page1() {

    const [filteredMusees, setFilteredMusees] = useState(data);
    const [query, setQuery] = useState("")

    const searchMusee = () => {
        let filteredResults;

        filteredResults = data.filter((item) => {
            const museeName = item.nom_officiel_du_musee;
            return museeName && museeName.toLowerCase().includes(query?.toLowerCase?.());
        });

        setFilteredMusees(filteredResults);
    };

    useEffect(() => {
        searchMusee();
    }, [query]);

    return (
        <>
            <Searchbar search={searchMusee} searchQuery={query} onWriting={setQuery} />
            <Musees data={filteredMusees} />
        </>
    )
}

export default Page1;