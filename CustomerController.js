
async function getCases(id, resultCallback) 
{
    const oData = `?$select=new_name,statecode&$filter=new_customerId/new_customerid eq ${id}`

    Xrm.WebApi.retrieveMultipleRecords
    ("new_case", oData)
    .then((data)=>{
        if(data && data.entities)
        {
            var openCaseCount = 0;
            var closedCaseCount = 0;

            for(ent of data.entities)
            {
                if(ent.statecode == 0)
                {
                    openCaseCount++
                }else{
                    closedCaseCount++
                } 
            }

            resultCallback({
                open: openCaseCount ,
                close: closedCaseCount
            });            
        }
    }, 
    (error)=>{
        return (error)
        console.log(error)
    });
}