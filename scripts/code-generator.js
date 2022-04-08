/**
 * This function genrates a pseudorandom number. 
 * This is done by multiplying the Math.random() by the max vaule of our code subtracted by the min value of our code.
 * And adding back the min vaule.
 * @param {*} min vaule
 * @param {*} max vauel
 * @returns a pseudorandom number
 */
function randomIntFromInterval(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min);
}

/**
 * The copyClipborad() function finds the id "code" in the HTML document.
 * And whatever text is inside the text field gets coiped.
 * Afterwhich, it runs the showCodeCopiedMessage() function.
 */
function copyClipboard() {
    let copyCode = document.getElementById("code");
    //Select the text field
    // copyCode.select();

    //Copy the text inside the text field
    navigator.clipboard.writeText(copyCode.value);

    //Alert the copied code
    // alert("Watch-Party Code Copied" + copyCode.value);
    showCodeCopiedMessage();
}

/**
 * Displays a message when the fuction is run.
 */
function showCodeCopiedMessage() {
    const messageElement = document.querySelector("#copy-success");
    messageElement.style.visibility = "visible";

    setTimeout(function () {
        messageElement.style.visibility = "hidden";
    }, 2000)
}