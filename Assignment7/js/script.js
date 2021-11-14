$(function () {
    $('#photo-viewer').photoViewer().show().on('click', '.photo-frame', function (e) {
        var $content = $(this).clone().find('img').css({
            marginLeft: 0,
            marginTop: 0,
            width: '100%',
            height: 'auto'
        });
        //modal code goes here

        e.preventDefault();
        openModal();

        function openModal(){
            let $modalBG = $('<div id="modalBG"></div>');
            let $modal = $('<div id="modal"></div>');
            $modal.append($content);
            $modal.append('<button id="closeModal" class="btn">Close</button>');
            $modalBG.append($modal);
            $("body").append($modalBG)
            $("#modalBG").show('slow');
            $("#closeModal").click(closeModal);
        }

        function closeModal(){
            $("#modalBG").hide('slow', function(){ $(this).remove() });
        }

    });
});
