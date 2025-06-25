let btn = document.querySelector("#btn")
let content = document.querySelector("#content")
let voice = document.querySelector("#voice")

function speak(text) {
    window.speechSynthesis.cancel(); // cancel any queued speeches

    let message = new SpeechSynthesisUtterance(text);
    message.lang = "en-US";
    message.onstart = () => console.log("Speech started");
    message.onerror = (e) => console.error("Speech error", e);
    message.onend = () => console.log("Speech ended");

    window.speechSynthesis.speak(message);
}




function wishMe() {
    let day = new Date()
    let hours = day.getHours()
    if (hours >= 0 && hours < 12) {
        speak("Good Morning Sir")
    }
    else if (hours >= 12 && hours < 16) {
        speak("Good afternoon Sir")
    } else {
        speak("Good Evening Sir")
    }
}
window.speechSynthesis.onvoiceschanged = () => {
    // Optional preload logic here
};

let speechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition
let recognition = new speechRecognition()
recognition.onresult = (event) => {
    let currentIndex = event.resultIndex
    let transcript = event.results[currentIndex][0].transcript
    content.innerText = transcript
    takeCommand(transcript.toLowerCase())
}
btn.addEventListener("click", () => {
    recognition.start()
    voice.style.display = "block"
    btn.style.display = "none"
})
function takeCommand(message) {
    voice.style.display = "none"
    btn.style.display = "flex"
    if (message.includes("hello") || message.includes("hey")) {
        speak("hello sir,what can i help you?")
    }
    else if (message.includes("who are you")) {
        speak("i am virtual assistant ,created by Altamash ")
    } else if (message.includes("open youtube")) {
        speak("opening youtube...")
        window.open("https://youtube.com/", "_blank")
    }
    else if (message.includes("open google")) {
        speak("opening google...")
        window.open("https://google.com/", "_blank")
    }
    else if (message.includes("open facebook")) {
        speak("opening facebook...")
        window.open("https://facebook.com/", "_blank")
    }
    else if (message.includes("open instagram")) {
        speak("opening instagram...")
        window.open("https://instagram.com/", "_blank")
    }
    else if (message.includes("open calculator")) {
        speak("opening calculator..")
        window.open("calculator://")
    }
    else if (message.includes("open whatsapp")) {
        speak("opening whatsapp..")
        window.open("whatsapp://")
    }
    else if (message.includes("time")) {
        let time = new Date().toLocaleString(undefined, { hour: "numeric", minute: "numeric" })
        speak(time)
    }
    else if (message.includes("date")) {
        let date = new Date().toLocaleString(undefined, { day: "numeric", month: "short" })
        speak(date)
    }
    else {
        let finalText = "this is what i found on internet regarding" + message.replace("jenny", "") || message.replace("jenny", "")
        speak(finalText)
        window.open(`https://www.google.com/search?q=${message.replace("jenny", "")}`, "_blank")
    }
}