const submit = document.getElementById('submit');
const table = document.getElementById('table');
let suffix = document.getElementById('itmType').value;
// import api key from .env file
const apiKey = process.env.API_KEY;

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

  // restore data from localStorage if it exists
  if (localStorage.getItem('tableData')) {
    loadTable();
  }

  // on submit, add form data to table
  submit.addEventListener('click', (e) => {
    e.preventDefault();

    // // Add Item form
    let itmType = document.querySelector('#itmType').selectedOptions[0].value;
    let applName = document.querySelector('#applName').value.trim();
    let disposal = document.querySelector('#disposal').value || '';
    let comments = document.querySelector('#conditions').value.trim() || '';


    if (itmType === '' || applName === '' || disposal === '') {
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
      commentsCell.setAttribute('contenteditable', 'true');
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

  // remove #demo if other tbody is present
  function removeDemo() {
    if (document.querySelector('#table').children.length > 2) {
      document.querySelector('#demo').remove();
    }
  }

  // Warn before leaving page
  window.onbeforeunload = function (e) {
    return 'Form contents will be lost!';
  };

  // set datepicker to today
  today = document.querySelector('#date').valueAsDate = new Date();
  // date = today.toLocaleDateString().split('/').join('-');

  // on print button click, print page
  document.querySelector('#print').addEventListener('click', () => {
    window.print();
    storeTable();
  });

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
    // Hide instructions, print btn, and delete item buttons for printing
    document.getElementById('instructions').style.display = 'none';
    document.getElementById('print').style.display = 'none';
    document.querySelectorAll('.btn-close').forEach(btn => {
      btn.style.display = 'none';
    }
    );
    document.getElementById('signature').style.display = 'block';
  });

  // reset title after print
  window.addEventListener('afterprint', () => {
    document.title = 'Planner’s Voting Report';
    document.getElementById('instructions').style.display = 'block';
    document.getElementById('print').style.display = 'block';
    document.querySelectorAll('.btn-close').forEach(btn => {
      btn.style.display = 'inline';
    }
    );
    document.getElementById('signature').style.display = 'none';
  }
  )
};

// store table data in localStorage
function storeTable() {
  let table = document.querySelector('#table');
  let tableData = [];
  let tableRows = table.querySelectorAll('tbody');
  tableRows.forEach(row => {
    let rowData = [];
    let rowCells = row.querySelectorAll('td');
    rowCells.forEach(cell => {
      rowData.push(cell.innerText);
    }
    );
    tableData.push(rowData);
  }
  );
  localStorage.setItem('tableData', JSON.stringify(tableData));
}



// load table data from localStorage if it exists
function loadTable() {
  if (localStorage.getItem('tableData')) {
    let tableData = JSON.parse(localStorage.getItem('tableData'));
    let table = document.querySelector('#table');
    let tbody = document.createElement('tbody');
    table.append(tbody);
    tableData.forEach(row => {
      let row = document.createElement('tr');
      let itmTypeCell = document.createElement('td');
      let deleteButton = document.createElement('button');
      let applNameCell = document.createElement('td');
      let disposalCell = document.createElement('td');
      let commentsCell = document.createElement('td');
      itmTypeCell.innerText = row.itmType;
      itmTypeCell.prepend(deleteButton);
      deleteButton.setAttribute('type', 'button');
      deleteButton.setAttribute('class', 'btn-close');
      applNameCell.textContent = row.applName;
      applNameCell.setAttribute('contenteditable', 'true');
      disposalCell.textContent = row.disposal;
      commentsCell.textContent = row.comments;
      tbody.append(row);
      row.append(itmTypeCell);
      row.append(applNameCell);
      row.append(disposalCell);
      if (row.comments !== '') {
        let commentsRow = document.createElement('tr');
        let commentsCell = document.createElement('td')
        commentsCell.setAttribute('colspan', '3');
        commentsCell.setAttribute('contenteditable', 'true');
        commentsCell.textContent = row.comments;
        commentsRow.append(commentsCell);
        tbody.append(commentsRow);
      }
    }
    );
  }
}

// send table data to Airtable
function sendForm() {
  forEach(document.querySelectorAll('#table tbody tr'), (row, i) => {
    let rowData = {};
    let cells = row.querySelectorAll('td');
    cells.forEach((cell, i) => {
      if (i === 0) {
        rowData.itmType = cell.innerText;
      } else if (i === 1) {
        rowData.applName = cell.innerText;
      } else if (i === 2) {
        rowData.disposal = cell.innerText;
      } else if (i === 3) {
        rowData.comments = cell.innerText;
      }
    }
    );
    console.log(rowData);

    base('Table 1').create(
      {
        "NPU": document.getElementById('NPU').value,
        "Date": document.getElementById('date').value,
        "Table": JSON.parse(localStorage.getItem('tableData'))
      },
      {
        fields: {
          "fldSdIFMSRkdJGd9Z": document.getElementById('NPU').value + '-' + document.getElementById('date').value,
          "fldck9li8kMT9xBLx": rowData.itmType,
          "fldYxaSmdxSjS1N0k": rowData.applName,
          "fldBuDdWpnXqlmr9T": [rowData.disposal],
          "fldswanafOKIWEGy3": rowData.comments,
          "fldMb04KSFvOpBXf9": [""]
        },
        function(err, record) {
          if (err) { console.error(err); return; }
          console.log(record.getId());
        }
      }
    );
  }
  );
}