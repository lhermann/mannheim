import { getSlider } from "simple-slider";
import $ from "cash-dom";
import Hammer from "hammerjs";

var sliderContainer = document.getElementById("simple-slider");

// Setup slider
var slider = getSlider({
    container: sliderContainer,
    prop: "opacity",
    unit: "",
    init: 0,
    show: 1,
    end: 0,
    delay: 8,
    onChange: function(prev, next) {
        sliderIndex.change(next);
    }
});

// Setup sliderIndex
var sliderIndex = {
    container: document.getElementById("simple-slider-index"),
    children: function() {
        return this.container.children;
    },
    change: function(index) {
        $(this.children()).removeClass("is-active");
        this.children()[index].classList.add("is-active");
    },
    setupEventHandler: function(callback) {
        $(this.children()).each(function(child, index) {
            $(child).on("click", function(e) {
                callback(index);
            });
        });
    }
};

// Attach event handler
sliderIndex.setupEventHandler(function(index) {
    slider.change(index);
});

// Add touch support
var isNext = true;
var manager = new Hammer.Manager(sliderContainer);
var Swipe = new Hammer.Swipe();

manager.add(Swipe);

manager.on("swipeleft", function() {
    if (isNext) {
        slider.reverse();
        isNext = false;
    }
    slider.next();
});

manager.on("swiperight", function() {
    if (!isNext) {
        slider.reverse();
        isNext = true;
    }
    slider.next();
});
