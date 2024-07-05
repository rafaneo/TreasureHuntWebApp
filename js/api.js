
start_button = document.getElementById("start-btn");


document.addEventListener('DOMContentLoaded', function() {
  fetch('https://codecyprus.org/th/api/list')
  .then(response => response.json())
  .then(data => {
        const tableBody = document.querySelector('#hunts-table tbody');
        
        // Clear existing rows
        console.log(data);
        tableBody.innerHTML = '';
        const header = document.createElement('tr');
        const nameHeader = document.createElement('th');
        nameHeader.textContent = 'Name';
        header.appendChild(nameHeader);
        const descriptionHeader = document.createElement('th');
        descriptionHeader.textContent = 'Description';
        header.appendChild(descriptionHeader);
        const startsOnHeader = document.createElement('th');
        startsOnHeader.textContent = 'Starts On';
        header.appendChild(startsOnHeader);
        const endsOnHeader = document.createElement('th');
        endsOnHeader.textContent = 'Ends On';
        header.appendChild(endsOnHeader);
        tableBody.appendChild(header);

        data.treasureHunts.forEach(hunt => {
          const row = document.createElement('tr');
          const nameCell = document.createElement('td');
          nameCell.textContent = hunt.name;
          row.appendChild(nameCell);
          const descriptionCell = document.createElement('td');
          descriptionCell.textContent = hunt.description;
          row.appendChild(descriptionCell);
          const startsOnCell = document.createElement('td');
          startsOnCell.textContent = new Date(hunt.startsOn).toLocaleString();
          row.appendChild(startsOnCell);
          const endsOnCell = document.createElement('td');
          endsOnCell.textContent = new Date(hunt.endsOn).toLocaleString();
          row.appendChild(endsOnCell);
          tableBody.appendChild(row);
          const huntId = hunt.uuid;
          console.log(huntId);

          row.addEventListener('click', () => {
            window.location.href = `pre_start.html?treasure-hunt-id=${huntId}`;
          });
        });
    })
    .catch(error => console.error('Error fetching data:', error));
});



