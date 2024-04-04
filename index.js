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
//const fromInDB = ref(database, "from")
//const toInDB = ref(database, "to")

const inputField = document.getElementById("input-field")
const publishBtn = document.getElementById("publish-btn")
const endorsementsEl = document.getElementById("endorsements-el")

//pushes whatever is in the input field to the database when you click publish 
publishBtn.addEventListener("click", function(){
    let inputValue = inputField.value
    
    push(endorsementsInDB, inputValue)
    
    clearInputField()
})

onValue(endorsementsInDB, function(snapshot){
    if(snapshot.exists()){
        let itemsArray = Object.entries(snapshot.val())
        let reverseItemsArray = itemsArray.reverse()
        
            clearEndorsementsEl()
            
            for(let i = 0; i < reverseItemsArray.length; i++){
                let currentItem = reverseItemsArray[i]
                let currentItemId = currentItem[0]
                let currentItemValue = currentItem[1]
                
                appendItemToEndorsementsEl(currentItem)
        }
    }  else {
        endorsementsEl.innerHTML = "<span style='color: white;'>No endorsments... yet</span>"
    }
})


//clears input field 
function clearInputField(){
    inputField.value = ""
}
//clears endorsements li items
function clearEndorsementsEl(){
    endorsementsEl.innerHTML = ""
}

function appendItemToEndorsementsEl(item) {
    let itemID = item[0]
    let itemValue = item[1]
    
    let newEl = document.createElement("li")
    
    newEl.textContent = itemValue
    
    newEl.addEventListener("dblclick", function() {
        let exactLocationOfItemInDB = ref(database, `endorsements/${itemID}`)
        
        remove(exactLocationOfItemInDB)
    })
    
    endorsementsEl.append(newEl)
}