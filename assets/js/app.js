//Création des variables
let ville = document.getElementById('ville');
let date = document.getElementById('date');
let degres = document.getElementById('degres');
let temperature = document.getElementById('temperature');
let temperature2 = document.getElementById('temperature2');
let button = document.getElementById('button');
let input = document.getElementById('input');
let humidity = document.getElementById('humidite');
let sunrise = document.getElementById('sunrise');
let sunset = document.getElementById('sunset');
let temps = document.getElementById('temps');
let visibility = document.getElementById('visibility');
let image1 = document.getElementById('image1');
let image2 = document.getElementById('image2');
let image3 = document.getElementById('image3');
let aujourdhui = new Date();

//Introduction de la Date sur la page grâce à l'ID 'date'
date.innerHTML = aujourdhui.toLocaleDateString();

//Création de la première fonction avec les données de geolocalisation de l'utilisateur
let printPosition = function (coordinates) {
    console.log(coordinates)
    //Introduction de l'API avec les données de latitude et longitude de l'utilisateur
    let requestURL =
        "https://api.openweathermap.org/data/2.5/weather?lat=" + `${coordinates.coords.latitude}` + "&lon=" + `${coordinates.coords.longitude}` + "&lang=fr&appid=8a4a001f1348b4bd88e32c9272eb8994&units=metric";
    xhr = new XMLHttpRequest();
    xhr.open("GET", requestURL);
    xhr.responseType = "json";
    //Génére une alert "Une erreur est survenue !" si le XML charge mal sinon affiché le script suivant
    xhr.onload = function () {
        if (xhr.status !== 200) {
            alert("Une erreur est survenue !");
            return;
        }
        //Insertion des données dans la page HTML, grâce à l'API
        let response = xhr.response;
        console.log(response);
        ville.innerHTML = response.name;
        degres.innerHTML = Math.trunc(response.main.temp) + "°";
        temperature.innerHTML = Math.trunc(response.main.temp_max) + "°";
        temperature2.innerHTML = Math.trunc(response.main.temp_min) + "°";
        visibility.innerHTML = "visibilité de " + response.visibility/1000 + "km";
        sunrise.innerHTML = new Date (response.sys.sunrise*1000).getHours() + "h" + new Date (response.sys.sunrise*1000).getMinutes();
        sunset.innerHTML = new Date (response.sys.sunset*1000).getHours() + "h" + new Date (response.sys.sunset*1000).getMinutes();
        temps.innerHTML = response.weather[0].description;
        humidity.innerHTML = "Humidité : " + Math.trunc(response.main.humidity) + "%";
        //Changement de background selon la météo
        if (response.weather[0].main === "Clouds") {
            image1.style.opacity = "1";
            image2.style.opacity = "0";
            image3.style.opacity = "0";
        }

        if (response.weather[0].main === "Clear") {
            image1.style.opacity = "0";
            image2.style.opacity = "1";
            image3.style.opacity = "0";
        }

        if (response.weather[0].main === "Rain") {
            image1.style.opacity = "0";
            image2.style.opacity = "0";
            image3.style.opacity = "1";
        }
    }
    xhr.send();

    //*************************************************//


    //Ajout d'un AddEventListener pour le bouton "rechercher" sur la page
    button.addEventListener('click', function () {
        //Ajout d'une API avec la ville entrée par l'utilisateur
        requestURL =
            "https://api.openweathermap.org/data/2.5/weather?q=" + input.value + "&appid=8a4a001f1348b4bd88e32c9272eb8994&lang=fr&units=metric";
        //Création du XML
        let xhr = new XMLHttpRequest();
        xhr.open("GET", requestURL);
        xhr.responseType = "json";
        //Génére une alert "Une erreur est survenue !" si le XML charge mal sinon affiché le script suivant
        xhr.onload = function () {
            if (xhr.status !== 200) {
                alert("Une erreur est survenue !");
                return;
            }
            //Insertion des données dans la page HTML, grâce à l'API
            let response = xhr.response;
            console.log(response);
            ville.innerHTML = response.name;
            degres.innerHTML = Math.trunc(response.main.temp) + "°";
            temperature.innerHTML = Math.trunc(response.main.temp_max) + "°";
            temperature2.innerHTML = Math.trunc(response.main.temp_min) + "°";
            visibility.innerHTML = "visibilité de " + response.visibility/1000 + "km";
            sunrise.innerHTML = new Date (response.sys.sunrise*1000).getHours() + "h" + new Date (response.sys.sunrise*1000).getMinutes();
            sunset.innerHTML = new Date (response.sys.sunset*1000).getHours() + "h" + new Date (response.sys.sunset*1000).getMinutes();
            temps.innerHTML = response.weather[0].description;
            humidity.innerHTML = "Humidité : " + Math.trunc(response.main.humidity) + "%";
            //Changement de background selon la météo
            if (response.weather[0].main === "Clouds") {
                image1.style.opacity = "1";
                image2.style.opacity = "0";
                image3.style.opacity = "0";
            }

            if (response.weather[0].main === "Clear") {
                image1.style.opacity = "0";
                image2.style.opacity = "1";
                image3.style.opacity = "0";
            }

            if (response.weather[0].main === "Rain") {
                image1.style.opacity = "0";
                image2.style.opacity = "0";
                image3.style.opacity = "1";
            }
        }

        xhr.send();
    })
}

//Demande d'utilisation des données géographique de l'utilisateur
navigator.geolocation.getCurrentPosition(printPosition);
