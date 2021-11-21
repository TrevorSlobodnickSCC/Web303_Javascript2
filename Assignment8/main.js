$(document).ready(function () {
    let superheroes = [];
    init(); //add data to table

    $("#search").keyup(onSearchChange);
    $(".filter-btn").click(onFilterBtnClicked);

    function onSearchChange(e){
        if(e.which == 13){
            //enter key
            e.preventDefault();
            $(this).blur();
        }
        let searchTxt = this.value.toLowerCase(); //
        if(searchTxt == ""){
            //ensures no elements are still highlighted
            $(".name").each(function(i, val){
                $(val).parent().css("background-color", "#f5f5f5")
            })
        }
        else{
            $(".name").each(function(i, val){
                if(val.textContent.toLowerCase().includes(searchTxt)){
                    $(val).parent().css("background-color", "yellow")
                }
                else{
                    $(val).parent().css("background-color", "#f5f5f5")
                }
            })
        }
    }

    function onFilterBtnClicked(e){
        let filterChars;
        if(this.id == "filter-btn1"){
            //the a - m button was clicked
            filterChars = getAlphabetForRange("a", "m");
        }
        else{
            //the n - z button was clicked
            filterChars = getAlphabetForRange("n", "z");
        }
        $(".name").each(function(i, val){
            let firstChar = val.textContent.toLowerCase()[0];
            if(filterChars.includes(firstChar)){
                $(val).parent().css("display", "table-row")
            }
            else{
                $(val).parent().css("display", "none")
            }
        });
    }

    /**
     * Return the alphabet as an array given a start and end character (a-z by default)
     * @param {string} startAt the character the alphabet should start at
     * @param {string} endAt the character the alphabet should end at
     * @returns 
     */
    function getAlphabetForRange(startAt = 'a', endAt = "z"){
        const start = startAt.toLowerCase();
        const end = endAt.toLowerCase();
        const alphabet = 'abcdefghijklmnopqrstuvwxyz'.split('');
        return (alphabet.slice(alphabet.indexOf(start), alphabet.indexOf(end) + 1)); 
    }

    /**
     * Populates the superheroes array with data from superheroes.js, then adds the data to the table
     */
    function init(){
        $.ajax({
            type: "GET",
            url: "superheroes.json",
            success: function (data) {
                superheroes = data;
                superheroes.forEach(hero => {
                    $("tbody").append(
                        `<tr>
                            <td class="name">${hero.name}</td>
                            <td>${hero.publisher}</td>
                            <td>${hero.alter_ego}</td>
                            <td>${hero.first_appearance}</td>
                            <td>${hero.superpowers}</td>
                        </tr>`
                    );
                });
            },
            error: function(data){
                alert("Error getting superhero data")
            }
        });
    }
});