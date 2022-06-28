const submit = document.querySelector('#submit');
let table = document.querySelector('#table');

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
submit.addEventListener('submit', (e) => {
  e.preventDefault();
  // header inputs
let NPU = document.getElementById('NPU]').value || '';
let chair = document.querySelector('#chair').value || '';
let loc = document.querySelector('#location').value || '';
let planner = document.querySelector('#planner').value || '';
let date = document.querySelector('#date').value || '';
// // Add Item form
let itmType = document.querySelector('#itmType').value || '';
let applName = document.querySelector('#applName').value || '';
let disposal = document.querySelector('#disposal').value || '';
let comments = document.querySelector('#conditions').value || '';

  let newRow = document.innerHTML = `<tr> <td>${NPU}</td> <td>${chair}</td> <td>${loc}</td> <td>${planner}</td> <td>${date}</td> <td>${itmType}</td> <td>${applName}</td> <td>${disposal}</td> <td>${comments}</td> </tr>`;
    // append new row to table
    table.appendChild(newRow);
    console.log('new row added');
    // clear inputs
    document.querySelector('#addItem').reset();
    }
);
