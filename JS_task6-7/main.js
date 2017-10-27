var creatingObject1 = {
    container: {
        tag: 'div',
        classes: ['container'],
        property: [],
        id: 'container',
        child: [{
            leftArrow: {
                tag: 'div',
                classes: ['arrow', 'left'],
                property: [],
                id: '',
                child: [{
                    'button': {
                        tag: 'div',
                        classes: ['button'],
                        property: ["move-direction", "left"],
                        child: []
                    }
                }
                ]
            }
        },
        {
            'currentMonth': {
                tag: 'div',
                classes: ['current_month'],
                property: [],
                child: []
            }
        },
        {
            rightArrow: {
                tag: 'div',
                classes: ['arrow', 'right'],
                property: [],
                id: '',
                child: [{
                    'button': {
                        tag: 'div',
                        classes: ['button'],
                        property: ["move-direction", "right"],
                        child: []
                    }
                }
                ]
            }
        },
        {
            'dates': {
                tag: 'div',
                classes: ['dates'],
                property: [],
                child: []
            }
        }
        ]
    },
};

var datePicker = new DateRenderer(document.getElementById("for-date-picker"));
datePicker.create(creatingObject1);
datePicker.fillup();



