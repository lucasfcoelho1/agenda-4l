
$(document).ready(function () {
    load();
});

function load() {
    var lstContacts = [];
    var contact = null;
    if (localStorage.length == 1) {
        lstContacts = [
            { 'id': '1', 'nome': 'Marcos Vinicius', 'email': 'marcos@forlogic.net', 'telefone': '(43) 9927-8871', 'sexo': '1', 'endereco': 'Rua 23, nº 8', 'obs': '' },
            { 'id': '2', 'nome': 'Fulano', 'email': 'fulano@forlogic.net', 'telefone': '(00) 0000-0000', 'sexo': '3', 'endereco': 'Não informado', 'obs': 'esta é uma observação' },
            { 'id': '3', 'nome': 'Joaquina', 'email': 'joaquina@exemplo.com', 'telefone': '(12) 3456-7890', 'sexo': '2', 'endereco': 'Rua da forlogic', 'obs': '' },
            { 'id': '4', 'nome': 'Yudi', 'email': 'yudi@bomdiaecia.com.br', 'telefone': '(11) 4002-8922', 'sexo': '1', 'endereco': 'Bom dia e Cia', 'obs': 'Playstation Playstation Playstation Playstation Playstation' }
        ];
    }
    var cont = lstContacts.length == 0 ? localStorage.length : lstContacts.length;
    for (var i = 0; i < cont; i++) {
        if (localStorage.length > 1)
            contact = JSON.parse(localStorage.getItem(1));
        else
            contact = lstContacts[i];

        // localStorage.setItem((i + 1), JSON.stringify(lstContacts[i]));
        addToTable(contact);
    }
}

function removeTableRow(row, id) {
    var r = confirm("Deseja realmente excluir o item selecionado?");
    if (!r)
        return;

    var tr = $(row).closest('tr');
    tr.fadeOut(400, function () {
        tr.remove();
    });
    alert(id);

    localStorage.removeItem(parseInt(id));

    return false;
}

function isValid() {
    var frm = window.document.frmData;
    var valid = true;
    var str = 'Preencha os seguintes dados para continuar:\n';
    if (frm.cName.value == '') {
        str += '\n- Nome';
        valid = false;
    }
    if (frm.cMail.value == '' && frm.cPhone.value == '') {
        str += '\n- Email e/ou Telefone';
        valid = false;
    }
    if (!valid)
        alert(str);

    return valid;
}

function fill() {
    var frm = window.document.frmData;
    var obj = { 'nome': frm.cName.value, 'email': frm.cMail.value, 'telefone': frm.cPhone.value, 'sexo': frm.cGender.selectedindex, 'endereco': frm.cAddress.value, 'obs': frm.cObs.value };

    // return obj;
    localStorage.setItem((localStorage.length + 1), JSON.stringify(obj));
    addToTable(obj);
}

function save() {
    if (!isValid())
        return;


    fill();
}

function btnClick(btn) {
    alert(btn);
    return false;
}

function getModalData(contato) {
    $('#md-new').attr({
        'data-toggle': 'modal',
        'data-target': '#modal-data'
    });

    if (contato === null)
        clearModal(window.document.frmData);
    // else 
    //     showData(contato);
}

function clearModal(frm) {
    var inputs = frm.getElementsByTagName('input');
    var textareas = frm.getElementsByTagName('textarea');
    var selects = frm.getElementsByTagName('select');
    for (var i = 0; i < inputs.length; i++) {
        inputs[i].value = '';
    }
    for (var i = 0; i < textareas.length; i++) {
        textareas[i].value = '';
    }
    for (var i = 0; i < selects.length; i++) {
        selects[i].selectedIndex = 0;
    }
}



/*
 * FUNCTIONS
 */
function addToTable(contact) {
    var newRow = $("<tr>");
    var cols = "";

    cols += '<td>';
    cols += '<div class="dropdown">';
    cols += '<a href="#" class="dropdown-toggle c-option" data-toggle="dropdown" role="button" aria-haspopup="true" aria-expanded="false"><i class="fa fa-bars" aria-hidden="true"></i></a>';
    cols += '<ul class="dropdown-menu">';
    cols += '<li><a href="#" data-toggle="modal" data-target="#modal-data"><i class="fa fa-pencil-square-o" aria-hidden="true"></i> Editar</a></li>';
    cols += '<li><a href="#" onclick="removeTableRow(this,' + contact['id'] + ')"><i class="fa fa-trash" aria-hidden="true"></i> Excluir</a></li>';
    cols += '<li role="separator" class="divider"></li>';
    cols += '<li><a href="#" data-toggle="modal" data-target="#modal-view"><i class="fa fa-file-text-o" aria-hidden="true"></i> Visualizar</a></li>';
    cols += '<li><a href="#"><i class="fa fa-star-o" aria-hidden="true"></i> Marcar como Favorito</a></li>';
    cols += '</ul>';
    cols += '</div>';
    cols += contact['nome'];
    cols += '</td>';

    cols += '<td>' + contact['email'] + '</td>';
    cols += '<td>' + contact['telefone'] + '</td>';

    newRow.append(cols);

    $("#tableContacts").append(newRow);
}
