#### Kanban board


#### Motivation

Kan boards are very useful organisation tools. I think I should get more organised so that I can do more interesting software projects. So as a software project, I am gunna make a kan board! (I really hope I don't need a kan board to complete this kan board project...)

#### Data structures



#### ToDo

* design the data structures
    * what information does a card contain
    * what information does the board contain
* will there be any "state" to the overall UI of the board?


* set up routes file
* add express server
	* add middleware
* add serverside rendering
	* do this once express is setup, this will do away with the index.html page
* setup database
    * think about the tables/fields in the database
* write some basic presentational components
    * these will be independent of how information flows through the app (ie doesn't depend on redux vs flux vs manual data handling)
    * header
        * add card option
        * modal for add card
    * footer
        * "powered by coffee and an ageing macbook"
    * card
        * color card
    * board
* try a few different ways of passing information around
    * manually? no information storage the start with
    * flux
    * redux

#### Done

* setup basic html page
* add eslinting

### Useful things

#### SASS/SCSS/CSS and webpack

There are two main ways to use webpack with a pages css files. The first is to bundle all the sites css files into one, which gets included into the page (just like the JavaScript bundling that webpack does so well). The second is to keep css files more or less independent and include them each individually into the modules we want to use.

    1. The first way we have an "entry point" scss file, with a bunch of
        * @import "styles/some_great_stylesheet.scss"
    The @import is a sass thing that includes the referenced stylesheet.
    2. The second way is to include the stylesheets individually into each module:
        * require("styles/some_great_stylesheet.scss")
    This goes into each javascript file.
