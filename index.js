import { initializeApp } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-app.js"
import { getDatabase ,ref,push,onValue,remove} from "https://www.gstatic.com/firebasejs/9.15.0/firebase-database.js"



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

    if(snapshot.exists()){
        clearShopList();
        let ItemsArray = Object.entries(snapshot.val());
        ItemsArray.forEach(item =>{
        addInputToList(item) });

    }else{
        shopList.innerHTML="No Items Yes ..."
    }
   
   
})


button.addEventListener('click',()=> {
    let inputValue = input.value.trim();
    if(inputValue !==''){
    push(shoppingInDB,inputValue);
    clearInput();

    }
    
   
});

function clearInput(){
    input.value ="";

}
function clearShopList(){
    shopList.innerHTML = "";
}
function addInputToList(item){
    //shopList.innerHTML +=`<li>${input}</li>`
        let currentItemId = item[0];
        let currentItem =item[1];
    const newEl = document.createElement('li');
    newEl.textContent=currentItem;
    newEl.addEventListener("click",()=>{
        let exactlocation = ref(database,`Shopping list/${currentItemId}`);
        remove(exactlocation)
    } )
    shopList.append(newEl);


}


