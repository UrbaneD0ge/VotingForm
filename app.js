const submit = document.getElementById('submit');
const table = document.getElementById('table');
let suffix = document.getElementById('itmType').value;
// // on itemType change, preFill the applName
document.querySelector('#itmType').addEventListener('change', preFill);

function preFill() {
  switch (document.querySelector('#itmType').value) {
    case 'MOSE':
      applName.setAttribute('placeholder', 'Applicant Name');
      applName.value = ('');
      break;
    case 'LRB':
      applName.setAttribute('placeholder', 'Applicant Name');
      break;
    case 'ZRB':
      applName.value = 'Z-22-';
      applName.setAttribute('placeholder', 'Z-');
      break;
    case 'BZA':
      applName.value = 'V-22-';
      applName.setAttribute('placeholder', 'V-');
      break;
    case 'SDC':
      applName.value = 'SD-22-';
      applName.setAttribute('placeholder', 'SD-')
      break;
    case 'LOR':
      applName.value = 'LOR-22-';
      applName.setAttribute('placeholder', 'LOR-')
      // applName.setAttribute('type', 'number');
      break;
    }
};

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
let itmType = document.querySelector('#itmType').selectedOptions[0].value;
let applName = document.querySelector('#applName').value;
let disposal = document.querySelector('#disposal').value || '';
let comments = document.querySelector('#conditions').value || '';

  if (itmType === '' || applName === '' || disposal === '') {
    ;
    return;
  }

  // create table row
  let row = document.createElement('tr');
  // create table cells
  let itmTypeCell = document.createElement('td');
  let applNameCell = document.createElement('td');
  let disposalCell = document.createElement('td');
  let commentsCell = document.createElement('td');
  // add text to cells
  itmTypeCell.textContent = itmType;
  itmTypeCell.classList.add('typeBttn');
  applNameCell.textContent = applName;
  disposalCell.textContent = disposal;
  commentsCell.textContent = comments;

// wrap each new item in a <tbody>
  let tbody = document.createElement('tbody');
  tbody.append(row);

  // append new tbody to table
  table.append(tbody);

  // append cells to row
  row.appendChild(itmTypeCell);
  row.appendChild(applNameCell);
  row.appendChild(disposalCell);

  if (comments !== '') {
    // create new row for comments
    let commentsRow = document.createElement('tr');
    // create new cell for comments
    let commentsCell = document.createElement('td')
    commentsCell.setAttribute('colspan', '3');
    // add text to cell
    commentsCell.textContent = comments;
    // append cell to row
    commentsRow.appendChild(commentsCell);
    // append row to tbody
    tbody.appendChild(commentsRow);
  }

  console.log('new row added');
  // clear inputs
  document.querySelector('#addItem').reset();
    }
);

// on button click, remove that tbody
document.querySelector('#table').addEventListener('click', (e) => {
  if (e.target.classList.contains('typeBttn')) {
    if (confirm('Are you sure you want to delete this item?')) {
      e.target.parentElement.parentElement.remove();
    } else { return; }
  }
}
);

// Warn before leaving page
// window.onbeforeunload = function (e) {
//   return 'Form contents will be lost!';
// };
