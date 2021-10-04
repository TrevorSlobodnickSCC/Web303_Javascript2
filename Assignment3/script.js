function getDataJson(){
    $.getJSON("team.json",
        function (data) {
            data.teammembers.forEach(element => {
                $("div#team").before(`
                    <h3>${element.name}</h3>
                    <h4>${element.title}</h4>
                    <p>${element.bio}</p>
                `);
            });
        }
    );
}

function getDataAjax(){
    $.ajax({
        type: "get",
        url: "team.json",
        beforeSend: function (){
            $("div#team").html("Loading...");
        },
        success: function (response) {
            setTimeout(function(){
                response.teammembers.forEach(element => {
                    $("div#team").html("");
                    $("div#team").before(`
                        <h3>${element.name}</h3>
                        <h4>${element.title}</h4>
                        <p>${element.bio}</p>
                    `);
                });
            }, 5000);
        },
        error: function (response){
            alert(response);
        }
    });
}

getDataAjax()
//getDataJson()