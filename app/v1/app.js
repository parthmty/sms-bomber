'use strict';

const bodyElement = document.body;
const phoneElement = document.getElementById('phone');
const phoneBoxElement = document.getElementById('phoneBox');
const nextButtonElement = document.getElementById('nextButton');
const incrementButtonElement = document.getElementById('inc');
const smsCountElement = document.getElementById('smsCount');
const decrementButtonElement = document.getElementById('dec');
const bombingButtonElement = document.getElementById('bombingButton');
const bombAgainButtonElement = document.getElementById('bombAgainButton');


// Globals
let phoneNumber = '';
let smsCount = 10;


// --------------------------------------------
// Screen A
// --------------------------------------------

// Only allow 10 digits and validate the phone number
phoneElement.addEventListener('input', function (event) {
    if (phoneElement.value.length > 10) {
        phoneElement.value = phoneElement.value.slice(0, 10);
    } else if (phoneElement.value.length < 10) {
        nextButtonElement.disabled = true;
        phoneBoxElement.classList.remove('p-warn');
        phoneBoxElement.dataset.warning = '';
        nextButtonElement.disabled = true;
    } else {
        if (isValidPhoneNumber()) {
            nextButtonElement.disabled = false;
            phoneBoxElement.classList.remove('p-warn');
            phoneBoxElement.dataset.warning = '';
        } else {
            nextButtonElement.disabled = true;
            phoneBoxElement.classList.add('p-warn');
            phoneBoxElement.dataset.warning = 'Invalid phone number';
        }
    }
});

function isValidPhoneNumber() {
    const phoneNumber = `91${phoneElement.value}`;
    return /^(\+91[\-\s]?)?[0]?(91)?[789]\d{9}$/g.test(phoneNumber);
}


// Next button click
nextButtonElement.addEventListener('click', function (event) {
    phoneNumber = phoneElement.value;
    bodyElement.classList.remove('a');
    bodyElement.classList.add('b');
});



// --------------------------------------------
// Screen B
// --------------------------------------------

// Increment the SMS count (max 50)
incrementButtonElement.addEventListener('click', function (event) {
    if (smsCount < 50) {
        smsCount++;
        smsCountElement.textContent = smsCount;
    }
});

// Decrement the SMS count
decrementButtonElement.addEventListener('click', function (event) {
    if (smsCount > 1) {
        smsCount--;
        smsCountElement.textContent = smsCount;
    }
});

// Bombing button click
bombingButtonElement.addEventListener('click', function (event) {
    bodyElement.classList.remove('b');
    bodyElement.classList.add('c');
    sendSMS();
});

function sendSMS() {
    fetch('https://api.github.com/repos/guruwovi/Bombit/dispatches', {
        method: 'POST',
        headers: {
            'Authorization': '',
            'Accept': 'application/vnd.github.everest-preview+json',
        },
        body: JSON.stringify({
            event_type: 'bombit',
            client_payload: {
                phone_number: phoneNumber,
                count: smsCount
            }
        })
    }).then(response => {
        setTimeout(() => {
            bodyElement.classList.add('success');
            bodyElement.classList.remove('fail');
            bodyElement.classList.remove('c');
            bodyElement.classList.add('d');
        }, 6000);
    }).catch(error => {
        bodyElement.classList.add('fail');
        bodyElement.classList.remove('success');
        bodyElement.classList.remove('c');
        bodyElement.classList.add('d');
    });
}


// --------------------------------------------
// Screen D
// --------------------------------------------

// Bomb again button click
bombAgainButtonElement.addEventListener('click', function (event) {
    bodyElement.classList.remove('d');
    bodyElement.classList.add('a');
    smsCount = 10;
    smsCountElement.textContent = smsCount;
    phoneElement.value = '';
    nextButtonElement.disabled = true;
    phoneBoxElement.classList.remove('p-warn');
    phoneBoxElement.dataset.warning = '';
});
