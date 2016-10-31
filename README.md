## Note board

This is a note board app with the ability for users to drag and drop notes around a screen. It is written using React and Redux. It is live at www.sebmuellermath.com/board/.



## Development Notes
Below are some organisational notes that I made when starting the project.

### ToDo

* will there be any "state" to the overall UI of the board?
* setup database
    * think about the tables/fields in the database
* write some basic presentational components
    * these will be independent of how information flows through the app (ie doesn't depend on redux vs flux vs manual data handling)
    * footer
        * "powered by coffee and an ageing macbook"

* try a few different ways of passing information around
    * manually? no information storage the start with
    * flux

### Done

* setup basic html page
* add eslinting

* design the data structures
    * what information does a card contain
    * what information does the board contain
* set up routes file
* add serverside rendering
	* do this once express is setup, this will do away with the index.html page
* add express server
	* add middleware
* write some basic presentational components
	* header
			* add card option
			* modal for add card
	* board
	* card
			* color card
* try a few different ways of passing information around
	* redux


### Useful things

#### SASS/SCSS/CSS and webpack

There are two main ways to use webpack with a pages css files. The first is to bundle all the sites css files into one, which gets included into the page (just like the JavaScript bundling that webpack does so well). The second is to keep css files more or less independent and include them each individually into the modules we want to use.

    1. The first way we have an "entry point" scss file, with a bunch of
        * @import "styles/some_great_stylesheet.scss"
    The @import is a sass thing that includes the referenced stylesheet.
    2. The second way is to include the stylesheets individually into each module:
        * require("styles/some_great_stylesheet.scss")
    This goes into each javascript file.
