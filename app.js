const submit = document.getElementById('submit');
const table = document.getElementById('table');

// function preFill() {
//   switch (document.querySelector('#itmType').value) {
//     case 'MOSE':
//       applName.text = 'Applicant Name';
//       break;
//     case 'LRB':
//       applName.text = 'Applicant Name';
//       break;
//     case 'ZRB':
//       applName.value = 'Z-';
//       break;
//     case 'BZA':
//       applName.text = 'V-';
//       break;
//     case 'SDC':
//       applName.text = 'SD-';

//   }
// };

// // on itemType change, preFill the applName
// document.querySelector('#itmType').addEventListener('change', preFill);

// on submit, add form data to table
submit.addEventListener('click', (e) => {
  e.preventDefault();
  // header inputs
let NPU = document.getElementById('NPU').selectedOptions[0].value || '';
let chair = document.querySelector('#chair').value || '';
let loc = document.querySelector('#location').value || '';
let planner = document.querySelector('#planner').value || '';
let date = document.querySelector('#date').value || '';
// // Add Item form
let itmType = document.querySelector('#itmType').selectedOptions[0].value || '';
let applName = document.querySelector('#applName').value || '';
let disposal = document.querySelector('#disposal').value || '';
let comments = document.querySelector('#conditions').value || '';

  // create table row
  let row = document.createElement('tr');
  // create table cells
  let itmTypeCell = document.createElement('td');
  let applNameCell = document.createElement('td');
  let disposalCell = document.createElement('td');
  let commentsCell = document.createElement('td');
  // add text to cells
  itmTypeCell.textContent = itmType;
  applNameCell.textContent = applName;
  disposalCell.textContent = disposal;
  commentsCell.textContent = comments;

  // append new row to table
  table.appendChild(row);

  // append cells to row
  row.appendChild(itmTypeCell);
  row.appendChild(applNameCell);
  row.appendChild(disposalCell);

  if (comments !== '') {
    // create new row for comments
    table.appendChild(row);
    row.appendChild(commentsCell);
  }

  console.log('new row added');
  // clear inputs
  document.querySelector('#addItem').reset();
    }
);
