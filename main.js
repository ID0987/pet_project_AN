const findInput = document.querySelector('.search__input');
const findBtnSearch = document.querySelector('.search__btn');
const findCityWeather = document.querySelector('.weather__container__block__select__city');
const findFavourites = document.querySelector('.weather__container__block__select__favourites');
const findCitys = document.querySelector('.citys');
const findTemp = document.querySelector('.weather__temp');

import tasksMJSon from "./citys.json" with {type: "json"};

const addClickInput = findBtnSearch.addEventListener('click' , showUrl);
const addFavouritesCity = findFavourites.addEventListener('click' , favouritesCity);

// const arrFinde = [];
document.addEventListener("DOMContentLoaded", rendorState);

async function showUrl(){
    const cityName = findInput.value;
    console.log(cityName);
    const serverUrl = 'http://api.openweathermap.org/data/2.5/weather';
    const apiKey = 'f660a2fb1e4bad108d6160b7f58c555f';
    const url = `${serverUrl}?q=${cityName}&appid=${apiKey}`;
    console.log(url);
    const getUrl = await fetch(url)
    .then(resalt => {
        return resalt.json();
    })
    .then(resalt => {
        findTemp.textContent = resalt.main.temp;
        findCityWeather.textContent = resalt.name;
    })
    .catch(err => console.error(err))
    .finally(() => {
        findInput.value = '';
    })
    return getUrl;
}

const arrFavourites = JSON.parse(localStorage.getItem("favoritCityLocalKey")) || tasksMJSon;

function rendorState() {
    delOldTaskHTML()
    for(let i of arrFavourites) {
        console.log(arrFavourites);
        const addInHtml = document.createElement('div');
        addInHtml.classList.add("weather__container__city");
        addInHtml.innerHTML = `
        <div class='weather__container__city__name'>${i}</div>
        <div class='weather__container__city__closes'>x</div>
        `;
        console.log(i);
        findCitys.insertAdjacentElement('beforeend', addInHtml);
    }

    const findCityAddBtn = document.querySelectorAll('.weather__container__city__name');
    for (let i of findCityAddBtn) {
        i.addEventListener("click", chooseCityFavorites);
    }

    const findCityClosesBtn = document.querySelectorAll('.weather__container__city__closes');
    for (let i of findCityClosesBtn) {
        i.addEventListener("click", delFavouritesCityFun);
    }
}

function delOldTaskHTML() {
    const oldFavorite = document.querySelectorAll('.weather__container__city');
    oldFavorite.forEach(el => el.remove());
}

function favouritesCity(e) {
    e.preventDefault();
    console.log(arrFavourites);
    if(arrFavourites.includes(findCityWeather.textContent)) return;
    const addInHtml = document.createElement('div');
    addInHtml.classList.add("weather__container__city");
    addInHtml.innerHTML = `
        <div class='weather__container__city__name'>${findCityWeather.textContent}</div>
        <div class='weather__container__city__closes'>x</div>
    `;
    arrFavourites.push(findCityWeather.textContent);
    
    localStorage.setItem("favoritCityLocalKey", JSON.stringify(arrFavourites));
    
    findCitys.insertAdjacentElement('beforeend', addInHtml);
    rendorState()
}

async function chooseCityFavorites(e){
    const delcity = e.target.closest('.weather__container__city');
    const findTextContent = delcity.querySelector('.weather__container__city__name').textContent;
    const serverUrl = 'http://api.openweathermap.org/data/2.5/weather';
    const apiKey = 'f660a2fb1e4bad108d6160b7f58c555f';
    const url = `${serverUrl}?q=${findTextContent}&appid=${apiKey}`;
    console.log(url);
    const getUrl = await fetch(url)
    .then(resalt => {
        return resalt.json();
    })
    .then(resalt => {
        findTemp.textContent = resalt.main.temp;
        findCityWeather.textContent = resalt.name;
    })
    return getUrl
}

function delFavouritesCityFun(e) {
    e.preventDefault();
    const delcity = e.target.closest('.weather__container__city');
    const findTextContent = delcity.querySelector('.weather__container__city__name').textContent;
    const index = arrFavourites.indexOf(findTextContent);
    if(index !== -1) {
        arrFavourites.splice(index, 1);
    }
    localStorage.setItem("favoritCityLocalKey", JSON.stringify(arrFavourites));
    rendorState()
    // delcity.remove();
}

