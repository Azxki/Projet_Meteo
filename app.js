

const requestURL =
    "https://api.openweathermap.org/data/2.5/weather?lat=50.0153&lon=4.0478&appid=8a4a001f1348b4bd88e32c9272eb8994";

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
    let wind = response.wind;
    alert("Hello " + wind.deg + " " + wind.gust);
}

xhr.send();