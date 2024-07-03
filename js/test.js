// test.js
function runTests() {
    const results = [];

    // Landing page testing
    if (window.location.pathname.endsWith(game.html)) {
        results.push(testGamepage());
    }
    displayResults(results);
}
function testLandingpage() {
    const result = {name: 'Landing page tests', passed: true, messages: [] };



}
//Page Title of testing js
if(document.title !== 'Treasure Hunt') {
    result.passed = false;
    result.messages.push('Start game function must be existed');
}
// Test Button Presence
const button = document.querySelector('button');
if (!button) {
    result.passed = false;
    result.messages.push('Start Game button should be present');
}

return result;


function testGamePage() {
const result = { name: 'Game Page Tests', passed: true, messages: [] };

// Test Treasure Placement
const treasure = document.getElementById('treasure');
if (!treasure) {
    result.passed = false;
    result.messages.push('Treasure element should be present');
}

// Simulate clicking the treasure
if (treasure) {
    const box = treasure.getBoundingClientRect();
    simulateClick(box.left + box.width / 2, box.top + box.height / 2);

    // Check if treasure is displayed
    if (window.getComputedStyle(treasure).display !== 'block') {
        result.passed = false;
        result.messages.push('Treasure should be displayed on click');
    }

    // Check for congratulatory message
    const message = document.getElementById('message').innerText;
    if (message !== 'Congratulations! You found the treasure!') {
        result.passed = false;
        result.messages.push('Congratulatory message should be displayed');
    }
}

return result;
}

function simulateClick(x, y) {
const clickEvent = new MouseEvent('click', {
    clientX: x,
    clientY: y,
    bubbles: true,
    cancelable: true,
    view: window,
});
document.elementFromPoint(x, y).dispatchEvent(clickEvent);
}

function displayResults(results) {
const resultContainer = document.createElement('div');
resultContainer.style.position = 'fixed';
resultContainer.style.bottom = '10px';
resultContainer.style.right = '10px';
resultContainer.style.backgroundColor = 'white';
resultContainer.style.border = '1px solid black';
resultContainer.style.padding = '10px';
resultContainer.style.zIndex = 1000;

results.forEach(result => {
    const resultElement = document.createElement('div');
    resultElement.innerHTML = `<strong>${result.name}:</strong> ${result.passed ? 'PASSED' : 'FAILED'}`;
    if (!result.passed) {
        const messages = document.createElement('ul');
        result.messages.forEach(message => {
            const messageItem = document.createElement('li');
            messageItem.innerText = message;
            messages.appendChild(messageItem);
        });
        resultElement.appendChild(messages);
    }
    resultContainer.appendChild(resultElement);
});

document.body.appendChild(resultContainer);
}

document.addEventListener('DOMContentLoaded', runTests);