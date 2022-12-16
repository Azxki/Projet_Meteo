let ville = document.getElementById('ville');
let date = document.getElementById('date');
let degres = document.getElementById('degres');
let button = document.getElementById('button');
let input = document.getElementById('input');

let aujourdhui = new Date();
date.innerHTML = aujourdhui.toLocaleDateString();


let printPosition = function (coordinates) {
    console.log(coordinates)

    let requestURL =
        "https://api.openweathermap.org/data/2.5/weather?lat=" + `${coordinates.coords.latitude}` + "&lon=" + `${coordinates.coords.longitude}` + "&appid=8a4a001f1348b4bd88e32c9272eb8994&units=metric";

    button.addEventListener('click', function () {
        requestURL =
            "https://api.openweathermap.org/data/2.5/weather?q=" + input.value + "&appid=8a4a001f1348b4bd88e32c9272eb8994&units=metric";

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
            ville.innerHTML = response.name + ", " + response.sys.country;
            degres.innerHTML = Math.trunc(response.main.temp) + "°C";
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
        ville.innerHTML = response.name + ", " + response.sys.country;
        degres.innerHTML = Math.trunc(response.main.temp) + "°C";
    }

    xhr.send();
}


navigator.geolocation.getCurrentPosition(printPosition);
