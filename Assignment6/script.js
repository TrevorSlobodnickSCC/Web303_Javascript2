/*
    Assignment 6
    Trevor Slobodnick
*/

$(document).ready(function () {
    $(".opens-modal").click(openModal);
    $(".closes-modal").click(closeModal);

    function openModal(){
        // Optional - remove scrolling while modal open
        // $('html, body').css({overflow: 'hidden'});
        let filename = $(this).data("filename");
        $(".modal-subtitle").text(filename);
        let imagePath = "images/" + filename;
        $(".modal-image").attr('src', imagePath);
        $("#modal").fadeIn(200);
    }

    function closeModal(){
        // Optional - reset scrolling
        // $('html, body').css({overflow: 'auto'});
        $("#modal").fadeOut(200);
        //the image will disappear before the fade out so a timeout is needed
        setTimeout(function(){
            $(".modal-subtitle").text("example.png");
            $(".modal-image").attr('src', '');
        }, 200)
    }
});