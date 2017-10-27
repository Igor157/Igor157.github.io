
function Renderer(domArea) {
    this.domArea = domArea;
}
Renderer.prototype.create = function createMarkup(creatingObject) {
    for (var key in creatingObject) {
        var element = document.createElement(creatingObject[key].tag);
        for (i = 0; i < creatingObject[key].classes.length; i++) {
            element.classList.add(creatingObject[key].classes[i]);
        }
        if (creatingObject[key].property[1] != undefined) {
            element.setAttribute(creatingObject[key].property[0], creatingObject[key].property[1]);
        }
        if (creatingObject[key].id != undefined) {
            element.setAttribute("id", creatingObject[key].id);
        }
        this.domArea.appendChild(element);
        creatingObject[key].child.forEach(function (item) {
            this.domArea = element;
            createMarkup(item);
        });
    }
};

function DateRenderer() {
    Renderer.apply(this, arguments);
}
DateRenderer.prototype = Object.create(Renderer.prototype);
DateRenderer.prototype.fillup = function () {
    this.container = this.domArea.getElementsByClassName("container").item(0)
    this.current = new Current(this.domArea);
    this.leftArrow = new LeftArrow(this.domArea);
    this.rightArrow = new RightArrow(this.domArea);
    this.datesContainer = new DatesList(this.current);
    this.leftArrow.update();
    this.current.update();
    this.rightArrow.update();
    this.datesContainer.draw(this.current.getDate(), this.domArea);
}
DateRenderer.prototype.move = function (direction) {
    if (direction === 'left') {
        this.leftArrow.action(this.current, this.datesContainer);
    } else if (direction === 'right') {
        this.rightArrow.action(this.current, this.datesContainer);
    }
}


