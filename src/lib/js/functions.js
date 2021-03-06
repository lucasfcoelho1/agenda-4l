
$(document).ready(function () {
    var lstContacts = [
        { 'id': '534', 'nome': 'Marcos Vinicius', 'email': 'marcos@forlogic.net', 'telefone': '(43) 9927-8871', 'sexo': '2', 'endereco': 'Rua 23, nº 8', 'obs': '', 'fav': '1' },
        { 'id': '200', 'nome': 'Fulano', 'email': 'fulano@forlogic.net', 'telefone': '(00) 0000-0000', 'sexo': '3', 'endereco': 'Não informado', 'obs': 'esta é uma observação', 'fav': '0' },
        { 'id': '33', 'nome': 'Joaquina', 'email': 'joaquina@exemplo.com', 'telefone': '(12) 3456-7890', 'sexo': '1', 'endereco': 'Rua da forlogic', 'obs': '', 'fav': '0' },
        { 'id': '2', 'nome': 'Yudi', 'email': 'yudi@bomdiaecia.com.br', 'telefone': '(11) 4002-8922', 'sexo': '0', 'endereco': 'Bom dia e Cia', 'obs': 'Playstation Playstation Playstation Playstation Playstation', 'fav': '1' }
    ];

    load();
});

/*
 * Metodo para carregar os dados cadastrados no "localStorage"
 */
function load(lstContacts) {
    $('#tableContacts tbody').replaceWith('<tbody></tbody>');
    var lst = lstContacts == undefined ? [] : lstContacts;
    if (localStorage.length != 0)
        lst = getStorageItems();

    for (var i = 0; i < lst.length; i++) {
        addToStorage(lst[i]);
        addToTable(lst[i]);
    }
}

/*
 * Metodo para adicionar um contato na "tableContacts" também para o "localStorage"
 */
function addToStorage(contact) {
    localStorage.setItem(contact['id'], JSON.stringify(contact));
}

/*
 * Metodo para adicionar um contato na "tableContacts"
 */
function addToTable(contact) {
    var newRow = $('<tr>');
    var cols = '';

    // Dados
    cols += '<td>' + contact['nome'] + '</td>';
    cols += '<td>' + contact['email'] + '</td>';
    cols += '<td>' + contact['telefone'] + '</td>';

    // Opções
    cols += '<td class="text-center c-option">';
    cols += '<a onclick="getModalData(' + contact['id'] + ')" title="Editar" id="btnEdit"><i class="fa fa-pencil-square-o"></i></a>';
    cols += '<a onclick="removeContact(this,' + contact['id'] + ')" title="Excluir"><i class="fa fa-trash"></i></a>';
    cols += '<a onclick="view(' + contact['id'] + ')" title="Visualizar" id="btnView-' + contact['id'] + '" data-toggle="modal" data-target="#modal-view"><i class="' + (contact['obs'] == '' ? 'fa fa-file-text-o' : 'fa fa-file-text') + '"></i></a>';
    cols += '<a onclick="favContact(' + contact['id'] + ')" title="Favorito" id="btnFav-' + contact['id'] + '"><i class="' + (contact['fav'] == '1' ? 'fa fa-star' : 'fa fa-star-o') + '"></i></a>';
    cols += '</td>';

    newRow.append(cols);
    $('#tableContacts').append(newRow);
}

/* 
 * Metodo para favoritar um contato
 */
function favContact(contact_id) {
    var contact = JSON.parse(localStorage.getItem(contact_id));
    var btnId = '#btnFav-' + contact['id'] + ' i';
    if (contact['fav'] == '1') {
        $(btnId).removeClass('fa fa-star');
        $(btnId).addClass('fa fa-star-o');
        contact['fav'] = '0';
    } else {
        $(btnId).removeClass('fa fa-star-o');
        $(btnId).addClass('fa fa-star');
        contact['fav'] = '1';
    }
    localStorage.setItem(contact['id'], JSON.stringify(contact));
}

/*
 * Metodo para remover um contato da "tableContacts" e do "localStorage"
 */
function removeContact(row, key) {
    // Remove da tabela
    if (!(confirm('Deseja realmente excluir o item selecionado?')))
        return;

    var tr = $(row).closest('tr');
    tr.fadeOut(400, function () {
        tr.remove();
    });

    // Remove do localStorage
    localStorage.removeItem(key);
}

/*
 * Metodo para limpar os campos de um formulario
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
    var lst = getStorageItems();
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
 * Metodo para abrir o "modal-data"
 */
function getModalData(contact_id) {
    $('#btnEdit, #btnNew').attr({
        'data-toggle': 'modal',
        'data-target': '#modal-data'
    });
    showData(JSON.parse(localStorage.getItem(contact_id)));
}

/*
 * Metodo para exibir os dados de um contato para edição no "modal-data" 
 */
function showData(contact) {
    clearForm(window.document.frmData);
    $('#btn-md-save').attr('onclick', 'save(' + (contact == null ? null : contact['id']) + ')');
    if (contact == null)
        return;

    var frm = window.document.frmData;

    frm.cName.value = contact.nome;
    frm.cMail.value = contact.email;
    frm.cPhone.value = contact.telefone;
    frm.cGender.selectedIndex = contact.sexo == '' ? 0 : parseInt(contact.sexo);
    frm.cAddress.value = contact.endereco;
    frm.cObs.value = contact.obs;
}

/*
 * Metodo que retorna um Array a partir dos items cadastrados no "localStorage"
 */
function getStorageItems() {
    var lst = [];
    var i = 0;
    for (var key in localStorage) {
        if (i >= localStorage.length)
            break;
        lst.push(JSON.parse(localStorage.getItem(key)));
        i++;
    }
    return lst;
}

/*
 * Metodo para salvar/editar um contato da lista
 */
function save(contact_id) {
    if (!isValid())
        return;

    var flag = ((contact_id == null) ? true : false);
    var str = ((contact_id == null) ? 'Contato incluído' : 'Contato editado') + ' com sucesso!';

    $('#btn-md-save').attr('data-dismiss', 'modal');

    var contact = fill(JSON.parse(localStorage.getItem(contact_id)));
    addToStorage(contact);
    alert(str);
    if (flag)
        addToTable(contact);

    load();
}

/*
 * Metodo para preencher o contato com os dados preenchidos no "frmData"
 */
function fill(contact) {
    var frm = window.document.frmData;
    contact = { 'id': (contact == null ? getNewId() : contact.id), 'nome': frm.cName.value, 'email': frm.cMail.value, 'telefone': frm.cPhone.value, 'sexo': frm.cGender.selectedIndex, 'endereco': frm.cAddress.value, 'obs': frm.cObs.value, 'fav': (contact == null ? 0 : contact.fav) };

    return contact;
}

/*
 * Metodo para abrir o "modal-view" com os dados do contato para visualização
 */
function view(contact_id) {
    var contact = JSON.parse(localStorage.getItem(contact_id));
    var rows = '';

    rows += getViewRow('Nome', contact['nome']);
    rows += getViewRow('Email', contact['email']);
    rows += getViewRow('Telefone', contact['telefone']);
    rows += getViewRow('Sexo', (contact['sexo'] == '0' ? 'Não Informado' : contact['sexo'] == '1' ? 'Feminino' : contact['sexo'] == '2' ? 'Masculino' : 'Outros'));
    rows += getViewRow('Endereço', contact['endereco']);
    rows += getViewRow('Observações', contact['obs']);

    $('div#modal-view div.modal-body').replaceWith('<div class="modal-body"></div>');
    $('div#modal-view div.modal-body').append(rows);

}

/*
 * Retorna a string completa da linha para adicionar no "modal-view"
 */
function getViewRow(title, value) {
    return '<div class="row"><div class="col-md-3 text-right"><b>' + title + ':</b></div><div class="col-md-9 text-left">' + value + '</div></div><br />';
}
