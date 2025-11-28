//ELEMENT DOM
const billInput = document.getElementById("bill");
const tipButtons = document.querySelectorAll(".tip-layout .btn");
const tipLayout = document.querySelector(".tip-layout")
const inputTip = document.getElementById("bill-tip");
const inputPeople = document.getElementById("people-input");
const outputTipAmount = document.getElementById("tip-amount");
const outputTotal= document.getElementById("total");
const btnReset = document.getElementById("btn-reset");

// STATE AWAL
let currentBill= 0;
let currentTip = 0;
let currentPeople = 0;

// FUNGSI

function calculation(){
    btnReset.disabled = false ;

    if (currentPeople === 0 ){
        outputTipAmount.textContent = "0.00";
        outputTotal.textContent = "0.00";
        return;
    }

    const bill = currentBill;
    const tipPersen = currentTip;
    const people = currentPeople;

    const totalTip = tipPersen * bill /  100;
    const tipAmountPerPerson =  totalTip / people;
    const totalPerPerson = bill / people + tipAmountPerPerson;

    outputTipAmount.textContent = tipAmountPerPerson.toFixed(2);
    outputTotal.textContent = totalPerPerson.toFixed(2)
}

//EVENTHANDLING

billInput.addEventListener("keydown", (e) => {
    currentBill = parseFloat(e.target.value);
    calculation()
});


tipLayout.addEventListener("click", (e) =>{
    if(e.target.tagName === "BUTTON"){

        tipButtons.forEach(button => button.classList.remove("active"))

        e.target.classList.add('active');

        inputTip.value='';

        currentTip = parseFloat(e.target.value) || 0
        calculation()
    }
});

inputTip.addEventListener("input", (e) => {
    tipButtons.forEach(button => button.classList.remove("active"))

    currentTip = parseFloat(e.target.value);
    calculation()
});


inputPeople.addEventListener("input", (e) => {
    currentPeople = parseFloat(e.target.value);
    calculation()
});


btnReset.disabled = true;

btnReset.addEventListener('click', () => {
    currentBill = 0;
    currentTip = 0;
    currentPeople = 0;

    billInput.value = '0';
    inputPeople.value = '0';
    inputTip.value = '';

    outputTipAmount.textContent = '0.00';
    outputTotal.textContent = '0.00';

    tipButtons.forEach(btn => btn.classList.remove('active'));

    btnReset.disabled = true;
});








