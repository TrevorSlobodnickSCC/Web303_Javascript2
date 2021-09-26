// WEB303 Assignment 2
// Trevor Slobodnick

const animTime = 500;

$( document ).ready(function (){
    console.log("Document Ready...");
    $( "#vprospect" ).click((e) => getPageData(e, "prospect"));
    $( "#vconvert" ).click((e) => getPageData(e, "convert"));
    $( "#vretain" ).click((e) => getPageData(e, "retain"));
});

/**
 * Gets data from one of the local html files and displays it in the solution div
 * @param {Event} e The event object
 * @param {String} page The name of the html file to get the data from
 */
function getPageData(e, page){
    e.preventDefault(); // Prevents the link from redirecting/reloading the page
    let url = page + ".html";
    $.ajax({
        type: "GET",
        url: url,
        success: function (response) {
            //The animation first hides the element, then updated the html, then reveals the element

            //if the solution div is in its initial state...
            if ($( "#solution" ).css("height") == "0px") {
                //The first time the user clicks we dont want to wait for it to reveal, so set animation time to 0
                $( "#solution" ).animate({height : "toggle"}, 0, () => {
                    //At this point the first animation has completed, so now we can change the content (html) and reveal it
                    $( "#solution" ).html(response).animate({height : "toggle"}, animTime)
                });
            }
            //otherwise...
            else{
                //If its not the first time the user clicks, then we need to hide the content first before switching it
                $( "#solution" ).animate({height : "toggle"}, animTime, () => {
                    //At this point the first animation has completed, so now we can change the content (html) and reveal it
                    $( "#solution" ).html(response).animate({height : "toggle"}, animTime)
                });
            }
        },
        error: function (err) {
            console.log(err);
        }
    });
}