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
const body = document.getElementById('body');
// const formMain = document.getElementById('form_main');
const textField = document.querySelector('#my_text');
const generateVoiceButton = document.querySelector('#generate_voice');
const clearTextButton = document.querySelector('#clear_text');
const optionField = document.getElementById('voice_option');
const darkModeButton = document.getElementById('dark_mode');
let optionsElements = document.getElementById('voice_option').options;
let optionFieldValue = optionField.selectedIndex;
let optionFieldPassed = optionsElements[optionFieldValue].textContent;
// console.log("optionField : ", optionFieldPassed);
const availableVoiceOption = synth.onvoiceschanged = () => {
    return synth.getVoices();
}

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
        const availableVoiceArray = availableVoiceOption();
        availableVoiceArray.forEach((element) => {
            if (element.name == optionFieldPassed) {
                callApi(textFieldTrim, element);
            }
        });
    }
});


clearTextButton.addEventListener("click", () => {
    /**
     * To clear the text in the textField
     */
    textField.value = "";
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

const callApi = (text, voiceNeeded) => {
    console.log("call api seen here");
    const utterThis = new SpeechSynthesisUtterance(text);
    console.log("voice needed is : ", voiceNeeded);
    utterThis.voice = voiceNeeded;
    synth.speak(utterThis);
}



const optionFieldValueUpdate = () => {
    /**
     * this gives the selected index of the option chosen
     */
    optionFieldValue = optionField.selectedIndex;

    /**
     * this gives the text of the option chosen
     */
    optionFieldPassed = optionsElements[optionFieldValue].textContent;
    // console.log("Option Field Value is : ", optionFieldValue);
}

window.addEventListener("load", (event) => {
    event.preventDefault();
    const optionElements = document.querySelector('.dropdown-content.select-dropdown');
    let db = localStorage.getItem("darkModeStatus");
    if (db == null) {
        localStorage.setItem("darkModeStatus", "false");
        body.style.backgroundColor = "white";
        optionElements.style.backgroundColor = "black";
        darkModeButton.checked = fasle;
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