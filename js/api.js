
document.addEventListener('DOMContentLoaded', function() {
  fetch('https://codecyprus.org/th/api/list')
  .then(response => response.json())
  .then(data => console.log(data))
  .catch(error => console.error('Error fetching data:', error));

  const hunts = data;

  

});


// (function() {
//   console.log("fetchLeaderBoard");
// }
// )();
// window.onload = fetchLeaderBoard();