const textField = document.querySelector('#my_text');
const generateVoiceButton = document.querySelector('#generate_voice');
const optionField = document.querySelector('#voice_option');
let optionFieldValue = optionField.selectedIndex;
generateVoiceButton.addEventListener("click", () => {
    /**
     * this trims the trailing whitespace of the input text
     */
    // textFieldTrim = textField.trim;
    if (textField.value == "") {
        textField.focus();
        console.log("empty");
        return alert("Kindly fill in the text field");
    } else {
        callApi(textField, optionFieldValue);
    }
});
optionField.addEventListener("change", () => {
    optionFieldValue = optionField.selectedIndex;
    alert("hello");
    console.log("Option Field Value is : ", optionFieldValue);
})
window.addEventListener("load", (event) => {
    event.preventDefault();
});