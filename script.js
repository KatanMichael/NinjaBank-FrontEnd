var statusCode = {
    frozen: 100000001,
    active: 100000000,
    progress: 100000002
}

var formContext;
function onLoad(context)
{
    formContext = context.getFormContext();

    formContext.getAttribute("statuscode").addOnChange(setFields)

    
    setFields();

}
function setFields()
{
    var status = formContext.getAttribute("statuscode").getValue()

    if(status === statusCode.frozen)
    {
        formContext.getControl("new_balace").setVisible(false);
    }else{
        formContext.getControl("new_balace").setVisible(true);
    }

}