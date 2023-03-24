(function () {
    "use strict";

    //clock

    document.addEventListener("DOMContentLoaded", function () {

        let c = document.getElementById("clock");

        setInterval(updateClock, 1000);

        function updateClock() {
            let date = new Date();
            let withOffset = date.getSeconds();
            date.setSeconds(withOffset);
            let h = date.getHours();
            h %= 12;
            let m = date.getMinutes();
            let s = date.getSeconds();

            if (h < 10) {
                h = "0" + h;
            }

            if (m < 10) {
                m = "0" + m;
            }

            if (s < 10) {
                s = "0" + s;
            }

            c.innerHTML = h + ":" + m + ":" + s;
        }

    });

    // forms

    document.getElementById("form").addEventListener("submit", estimateDelivery);

    let e = document.getElementById("delivery");
    e.innerHTML = "0,00 &euro;";

    function validateTextField(field, fieldname) {
        if (field.value === "") {
            alert(`Tekstiväli ${fieldname} ei tohi olla tühi!`);
            field.focus();
        } else if (/\d/.test(field.value)) {
            alert(`Tekstiväli ${fieldname} ei tohi sisaldada numbreid!`);
            field.focus();
        } else{
            return false;
        }
        return true;
    }

    function estimateDelivery(event) {
        event.preventDefault();
        // lisage vormile sisendi kontroll:
        // tekstiväljad ei tohi olla tühjad,
        // ei tohi sisaldada numbreid,
        // üks raadionuppudest peab olema valitud
        // (vastasel juhul visatakse ette alert aken) jne.;


        let fname = document.getElementById("fname");
        if (validateTextField(fname, "eesnimi")){
            return;
        }

        let lname = document.getElementById("lname");
        if (validateTextField(lname, "perekonnanimi")){
            return;
        }
        let linn = document.getElementById("linn");

        if (linn.value === "") {
            alert("Palun valige linn nimekirjast");
            linn.focus();
            return;
        }

        let price = 0;

        switch (linn.value) {
            case 'trt':
            case 'nrv':
                price = 2.5;
                break;
            case 'prn':
                price = 3;
                break;
        }
        let present = document.getElementById("vehicle1");
        let contactless = document.getElementById("vehicle2");

        if (present.checked) {
            price += 5;
        }

        if (contactless.checked) {
            price += 1;
        }
        let radio;
        if((radio = document.querySelector("input[name=dtype]:checked")) === null){
            alert("Palun valige tarne suvand!");
            return;
        }
        price += radio.id === 't1' ? 6 : 0;

        e.innerHTML = `${price} &euro;`;


        console.log("Tarne hind on arvutatud");
    }

})();

// map

let mapAPIKey = "AlUn-OMY1d5YSqgVlrPQAAqFJrOWFC0dSvI7w0xPrEV-QmFS2utDVBKtxo4tNtGA";

let map;

function GetMap() {

    "use strict";
    let centerPoint = new Microsoft.Maps.Location(
        (58.38104 + 59.44968) / 2,
        (26.71992 + 24.87155) / 2
    );

    let ut = new Microsoft.Maps.Location(
        58.38104,
        26.71992
    );

    let my = new Microsoft.Maps.Location(
        59.44968,
        24.87155
    );

    map = new Microsoft.Maps.Map("#map", {
        credentials: mapAPIKey,
        center: centerPoint,
        zoom: 7,
        mapTypeId: Microsoft.Maps.MapTypeId.road,
        // disablePanning: true
    });

    let pushpin1 = new Microsoft.Maps.Pushpin(ut, {
        title: 'Tartu Ülikool',
        text: 'UT'
    });
    let infobox1 = new Microsoft.Maps.Infobox(map.getCenter(), {
        title: 'Tartu Ülikool',
        description: 'Hea koht',
        visible: false
    });
    let pushpin2 = new Microsoft.Maps.Pushpin(my, {
        title: 'Minu koht',
        text: 'K'
    });
    let infobox2 = new Microsoft.Maps.Infobox(map.getCenter(), {
        title: 'Minu koht',
        description: "Suvaline kirjeldus",
        visible: false
    });
    infobox1.setMap(map);
    infobox2.setMap(map);
    Microsoft.Maps.Events.addHandler(pushpin1, 'click', pushpinClicked(infobox1));
    Microsoft.Maps.Events.addHandler(pushpin2, 'click', pushpinClicked(infobox2));
    map.entities.push(pushpin1);
    map.entities.push(pushpin2);
}

function pushpinClicked(infobox) {
    return function (e) { //kasutame sulundi, et erinevaid infoboxe kasutada
        infobox.setOptions({
            location: e.target.getLocation(),
            visible: true
        });
    }
}

// https://dev.virtualearth.net/REST/v1/Locations?q=1000 Vin Scully Ave, Los Angeles,CA&key=YOUR_KEY_HERE

