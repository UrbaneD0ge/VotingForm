// header inputs
let NPU = document.querySelector('#NPU').value || '';
let chair = document.querySelector('#chair').value || '';
let loc = document.querySelector('#location').value || '';
let planner = document.querySelector('#planner').value || '';
let date = document.querySelector('#date').value || '';
// // Add Item form
// let itmType = document.querySelector('#itmType').value || '';
// let applName = document.querySelector('#applName').value || '';
// let disposal = document.querySelector('#disposal').value || '';
// let comments = document.querySelector('#conditions').value || '';
const submit = document.querySelector('[type="submit"]');
let table = document.querySelector('#table');

function preFill() {
  switch (document.querySelector('#itmType').value) {
    case 'MOSE':
      applName.text = 'Applicant Name';
      break;
    case 'LRB':
      applName.text = 'Applicant Name';
      break;
    case 'ZRB':
      applName.text = 'Z-';
      break;
    case 'BZA':
      applName.text = 'V-';
      break;
    case 'SDC':
      applName.text = 'SD-';

  }

  // on submit add AddItem content to table
  function addItem() {
    let row = table.insertRow(-1);

    let row = document.createElement("tr");
    let itmType = document.createElement("td");
    let applName = document.createElement("td");
    let disposal = document.createElement("td");
    let comments = document.createElement("tr", "td");

    itmType.innerHTML = document.querySelector('#itmType').value;
    applName.innerHTML = document.querySelector('#applName').value;
    disposal.innerHTML = document.querySelector('#disposal').value;
    comments.innerHTML = document.querySelector('#conditions').value;

    row.appendChild(itmType);
    row.appendChild(applName);
    row.appendChild(disposal);
    if (comments.innerHTML !== '') {
      row.appendChild(comments);
    }
    table.appendChild(row);
  }
};
