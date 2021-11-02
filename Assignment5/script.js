/*
    Assignment 5
    Trevor Slobodnick
*/

$(document).ready(function(){
    // Create content card class
    class ContentCard{
        constructor(id, title, description, category) {
            this.id = id;
            this.title = title;
            this.description = description;
            this.category = category;
        }

        updateContent(title, description, category){
            //if property is not null, update property with provided value
            if(title !== null){
                this.title = title;
            }
            if(description !== null){
                this.description = description;
            }
            if(category !== null){
                this.category = category;
            }
        }

        toString(){
            return `
                <div id="content-${this.id}">
                    <h4>${this.title}</h4>
                    <p>${this.description}</p>
                    <div>${this.category}</div>
                </div>
            `
        }
    }

    // Create content cards array
    // theme - mobile games
    const contentCards = [
        new ContentCard(
            1, 
            "League of Legends: Wild Rift", 
            "The skills-and-strats 5v5 MOBA experience of League of Legends, now on mobile.",
            "MOBA"
        ),
        new ContentCard(
            2, 
            "Candy Crush Saga", 
            "The sweetest puzzle game! Switch, match, and blast candies to win levels!",
            "Puzzle"
        ),
        new ContentCard(
            3, 
            "DanMachi - MEMORIA FREESE", 
            "\"DanMachi - MEMORIA FREESE\" is an RPG based on the mega-hit light novel",
            "Gacha"
        ),
        new ContentCard(
            4, 
            "Pokemon Go", 
            "Discover Pokémon worldwide",
            "Augmented Reality (AR)"
        ),
        new ContentCard(
            5, 
            "2048", 
            "Free 2048 number game brings you cool math, brain teaser, and mind puzzle fun!",
            "Puzzle"
        ),
    ]

    //add content to screen
    contentCards.forEach(card => {
        $("div#content-list").append(card.toString());
        $("div#content-" + card.id).css({border: "dashed thin black"});
    })
});


