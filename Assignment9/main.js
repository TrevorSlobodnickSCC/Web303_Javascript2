$(document).ready(function () {
    let superheroes = [];
    init(); //add data to table

    $("#search").keyup(onSearchChange);
    $(".filter-btn").click(onFilterBtnClicked);
    $(".col-header").click(onSort);

    const SORT_TYPE = {
        ASCENDING : 1,
        DESCENDING : 2,
        NATURAL : 3
    }

    const CHEVRONS = {
        UP: "&#x25B2;",
        DOWN: "&#x25BC;",
        NONE: ""
    }

    const COMPARE_FUNCTIONS = {
        DEFAULT: function(a, b){
            a = $(a).find("." + sortState.col).text();
            b = $(b).find("." + sortState.col).text();
            if(a < b){
                return -1;
            }
            else if(a > b){
                return 1;
            }
            else{
                return 0;
            }
        },
        ID: function(a, b){
            a = a.id;
            b = b.id;
            return a - b;
        },
        DATE: function(a, b){
            a = $(a).find("." + sortState.col).text();
            b = $(b).find("." + sortState.col).text();
            let dateA = new Date(a);
            let dateB = new Date(b);
            return dateA - dateB;
        }
    }

    const sortState = {
        col: "", //stores the e.target value for each column header
        type: SORT_TYPE.NATURAL, //stores a value 1-3 (SORT_TYPE.NATURAL is default)
        compareFn: function(){}, //stores one of the functions in COMPARE_FUNCTIONS
        chevron: CHEVRONS.NONE //the chevron to display after the column header (CHEVRONS.NONE is default)
    }

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

    function onSort(e){
        //prevent default link actions
        e.preventDefault();
        //if a new column was clicked...
        if(e.target.id != sortState.col){
            //set the col value to the id of the element that was clicked on
            sortState.col = e.target.id;
        }
        //updates the sortState.type and sortState.chevron properties based on sortState.type previous value
        updateSortState()
        //determine which compare function to use
        if(sortState.col == "fa_date"){
            sortState.compareFn = COMPARE_FUNCTIONS.DATE;
        }
        else if(sortState.type == SORT_TYPE.NATURAL){
            sortState.compareFn = COMPARE_FUNCTIONS.ID;
        }
        else{
            sortState.compareFn = COMPARE_FUNCTIONS.DEFAULT;
        }
        //sorts and displays the data
        sort();
    }

    function sort(){
        //get array of rows to sort
        let rowsToSort = $("tbody tr").toArray();
        //sort the array
        rowsToSort.sort(sortState.compareFn);
        if (sortState.type == SORT_TYPE.DESCENDING){
            //since there is no descending compare function, if the sort type is descending simply reverse the sorted array
            rowsToSort.reverse();
        }
        //array is now sorted, so display it
        //append will move the item if it exists in the DOM - no need to remove!
        $("tbody").append(rowsToSort);
        //remove current chevron (if it exists)
        $("#chevron").remove();
        //add chevron
        $("#" + sortState.col).after(`<span id="chevron">${sortState.chevron}</span>`);
    }

    /**
     * Updates the sortState type and chevron properties based on the current value of sort type
     */
    function updateSortState(){
        if(sortState.type == SORT_TYPE.NATURAL){
            //if current sort type is natural, change it to ascending
            sortState.type =  SORT_TYPE.ASCENDING;
            //also change chevron to up
            sortState.chevron = CHEVRONS.UP;
        }
        else if(sortState.type == SORT_TYPE.ASCENDING){
            //if current sort type is ascending, switch it to descending
            sortState.type =  SORT_TYPE.DESCENDING;
            //also change chevron to down
            sortState.chevron = CHEVRONS.DOWN;
        }
        else{
            //otherwise, rows should appear as they originally did when opening the page
            sortState.type =  SORT_TYPE.NATURAL;
            //remove the chevron
            sortState.chevron = CHEVRONS.NONE;
        }
    }

    /**
     * Return the alphabet as an array given a start and end character (a-z by default)
     * @param {string} startAt the character the alphabet should start at
     * @param {string} endAt the character the alphabet should end at
     * @returns array
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
                        `<tr id="${hero.id}">
                            <td class="name">${hero.name}</td>
                            <td class="publisher">${hero.publisher}</td>
                            <td class="alter_ego">${hero.alter_ego}</td>
                            <td class="fa_comic">${hero.first_appearance.comic}</td>
                            <td class="fa_date">${hero.first_appearance.date}</td>
                            <td class="superpowers">${hero.superpowers}</td>
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