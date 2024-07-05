document.addEventListener('DOMContentLoaded', function() {
    const player_name = document.getElementById("player-name");
    const start_button = document.getElementById("start-btn");

    start_button.addEventListener("click", function() {
        const playerName = player_name.value;
        const appName = "Dogus-T-Hunt-App";
        const params = new URLSearchParams(location.search);

        let treasureHuntID = params.get("treasure-hunt-id");

        if (!playerName) {
            alert("Please enter your name.");
            return;
        }

        if (!treasureHuntID) {
            alert("Treasure hunt ID is missing.");
            return;
        }

        fetch(`https://codecyprus.org/th/api/start?player=${playerName}&app=${appName}&treasure-hunt-id=${treasureHuntID}`)
            .then(response => response.json())
            .then(data => {
                console.log(data);
                if (data.status === "OK") {
                    let sessionID = data.session;
                    setCookie("playerName", playerName);
                    setCookie("sessionID", sessionID);

                    location.href = "questions.html";
                } else {
                    console.log(data.errorMessages);
                    alert("Error starting the treasure hunt: " + (data.errorMessages || "Unknown error"));
                }
            })
            .catch(error => {
                console.error("Error:", error);
                alert("An error occurred while starting the treasure hunt.");
            });
    });

    function setCookie(name, value, days = 7) {
        const expires = new Date(Date.now() + days * 864e5).toUTCString();
        document.cookie = name + '=' + encodeURIComponent(value) + '; expires=' + expires + '; path=/';
    }
});
