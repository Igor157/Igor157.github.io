"use strict"

// OOP used

function Container(container) {
    this.container = container;
    this.leftArrow = new LeftArrow();
    this.current = new Current();
    this.rightArrow = new RightArrow();
    this.datesContainer = new DatesList(this.current)
}
Container.prototype.draw = function () {
    this.container.appendChild(this.leftArrow.draw());
    this.container.appendChild(this.current.draw());
    this.container.appendChild(this.rightArrow.draw());
    this.container.appendChild(this.datesContainer.draw(this.current.getDate()));
}

function Arrow() {
    this.arrowContainer = document.createElement('div');
    this.arrowButton = document.createElement('div');
}

Arrow.prototype.draw = function () {
    this.arrowContainer.setAttribute("class", "arrow");
    this.arrowButton.setAttribute("class", "button");
    this.arrowButton.onclick = function (event) {
        datePicker.move(event.target.getAttribute("move-direction"));
    };
    this.arrowContainer.appendChild(this.arrowButton);
    return this.arrowContainer;
}

function LeftArrow() {
    Arrow.apply(this, arguments);
}
LeftArrow.prototype = Object.create(Arrow.prototype);
LeftArrow.prototype.draw = function () {
    Arrow.prototype.draw.call(this);
    this.arrowContainer.classList.add("left");
    this.arrowContainer.getElementsByClassName("button").item(0).setAttribute("move-direction", "left");
    return this.arrowContainer;
}

function RightArrow() {
    Arrow.apply(this, arguments);
}
RightArrow.prototype = Object.create(Arrow.prototype);
RightArrow.prototype.draw = function () {
    Arrow.prototype.draw.call(this);
    this.arrowContainer.classList.add("right");
    this.arrowContainer.getElementsByClassName("button").item(0).setAttribute("move-direction", "right");
    return this.arrowContainer;
}

function Current() {
    this.date = new Date();
    this.currentContainer = {};
}
Current.prototype.draw = function () {
    this.currentContainer = document.createElement('div');
    this.currentContainer.setAttribute("class", "current_month");
    this.update();
    return this.currentContainer;
}

Current.prototype.getDate = function () {
    return this.date;
}

function DatesList() {
}
DatesList.prototype.draw = function (currentDate) {
    this.container = document.createElement("div");
    this.container.classList.add("dates");
    this.drawHeader();
    this.renderDays(currentDate);
    return this.container;
}
DatesList.prototype.daysInMonth = function (date) {
    return new Date(date.getYear(), date.getMonth() + 1, 0).getDate();
}
DatesList.prototype.firstMonthDay = function (date) {
    return new Date(date.getFullYear(), date.getMonth(), 1);
}
DatesList.prototype.getOffset = function (date) {
    return this.firstMonthDay(date).getDay();
}
DatesList.prototype.renderDays = function (date) {
    var offset = this.getOffset(date);
    var rowNumber = Math.ceil((this.daysInMonth(date) + offset) / 7);

    var week = 0;
    while (week < rowNumber) {
        this.drawRow(date.getMonth(), week, date);
        week++
    }
}
DatesList.prototype.drawHeader = function () {
    var days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
    for (var i = 0; i < days.length; i++) {
        var element = document.createElement("div");
        element.classList.add("element");
        element.innerHTML = days[i];
        this.container.appendChild(element);
    }
}
DatesList.prototype.drawRow = function (month, week, date) {
    var day = 1;
    var offset = this.getOffset(date);
    while (day <= 7) {
        var element = document.createElement("div");
        element.classList.add("element");

        var dateToDisplay = new Date(date.getFullYear(), date.getMonth(), day + (7 * week));
        dateToDisplay.setDate(dateToDisplay.getDate() - offset);
        element.innerHTML = dateToDisplay.getDate();
        if (month !== dateToDisplay.getMonth()) {
            element.classList.add("inactive");
        }
        var dateOfNow = new Date;
        var dateOfNowFormat = new Date(dateOfNow.getFullYear(), dateOfNow.getMonth(), dateOfNow.getDate());
        if (dateToDisplay.toString() === dateOfNowFormat.toString()) {
            element.classList.add("red");
        }
        this.container.appendChild(element);
        day++;
    }
}







