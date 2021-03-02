var methodTypes = {Phone: 1, Email: 2}

var formContext;

var currentType;

 

function onLoad(context) {

    formContext = context.getFormContext();

    registerEvents();

    currentType = formContext.getAttribute("new_type").getValue();

}

 

function registerEvents() {

    formContext.getAttribute("new_type").addOnChange(typeOnChange);

    formContext.getAttribute("new_value").addOnChange(valueOnChange);

}

 

function typeOnChange() {

    var confirmStrings = { text: "האם לשנות אמצעי? ", title: "אני רק שאלה" };

    var confirmOptions = { height: 200, width: 450 };

 

    Xrm.Navigation.openConfirmDialog(confirmStrings, confirmOptions).then(

        function (success) {

            if (success.confirmed) {

                currentType = formContext.getAttribute("new_type").getValue();

                validateValue();

            } else {

                formContext.getAttribute("new_type").setValue(currentType);

            }

        });

}

 

function valueOnChange() {

    validateValue();

}

 

function validateValue() {

   

    var methodType = formContext.getAttribute("new_type").getValue();

 

    // For Phone

    var regEx = /^\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/;

    var errMessage = 'נא להזין טלפון תקין';

 

    if (methodType == methodTypes.Email) {

        regEx = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;

        errMessage = 'נא להזין מייל תקין';

    }

   

    var methodValue = formContext.getAttribute("new_value").getValue();

 

    if (methodValue && !methodValue.match(regEx)) {

        formContext.getControl("new_value").addNotification({

            messages: [errMessage],

            notificationLevel: 'ERROR',

            uniqueId: 'new_value_error'

        });

    } else {

        formContext.getControl("new_value").clearNotification('new_value_error');

    }

 

}