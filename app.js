// const base = require('airtable').base('appotIP5Ss3YUKYYR');
const submit = document.getElementById('submit');
const save = document.getElementById('save');
const table = document.getElementById('table');
let suffix = document.getElementById('itmType').value;

// function to store the values of the form in local storage
function storeForm() {
  // header inputs
  let NPU = document.getElementById('NPU').selectedOptions[0].value || '';
  let chair = document.querySelector('#chair').value.trim() || '';
  let loc = document.querySelector('#location').value.trim() || '';
  let planner = document.querySelector('#planner').value.trim() || '';
  // save inputs to object
  let data = {
    NPU: NPU,
    chair: chair,
    loc: loc,
    planner: planner,
  };
  // save data to local storage
  localStorage.setItem('data', JSON.stringify(data));
  console.log(data);
}

// on load, check if there is data in local storage and if so, pre-fill the form
window.onload = function () {
  if (localStorage.getItem('data')) {
    let data = JSON.parse(localStorage.getItem('data'));
    document.querySelector('#NPU').value = data.NPU;
    document.querySelector('#chair').value = data.chair;
    document.querySelector('#location').value = data.loc;
    document.querySelector('#planner').value = data.planner;
  };
};

// on itemType change, preFill the applName
document.querySelector('#itmType').addEventListener('change', preFill);

function preFill() {
  switch (document.querySelector('#itmType').value) {
    case 'MOSE':
      applName.setAttribute('placeholder', 'Applicant Name');
      applName.value = ('');
      break;
    case 'LRB':
      applName.setAttribute('placeholder', 'Applicant Name');
      applName.value = ('');
      break;
    case 'ZRB':
      applName.value = 'Z-22-';
      applName.setAttribute('placeholder', 'Z-');
      break;
    case 'SUP':
      applName.value = 'U-22-';
      applName.setAttribute('placeholder', 'U-');
      break;
    case 'BZA':
      applName.value = 'V-22-';
      applName.setAttribute('placeholder', 'V-');
      break;
    case 'Text Amendment':
      applName.value = 'Z-22-';
      applName.setAttribute('placeholder', 'Z-');
      break;
    case 'CDP':
      applName.value = 'CDP-22-';
      applName.setAttribute('placeholder', 'CDP-');
      break;
    case 'SD':
      applName.value = 'SD-22-';
      applName.setAttribute('placeholder', 'SD-')
      break;
    case 'LOR':
      applName.value = 'LOR-22-';
      applName.setAttribute('placeholder', 'LOR-')
      // applName.setAttribute('type', 'number');
      break;
    case 'N/A':
      applName.value = '';
      applName.removeAttribute('placeholder');
      break;
  }
};

// on submit, add form data to table
submit.addEventListener('click', (e) => {
  e.preventDefault();

  // // Add Item form
  let itmType = document.querySelector('#itmType').selectedOptions[0].value;
  let applName = document.querySelector('#applName').value.trim();
  let disposal = document.querySelector('#disposal').value || '';
  let comments = document.querySelector('#conditions').value.trim() || '';


  if (itmType === 'Type' || applName === '') {
    ;
    return;
  }

  // create table row
  let row = document.createElement('tr');
  // create table cells
  let itmTypeCell = document.createElement('td');
  let deleteButton = document.createElement('button');
  let applNameCell = document.createElement('td');
  let disposalCell = document.createElement('td');
  let commentsCell = document.createElement('td');
  // add text to cells
  itmTypeCell.innerText = itmType;
  itmTypeCell.prepend(deleteButton);
  deleteButton.setAttribute('type', 'button');
  deleteButton.setAttribute('class', 'btn-close');
  applNameCell.textContent = applName;
  applNameCell.setAttribute('contenteditable', 'true');
  applNameCell.classList.add('applName');
  disposalCell.textContent = disposal;
  disposalCell.classList.add('disp');
  commentsCell.textContent = comments;
  commentsCell.classList.add('comments');

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
    // let commentsCell = document.createElement('td')
    commentsCell.setAttribute('colspan', '3');
    commentsCell.setAttribute('contenteditable', 'true');
    commentsCell.classList.add('comments');
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
  removeDemo();
}
);

// on button click, remove that tbody
document.querySelector('#table').addEventListener('click', (e) => {
  if (e.target.classList.contains('btn-close')) {
    if (confirm('Are you sure you want to delete this item?')) {
      e.target.parentElement.parentElement.parentElement.remove();
    } else { return; }
  }
}
);

// remove #demo if it exists
function removeDemo() {
  if (document.querySelector('#demo') === null) {
    return;
  } else {
    document.querySelector('#demo').remove();
  }
};

// on disposalCell click, show select box
document.querySelector('#table').addEventListener('click', (e) => {
  if (e.target.classList.contains('disp')) {
    // e.target.setAttribute('contenteditable', 'false');
    e.target.innerHTML = '<select><option value="Approval">Approval</option><option value="Approval w/C">Approval w/C</option><option value="Denial">Denial</option><option value="Defer">Defer</option><option value="Abstain">Abstain</option></select>';
    e.target.firstChild.focus();
  }
  // on blur, change selected value to td text
  e.target.addEventListener('blur', (e) => {
    if (e.target.tagName === 'SELECT') {
      e.target.parentElement.textContent = e.target.value;
    }
  });
});

// listen for tab key press in applName cells, add new row for comments
document.querySelector('#table').addEventListener('keydown', (e) => {
  if (e.target.classList.contains('applName') === true && e.key === 'Tab' && e.target.parentElement.nextElementSibling == null) {
    // create new row for comments
    let commentsRow = document.createElement('tr');
    // create new cell for comments
    let commentsCell = document.createElement('td')
    commentsCell.setAttribute('colspan', '3');
    commentsCell.setAttribute('contenteditable', 'true');
    commentsCell.classList.add('comments');
    // add text to cell
    commentsCell.textContent = '';
    // append cell to row
    commentsRow.appendChild(commentsCell);
    // append row to tbody
    e.target.parentElement.parentElement.appendChild(commentsRow);
  }
}
);

// Warn before leaving page
window.onbeforeunload = function (e) {
  return 'Form contents will be lost!';
};

// set datepicker to today
today = document.querySelector('#date').valueAsDate = new Date();
// date = today.toLocaleDateString().split('/').join('-');

// on print button click, print page
document.querySelector('#print').addEventListener('click', () => {
  // if any dispCell is "PENDING", cancel print and highlight cell
  let dispCell = document.querySelectorAll('.disp');
  for (let i = 0; i < dispCell.length; i++) {
    if (dispCell[i].textContent === 'PENDING') {
      dispCell[i].classList.add('highlight');
      return;
    }
  }
  // if no dispCell is "PENDING", print page
  window.print();
});

// // when dispCell selection changes, remove that dispCell highlight
// document.querySelectorAll('.disp').addEventListener('change', (e) => {
//   if (e.target.classList.contains('disp')) {
//     e.target.classList.remove('highlight');
//   }
// }
// );

// get date from datepicker
let field = document.querySelector('#date');

// listen for print event
window.addEventListener('beforeprint', () => {
  NPU = document.getElementById('NPU').value;

  // Get the date
  let date = new Date(`${field.value}T00:00:00`);
  // Format date as MM-DD-YYYY
  let dateString = `${date.getMonth() + 1}-${date.getDate()}-${date.getFullYear()}`;
  console.log(dateString);

  // change document title
  document.title = `Voting Report_NPU-${NPU}_${dateString}`
  document.querySelector('#header').innerText = `VOTING REPORT: NPU-${NPU}  |  ${dateString}`;
  // Hide instructions, print btn, save btn, report link, and delete item buttons for printing
  document.getElementById('instructions').style.display = 'none';
  document.getElementById('print').style.display = 'none';
  document.getElementById('report').style.display = 'none';
  document.getElementById('save').style.display = 'none';
  document.querySelectorAll('.btn-close').forEach(btn => {
    btn.style.display = 'none';
    document.getElementById('signature').style.display = 'block';
  });
  // if comment cells are empty, remove them
  document.querySelectorAll('td[contenteditable="true"]').forEach(cell => {
    if (cell.textContent === '') {
      cell.parentElement.remove();
    }
  });
  // remove all highlight classes
  document.querySelectorAll('.highlight').forEach(cell => {
    cell.classList.remove('highlight');
  }
  );
});

// reset title after print
window.addEventListener('afterprint', () => {
  document.title = 'Planner’s Voting Report';
  storeForm();
  document.getElementById('instructions').style.display = 'block';
  document.getElementById('print').style.display = 'block';
  document.getElementById('save').style.display = 'block';
  document.getElementById('report').style.display = 'block';
  document.querySelectorAll('.btn-close').forEach(btn => {
    btn.style.display = 'inline';
  });
  document.getElementById('signature').style.display = 'none';
});

// on save button click, save form
document.querySelector('#save').addEventListener('click', () => {
  // get form data
  let formData = [{
    "fields": {
      "Title": document.getElementById('NPU').value + '_' + document.getElementById('date').value,
      "Type": itmType,
      "ApplName": document.getElementById('applName').value,
      "Disposition": ['Approved'],
      "comments": document.querySelectorAll('.comments').forEach(cell => cell.textContent),
    }
  }];
  // send form data to Airtable
  fetch('https://api.airtable.com/v0/appotIP5Ss3YUKYYR/Table%201', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': 'Bearer keyDFa7RNG5otUO3C'
    },
    body: JSON.stringify(formData)
  }).then(response => {
    console.log(response);
  }).catch(error => {
    console.log(error);
  });
}
);
