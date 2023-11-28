function alive() {
    fetch("https://localhost:5001/api/status/alive", {
        mode: "cors"
    })
        .then(function (data) {
            //console.log(data);
        });
    setAnimation("end");
}
function CreateInvoice() {
   // setAnimation("start");
    if ($('#addContactRowBtnGrp').is(':animated')) return;
    var skip = false;
    var elements = document.getElementsByName('contactdata');
    for (p = 0; p < elements.length; p++) {
        if (!CheckFields(elements[p])) {
            skip = true;
        }
    }
    if (skip == false) {
        var jsonObject = {};
        for (i = 0; i < elements.length; i++) {
            var key = ReplaceModel(elements[i].id)
            jsonObject[key] = elements[i].value;
        }
        
        
        jsonString = JSON.stringify(jsonObject);
        fetch("https://localhost:5001/api/create/contactdata", {
            method: "POST",
            body: jsonString,
            headers: { 'Content-Type': 'application/json' }
        }).then(res => {
            invoiceID = res.url.split('Id=');
            localStorage.setItem("invoiceID", "");
            localStorage.setItem("invoiceID", invoiceID[invoiceID.length - 1]);
            location.href = res.url;
        });
    }
    console.log(jsonString);
}

function CreateAssignments() {
    if ($('#assignmentsButtonDiv').is(':animated')) return;
    var jsonObject = [];
    var skip = false;
    for (i = 0; i <= 7; i++) {
        var elements = document.getElementsByName('assignmentdata' + i);
        var prop = {};
        for (p = 0; p < elements.length; p++) {
            if (!CheckFields(elements[p])) {
                skip = true;
            }
        }
        if (($(elements).length > 0) && (skip === false))
        {
            for (j = 0; j < $(elements).length; j++) {
                var key = ReplaceModel(elements[j].id.slice(0, -1))
                if ((key == "Total") || (key == "Quantity") || (key == "Price")) {
                    prop[key] = parseInt(elements[j].value, 10);
                }
                else {
                    prop[key] = elements[j].value;
                }
            }
            jsonObject[i] = prop;
        }
        
        console.log(jsonObject);  
    }
    if (skip != true) {
        //jsonObject = jsonObject.substring(1, jsonObject.length - 1);
        jsonString = JSON.stringify(jsonObject);
        fetch("https://localhost:5001/api/create/assignments/" + localStorage.getItem("invoiceID"), {
            method: "POST",
            body: jsonString,
            headers: { 'Content-Type': 'application/json' }
        })
    }
    //setAnimation("end");
    console.log(jsonString);
    location.href = "https://localhost:5001/";
}

function PopulateList() {
    //$('#dataTable').DataTable().destroy();
        fetch("https://localhost:5001/api/getinvoices", {
            method: 'GET'
        }).then(function (response) { return response.json(); })
            .then(function (list) {
                for (i = 0; i <= list.length - 1; i++) {
                    CreateListTableRow(list[i],i);
                }
            });
}

function GetInvoiceData(id) {
    fetch("https://localhost:5001/api/invoice/" + id, {
        method: 'GET'
    }).then(function (response) { return response.json(); })
        .then(function (data) {
            InvoiceModal(data,id);
        });
}

function GeneratePDF(btn) {

    btn.classList.toggle('running');
    var htmlSnippet = "<head><link rel=\"stylesheet\" href=\"css/default-css.css\"><link rel=\"stylesheet\" href=\"css/styles.css\"><link rel=\"stylesheet\" href=\"css/bootstrap.min.css\"><link rel=\"stylesheet\" href=\"css/typography.css\"></head>";
    var htmlElement = document.getElementsByClassName('modal-content')[0].cloneNode(true);
    htmlElement.getElementsByTagName('tfoot')[0].getElementsByTagName('tr')[1].remove();
    htmlElement.getElementsByClassName('invoice-buttons')[0].remove();

    htmlSnippet += htmlElement.innerHTML;
    htmlSnippet = JSON.stringify(htmlSnippet);
    
    fetch("https://localhost:5001/api/export/pdfexport", {
        method: "POST",
        body: htmlSnippet,
        headers: { 'Content-Type': 'application/json' },
        responseType: 'blob'
    }).then(resp => resp.blob())
        .then(blob => {
            const url = window.URL.createObjectURL(blob);
            const a = document.createElement('a');
            a.style.display = 'none';
            a.href = url;
            // the filename you want
            a.download = "Invoice"+btn.id+".pdf";
            document.body.appendChild(a);
            a.click();
            window.URL.revokeObjectURL(url);
            btn.classList.toggle('running');
            //alert('your file has downloaded!');
        
    });
}