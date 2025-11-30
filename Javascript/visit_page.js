document.querySelector('#visitForm').addEventListener('submit', function(event) {event.preventDefault()});
// Submit Part
const announce=document.querySelector('.annouce-block');
function checkAvailable(){
    const dateInfo=document.querySelector('#date');
    const timeInfo=document.querySelector('#time');
    const noInfo=document.querySelector('#visit');
    
    const valueNo=Number(noInfo.value);
    const valueDate=dateInfo.value;
    const valueTime=timeInfo.value;
    if (valueDate===""){
        announce.innerHTML = `<p id="annouce">Data not completed, please re-enter</p>`;
        return
    }
    if (valueNo && valueNo>0){
        const check=reserve(valueDate,valueTime,valueNo);
        if (check){
            alert("Your reservation is successful!");
        }
        else{
            alert("Sorry, the reservation is full!");
        }
        buttonSubmit.disabled=true;
    }
    else if (isNaN(valueNo) || valueNo<=0){
        announce.innerHTML=`<p id="annouce">Please enter a valid number of people!</p>`;
    }
    else if (valueNo===0){
        announce.innerHTML=`<p id="annouce">Data not completed, please re-enter</p>`;
    }
}

document.querySelector('#visit').addEventListener('focus',()=>{
    announce.innerHTML=``;
});
const buttonSubmit=document.querySelector('#submit');
buttonSubmit.addEventListener('click',checkAvailable);

// Reset button
document.querySelector('#reset').addEventListener('click',()=>{
    announce.innerHTML=``;
});



