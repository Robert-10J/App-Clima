import { api_key } from "./api_key.js";

export const mostrarClima = async () => {
    const ciudadBus = 'Acapulco';
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${ciudadBus}&appid=${api_key}&lang=sp&units=metric`;
    const resp = await fetch( url );
    const { data } = await resp.json();
    console.log( data );
}