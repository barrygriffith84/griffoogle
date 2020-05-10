/* TODO: 
 -Add keyup event for the enter key
 -Refactor to reduce code smell
 -Break up into ES6 Modules
 -Comment code
 -Retest to make sure API Key still works
*/

const k1 = "20200424T141333Z"
const k2 = "1b8786ba0d533aeb"
const k3 = "e4278cb06f8fa7211135a90d661bd62aa32960fd"

//Click event to trigger the translation
document.querySelector("#translate-btn").addEventListener("click", translate)

function fetchFromAPI(text, lang) {
    return fetch("https://translate.yandex.net/api/v1.5/tr.json/translate?key=trnsl.1.1."+k1+"."+k2+"."+k3+"&text="+text+"&lang="+lang)
        .then(result => result.json())
}

//Function to translate text using Yandex Translate
function translate(){
    let text = document.querySelector("#translate-input").value;
    let inputLang = document.querySelector("#language-input").value;
    let outputLang = document.querySelector("#language-output").value;
    let lang = inputLang + '-' + outputLang;

    if(outputLang === "hill"){
        outputLang = "en"
        lang = inputLang + '-' + outputLang;
        fetchFromAPI(text, lang)
        .then(translatedString =>{         
        document.querySelector("#output-div").innerHTML = hillbillian(translatedString.text[0])    
        })
    } else {
        fetchFromAPI(text, lang)
        .then(translatedString =>{         
        document.querySelector("#output-div").innerHTML = translatedString.text[0]    
        })
    }
    
   
  }


document.querySelector("#translate-input").addEventListener("keyup", function(){
    detect()
})


let detect = () => {
    // let test = "this is a test I hope this is enough text"
    // let hint = ["english", "german", "spanish"]
    let text = document.querySelector("#translate-input").value
    let hint = ""
    fetch("https://translate.yandex.net/api/v1.5/tr.json/detect?key=trnsl.1.1."+k1+"."+k2+"."+k3+"&text="+text+"&[hint=english,spanish,german]")
    .then(result => result.json())
    .then(testResult => {
       console.log(testResult)
       document.querySelector("#language-input").value = testResult.lang
    })     
}



  function hillbillian(string){
    string = string.replace(/you all/gi, "ya'll")
    string = string.replace(/god damn/gi, "guldern")
    string = string.replace(/oil/gi, "earl")
    string = string.replace(/leave/gi, "skedaddle")
    string = string.replace(/potatoes/gi, "taters")
    string = string.replace(/tomatoes/gi, "maters")
    string = string.replace(/mouth/gi, "yapper")

    return string
}

//   Hillbillian test input:  Hey you all, shut your mouths and change the oil in the god damn car so we can leave to get potatoes and tomatoes
