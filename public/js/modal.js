const modal = document.getElementById('myModal');
const modal2 = document.getElementById('myModal2');

const cancelbtn = document.getElementsByClassName('canceldelete')[0];
// Get the button that opens the modal
const exportbtn = document.getElementsByClassName('exportbtn')[0];

// Get the <span> element that closes the modal
const span = document.getElementsByClassName('close')[0];
const span2 = document.getElementById('close2');
const checkall = document.getElementById('checkall');


checkall.onclick = function(e){
  let i;
  if (e.currentTarget.checked)
  for (i = 0; i < 31; i++) {
   document.getElementsByClassName('feilds')[i].checked = true;
  }
  else
  for (i = 0; i < 31; i++) {
   document.getElementsByClassName('feilds')[i].checked = false;
   }
}

// When the user clicks on the button, open the modal

// When the user clicks on <span> (x), close the modal
span.onclick = function () {
  modal.style.display = 'none';
};

span2.onclick = function () {
  modal2.style.display = 'none';
};

// When the user clicks anywhere outside of the modal, close it
window.onclick = function (event) {
  if (event.target === modal || event.target === modal2) {
    modal.style.display = 'none';
    modal2.style.display = 'none';
  }
};

cancelbtn.onclick = () => {
  modal.style.display = 'none';
};


exportbtn.onclick = () => {
  modal.style.display = 'none';
  ChosenReportFields = [];
  let i;
  for (i = 0; i < 31; i++) {
    if (document.getElementsByClassName('feilds')[i].checked) {ChosenReportFields.push(document.getElementsByClassName('feilds')[i].value);}
  }

  const wb = XLSX.utils.book_new();
  wb.Props = {
    Title: 'SheetJS Tutorial',
    Subject: 'Test',
    Author: 'Red Stapler',
    CreatedDate: new Date(2017, 12, 19),
  };
  wb.SheetNames.push('Test Sheet');
  const ws_data = constructExcelArray(filterResults(currentprojectsobj));
  const ws = XLSX.utils.aoa_to_sheet(ws_data);
  wb.Sheets['Test Sheet'] = ws;
  const wbout = XLSX.write(wb, { bookType: 'xlsx', type: 'binary' });
  function s2ab(s) {
    const buf = new ArrayBuffer(s.length);
    const view = new Uint8Array(buf);
    for (let i = 0; i < s.length; i++) view[i] = s.charCodeAt(i) & 0xFF;
    return buf;
  }
  saveAs(new Blob([s2ab(wbout)], { type: 'application/octet-stream' }), 'test.xlsx');


};
