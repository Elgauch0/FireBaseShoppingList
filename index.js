import { initializeApp } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-app.js"
import { getDatabase ,ref,push,onValue} from "https://www.gstatic.com/firebasejs/9.15.0/firebase-database.js"



//setting DataBase
const appSettings = {
    databaseURL: "https://scrimbawebapp-default-rtdb.europe-west1.firebasedatabase.app/"
}
const app = initializeApp(appSettings);
const database = getDatabase(app);
const shoppingInDB = ref(database, "Shopping list");

// Settings DOM Elements 
const input = document.getElementById("input-field");
const button = document.getElementById("add-button");
const shopList = document.getElementById('shopping-list');



onValue(shoppingInDB,function(snapshot){
   
    shopList.innerHTML = ""
    let ItemsArray = Object.values(snapshot.val());
    ItemsArray.forEach(item =>addInputToList(item) );
})







button.addEventListener('click',()=> {
    let inputValue = input.value ;
    addInputToList(inputValue);
    push(shoppingInDB,inputValue);
    clearInput();
   
});

function clearInput(){
    input.value ="";

}
function addInputToList(input){
    shopList.innerHTML +=`<li>${input}</li>`

}


