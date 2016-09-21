
$(document).ready(function () {
    load();
});

/*
 * Metodo para carregar os dados cadastrados no "localStorage"
 */
function load() {
    var lstContacts = [];
    if (localStorage.length == 0) {
        lstContacts = [
            { 'id': '1', 'nome': 'Marcos Vinicius', 'email': 'marcos@forlogic.net', 'telefone': '(43) 9927-8871', 'sexo': '1', 'endereco': 'Rua 23, nº 8', 'obs': '', 'fav': '0' },
            { 'id': '2', 'nome': 'Fulano', 'email': 'fulano@forlogic.net', 'telefone': '(00) 0000-0000', 'sexo': '3', 'endereco': 'Não informado', 'obs': 'esta é uma observação', 'fav': '0' },
            { 'id': '3', 'nome': 'Joaquina', 'email': 'joaquina@exemplo.com', 'telefone': '(12) 3456-7890', 'sexo': '2', 'endereco': 'Rua da forlogic', 'obs': '', 'fav': '0' },
            { 'id': '4', 'nome': 'Yudi', 'email': 'yudi@bomdiaecia.com.br', 'telefone': '(11) 4002-8922', 'sexo': '1', 'endereco': 'Bom dia e Cia', 'obs': 'Playstation Playstation Playstation Playstation Playstation', 'fav': '0' }
        ];
        localStorage.setItem('lstContacts', JSON.stringify(lstContacts));
    } else {
        lstContacts = JSON.parse(localStorage.getItem('lstContacts'));
    }
    for (var i = 0; i < lstContacts.length; i++) {
        addToTable(lstContacts[i]);
    }
}

/*
 * Metodo para adicionar um contato na "tableContacts"
 */
function addToTable(contact) {
    var newRow = $("<tr>");
    var cols = "";
    cols += '<td>';
    cols += '<div class="dropdown">';
    cols += '<a href="#" class="dropdown-toggle c-option" data-toggle="dropdown" role="button" aria-haspopup="true" aria-expanded="false"><i class="fa fa-bars" aria-hidden="true"></i></a>';
    cols += '<ul class="dropdown-menu">';
    cols += '<li><a id="md-edit" href="#" onclick="getModalData(' + contact['id'] + ')"><i class="fa fa-pencil-square-o" aria-hidden="true"></i> Editar</a></li>';
    cols += '<li><a href="#" onclick="removeContact(this,' + contact['id'] + ')"><i class="fa fa-trash" aria-hidden="true"></i> Excluir</a></li>';
    cols += '<li role="separator" class="divider"></li>';
    cols += '<li><a href="#"><i class="fa fa-file-text-o" aria-hidden="true"></i> Visualizar</a></li>';
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

/*
 * Metodo para adicionar um contato na "tableContacts" também para o "localStorage"
 */
function addContact(contact) {
    var lst = JSON.parse(localStorage.getItem('lstContacts'));
    lst.push(contact);
    localStorage.setItem('lstContacts', JSON.stringify(lst));
    addToTable(contact);
}

/*
 * Metodo para remover um contato da "tableContacts" e do "localStorage"
 */
function removeContact(row, id) {
    // Remove da tabela
    if (!(confirm('Deseja realmente excluir o item selecionado?')))
        return;

    var tr = $(row).closest('tr');
    tr.fadeOut(400, function () {
        tr.remove();
    });

    // Remove do localStorage
    removeFromStorage(id);
}

/*
 * Metodo para remover um contato do "localStorage"
 */
function removeFromStorage(id) {
    var i = 0;
    var lst = JSON.parse(localStorage.getItem('lstContacts'));
    for (i = 0; i < lst.length; i++) {
        if (lst[i].id == id)
            break;
    }
    lst.splice(i, 1);
    localStorage.setItem('lstContacts', JSON.stringify(lst));
}

/*
 * Metodo para limpar os campos de um form
 */
function clearForm(frm) {
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
 * Metodo para validar os dados do "frmData"
 */
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

    $('#btn-md-save').attr('data-dismiss', 'none');

    return valid;
}

/*
 * Metodo para pegar um ID disponivel 
 */
function getNewId() {
    var lst = JSON.parse(localStorage.getItem('lstContacts'));
    var new_id = 0;
    do {
        var flag = false;
        new_id = Math.floor((Math.random() * 1000) + 1);
        for (var i = 0; i < lst.length; i++) {
            if (lst[i].id == new_id) {
                flag = true;
                break;
            }
        }
    } while (flag);
    return new_id + '';
}


/*
 * A PARTIR DAQUI ESTÃO OS METODOS PARA SEREM VERIFICADOS
 */
function save() {
    if (!isValid())
        return;

    var obj = fill(null);
    $('#btn-md-save').attr('data-dismiss', 'modal');

    alert('Contato incluído com sucesso!');
}

function updateContact(contact_id) {
    if (!isValid())
        return;

    alert(contact);
}

function fill(contact) {
    var frm = window.document.frmData;
    contact['id'] = contact_id == null ? getNewId() : contact_id;

    contact = { 'id': getNewId(), 'nome': frm.cName.value, 'email': frm.cMail.value, 'telefone': frm.cPhone.value, 'sexo': frm.cGender.selectedIndex + '', 'endereco': frm.cAddress.value, 'obs': frm.cObs.value, 'fav': '0' };
    addContact(contact);
}

function showData(contact) {
    if (contact == null)
        clearForm(window.document.frmData);

    $('#btn-md-save').attr('onclick', 'save(' + contact + ')');

}

/* verificadas */
function getModalData(contact_id) {
    $('#md-edit, #md-new').attr({
        'data-toggle': 'modal',
        'data-target': '#modal-data'
    });
    showData(getContactById(contact_id));
}

function getContactById(id) {
    var lst = JSON.parse(localStorage.getItem('lstContacts'));
    for (var i = 0; i < lst.length; i++) {
        if (lst[i].id == id)
            return lst[i];
    }
    return null;
}

