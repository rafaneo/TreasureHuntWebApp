var question_text = document.getElementById("question-text");
var submit_btn = document.getElementById("submit-btn");
var true_btn = document.getElementById("true-btn");
var false_btn = document.getElementById("false-btn");
var skip_btn = document.getElementById("skip-btn");

var mcq_A_btn = document.getElementById("mcq-A-btn");
var mcq_B_btn = document.getElementById("mcq-B-btn");
var mcq_C_btn = document.getElementById("mcq-C-btn");
var mcq_D_btn = document.getElementById("mcq-D-btn");

var question_type = null;

skip_btn.style.display = "none";

function getCookie(name) {
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);
    if (parts.length === 2) return parts.pop().split(';').shift();
}

document.addEventListener('DOMContentLoaded', function() {
    let sessionID = getCookie("sessionID");
    getQuestion(sessionID);
});


submit_btn.addEventListener('click', function() {
    let sessionID = getCookie("sessionID");
    let answer = document.getElementById("answer").value;
        
    if (!answerCheck(answer)) { 
        if (sessionID) {
            fetch(`https://codecyprus.org/th/api/answer?session=${sessionID}&answer=${answer}`)
                .then(response => response.json())
                .then(data => {
                    console.log(data);
                    if (data.correct) {
                        alert("Correct answer! You have earned 1 point.");
                        resetCard();
                        getQuestion(sessionID);
                    } else {
                        alert("Incorrect answer. Please try again.");
                    }
                })
                .catch(error => console.error('Error fetching data:', error));
        } else {
            console.error('Session ID not found in cookies');
        }
    } else {
        console.log("Invalid answer");
    }
});

function answerCheck(answer){
    if (answer == ""){
        alert("Please enter an answer");
        return true; 
    }
    else if (!parseInt(answer) && question_type == 'INTEGER'){
        alert("Please enter a number");
        return true;
    }
    return false;
}


function canBeSkipped(value){ 
    if (value == true){
        skip_btn.style.display = "block";
    }
    else{
        skip_btn.style.display = "none";
    }
}

function getQuestion(sessionID){ 
    if (sessionID) {
        fetch(`https://codecyprus.org/th/api/question?session=${sessionID}`)
            .then(response => response.json())
            .then(data => {
                console.log(data);
                var count = 1;
                question_text.innerHTML = `Question ${count}: ` + data.questionText;
                question_type = data.questionType;
                setButtons();
                canBeSkipped(data.canBeSkipped);
                document.getElementById("score").innerHTML = "Score: " + score;
                count++;
            })
            .catch(error => console.error('Error fetching data:', error));
    } else {
        console.error('Session ID not found in cookies');
    }
}

function resetCard(){
    document.getElementById("answer").value = "";
    question_text.innerHTML = "";
    skip_btn.style.display = "none";
}

function setScore(score){
}

function setButtons(){

    if (question_type == 'BOOLEAN'){
        true_btn.style.display = "block";
        false_btn.style.display = "block";
        submit_btn.style.display = "none";
        mcq_A_btn.style.display = "none";
        mcq_B_btn.style.display = "none";
        mcq_C_btn.style.display = "none";
        mcq_D_btn.style.display = "none";

        true_btn.style.margin = "auto";
        false_btn.style.margin = "auto";

    }
    else if (question_type == 'INTEGER'){
        true_btn.style.display = "none";
        false_btn.style.display = "none";
        mcq_A_btn.style.display = "none";
        mcq_B_btn.style.display = "none";
        mcq_C_btn.style.display = "none";
        mcq_D_btn.style.display = "none";
        submit_btn.style.display = "block";

        submit_btn.style.margin = "auto";


    }
    else if (question_type == 'MCQ'){
        mcq_A_btn.style.display = "block";
        mcq_B_btn.style.display = "block";
        mcq_C_btn.style.display = "block";
        mcq_D_btn.style.display = "block";
        submit_btn.style.display = "none";
        true_btn.style.display = "none";
        false_btn.style.display = "none";

        mcq_A_btn.style.margin = "auto";
        mcq_B_btn.style.margin = "auto";
        mcq_C_btn.style.margin = "auto";
        mcq_D_btn.style.margin = "auto";
    }
}