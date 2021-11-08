/*
    Assignment 6
    Trevor Slobodnick
*/

$(document).ready(function () {
    //modal code for showing the license popup when clicking an image
    $(".opens-modal").click(openModal);
    $(".closes-modal").click(closeModal);

    //handle tab clicks
    $(".tab").click(onTabClicked);

    //handle accordion clicks
    $(".accordion-label").click(onAccordionLabelClicked);

    function openModal(){
        // Optional - remove scrolling while modal open
        // $('html, body').css({overflow: 'hidden'});
        let filename = $(this).data("filename");
        $(".modal-subtitle").text(filename);
        let imagePath = $(this).attr("src");
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

    function onTabClicked(){
        let $currentElem = $(this);
        //make sure we are not clicking the element that is already open
        if(!$currentElem.hasClass("tab-open")){
            //a new element was clicked...
            //find the currently opened tab
            $(".tab").each(function (i, val) { 
                if ($(val).hasClass("tab-open")) {
                    //remove the tab-open class from the element
                    $(val).removeClass("tab-open");
                    //remove the show-tab-content from its matching content div
                    let matchingElemId = $(val).children("a").attr("href");
                    $(matchingElemId).removeClass("show-tab-content");
                    //stop looping
                    return false;
                }
            });
            //add the tab-open class to the new element clicked
            $currentElem.addClass("tab-open");
            //add the show-tab-content to its matching content div
            let matchingElemId = $currentElem.children("a").attr("href");
            $(matchingElemId).addClass("show-tab-content");
        }   
    }

    let openedAccordion1;
    let openedAccordion2;

    function onAccordionLabelClicked(){
        //check if click came from accordion 1
        if($(this).hasClass("one")){
            if(this == openedAccordion1){
                $(this).next().slideToggle();
                openedAccordion1 = undefined;
            }
            else{
                if (openedAccordion1 != null) {
                    //hide previous, if it exists
                    $(openedAccordion1).next().slideToggle();
                }
                //open what was just clicked on
                $(this).next().slideToggle();
                //assign element clicked to last opened
                openedAccordion1 = this;
            }
        }
        // do the same for accordion 2
        else{
            if(this == openedAccordion2){
                $(this).next().slideToggle();
                openedAccordion2 = undefined;
            }
            else{
                if (openedAccordion2 != null) {
                    //hide previous, if it exists
                    $(openedAccordion2).next().slideToggle();
                }
                //open what was just clicked on
                $(this).next().slideToggle();
                //assign element clicked to last opened
                openedAccordion2 = this;
            }
        }
    }
});