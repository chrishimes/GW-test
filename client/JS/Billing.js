var xOrder={};

var Billing=(function(){

    function getParameterByName(name) {
        name = name.replace(/[\[]/, "\\[").replace(/[\]]/, "\\]");
        var regex = new RegExp("[\\?&]" + name + "=([^&#]*)"),
            results = regex.exec(location.search);
        return results === null ? "" : decodeURIComponent(results[1].replace(/\+/g, " "));
    }
    function Init(){
//

// Get the Unique Order
// Get the Vendor For the order
        var xID=getParameterByName("ID");


        $.getJSON("/GetOrder/?ID="+xID, function(data) {

            console.log(data);
xOrder=data.order[0];
            ProcessOrder(data.order[0])

        })




    }


    function ProcessOrder(xObject){


        var xOut="<div class='AddItem'>" +
            "<div class='AddRow'><div class='AddLabel'>First Name</div><div class='AddInput'>"+xObject.FirstName+"</div></div>" +
            "<div class='AddRow'><div class='AddLabel'>Last Name</div><div class='AddInput'>"+xObject.LastName+"</div></div>" +
            "<div class='AddRow'><div class='AddLabel'>Company</div><div class='AddInput'>"+xObject.Company+"</div></div>" +
            "<div class='AddRow'><div class='AddLabel'>Address</div><div class='AddInput'>"+xObject.Address+"</div></div>" +
            "<div class='AddRow'><div class='AddLabel'>City</div><div class='AddInput'>"+xObject.City+"</div></div>" +
            "<div class='AddRow'><div class='AddLabel'>State</div><div class='AddInput'>"+xObject.State+"</div></div>" +
            "<div class='AddRow'><div class='AddLabel'>Zip</div><div class='AddInput'>"+xObject.Zip+"</div></div>" +
            "<div class='AddRow'><div class='AddLabel'>Email</div><div class='AddInput'>"+xObject.Email+"</div></div>" +
            "<div class='AddRow'><div class='AddLabel'>Phone</div><div class='AddInput'>"+xObject.Phone+"</div></div>" +
            "<div class='AddRow'><div class='AddLabel'>Event Date</div><div class='AddInput'>"+xObject.VenueDate+"</div></div>" +
            "<div class='AddRow'><div class='AddLabel'>Cost</div><div class='AddInput'>$"+xObject.ActualCost+"</div></div>" +
            "<div id=\"CartContainer\"></div></div>"
        $("#BillingContent").html(xOut);



        var xCart=xObject.Cart;

        var xOut = "";
        var dd = 0;
        for (dd = 0; dd < xCart.length; dd++) {

            xOut = xOut + "<div class='CartItem'>" +
                "<div class='CartTitle'>Name:" + xCart[dd].Name + "</div>" +
                "<div class='CartAmount'>Amount:"+xCart[dd].Amount+"</div>" +
                "</div>"
//            EstimatedCost=EstimatedCost+(xCart[dd].MinCost*xCart[dd].Amount);

        }

        $("#CartContainer").html(xOut);
$("#PaymentAmount").html("Order Total: $"+xObject.ActualCost)

        if(xObject.Paid!=undefined){

            $("#CCDetails").html("This Bill Has already Been paid.")
        }

    }


    return {
        Init:Init
    }
})()
