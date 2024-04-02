//importing necessary tools for firebase database
import {initializeApp} from "https://www.gstatic.com/firebasejs/9.15.0/firebase-app.js"
import {getDatabase, ref, push, onValue, remove} from
"https://www.gstatic.com/firebasejs/9.15.0/firebase-database.js"
//setting up the database url 
const appSettings = { 
    databaseURL:"https://we-are-the-champions-8fc06-default-rtdb.firebaseio.com/"
}

const app = initializeApp(appSettings)
const database = getDatabase(app)
const endorsementsInDB = ref(database, "endorsements")

const inputField = document.getElementById("input-field")
const publishBtn = document.getElementById("publish-btn")

//pushes whatever is in the input field to the database when you click publish 
publishBtn.addEventListener("click", function(){
    let inputValue = inputField.value
    
    push(endorsementsInDB, inputValue)
    
    clearInputField()
})

onValue(endorsementsInDB, function(snapshot){
    if(snapshot.exists()){
        let itemsArrat = Object.entries(snapshot.val())
        
    }
})




//clears input field 
function clearInputField(){
    inputField.value = ""
}