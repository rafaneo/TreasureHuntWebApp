var question_text = document.getElementById("question-text");

function getCookie(name) {
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);
    if (parts.length === 2) return parts.pop().split(';').shift();
}

document.addEventListener('DOMContentLoaded', function() {
    let sessionID = getCookie("sessionID");
    
    if (sessionID) {
        fetch(`https://codecyprus.org/th/api/question?session=${sessionID}`)
            .then(response => response.json())
            .then(data => {
                console.log(data);
                var count = 1;
                question_text.innerHTML = `Question ${count}: ` + data.questionText;
            })
            .catch(error => console.error('Error fetching data:', error));
    } else {
        console.error('Session ID not found in cookies');
    }
});
   