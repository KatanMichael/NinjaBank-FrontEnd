
var formContext;
var guid;

function onLoad(context)
{
    formContext = context.getFormContext();
    formContext.data.entity.addOnSave(onSave);

    //countCasesFetch()
    countCasesOData();
}

function countCasesOData()
{
    
    guid = formContext.data.entity.getId();
    getCases(guid,
        (data)=>{
            console.log(data);

            const openMessage = (`This customer have ${data.open} Open Cases`)
            const closedMessage = (`This customer have ${data.close} Closed Cases`)

            formContext.ui.setFormNotification(openMessage, "INFO", "1");
            formContext.ui.setFormNotification(closedMessage, "INFO", "2");

    })


}

function countCasesFetch()
{
    guid = formContext.data.entity.getId();
    
    if(guid)
    {
        var fecthXML = `?fetchXml=<fetch version="1.0" output-format="xml-platform" mapping="logical" distinct="false">
    <entity name="new_case">
      <attribute name="new_caseid" />
      <attribute name="new_name" />
      <attribute name="createdon" />
      <order attribute="new_name" descending="false" />
      <filter type="and">
        <condition attribute="new_customerid" operator="eq"
        uitype="new_customer" value="${guid}" />
      </filter>
    </entity>
  </fetch>`;

    Xrm.WebApi.retrieveMultipleRecords
    ("new_case", fecthXML)
    .then((data)=>{
        if(data && data.entities)
        {
            var caseCount = data.entities.length;
            const message = "This customer have "+ caseCount + " Cases"
            formContext.ui.setFormNotification(message, "INFO", "1");
        }
    }, 
    (error)=>{
        console.log(error)
    });



    }

}

function onSave(context)
{
    
}