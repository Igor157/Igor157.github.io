"use strict"

function Arrow(domArea) {
    this.container = domArea.getElementsByClassName("container").item(0);
    this.arrowButton = this.container.getElementsByClassName("button");
}

Arrow.prototype.update = function () {
    this.arrowButton.item(0).onclick = function (event) {
        datePicker.move(event.target.getAttribute("move-direction"));
    };
    this.arrowButton.item(1).onclick = function (event) {
        datePicker.move(event.target.getAttribute("move-direction"));
    };
}

function LeftArrow() {
    Arrow.apply(this, arguments);
}
LeftArrow.prototype = Object.create(Arrow.prototype);
LeftArrow.prototype.update = function () {
    Arrow.prototype.update.call(this);
}
LeftArrow.prototype.action = function (current, datesContainer) {
    current.changeMonth(-1);
    datesContainer.changeMonth(current.getDate());
}

function RightArrow() {
    Arrow.apply(this, arguments);
}
RightArrow.prototype = Object.create(Arrow.prototype);
RightArrow.prototype.update = function () {
    Arrow.prototype.update.call(this);
}

RightArrow.prototype.action = function (current, datesContainer) {
    current.changeMonth(+1);
    datesContainer.changeMonth(current.getDate());
}

function Current(domArea) {
    this.date = new Date();
    this.container = domArea.getElementsByClassName("container").item(0);
}

Current.prototype.getDate = function () {
    return this.date;
}
Current.prototype.changeMonth = function (offset) {
    this.date.setMonth(this.date.getMonth() + offset);
    this.update();
}
Current.prototype.update = function (container) {
    var monthFlag = this.date.getMonth().toString();
    this.container.getElementsByClassName("current_month").item(0).innerHTML = (function () {
        switch (monthFlag) {
            case "0":
                return "Jan";
            case "1":
                return "Feb";
            case "2":
                return "March";
            case "3":
                return "Apr";
            case "4":
                return "May";
            case "5":
                return "Jun";
            case "6":
                return "Jul";
            case "7":
                return "Aug";
            case "8":
                return "Sep";
            case "9":
                return "Oct";
            case "10":
                return "Nov";
            case "11":
                return "Dec";

        }
    })();
}


function DatesList() {
}
DatesList.prototype.draw = function (currentDate, domArea) {
    this.container = domArea.getElementsByClassName("dates").item(0);
    this.drawHeader();
    this.renderDays(currentDate);
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
    this.container.innerHTML = "";
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
DatesList.prototype.changeMonth = function (offset) {
   this.draw(offset, domArea);
}







