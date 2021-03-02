function test(id)
{
    openNewCase(id);
}

function openNewCase(id)
{
    
//     var entityFormOptions = {};
// entityFormOptions["entityName"] = "contact";

// // Set default values for the Contact form
 var formParameters = {};
 formParameters["new_details"] = "Sample";

// formParameters["fullname"] = "Sample Contact";
// formParameters["emailaddress1"] = "contact@adventure-works.com";
// formParameters["jobtitle"] = "Sr. Marketing Manager";
// formParameters["donotemail"] = "1";
// formParameters["description"] = "Default values for this record were set programmatically.";

// // Set lookup field
formParameters["new_customerid"] = id;
// formParameters["preferredsystemuseridname"] = "Admin user"; // Name of the user.
// formParameters["preferredsystemuseridtype"] = "systemuser"; // Entity name. 
// // End of set lookup field

// Open the form.
Xrm.Navigation.openForm({entityName: "new_case"},{
    new_customerid: id
}).then(
    function (success) {
        console.log(success);
    },
    function (error) {
        console.log(error);
    });
}