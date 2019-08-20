/* eslint-disable no-undef */
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
const synth = window.speechSynthesis;
// const formMain = document.getElementById('form_main');
const textField = document.querySelector('#my_text');
const generateVoiceButton = document.querySelector('#generate_voice');
const optionField = document.getElementById('voice_option');
const darkModeButton = document.getElementById('dark_mode');
const availableVoiceOption = [{
        key: "0",
        voice: "Google US English"
    },
    {
        key: "1",
        voice: "Google UK English Female"
    },
    {
        key: "2",
        voice: "Google UK English Male"
    }
];
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

console.log("available : ", availableVoiceOption);
let optionFieldValue = optionField.selectedIndex;
console.log("optionField : ", optionFieldValue);

const callApi = (text, voiceNeeded) => {
    const utterThis = new SpeechSynthesisUtterance(text);
    console.log("voice needed is : ", voiceNeeded);
    // utterThis.voice = voiceNeeded;
    synth.speak(utterThis);
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
        // console.log(availableVoiceOption);
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