/**
 * to initiate material css select option
 * and to call the function optionFieldValueUpdate whenever the voice selection changes
 */
$(document).ready(function () {
    $("select").material_select();
    // $("select").material_select("destroy");

    $("#voice_option").change(() => {
        optionFieldValueUpdate();
    });
});

const formMain = document.getElementById('form_main');
const textField = document.querySelector('#my_text');
const generateVoiceButton = document.querySelector('#generate_voice');
const optionField = document.getElementById('voice_option');
const darkModeButton = document.getElementById('dark_mode');
const body = document.getElementById('body');
darkModeButton.addEventListener("click", () => {
    console.log("dark mode status");
    let db = localStorage.getItem("darkModeStatus");
    if (db == "true") {
        localStorage.setItem("darkModeStatus", "false");
        updateUI("false");
    } else {
        localStorage.setItem("darkModeStatus", "true");
        updateUI("true")
    }

});
const updateUI = (bool) => {
    const optionElements = document.querySelector('.dropdown-content.select-dropdown');
    if (bool == "true") {
        body.style.backgroundColor = "black";
        body.style.color = "white";
        darkModeButton.checked = true;
        optionElements.style.backgroundColor = "black";
    } else {
        body.style.backgroundColor = "white";
        body.style.color = "black";
        darkModeButton.checked = false;
        optionElements.style.backgroundColor = "white";

    }
}
const availableVoiceOption = [{
        key: "0",
        voice: "Female American"
    },
    {
        key: "1",
        voice: "Male American"
    },
    {
        key: "2",
        voice: "Female British"
    }
];
let optionFieldValue = optionField.selectedIndex;

const callApi = (text, voiceNeeded) => {
    let data;
    const apiUrl = "https://gateway-lon.watsonplatform.net/text-to-speech/api";
    const api_key = "LBkt6caJAgBB_Go7B-5MTOwAYRWHOMF2kvTIbMFFNqBZ";
    console.log("Text is : ", text + " and voiceNeeded is : ", voiceNeeded);
    generateVoiceButton.className = "waves-effect waves-light btn disabled";
    fetch(`${apiUrl}?apikey=${api_key}`).then((response) => {
        return response.json();
    }).then((processed) => {
        data = processed;
        console.log("data : ", data);
    }).catch((err) => {
        console.log("unable to fetch api");
    })
}


generateVoiceButton.addEventListener("click", () => {
    /**
     * this trims the trailing whitespace of the input text
     */
    textFieldTrim = textField.value.trim();
    if (textFieldTrim == "") {
        textField.focus();
        return alert("Kindly fill in the text field");
    } else {

        availableVoiceOption.forEach((element) => {
            if (element.key == optionFieldValue) {
                callApi(textFieldTrim, element.voice);
            }
        });
    }
});
optionFieldValueUpdate = () => {
    optionFieldValue = optionField.selectedIndex;
    console.log("Option Field Value is : ", optionFieldValue);
}
window.addEventListener("DOMContentLoaded", (event) => {
    event.preventDefault();
    const optionElements = document.querySelector('.dropdown-content.select-dropdown');
    let db = localStorage.getItem("darkModeStatus");
    if (db == null) {
        localStorage.setItem("darkModeStatus", "false");
        body.style.backgroundColor = "white";
        optionElements.style.backgroundColor = "black";
        darkModeButton.checked = true;
    } else {
        if (db == "true") {
            console.log("true");
            updateUI("true")
        } else {
            console.log("false");
            updateUI("false");
        }
    }
});