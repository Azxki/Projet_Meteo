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

let aujourdhui = new Date();
date.innerHTML = aujourdhui.toLocaleDateString();


let printPosition = function (coordinates) {
    console.log(coordinates)

    let requestURL =
        "https://api.openweathermap.org/data/2.5/weather?lat=" + `${coordinates.coords.latitude}` + "&lon=" + `${coordinates.coords.longitude}` + "&lang=fr&appid=8a4a001f1348b4bd88e32c9272eb8994&units=metric";

    button.addEventListener('click', function () {
        requestURL =
            "https://api.openweathermap.org/data/2.5/weather?q=" + input.value + "&appid=8a4a001f1348b4bd88e32c9272eb8994&lang=fr&units=metric";

        let xhr = new XMLHttpRequest();

        xhr.open("GET", requestURL);
        xhr.responseType = "json";

        xhr.onload = function () {
            if (xhr.status !== 200) {
                alert("Une erreur est survenue !");
                return;
            }

            let response = xhr.response;
            console.log(response);
            ville.innerHTML = response.name;
            degres.innerHTML = Math.trunc(response.main.temp) + "°";
            temperature.innerHTML = Math.trunc(response.main.temp_max) + "°";
            temperature2.innerHTML = Math.trunc(response.main.temp_min) + "°";
            visibility.innerHTML = "visibilité de " + response.visibility/1000 + "km";
            sunrise.innerHTML = new Date (response.sys.sunrise*1000).getHours() + "h" + new Date (response.sys.sunrise*1000).getMinutes();
            sunset.innerHTML = new Date (response.sys.sunset*1000).getHours() + "h0" + new Date (response.sys.sunset*1000).getMinutes();
            temps.innerHTML = response.weather[0].description;
            humidity.innerHTML = "Humidité : " + Math.trunc(response.main.humidity) + "%";
        }

        xhr.send();
    })
    xhr = new XMLHttpRequest();

    xhr.open("GET", requestURL);
    xhr.responseType = "json";

    xhr.onload = function () {
        if (xhr.status !== 200) {
            alert("Une erreur est survenue !");
            return;
        }

        let response = xhr.response;
        console.log(response);
        ville.innerHTML = response.name;
        degres.innerHTML = Math.trunc(response.main.temp) + "°";
        temperature.innerHTML = Math.trunc(response.main.temp_max) + "°";
        temperature2.innerHTML = Math.trunc(response.main.temp_min) + "°";
        visibility.innerHTML = "visibilité de " + response.visibility/1000 + "km";
        sunrise.innerHTML = new Date (response.sys.sunrise*1000).getHours() + "h" + new Date (response.sys.sunrise*1000).getMinutes();
        sunset.innerHTML = new Date (response.sys.sunset*1000).getHours() + "h0" + new Date (response.sys.sunset*1000).getMinutes();
        temps.innerHTML = response.weather[0].description;
        humidity.innerHTML = "Humidité : " + Math.trunc(response.main.humidity) + "%";

        if (response.weather[0].main === "Clouds") {
            document.body.style.backgroundColor = "#879cb6";
        }
    }
    xhr.send();
}


navigator.geolocation.getCurrentPosition(printPosition);
