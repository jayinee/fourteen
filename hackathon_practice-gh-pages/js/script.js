window.onload = function () {
  (function () {

    // palettePopUp controls the display of the color palette while hiding the other elements. It uses the toggle method to achieve this.
    var palettePopUp = {
      init: function () {
        this.cacheDOM();
        this.bindEvents();
      },
      cacheDOM: function () {
        this.selector = document.getElementById("color-container");
        this.palette = document.querySelector(".color-palette");
        this.form = document.querySelector("form");
        this.finalForm = document.querySelector(".form-final-container");
      },
      bindEvents: function () {
        this.finalForm.classList.toggle("hide-form");
        this.selector.addEventListener("click", this.showPalette);
      },
      showPalette: function () {
        palettePopUp.palette.classList.toggle("show-palette");
        this.form.classList.toggle("hide-form");
        colorPicker.init();
      }
    };

    var colorPicker = {
      init: function () {
        this.cacheDOM();
        this.bindEvents();
      },
      cacheDOM: function () {
        this.colorOptions = document.querySelectorAll("li");
        this.selector = document.querySelector(".preview-color");
      },
      bindEvents: function () {
        for (var i = 0; i < this.colorOptions.length; i++) {
          this.colorOptions[i].addEventListener("click", this.pickColor);
        }
      },
      pickColor: function () {
        pickedColor = this.children[0].innerHTML;
        colorPicker.selector.style.background = pickedColor;
        palettePopUp.palette.classList.toggle("show-palette");
        palettePopUp.form.classList.toggle("hide-form");
        window.location.hash = "";
        colorPicker.returnToHash();
      },
      returnToHash: function () {
        window.location.hash = "#palette-div";
      }
    };

    var keyEnterLast = {
      init: function () {
        this.cacheDOM();
        this.bindEvents();
      },
      cacheDOM: function () {
        this.field = document.querySelectorAll("input")[6];
        this.header = document.querySelector(".header");
      },
      bindEvents: function () {
        this.field.addEventListener("keyup", this.showFinalForm);
      },
      showFinalForm: function () {
        if (event.key === "Enter") {
          window.location.hash = "";
          palettePopUp.form.classList.toggle("hide-form");
          keyEnterLast.header.classList.toggle("hide-form");
          palettePopUp.finalForm.classList.toggle("hide-form");
        }
      }
    };

    var formProgress = {
      init: function () {
        this.cacheDOM();
        this.bindEvents();
      },
      cacheDOM: function () {
        this.fields = document.getElementsByClassName("first-form-fill");
        this.finalName = document.getElementById("form-final-name");
      },
      bindEvents: function () {
        for (var i = 0; i <   this.fields.length; i++) {
          this.fields[i].addEventListener("keyup", this.test);
        }
      },
      test: function () {
        var numb = document.getElementById("current-num");
        if (event.key === "Enter") {
          if (this.id == document.getElementsByClassName(this.id)[0].classList[0]) {
            document.querySelector("." + this.id + "").value = this.value;
          }
          this.parentNode.classList.toggle("form-effect");
          var update = document.createTextNode(Number(numb.innerText) + 1);
          numb.innerText =  update.textContent;
        }
      }
    };

    var b_continue = document.getElementById("continue");
    b_continue.addEventListener("click", function () {
      alert("It worked!");
    });

    palettePopUp.init();
    keyEnterLast.init();
    formProgress.init();
  }());

};
