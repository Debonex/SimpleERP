$(document).ready(function() {
    $('#a-sale').addClass('active');

    $('#btn-note-add-print').bind('click', function() {
        $('#modal-note-add').modal('hide');
    });
});