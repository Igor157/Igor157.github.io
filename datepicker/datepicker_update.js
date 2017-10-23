Container.prototype.move = function (direction) {
    if (direction === 'left') {
        this.container.replaceChild(this.leftArrow.action(this.current, this.datesContainer), this.container.children[3]);

    } else if (direction === 'right') {
        this.container.replaceChild(this.rightArrow.action(this.current, this.datesContainer), this.container.children[3]);
    }
}

LeftArrow.prototype.action = function (current, datesContainer) {
    current.changeMonth(-1);
    return datesContainer.changeMonth(current.getDate());
}

RightArrow.prototype.action = function (current, datesContainer) {
    current.changeMonth(+1);
    return datesContainer.changeMonth(current.getDate());
}

Current.prototype.changeMonth = function (offset) {
    this.date.setMonth(this.date.getMonth() + offset);
    this.update();
}
Current.prototype.update = function () {
    var monthFlag = this.date.getMonth().toString();
    this.currentContainer.innerHTML = (function () {
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

DatesList.prototype.changeMonth = function (offset) {
    return this.draw(offset);
}


var datePicker = new Container(document.getElementById("container"));
datePicker.draw();