import { useParams } from "react-router-dom";
import React, { useState, useEffect } from 'react';
import Oeuvres from './OeuvresResearched/Oeuvres';
import Searchbar from '../../../components/SearchBar/Searchbar';
import data from '../../../services/liste-musees.json';

function Oeuvre() {

    const { userId } = useParams();
    const [musees, setMusee] = useState(data)
    const [query, setQuery] = useState("")

    const searchMusee = () => {
        const filteredResults = data.filter((item) => {
            const museeName = item.nom_officiel_du_musee;
            return museeName && museeName.toLowerCase().includes(query?.toLowerCase?.());
        });

        setMusee(filteredResults);
    };

    useEffect(() => {
        searchMusee();
    }, [query]);

    // const searchMusee = async () => {
    //     setQuery(query);

    //     const filteredResults = data.filter((item) => {
    //         const museeName = item.nom_officiel_du_musee;
    //         return museeName && museeName.toLowerCase().includes(query.toLowerCase());
    //     });

    //     setMusee([filteredResults]);
    // };

    return (
        <>
            <Searchbar search={searchMusee} searchQuery={query} onWriting={setQuery} />
            <Oeuvres />
        </>
    )
}
export default Oeuvre