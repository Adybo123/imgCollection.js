/*
  imgCollection.js
  </> with <3 by deeBo

  https://github.com/adybo123
*/

/*
  NOTE: Requires ES6 for class and let of loops.
  Might not work on all older browsers.
*/

class imgFilter {
  constructor (appendObj, imageCollection, appendTemplate, startingView, onAppend) {
    this.appendObj = appendObj;
    this.imageCollection = imageCollection;
    this.appendTemplate = appendTemplate;
    if (startingView) {
      //Filter applied on start?
      this.displayCategories = startingView;
    } else {
      //Show everthing
      this.displayCategories = Object.keys(this.imageCollection);
    }
    //Has the user defined a handler?
    if (onAppend) {
      this.onAppend = onAppend;
    } else {
      this.onAppend = function () {};
    }
  }

  updateDisplay() {
    this.appendObj.html("");
    //For applied categories, then for image in that category
    for (let dC of this.displayCategories) {
      for (let iC of this.imageCollection[dC]) {
        //Add image inside the handler to return the newly added image.
        this.onAppend($(this.appendTemplate.replace('%SRC%', iC)).appendTo(this.appendObj));
      }
    }
  }

  showAllBut(butArray) {
    this.displayCategories = [];
    //For category names, is it in the array?
    for (let category of Object.keys(this.imageCollection)) {
      var dontShow = false;
      for (let bA of butArray) {
        if (category==bA) {
          dontShow = true;
        }
      }
      //If so, add to display queue
      if (!dontShow) {
        this.displayCategories.push(category);
      }
    }
    //Refresh the images shown
    this.updateDisplay();
  }

  showJust(justArray) {
    this.displayCategories = justArray;
    this.updateDisplay();
  }
}

class slickerFilter extends imgFilter {
  constructor (slickOptions, appendObj, imageCollection, appendTemplate, startingView, onAppend) {
    //Call the imgFilter constructor, because most of the options are the same.
    super(appendObj, imageCollection, appendTemplate, startingView, onAppend);
    this.firstUpdate = true;
    this.slickOptions = slickOptions;
  }

  updateDisplay() {
    //Unslick
    if (!this.firstUpdate) {
      this.appendObj.slick('unslick');
    } else {
      this.firstUpdate = false;
    }

    //Do the normal filter
    super.updateDisplay();

    //Reslick
    if (this.slickOptions) {
      this.appendObj.slick(this.slickOptions);
    } else {
      this.appendObj.slick();
    }
  }
}
