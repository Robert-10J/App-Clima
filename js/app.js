import { api_key } from "./api_key.js";

const infor = document.querySelector('.resultados');
const ciudad = document.querySelector('#city');

let ciudadBus = '';

ciudad.addEventListener('input', ( e ) => {
    e.preventDefault()
    ciudadBus = e.target.value;    
}); 

function validar(e) {
    e.preventDefault();

    if( ciudad.value === '') {
        alert();      
    } else {
        mostrarClima();       
    }
}

function alert() {
    const p = document.createElement('p');
    const div = document.createElement('div');

    p.innerHTML = 'No ingreso el nombre de <span>una ciudad</span>';
    div.appendChild(p);
    div.classList.add('alert');

    infor.appendChild( div );

    setTimeout(() => {
        div.remove();
    }, 3000);
}

const formulario = document.querySelector('.formulario');
formulario.addEventListener('submit', validar);

/* function mostrarClima() {

    const url = `https://api.openweathermap.org/data/2.5/weather?q=${ciudadBus}&appid=${api_key}&lang=sp&units=metric`;

    fetch( url )
        .then( respuesta => respuesta.json())
        .then( mostrar => printHTML(mostrar))
        //.catch( error => console.log( error))     
} */ 

async function mostrarClima() {
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${ciudadBus}&appid=${api_key}&lang=sp&units=metric`;
    const resp = await fetch( url );
    const { data } = await resp.json();
    printHTML(data)
}

function printHTML({ main, weather,  name}) {

    const {temp, temp_min ,humidity} = main;
    const info = weather[0];
    const icon = `https://openweathermap.org/img/wn/${info.icon}@2x.png`;

    infor.innerHTML = `
        <p>Temperatura: <span> ${temp} C°</span></p>
        <p>Temperatura Mínima: <span> ${temp_min} C°</span></p>
        <p>Húmedad: <span> ${humidity}%</span></p>
        <p>Ciudad: <span> ${name}</span></p>
        <p>Clima: <span>${info.description}</span></p>
        <img src=${icon}>
    `;
}