function AddContactRow(newRowButton) {
    if ($('#addContactRowBtnGrp').is(':animated')) return;
    var divs = document.getElementsByName('contactdatarow');
    var currentRow = null;
    if (divs.length > 0) {
        currentRow = divs[divs.length - 1];
    }

    switch (newRowButton.value) {
        case "Reg Number":
            fieldID = "regnumber";
            break;
        case "First Name":
            fieldID = "firstname";
            break;
        case "Last Name":
            fieldID = "lastname";
            break;
        case "Company Name":
            fieldID = "companyname";
            break;
        case "Email":
            fieldID = "email";
            break;
        case "Phone Number":
            fieldID = "phone";
            break;
        default:
            return false;
    }
    if (document.getElementById(fieldID)) {
        return false;
    }
    else if ((currentRow == null) || (currentRow.getElementsByTagName('div').length == 2)) {
        var formRows = document.getElementById('contactdataform').getElementsByClassName("row");
        var lastRow = formRows[formRows.length - 3];
        $(`
     <div class="row" name="contactdatarow">
        <div class="form-group col">
            <label class="control-label col-11">${newRowButton.value}</label><i class="ti-close float-right" onclick="RMContactRow(this)"></i>
            <input name="contactdata" id="${fieldID}" type="text" class="form-control" onblur="CheckFields(this)"/>
        </div>
    </div>
`).insertAfter(lastRow).hide().show("fast");
//        $.when($(newRowButton).fadeOut("fast"))
//            .done(function () {
//                $('#addContactRowBtnGrp').fadeOut('fast');
//            })
//                .done(function () {
//                    $('#submitContactDataForm').fadeOut('fast');
//                })
//                .done(function () {
//                    $('#contactdataform').append(`
//     <div class="row" name="contactdatarow">
//        <div class="form-group col">
//            <label class="control-label col-11">${newRowButton.value}</label><i class="ti-close float-right" onclick="RMContactRow(this)"></i>
//            <input name="contactdata" id="${fieldID}" type="text" class="form-control" onblur="CheckFields(this)"/>
//        </div>
//    </div>
//`);
//                })
//                .done(function () {
//                    $('#addContactRowBtnGrp').appendTo('#contactdataform').fadeIn("fast");
//                })
//                .done(function () {
//                    $('#submitContactDataForm').appendTo('#contactdataform').fadeIn("fast");
//                });
    }
    else if (currentRow.getElementsByTagName('div').length < 2) {
        $(`
        <div class="form-group col">
            <label class="control-label col-11">${newRowButton.value}</label><i class="ti-close float-right" onclick="RMContactRow(this)"></i>
            <input name="contactdata" id="${fieldID}" type="text" class="form-control" onblur="CheckFields(this)"/>
        </div>
`).insertAfter(currentRow.getElementsByTagName('div')[0]).hide().show("fast");
    }
    if (document.getElementById('addContactRowBtnGrp').getElementsByTagName('input')[0] == newRowButton) {
        if (newRowButton.nextElementSibling != null) {
            newRowButton.nextElementSibling.className = "btn btn-outline-dark mb-3 btn-xs";
        }
        newRowButton.remove();
    }
    else {
        newRowButton.remove();
    }
    
}

function RMContactRow(field) {
    var fieldID = field.nextElementSibling;
    fieldID = fieldID.id;
    var parentField = field.parentElement;
    var parentDiv = parentField.parentElement;

    switch (fieldID) {
        case "regnumber":
            text = "Reg Number";
            break;
        case "firstname":
            text = "First Name";
            break;
        case "lastname":
            text = "Last Name";
            break;
        case "companyname":
            text = "Company Name";
            break;
        case "email":
            text = "Email";
            break;
        case "phone":
            text = "Phone Number";
            break;
        default:
            return false;
    }

    if (document.getElementById('addContactRowBtnGrp').getElementsByTagName('input').length == 0) {
        $('#addContactRowBtnGrp').append(`<input type="button" class="btn btn-outline-dark mb-3 btn-xs" value="${text}" onclick="AddContactRow(this)">`).hide().show("fast");
    }
    else {
        var btnGroup = document.getElementById('addContactRowBtnGrp');
        var amountOfButtons = btnGroup.getElementsByTagName('input').length;
        $(`<input type="button" class="btn btn-outline-dark mb-3 btn-xs ml-3" value="${text}" onclick="AddContactRow(this)">`).insertAfter(btnGroup.getElementsByTagName('input')[amountOfButtons-1]).hide().show("fast");
    }
    if (parentDiv.getElementsByTagName('div').length == 1) {

        $.when($(parentDiv).animate({ height: 0 }), 200)
            .done(function () {
                $(parentDiv).remove();
            });
    }
    else {
        $(parentField).remove();
        var contactRows = document.getElementsByName('contactdatarow');
        for (var i = 0; i <= contactRows.length - 2; i++) {
            if (contactRows[i].getElementsByTagName('div').length < 2) {
                var movingElement = contactRows[i + 1].getElementsByTagName('div')[0]
                $(contactRows[i]).append(movingElement).show("fast");
                if (contactRows[i + 1].getElementsByTagName('div').length == 0) {
                    contactRows[i + 1].remove();
                    $(contactRows[i + 1]).animate({ height: 0 }), 250, function () {
                        $(contactRows[i+1]).remove();
                    }
                    break;
                }
                continue;
            }
        }
    }
}




function addAssignmentRow() {
    if ($('#assignmentsButtonDiv').is(':animated')) return;
    var divs = document.getElementsByName('AssignmentsRow');
    var count = divs.length;
    if (count == 10) { $('#addAssignmentRowBtn').prop('disabled', true); } else { $('#addAssignmentRowBtn').prop('disabled', false); }
    if (count < 10) {
        $.when($('#assignmentsButtonDiv').fadeOut('fast'))
            .done(function () {
                $('#AssignmentsForm').append(`
        <div name="AssignmentsRow" class="row assignmentsDataRow" id="${count}"> \
        <div class= "col-6" > \
        <br \> \
        <textarea class="form-control" name="assignmentdata${count}" id="assignment${count}" onblur="CheckFields(this)" ></textarea> \
        </div> \
        <div class="col"> \
        <br \> \
        <input class="form-control" name="assignmentdata${count}" id="unit${count}" onblur="CheckFields(this)" /> \
        </div> \
        <div class="col"> \
        <br \> \
        <input class="form-control" type="number" name="assignmentdata${count}" id="QuantityInput${count}"  step="0.01" onchange="CalculateTotal(this)" onblur="CheckFields(this)" /> \
        </div> \
        <div class="col"> \
        <br \> \
        <input class="form-control" type="number" name="assignmentdata${count}" id="PriceInput${count}" step="0.01" onchange="CalculateTotal(this)" onblur="CheckFields(this)" /> \
        </div> \
        <div class="col"> \ 
        <br \> \
        <input readonly id="TotalInput${count}" name="assignmentdata${count}" class="form-control" value="0" /> \
        </div> \
        </div> \
        `);
            })
            .done(function () {
                $('#assignmentsButtonDiv').appendTo("#AssignmentsForm").fadeIn("slow");
            });
    }
    else {
        return false;
    }
}
function removeAssignmentRow() {
    if ($('#assignmentsButtonDiv').is(':animated')) return;
    var divs = document.getElementsByName('AssignmentsRow');
    var count = divs.length;
    if (count > 1) {
        $.when($('#assignmentsButtonDiv').fadeOut("fast"))
            .done(function () {
                var div = document.getElementById(count - 1);
                $(div).remove();
            }).done(function () {
                $('#assignmentsButtonDiv').appendTo("#AssignmentsForm").fadeIn("slow");
            });
    }
}


function CalculateTotal(object) {

    var qnt = document.getElementById('QuantityInput' +object.id.slice(-1)).value;
    var price = document.getElementById('PriceInput' + object.id.slice(-1)).value;
    var total = document.getElementById('TotalInput' + object.id.slice(-1));
    var currencyFormatter = new Intl.NumberFormat('ee-ET', {
        style: 'currency',
        currency: 'EUR',
        minimumFractionDigits: 2
    });

    total.value = qnt * price;
    total.value = currencyFormatter.format(total.value);
}

function CheckFields(field) {

    if ((field.value.length == 0) && (!$(field).hasClass("input-optional"))) {
        $(field).removeClass("input-correct");
        $(field).addClass("input-invalid");
        return false;
    }
    else if (window.name.includes("Contact Data", 0)) {
        if ((($('#email').val().length == 0) && ($('#email').hasClass("input-optional"))) && ((($('#phone').val().length == 0) && ($('#phone').hasClass("input-optional"))))) {
            $('#email').removeClass("input-optional");
            $('#phone').removeClass("input-optional");
            $('#email').addClass("input-invalid");
            $('#phone').addClass("input-invalid");
            return false;
        }
    }
    else if ((field.value.length == 0) && ($(field).hasClass("input-optional"))) {
        $(field).removeClass("input-correct");
        return true;
    }
    switch (field.id) {
        case "regnumber":
        case "invoicenumber":
            var numRegex = new RegExp('^[0-9]+$');
            if (!numRegex.test(field.value)) {
                $(field).removeClass("input-correct");
                $(field).addClass("input-invalid");
                return false;
            }
            else {
                $(field).removeClass("input-invalid");
                $(field).addClass("input-correct");
                return true;
            }
            break;
        case "email":
            if (!field.value.includes('@')) {
                $(field).removeClass("input-correct");
                $(field).addClass("input-invalid");
                return false;
            }
            else {
                $(field).removeClass("input-invalid");
                $(field).addClass("input-correct");
                if ($('#phone').value != "") {
                    $('#phone').removeClass("input-invalid");
                    $('#phone').addClass("input-optional");
                }
                return true;
            }
            break;
        case "phone":
            var telRegex = new RegExp('^[+]*[0-9]*$');
            if ((!telRegex.test(field.value)) || (field.value.length == 1)) {
                $(field).removeClass("input-correct");
                $(field).addClass("input-invalid");
                return false;

            }
            else {
                $(field).removeClass("input-invalid");
                $(field).addClass("input-correct");
                if ($('#email').value != "") {
                    $('#email').removeClass("input-invalid");
                    $('#email').addClass("input-optional");
                    return true;
                }
            }
            break;
        default:
            $(field).removeClass("input-invalid");
            $(field).addClass("input-correct");
            return true;
            break;
    }
}

function ReplaceModel(object) {
    var string = "";
    switch (object) {
        case "invoicenumber":
            string = "Client_InvoiceNumber";
            break;
        case "regnumber":
            string = "Client_RegNumber";
            break;
        case "companyname":
            string = "Client_CompanyName";
            break;
        case "firstname":
            string = "Client_FirstName";
            break;
        case "lastname":
            string = "Client_LastName";
            break;
        case "address":
            string = "Client_Address";
            break;
        case "email":
            string = "Client_Email";
            break;
        case "phone":
            string = "Client_PhoneNumber";
            break;
        case "issuedate":
            string = "IssueDate";
            break;
        case "duedate":
            string = "DueDate";
            break;
        case "assignment":
            string = "Assignment";
            break;
        case "unit":
            string = "Unit";
            break;
        case "QuantityInput":
            string = "Quantity";
            break;
        case "PriceInput":
            string = "Price";
            break;
        case "TotalInput":
            string = "Total";
            break;
    }
    return string;
}

function CreateListTableRow(data, index) {

    var newRow = document.createElement('tr');
    var element = document.createElement('th');
    element.setAttribute('scope', 'row');
    element.textContent = index + 1;
    newRow.appendChild(element);
    var element = document.createElement('td');
    element.textContent = data.client_FirstName;
    newRow.appendChild(element);
    var element = document.createElement('td');
    element.textContent = data.client_LastName;
    newRow.appendChild(element);
    var element = document.createElement('td');
    element.textContent = data.client_Address;
    newRow.appendChild(element);
    var element = document.createElement('td');
    element.textContent = data.issueDate;
    newRow.appendChild(element);
    var element = document.createElement('td');
    element.textContent = data.dueDate;
    newRow.appendChild(element);
    var element = document.createElement('td');
    element.textContent = "N/A";
    newRow.appendChild(element);
    var element = document.createElement('td');
    var element2 = document.createElement('img');
    element2.src = "/img/info-icon.png";
    element2.setAttribute('width', '55');
    element2.setAttribute('height', '55');
    element.appendChild(element2);
    element2.onclick = function () {
        //$('#modal'+(index+1)).modal("show");
        //TODO: PASS INVOICENUM
        GetInvoiceData(data.id);
        
    }
    newRow.appendChild(element);
    newRow.setAttribute('id', data.id);
    document.getElementById('invoiceListTableBody').appendChild(newRow);
}

function InvoiceModal(data,id) {
    if (document.getElementById('modal') != null) {
        $('#modal').remove();
    }
    //Modal
    var modal = document.createElement('div');
    modal.className = 'modal fade';
    modal.id = "modal";
    modal.setAttribute('role', 'dialog');
    var element = document.createElement('div');
    element.className = 'modal-dialog';
    modal.appendChild(element);
    $(modal).append(`
      <div class="modal-content mr-auto ml-auto col-xl-6 col-lg-8">
<div class="invoice-area mr-auto ml-auto col-12 mt-5">
                    <div class="invoice-head">
                        <div class="row">
                            <div class="iv-left col-6">
                                <span>INVOICE</span>
                            </div>
                            <div class="iv-right col-6 text-md-right" id="invoiceNumField">
                            </div>
                        </div>
                    </div>
                    <div class="row align-items-center">
                        <div class="col-md-6">
                            <div class="invoice-address" id="invoiceAddressField">
                            </div>
                        </div>
                        <div class="col-md-6 text-md-right">
                            <ul class="invoice-date" id="invoiceDateField">
                            </ul>
                        </div>
                    </div>
                    <div class="invoice-table table-responsive mt-5">
                        <table class="table table-bordered table-hover text-right">
                            <thead>
                                <tr class="text-capitalize">
                                    <th class="text-center" style="width: 5%;">ID</th>
                                    <th class="text-left" style="width: 45%; min-width: 130px;">Description</th>
                                    <th style="min-width: 100px">Unit</th>
                                    <th>Quantity</th>
                                    <th style="min-width: 100px">Price</th>
                                    <th style="min-width: 100px">Total</th>
                                </tr>
                            </thead>
                            <tbody id="invoiceDetailsTBody">
                            </tbody>
                            <tfoot>
                                <tr>
                                    <td colspan="5">GRAND TOTAL:</td>
                                    <td id="totalPriceTD"></td>
                                </tr>
                                <tr id="statusTR">
                                    <td colspan="5">status:</td>
                                    <td id="statusTD">In Progress</td>
                                </tr>
                            </tfoot>
                        </table>
                    </div>
                </div>
                <div class="invoice-buttons text-right mr-2 mb-2">
                    <a href="#" onclick=GeneratePDF(this) id="1" class="invoice-btn ld-ext-right">export to pdf <i class="ld ld-ring ld-spin"></i></a>

                </div>
</div>
`);
    document.getElementById('listRow').appendChild(modal);
    $('#modal').modal('show');

    var currencyFormatter = new Intl.NumberFormat('ee-ET', {
        style: 'currency',
        currency: 'EUR',
        minimumFractionDigits: 2
    });
    var totalPrice=0;
    for (var i = 0; i < data.assignments.length; i++) {
        var tr = document.createElement('tr');

        var element = document.createElement('td');
        element.className = 'text-center';
        element.textContent = i + 1;
        tr.appendChild(element);

        var element = document.createElement('td');
        element.className = 'text-left';
        element.textContent = data.assignments[i].assignment;
        tr.appendChild(element);

        var element = document.createElement('td');
        element.textContent = data.assignments[i].unit;
        tr.appendChild(element);

        var element = document.createElement('td');
        element.textContent = data.assignments[i].quantity;
        tr.appendChild(element);

        var element = document.createElement('td');
        element.textContent = currencyFormatter.format(data.assignments[i].price);
        tr.appendChild(element);

        var element = document.createElement('td');
        element.textContent = currencyFormatter.format(data.assignments[i].total);
        tr.appendChild(element);
        totalPrice += data.assignments[i].total;


        $(invoiceDetailsTBody).append(tr);
    }
    document.getElementById('totalPriceTD').textContent = currencyFormatter.format(totalPrice);

    //Setting Invoice Number
    var invoiceNum = document.createElement('span');
    //invoiceNum.textContent(data.invoicenum);
    invoiceNum.textContent="#1";
    document.getElementById('invoiceNumField').appendChild(invoiceNum);

    //Setting Invoice Address
    var h3element = document.createElement('h3');
    var h5element = document.createElement('h5');
    var addressL1 = document.createElement('p');
    var address = data.address;
    h3element.textContent="Invoiced To";
    h5element.textContent=data.firstName + " " + data.lastName;
    addressL1.textContent=address;
    document.getElementById('invoiceAddressField').appendChild(h3element);
    document.getElementById('invoiceAddressField').appendChild(h5element);
    document.getElementById('invoiceAddressField').appendChild(addressL1);

    //Setting Invoice Dates
    var issueDate = document.createElement('li');
    var dueDate = document.createElement('li');
    issueDate.textContent ="Invoice Date : "+data.issueDate;
    dueDate.textContent ="Due Date : "+data.dueDate;
    document.getElementById('invoiceDateField').appendChild(issueDate);
    document.getElementById('invoiceDateField').appendChild(dueDate);
    

    //var id = document.createElement('td');
    //var text = document.createElement('td');
    //var qty = document.createElement('td');
    //var price = document.createElement('td');
    //var total = document.createElement('td');
    //id.textContent(1);
    //text.textContent()

}

//function CreateInvoicePage(data) {
//    //Setting Invoice Number
//    var invoiceNum = document.createElement('span');
//    invoiceNum.textContent(data.invoicenum);
//    document.getElementById('invoiceNumField').appendChild(invoiceNum);

//    //Setting Invoice Address
//    var h3element = document.createElement('h3');
//    var h5element = document.createElement('h5');
//    var addressL1 = document.createElement('p');
//    var address = data.client_Address;
//    h3element.textContent("Invoiced To");
//    h5element.textContent(data.client_FirstName + " " + data.client_LastName);
//    addressL1.textContent(address);
//    document.getElementById('invoiceAddressField').appendChild(h3element);
//    document.getElementById('invoiceAddressField').appendChild(h5element);
//    document.getElementById('invoiceAddressField').appendChild(addressL1);

//    //Setting Invoice Dates
//    var issueDate = document.createElement('li');
//    var dueDate = document.createElement('li');
//    issueDate.textContent(data.issueDate);
//    dueDate.textContent(data.dueDate);
//    document.getElementById('invoiceDateField').appendChild(issueDate);
//    document.getElementById('invoiceDateField').appendChild(dueDate);

//    //var id = document.createElement('td');
//    //var text = document.createElement('td');
//    //var qty = document.createElement('td');
//    //var price = document.createElement('td');
//    //var total = document.createElement('td');
//    //id.textContent(1);
//    //text.textContent()

//}
function ChangeFooter(column, btn) {
    if ($('#firstColFoot').is(':animated')) return;
    if ($('#secondColFoot').is(':animated')) return;
    if ($('#thirdColFoot').is(':animated')) return;

    //$('#firstColFoot').attr('hidden', true);
    //$('#secondColFoot').attr('hidden', true);
    //$('#thirdColFoot').attr('hidden', true);

    $('#firstColFoot').removeClass('m-fadeIn');
    $('#secondColFoot').removeClass('m-fadeIn');
    $('#thirdColFoot').removeClass('m-fadeIn');

    $('#firstColFoot').addClass('m-fadeOut')
    $('#secondColFoot').addClass('m-fadeOut');
    $('#thirdColFoot').addClass('m-fadeOut');

    switch (column) {
        case "first":
            $('#firstColFoot').removeClass('m-fadeOut');
            $('#firstColFoot').addClass('m-fadeIn');
            break;
        case "second":
            $('#secondColFoot').removeClass('m-fadeOut');
            $('#secondColFoot').addClass('m-fadeIn');
            break;
        case "third":
            $('#thirdColFoot').removeClass('m-fadeOut');
            $('#thirdColFoot').addClass('m-fadeIn');
            break;
    }

    $(document.getElementsByClassName('pagination')[0].getElementsByTagName('li')[0]).removeClass('active');
    $(document.getElementsByClassName('pagination')[0].getElementsByTagName('li')[1]).removeClass('active');
    $(document.getElementsByClassName('pagination')[0].getElementsByTagName('li')[2]).removeClass('active');
    $(btn).addClass('active');
}