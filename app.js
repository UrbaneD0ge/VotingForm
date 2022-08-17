import * as Airtable from 'airtable';
// var Airtable = require('airtable');
// const base = require('Airtable').base('appotIP5Ss3YUKYYR');
// var base = Airtable.base('appotIP5Ss3YUKYYR');
Airtable.configure({
  endpointUrl: 'https://api.airtable.com',
  apiKey: 'keyDFa7RNG5otUO3C'
});
var base = Airtable.base('appotIP5Ss3YUKYYR');
const submit = document.getElementById('submit');
const table = document.getElementById('table');
let applName = document.getElementById('name');

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

  // set datepicker to today
  field.value = new Date(Date.now()).toISOString().substring(0, 10);

  // check if there is data in local storage
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
  let applName = document.querySelector('#name').value.trim();
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
  itmTypeCell.classList.add('itmType');
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
  // clear inputs
  document.querySelector('#addItem').reset();
  removeDemo();
});

// on button click, remove that tbody
document.querySelector('#table').addEventListener('click', (e) => {
  if (e.target.classList.contains('btn-close')) {
    if (confirm('Are you sure you want to delete this item?')) {
      e.target.parentElement.parentElement.parentElement.remove();
    } else { return; }
    // if there are no rows in the table, add a demo row
    if (table.rows.length === 1) {
      addDemo();
    }
  }
});

// on ready, disable save button
window.onload = function () {
  document.getElementById('save').disabled = true;
  document.getElementById('print').disabled = true;
}

// add demo row to table if there are no rows in the table
function addDemo() {
  let row = document.createElement('tr');
  let itmTypeCell = document.createElement('td');
  let applNameCell = document.createElement('td');
  let disposalCell = document.createElement('td');
  let commentsRow = document.createElement('tr');
  let commentsCell = document.createElement('td');
  itmTypeCell.innerText = 'Type';
  itmTypeCell.classList.add('itmType');
  applNameCell.innerText = 'Applicant Name';
  applNameCell.classList.add('applName');
  disposalCell.innerText = 'Disposal';
  disposalCell.classList.add('disp');
  commentsCell.innerText = 'Comments';
  commentsCell.classList.add('comments');
  commentsCell.setAttribute('colspan', '3');
  row.appendChild(itmTypeCell);
  row.appendChild(applNameCell);
  row.appendChild(disposalCell);
  commentsRow.appendChild(commentsCell);
  let tbody = document.createElement('tbody');
  tbody.append(row);
  table.append(tbody);
  tbody.appendChild(commentsRow);
  tbody.id = 'demo';
}


// remove #demo if it exists
function removeDemo() {
  if (document.querySelector('#demo') === null) {
    return;
  } else {
    document.querySelector('#demo').remove();
    // enable save button
    document.querySelector('#save').disabled = false;
    document.getElementById('print').disabled = false;
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
});

// Warn before leaving page
window.onbeforeunload = function (e) {
  return 'Form contents will be lost!';
};

// get date from datepicker
let field = document.querySelector('#date');

// listen for print event
window.addEventListener('beforeprint', () => {
  let NPU = document.getElementById('NPU').value;

  // Get the date
  let date = new Date(`${field.value}T00:00:00`);
  // Format date as MM-DD-YYYY
  let dateString = `${date.getMonth() + 1}-${date.getDate()}-${date.getFullYear()}`;

  // change document title
  document.title = `Voting Report_NPU-${NPU}_${dateString}`
  document.querySelector('#header').innerText = `VOTING REPORT: NPU-${NPU}  |  ${dateString}`;
  // Hide instructions, print btn, save btn, report link, and delete item buttons for printing
  document.getElementById('instructions').style.display = 'none';
  document.getElementById('print').style.display = 'none';
  document.getElementById('report').style.display = 'none';
  document.getElementById('save').style.display = 'none';
  document.getElementById('getLast').style.display = 'none';
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
  });
});

// reset title after print
window.addEventListener('afterprint', () => {
  document.title = 'Planner’s Voting Report';
  storeForm();
  document.getElementById('instructions').style.display = 'block';
  document.getElementById('print').style.display = 'block';
  document.getElementById('save').style.display = 'block';
  document.getElementById('report').style.display = 'block';
  document.getElementById('getLast').style.display = 'block';
  document.querySelectorAll('.btn-close').forEach(btn => {
    btn.style.display = 'inline';
  });
  document.getElementById('signature').style.display = 'none';
});

// on print button click, print page
document.querySelector('#print').addEventListener('click', () => {
  // if any dispCell is "PENDING", cancel print and highlight cell
  let dispCell = document.querySelectorAll('.disp');
  for (let i = 0; i < dispCell.length; i++) {
    // if no dispCell is "PENDING", print page
    if (dispCell[i].textContent === 'PENDING') {
      dispCell[i].classList.add('highlight');
      return;
    }
  }
  if (document.getElementById('#demo') !== true) {
    window.alert('No data to print!');
    return;
  }
  window.print();
});

// // get form values
// function getFormValues() {
//   let formValues = {};
//   let form = document.querySelector('#table');
//   let rows = form.querySelectorAll('tr');
//   for (let i = 0; i < rows.length; i++) {
//     let row = rows[i];
//     let cells = row.querySelectorAll('td');
//     for (let j = 0; j < cells.length; j++) {
//       let cell = cells[j];
//       let cellValue = cell.textContent;
//       let cellId = cell.id;
//       formValues[cellId] = cellValue;
//     }
//   }
//   return formValues;
// }

// function getRecordIds() {
//   let recordIds = [];
//   let form = document.querySelector('#table');
//   let rows = form.querySelectorAll('tr');
//   for (let i = 0; i < rows.length; i++) {
//     let row = rows[i];
//     let cells = row.querySelectorAll('td');
//     for (let j = 0; j < cells.length; j++) {
//       let cell = cells[j];
//       let cellId = cell.id;
//       if (cellId.includes('recordId')) {
//         recordIds.push(cellId);
//       }
//     }
//   }
//   return recordIds;
// }

// on save, get the values from the form
document.getElementById('save').addEventListener('click', function (event) {
  if (document.getElementById('demo') == true) {
    window.alert('No data to save!');
    return;
  }
  // clear any previous localStorage
  localStorage.removeItem('recordIds');

  // // save form values to localStorage
  // localStorage.setItem('formValues', JSON.stringify(getFormValues()));

  // // if form values are the same as last saved, don't save
  // if (JSON.stringify(getFormValues()) === localStorage.getItem('formValues')) {
  //   return;
  // }

  // assign variables from table data classes
  let NPU = document.getElementById('NPU').value;
  let table = document.getElementById('table');
  let rows = table.querySelectorAll('tr');
  let array = [];
  for (let i = 1; i < rows.length; i++) {
    let row = rows[i];
    let cells = row.querySelectorAll('td');
    let cont = {};
    obj = { fields: cont };
    for (let j = 0; j < cells.length; j++) {
      let cell = cells[j];
      let cellName = cell.classList[0];
      let cellValue = cell.textContent;
      // if cell is a disp cell, add cell value to nested array
      if (cellName === 'disp') {
        cont[cellName] = [cellValue];
      } else {
        cont[cellName] = cellValue;
      }
      // if cell is a comment cell, it belongs to the previous row, so add to previous object and remove from current object
      if (cellName === 'comments') {
        array[array.length - 1].fields[cellName] = cellValue;
        // Don't create this row
        delete cont[cellName];
      }
    }
    // add NPU and date to object if more than one cell
    if (Object.keys(cont).length > 1) {
      cont['fldSdIFMSRkdJGd9Z'] = 'NPU-' + NPU + '_' + new Date().toLocaleDateString();
    }
    // delete empty objects
    if (Object.keys(cont).length === 0) {
      continue;
    }
    // add object to array and log
    array.push(obj);
  }

  // if obj contains more than 10 items, split off the first ten and send to AirTable, then send the rest to the next page
  if (array.length > 10) {
    let firstTen = array.slice(0, 10);
    base('Table 1').create(firstTen, function (err, records) {
      if (err) {
        console.error(err);
        return;
      }
      records.forEach(function (record) {
        // save record ids to local storage
        let recordId = record.id;
        let recordIds = localStorage.getItem('recordIds');
        if (recordIds) {
          recordIds += ',' + recordId;
        } else {
          recordIds = recordId;
        }
        localStorage.setItem('recordIds', recordIds);
        // log record id and record id array
        console.log('New object created with id: ' + record.getId());
        console.log(record.fields);
      });
    });
    let rest = array.slice(10);
    base('Table 1').create(rest, function (err, records) {
      if (err) {
        console.error(err);
        return;
      }
      records.forEach(function (record) {
        // save record ids to local storage
        let recordId = record.id;
        let recordIds = localStorage.getItem('recordIds');
        if (recordIds) {
          recordIds += ',' + recordId;
        } else {
          recordIds = recordId;
        }
        localStorage.setItem('recordIds', recordIds);
        // log record id and record id array
        console.log('New object created with id: ' + record.getId());
        console.log(record.fields);
      });
    });
  } else {
    base('Table 1').create(array, function (err, records) {
      if (err) { console.error(err); return; }
      records.forEach(function (record) {
        // save record ids to local storage
        let recordId = record.id;
        let recordIds = localStorage.getItem('recordIds');
        if (recordIds) {
          recordIds += ',' + recordId;
        } else {
          recordIds = recordId;
        }
        localStorage.setItem('recordIds', recordIds);
        // log record id and record id array
        console.log('New object created with id: ' + record.getId());
        console.log(record.fields);
      });
    });
  }
});

// // on getLast button click, get last record id from local storage and get record from AirTable
// document.getElementById('getLast').addEventListener('click', function (event) {
//   // get last record id from local storage and GET record from AirTable
//   let recordIds = localStorage.getItem('recordIds');
//   let recordId = recordIds.split(',')[recordIds.split(',').length - 1];
//   base('Table 1').find(recordId, function (err, record) {
//     if (err) { console.error(err); return; }
//     console.log(record.fields);
//   });
// });
