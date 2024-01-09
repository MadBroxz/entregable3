import axios from "axios";
import { useEffect, useState } from "react";
import useDebounce from "./useDebounce";

const Location = ({ location, setLocation }) => {
const [text, setText] = useState("");
const [locations, setLocations] = useState([]);
const debounceValue = useDebounce(text, 500);

const handleInput = (e) => {
    setText(e.target.value);
};

useEffect(() => {
    // Verificar si el texto es un número (posible ID)
    if (!isNaN(text)) {
    const locationId = parseInt(text, 10);
    // Realizar la solicitud para obtener la ubicación por ID
    axios
        .get(`https://rickandmortyapi.com/api/location/${locationId}`)
        .then(({ data }) => {
        setLocation(data);
        })
        .catch((err) => console.log(err));
    } else {

    axios
        .get(`https://rickandmortyapi.com/api/location/?name=${debounceValue}`)
        .then(({ data }) => {
        setLocations(data.results || []);
        })
        .catch((err) => console.log(err));
    }
}, [text, setLocation, debounceValue]);

return (
    <section className="text-center items-center sm:flex flex-col gap-10 px-1 bg-[url('/bg-header.jpg')] bg-contain">
    <form
        onSubmit={(e) => e.preventDefault()}
        className="form grid relative sm:w-[600px] mx-auto w-[300px]"
    >
        <input
        type="text"
        value={text}
        className="outline-none p-3 px-4 bg-transparent border-[1px] text-white border-[#8EFF8B] text-sm sm:text-lg"
        name="locationName"
        onChange={handleInput}
        onClick={() => setLocations([])} 
        autoComplete="off"
        placeholder="Type a location..."
        />
        {locations.length > 0 && (
        <div className="flex absolute top-12 border-[1px] border-[#8EFF8B] bg-black/90 text-white flex-col z-10 h-32 sm:h-42 w-[18.76rem] text-[.7rem] sm:w-full sm:text-lg overflow-y-scroll gap-4 py-4 px-3 shadowbox">
            {locations.map((location) => (
            <div
                key={location.id}
                className="hover:text-[#8EFF8B] cursor-pointer w-full"
                onClick={() => {
                setText(location.name);
                setLocation(location);
                setLocations([]); 
                }}
            >
                {location.name}
            </div>
            ))}
        </div>
        )}
    </form>

    <h3 className="text-[#8EFF8B] text-md sm:hidden py-10">
        ¡Welcome to {location.name}!
    </h3>

    <article className="border-[1px] border-[#8EFF8B] hidden sm:flex flex-col h-[150px] justify-evenly gap-4 md:w-[750px]">
        <h3 className="text-[#8EFF8B] text-lg md:text-2xl sm:text-xl">
        ¡Welcome to {location.name}!
        </h3>
        <ul className="flex text-[#938686] md:text-md md:justify-around lg:text-lg sm:text-[1rem] text-sm gap-10 px-10">
        <li>Type: {location.type}</li>
        <li>Dimension: {location.dimension}</li>
        <li>Population: {location.residents.length}</li>
        </ul>
    </article>
    </section>
);
};

export default Location;
