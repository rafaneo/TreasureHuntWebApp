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
var answer_input = document.getElementById("answer");
var global_score = 0;

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


function request(ans){ 
    let sessionID = getCookie("sessionID");
    if (!answerCheck(question_type, ans)) { 
        if (sessionID) {
            fetch(`https://codecyprus.org/th/api/answer?session=${sessionID}&answer=${ans}`)
                .then(response => response.json())
                .then(data => {
                    console.log(data);
                    if (data.correct) {
                        alert(`Correct answer! You have earned ${data.scoreAdjustment} points.`);
                        resetCard();
                        updateScore(data.scoreAdjustment);
                        getQuestion(sessionID);
                    } else {
                        updateScore(data.scoreAdjustment);
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
}

function answerCheck(question_type, answer){

    if (question_type == 'INTEGER'){
        if (answer == ""){
            alert("Please enter an answer");
            return true;
        }
        else if (!parseInt(answer)){
            alert("Please enter a number");
            return true;
        }
    }
    else if (question_type == 'MCQ'){
        
        if (answer == "" || answer == null){
            alert("Please select an answer");
            return true;
        }
    }
    else if (question_type == 'BOOLEAN'){
        if (answer == "" || answer == null){
            console.log(answer);
            alert("Please select an answer");
            return true;
        }
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
skip_btn.addEventListener('click', function() {
    let sessionID = getCookie("sessionID");
    if (sessionID) {
        fetch(`https://codecyprus.org/th/api/skip?session=${sessionID}`)
            .then(response => response.json())
            .then(data => {
                console.log(data);
                if (data.status == 'OK') {
                    alert("Question skipped. No points earned.");
                    resetCard();
                    getQuestion(sessionID);
                } else {
                    alert("Error skipping question.");
                }
            })
            .catch(error => console.error('Error fetching data:', error));
    } else {
        console.error('Session ID not found in cookies');
    }
});
function getQuestion(sessionID){ 
    if (sessionID) {
        fetch(`https://codecyprus.org/th/api/question?session=${sessionID}`)
            .then(response => response.json())
            .then(data => {
                console.log(data);
                if (data.completed){
                    location.href = "congratulations.html";
                }
                var count = 1;
                question_text.innerHTML = `Question ${count}: ` + data.questionText;
                question_type = data.questionType;
                setButtons();
                canBeSkipped(data.canBeSkipped);
                document.getElementById("score").innerHTML = global_score;
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

function setButtons(){

    if (question_type == 'BOOLEAN'){
        
        true_btn.style.display = "block";
        false_btn.style.display = "block";
        true_btn.value = true;
        false_btn.value = false;
        true_btn.addEventListener('click', function() {
            request(true);
        });
        false_btn.addEventListener('click', function() {
            request(false);
        });

        submit_btn.style.display = "none";
        mcq_A_btn.style.display = "none";
        mcq_B_btn.style.display = "none";
        mcq_C_btn.style.display = "none";
        mcq_D_btn.style.display = "none";
        answer.style.display = "none";

        true_btn.style.margin = "auto";
        false_btn.style.margin = "auto";


        true_btn.style.marginBottom = "10px";
    }
    else if (question_type == 'INTEGER' || question_type == 'TEXT'){
        submit_btn.style.display = "block";
        submit_btn.addEventListener('click', function() {
            let answer_input = document.getElementById("answer").value;
            request(answer_input);
        });
        answer_input.style.display = "block";
        answer_input.style.margin = "auto";
        answer_input.style.marginBottom = "10px";

        true_btn.style.display = "none";
        false_btn.style.display = "none";
        mcq_A_btn.style.display = "none";
        mcq_B_btn.style.display = "none";
        mcq_C_btn.style.display = "none";
        mcq_D_btn.style.display = "none";

        submit_btn.style.margin = "auto";
    }
    else if (question_type == 'MCQ'){
        mcq_A_btn.style.display = "block";
        mcq_B_btn.style.display = "block";
        mcq_C_btn.style.display = "block";
        mcq_D_btn.style.display = "block";

        mcq_A_btn.addEventListener('click', function() {
            request('A');
        });
        mcq_B_btn.addEventListener('click', function() {
            request('B');
        });

        mcq_C_btn.addEventListener('click', function() {
            request('C');
        });

        mcq_D_btn.addEventListener('click', function() {
            request('D');
        });

        submit_btn.style.display = "none";
        true_btn.style.display = "none";
        false_btn.style.display = "none";
        answer.style.display = "none";

        mcq_A_btn.style.margin = "auto";
        mcq_B_btn.style.margin = "auto";
        mcq_C_btn.style.margin = "auto";
        mcq_D_btn.style.margin = "auto";

        mcq_A_btn.style.marginBottom = "10px";
        mcq_B_btn.style.marginBottom = "10px";
        mcq_C_btn.style.marginBottom = "10px";
        mcq_D_btn.style.marginBottom = "10px";

    }
}

function updateScore(score){ 
    console.log(score);
    console.log(global_score);
    global_score += score;
    console.log(global_score);
    document.getElementById("score").innerHTML = global_score;
}