//Genarates a random code
function randomIntFromInterval(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min); 
}

//Copy to clipboard
function copyClipboard() {
    let copyCode = document.getElementById("code");
    //Select the text field
    // copyCode.select();

    //Copy the text inside the text field
    navigator.clipboard.writeText(copyCode.value);

    //Alert the copied code
    alert("Watch-Party Code Copied " + copyCode.value);
}
