var Rental = (function () {
    var Categories = [];
    var Items = [];
var Pages=[];
    var popitems=false;
    function Popularitems(xitems){

        var dd=0;

        for(dd=0;dd<10;dd++){
if(xitems.length>dd){
var xbit="<a href=\"#\" onclick=\"Rental.ItemDetails('"+xitems[dd]._id+"')\">"+xitems[dd].Name+"</a>"

        $(".popularitems").append(xbit);
        }

        }


    }


    function HashChange(){

        if (window.location.hash != ""){
            var xHash=window.location.hash;
console.log(window.location.hash);

            if(xHash=="#Home"){
                Init();
            }else{
                Compress();

            }
            if(xHash=="#Contact"){
                Contact();
            }
            if(xHash=="#Locations"){
                Locations();
            }
            if(xHash=="#Cart"){
                Cart();
            }
            if(xHash.indexOf("#Page=")!=-1){
                xHash=xHash.replace("#Page=","")
                LoadPage(xHash);
            }
            if(xHash.indexOf("#Category=")!=-1){
               xHash=xHash.replace("#Category=","")
                LoadItems(xHash)
            }

            if(xHash.indexOf("#Item=")!=-1){

                xHash=xHash.replace("#Item=","")
                ItemDetails(xHash);

            }





        }



    }


    function Init() {


if(FirstLoad==true){




    $("#Logo").click(Init);

        window.onhashchange=HashChange


        $('#SearchText').keypress(function (e) {
            if (e.which == 13) {
Search();
                return false;    //<---- Add this line
            }
        });






}

        $( "#menu" ).menu();
        CartUpdate();

        $.getJSON("/GetData/?Cat=category", function (data) {
            Categories = data;

            $.getJSON("/GetData/?Cat=items", function (data) {
                Items = data;
if(popitems==false){
    popitems=true;
    Popularitems(data)

}


                $.getJSON("/GetData/?Cat=pages", function (data) {
Pages=data;
                Init2();
                $("#SearchArea").css("height",375);
                $(".MainContainer").css("top",375)

                })
            })

        })


    }


    function CategoryTemplate(xCat,newline) {

        var xURL = xCat.Photo ;
        var xBit = "<div class='CatBox' onclick=\"Rental.LoadItems('" + xCat.Name + "')\"><img class='CategoryImage' src=\"" + xURL + "\">" +
            "<div class='CatTitle'>" + xCat.Name + "</div>" +
            "</div>";
        console.log(xCat);


    return xBit;

    }

var FirstLoad=true;
    function Init2() {
        $("#MainContent").empty();
        $("#MainContent").append("<div id='AreaLabel'>CHECK OUT OUR INVENTORY</div><div id='ContainBox'>        </div>");

var xout="<div>"

        var dd = 0;
        for (dd = 0; dd < Categories.length; dd++) {

      xout=xout+      CategoryTemplate(Categories[dd]);

if(((dd+1)/4).toString().indexOf(".")==-1){
   // CategoryTemplate(Categories[dd],true);
    xout=xout+"</div><div>";
}else{
  //  CategoryTemplate(Categories[dd]);

}




            if(FirstLoad==true){
            $("#RentalLists").append("<li onclick=\"Rental.Compress();Rental.LoadItems('"+Categories[dd].Name+"')\"   class=\"ui-menu-item\" id=\"ui-id-"+(dd+1)+"\" tabindex=\"-1\" role=\"menuitem\">"+Categories[dd].Name+"</li>")
            }

        }
        $("#ContainBox").append(xout);
        $( "#menu" ).menu();

if(FirstLoad==true){

HashChange()
    FirstLoad=false;

}else{
    SetHash('Home');
    FirstLoad=false;
}




    }



    var LastCat;

    function LoadItems(xID) {
        LastCat = xID;

        $("#SearchArea").css("height",120);
        $(".MainContainer").css("top",150)

        SetHash('Category='+xID);

        $("#MainContent").empty();
        $("#MainContent").append("<div id=\"ContainBox\"><div class='TopLinks'><div onclick=\"Rental.Init();\" class='TopLink'>All Categories <</div><div onclick=\"Rental.LoadItems('" + xID + "')\" class='TopLink'>" + xID + " </div></div></div>");

        var bb = 0;

        for (bb = 0; bb < Categories.length; bb++) {

if(Categories[bb].Name==xID){

            $("#ContainBox").append("<div id='MapText2'><h2>"+xID+"</h2>"+Categories[bb].Desc+"</div>");

}

        }

        var bb = 0;

        for (bb = 0; bb < Items.length; bb++) {

            if (Items[bb].Category == xID) {

                var xCat = Items[bb];
                var xURL = xCat.Photo
                var xBit = "<div class='CatBox' onclick=\"Rental.ItemDetails('" + xCat._id + "')\"> <img  class='ItemImage'   src=\"" + xURL + "\">" +
                    "<div class='ItemTitle'>" + xCat.Name + "</div>" +
                    "<div class='ItemDesc'>" + xCat.Desc + "</div>" +
                    "<div class='ItemFrom'>From " + xCat.MinCost + " Each</div>" +
                    "</div>";
                console.log(xCat);


            }


        }


        $("#ContainBox").append(xBit);


    }

    var CurrentItem;

    function checkEmail(email)
    {
        var re = /\S+@\S+\.\S+/;
        return re.test(email);
    }


    function ItemDetails(xObject) {


        for (bb = 0; bb < Items.length; bb++) {

            if (Items[bb]._id == xObject) {
                xObject = Items[bb];
            }
        }

        SetHash("Item="+xObject._id);


        CurrentItem = xObject;
        $("#MainContent").empty().append("<div id=\"ContainBox\"><div class='TopLinks'><div onclick=\"Rental.Init();\" class='TopLink'>All Categories <</div><div onclick=\"Rental.LoadItems('" + LastCat + "')\" class='TopLink'>" + LastCat + "<</div><div class='TopLink'>" + xObject.Name + "</div></div></div>");

        var xout = "";
        console.log(xObject);
        var xURL = "url(" + xObject.Photo + ")";
        xout = "<div id=\"ContainBox\"><div class='ItemDetails'>" +


            "<div class='Seperate'><div class='ItemTitleB'>" + xObject.Name + "</div>" +
            "<div class='ItemMinCost'>From $" + xObject.MinCost + "</div>" +
            "<div class='ItemImageL' style=\"background-image:" + xURL + "\"></div>" +
            "<div class='ItemDesc'>" + xObject.Desc + "</div>" +


            "<div class='ItemAmountLabel'>How Many Do You Need?</div>" +
            "<div class='ItemAmount'><select id=\"ItemAmountBox\"></select></div>" +
            "<div class='ItemAddToCart' onclick=\"Rental.AddToCart('" + xObject._id + "')\">Add To Cart</div>" +

            "</div><div class='Seperate'><div class='ItemLongDesc'>" + xObject.LongDesc + "</div>" +
            "</div>"+
            "</div>"

        $("#MainContent").append(xout+"</div>");


        var bb;

        for (bb = 1; bb < 25; bb++) {

            $("#ItemAmountBox").append("<option value='" + bb + "'>" + bb + "</option>")
        }
        for (bb = 1; bb < 56; bb++) {

            $("#ItemAmountBox").append("<option value='" + (25 + (bb * 5)) + "'>" + (25 + (bb * 5)) + "</option>")
        }


    }


    function AdjustAmount(xthis, xid) {


    }


    function AddToCart(xID) {

        var xCart = [];

        if (localStorage.getItem("Cart") != undefined) {

            if (JSON.parse(localStorage.getItem("Cart")) != null) {
                xCart = JSON.parse(localStorage.getItem("Cart"));
            }
        }
        CurrentItem.Amount = $("#ItemAmountBox").val();
        var found = false;
        var ff;
        for (ff = 0; ff < xCart.length; ff++) {
            if (CurrentItem._id == xCart[ff]._id) {
                found = true;
                xCart[ff].Amount =parseInt(xCart[ff].Amount) + parseInt($("#ItemAmountBox").val());
            }
        }

        if (found != true) {
            xCart.push(CurrentItem)
        }
        localStorage.setItem("Cart", JSON.stringify(xCart));
       // alert(CurrentItem.Name + " Added To Cart.")
        Cart();
        CartUpdate();
        Notify({

Desc:CurrentItem.Name+" added to cart",
            Photo:CurrentItem.Photo



        });


    }

    function RemoveFromCart(xID) {

        var xCart = [];

        if (localStorage.getItem("Cart")) {

            xCart = JSON.parse(localStorage.getItem("Cart"));

        }
        var newCart = [];


        var dd = 0;
        for (dd = 0; dd < xCart.length; dd++) {

            if (xCart[dd]._id == xID) {

                Notify({

                    Desc:xCart[dd].Name+" removed from cart",
                    Photo:xCart[dd].Photo



                });




            } else {

                newCart.push(xCart[dd]);
            }

        }


        localStorage.setItem("Cart", JSON.stringify(newCart));


      //  alert("Item Removed From Cart.")
        CartOnly();
        CartUpdate();

    }


    function SelectBox(xObject) {


        var xout = "<select id=\"Amount_" + xObject._id + "\"   onchange=\"Rental.SelectChange(this,'" + xObject._id + "')\">";

        var bb;

        for (bb = 1; bb < 25; bb++) {


            if (xObject.Amount == bb) {
                xout = xout + "<option value='" + bb + "' selected>" + bb + "</option>";

            } else {
                xout = xout + "<option value='" + bb + "'>" + bb + "</option>";
            }


        }
        for (bb = 1; bb < 56; bb++) {


            if (xObject.Amount ==25 + (bb * 5)) {
                xout = xout + "<option selected value='" + (25 + (bb * 5)) + "'>" + (25 + (bb * 5)) + "</option>"

            } else {
                xout = xout + "<option value='" + (25 + (bb * 5)) + "'>" + (25 + (bb * 5)) + "</option>"
            }


        }

        xout = xout + "</select>";

        return xout

    }



    var usStates =  [
        { "name": "Alabama", "abbreviation": "AL"},
        { "name": "Alaska", "abbreviation": "AK"},
        { "name": "American Samda", "abbreviation": "AS"},
        { "name": "Arizona", "abbreviation": "AZ"},
        { "name": "Arkansas", "abbreviation": "AR"},
        { "name": "California", "abbreviation": "CA"},
        { "name": "Colorado", "abbreviation": "CO"},
        { "name": "Connecticut", "abbreviation": "CT"},
        { "name": "Delaware", "abbreviation": "DE"},
        { "name": "District Of Columbia", "abbreviation": "DC"},
        { "name": "Federated States of Micronesia", "abbreviation": "FM"},
        { "name": "Florida", "abbreviation": "FL"},
        { "name": "Georgia", "abbreviation": "GA"},
        { "name": "Guam", "abbreviation": "GU"},
        { "name": "Hawaii", "abbreviation": "HI"},
        { "name": "Idaho", "abbreviation": "ID"},
        { "name": "Illinois", "abbreviation": "IL"},
        { "name": "Indiana", "abbreviation": "IN"},
        { "name": "Iowa", "abbreviation": "IA"},
        { "name": "Kansas", "abbreviation": "KS"},
        { "name": "Kentucky", "abbreviation": "KY"},
        { "name": "Louisiana", "abbreviation": "LA"},
        { "name": "Maine", "abbreviation": "ME"},
        { "name": "Marshall Islands", "abbreviation": "MH"},
        { "name": "Maryland", "abbreviation": "MD"},
        { "name": "Massachusetts", "abbreviation": "MA"},
        { "name": "Michigan", "abbreviation": "MI"},
        { "name": "Minnesota", "abbreviation": "MN"},
        { "name": "Mississippi", "abbreviation": "MS"},
        { "name": "Missouri", "abbreviation": "MO"},
        { "name": "Montana", "abbreviation": "MT"},
        { "name": "Nebraska", "abbreviation": "NE"},
        { "name": "Nevada", "abbreviation": "NV"},
        { "name": "New Hampshire", "abbreviation": "NH"},
        { "name": "New Jersey", "abbreviation": "NJ"},
        { "name": "New Mexico", "abbreviation": "NM"},
        { "name": "New York", "abbreviation": "NY"},
        { "name": "North Carolina", "abbreviation": "NC"},
        { "name": "North Dakota", "abbreviation": "ND"},
        { "name": "Northern Mariana Islands", "abbreviation": "MP"},
        { "name": "Ohio", "abbreviation": "OH"},
        { "name": "Oklahoma", "abbreviation": "OK"},
        { "name": "Oregon", "abbreviation": "OR"},
        { "name": "Palau", "abbreviation": "PW"},
        { "name": "Pennsylvania", "abbreviation": "PA"},
        { "name": "Puerto Rico", "abbreviation": "PR"},
        { "name": "Rhode Island", "abbreviation": "RI"},
        { "name": "South Carolina", "abbreviation": "SC"},
        { "name": "South Dakota", "abbreviation": "SD"},
        { "name": "Tennessee", "abbreviation": "TN"},
        { "name": "Texas", "abbreviation": "TX"},
        { "name": "Utah", "abbreviation": "UT"},
        { "name": "Vermont", "abbreviation": "VT"},
        { "name": "Virgin Islands", "abbreviation": "VI"},
        { "name": "Virginia", "abbreviation": "VA"},
        { "name": "Washington", "abbreviation": "WA"},
        { "name": "West Virginia", "abbreviation": "WV"},
        { "name": "Wisconsin", "abbreviation": "WI"},
        { "name": "Wyoming", "abbreviation": "WY" }
    ];

    function SelectStates(xID,xValue){

        var bb=0;
        var xout="<select id=\""+xID+"\">";
        for(bb=0;bb<usStates.length;bb++){

            xout=xout+"<option value=\""+usStates[bb].abbreviation+"\">"+usStates[bb].name+"</option>"


        }


        return xout+"</select>";

    }
var EstimatedCost=0;



    function CartOnly() {
        EstimatedCost=0;

        var xCart = [];

        if (localStorage.getItem("Cart")) {

            xCart = JSON.parse(localStorage.getItem("Cart"));

        }

        var xOut = "";
        var dd = 0;
        for (dd = 0; dd < xCart.length; dd++) {

            xOut = xOut + "<div class='CartItem'>" +
                "<div class='CartTitle'>" + xCart[dd].Name + "</div>" +
                "<div class='CartRemove' onclick=\"Rental.RemoveFromCart('" + xCart[dd]._id + "')\"><span class='fa fa-remove'></span></div>" +
                "<div class='CartFrom'>From $"+(xCart[dd].MinCost*xCart[dd].Amount) + "</div>" +
                "<div class='CartAmount'>" + SelectBox(xCart[dd]) + "</div>" +
                "</div>"
            EstimatedCost=EstimatedCost+(xCart[dd].MinCost*xCart[dd].Amount);

        }


if(xCart==null){
    xOut="<div id=\"NoCart\">No Cart Contents</div>";


}else{
        if (xCart.length==0){



            xOut="<div id=\"NoCart\">No Cart Contents</div>";

        }else{
            xOut = xOut + "<div class='CartItemTotal'>" +
                "<div class='CartTitle'>Total Minimum Cost</div>" +
                "<div class='CartAmount'>$" + EstimatedCost + "</div>" +
                "</div>"


        }
}

        $("#CartContainer").html(xOut);
    }

        function Cart() {
            EstimatedCost=0;

        var xCart = [];

        if (localStorage.getItem("Cart")) {

            xCart = JSON.parse(localStorage.getItem("Cart"));

        }

        var xOut = "";
        var dd = 0;
if(xCart!=null){
        for (dd = 0; dd < xCart.length; dd++) {

            xOut = xOut + "<div class='CartItem'>" +
                "<div class='CartTitle'>" + xCart[dd].Name + "</div>" +
                "<div class='CartRemove' onclick=\"Rental.RemoveFromCart('" + xCart[dd]._id + "')\"><span class='fa fa-remove'></span></div>" +
                "<div class='CartFrom'>From $"+(xCart[dd].MinCost*xCart[dd].Amount) + "</div>" +
                "<div class='CartAmount'>" + SelectBox(xCart[dd]) + "</div>" +
                "</div>"
                EstimatedCost=EstimatedCost+(xCart[dd].MinCost*xCart[dd].Amount);

        }

}

        if (xCart.length==0){



                xOut="<div id=\"NoCart\">No Cart Contents</div>";

        }else{
            xOut = xOut + "<div class='CartItemTotal'>" +
                "<div class='CartTitle'>Total Minimum Cost</div>" +
                "<div class='CartAmount'>$" + EstimatedCost + "</div>" +
                "</div>"


        }


        var xOutB = "<div id='Proposal'>" +
            "<div class='ProposalItem'><div class='PropLabel'>First Name</div><div class='PropInput'><input type=\"text\" id=\"FirstName\" maxlength='36'></div></div>" +
            "<div class='ProposalItem'><div class='PropLabel'>Last Name</div><div class='PropInput'><input type=\"text\" id=\"LastName\" maxlength='36'></div></div>" +
            "<div class='ProposalItem'><div class='PropLabel'>Address</div><div class='PropInput'><input type=\"text\" id=\"Address\"  maxlength='100'></div></div>" +
            "<div class='ProposalItem'><div class='PropLabel'>Address 2</div><div class='PropInput'><input type=\"text\" id=\"Address2\"  maxlength='100'></div></div>" +
            "<div class='ProposalItem'><div class='PropLabel'>City</div><div class='PropInput'><input type=\"text\" id=\"City\"  maxlength='100'></div></div>" +
            "<div class='ProposalItem'><div class='PropLabel'>State</div><div class='PropInput'>"+SelectStates("State","")+"</div></div>" +
            "<div class='ProposalItem'><div class='PropLabel'>Zip</div><div class='PropInput'><input type=\"text\" id=\"Zip\"  maxlength='5'></div></div>" +
            "<div class='ProposalItem'><div class='PropLabel'>Phone</div><div class='PropInput'><input type=\"text\" id=\"Phone\"  maxlength='20'></div></div>" +
            "<div class='ProposalItem'><div class='PropLabel'>Email</div><div class='PropInput'><input type=\"email\" id=\"Email\"></div></div>" +
            "<div class='ProposalItem'><div class='PropLabel'>Event Date</div><div class='PropInput'><input type=\"text\" id=\"Venue_Date\"  maxlength='15'></div></div>" +

            "<div class='ProposalItem'><div class='PropLabel'>Venue Location</div><div class='PropInput'><input type=\"checkbox\" onclick=\"Rental.VenueClick();\" id=\"VenueClick\"></div></div>" +
            "<div id=\"VenueLocation\" style=\"display:none;\"><div class='ProposalItem'><div class='PropLabel'>Address</div><div class='PropInput'><input type=\"text\" id=\"Venue_Address\"  maxlength='30'></div></div>" +
            "<div class='ProposalItem'><div class='PropLabel'>City</div><div class='PropInput'><input type=\"text\" id=\"Venue_City\"  maxlength='30'></div></div>" +
            "<div class='ProposalItem'><div class='PropLabel'>State</div><div class='PropInput'>"+SelectStates("VenueState","")+"</div></div>" +
            "<div class='ProposalItem'><div class='PropLabel'>Zip</div><div class='PropInput'><input type=\"text\" id=\"Venue_Zip\" maxlength='5'></div></div></div>" +
            "<div class='ProposalItem'><div class='PropLabel'></div><div class='PropInput'><input type=\"button\" id=\"Submit\" onclick=\"Rental.Submit();\" value=\"Submit Order\"></div></div>" +

            "</div>"


        xOut="<div id=\"MapText\"><h2><span class=\"fa fa-shopping-cart\"></span>Shopping Cart</h2>Mei dicunt disputationi ne, at vitae audiam incorrupte usu. Ne doming fastidii accusamus mei, iusto dolores propriae mea at. Tale sumo indoctum an est, ad assum soleat qui, no cum esse laudem. Pro abhorreant honestatis at, nam et veritus periculis molestiae, nam te prima phaedrum.</div><div id=\"CartMiddle\"><div id=\"CartContainer\">"+xOut+"</div>"+xOutB+"</div>";
        $("#MainContent").html(xOut)
        $( "#Venue_Date" ).datepicker();
            SetHash('Cart');


    }


    function Submit() {

        var xOrder = {};
        xOrder.FirstName = $("#FirstName").val();
var returnit=false;
        if($("#FirstName").val()==""){
            $("#FirstName").css("border","2px dashed red")

            returnit=true;
        }else{
            $("#FirstName").css("border",null)
        }

        xOrder.LastName = $("#LastName").val();
        if($("#LastName").val()==""){
            $("#LastName").css("border","2px dashed red")
            returnit=true;
        }else{
            $("#LastName").css("border",null)
        }

        xOrder.Address = $("#Address").val();
        if($("#Address").val()==""){
            $("#Address").css("border","2px dashed red")

            returnit=true;
        }else{
            $("#Address").css("border",null)
        }

        xOrder.Address2 = $("#Address2").val();

        xOrder.City = $("#City").val();
        if($("#City").val()==""){
            $("#City").css("border","2px dashed red")

            returnit=true;
        }else{
            $("#City").css("border",null)
        }

        xOrder.State = $("#State").val();
        xOrder.Zip = $("#Zip").val();
        if($("#Zip").val()==""){
            $("#Zip").css("border","2px dashed red")

            returnit=true;
        }else{
            $("#Zip").css("border",null)
        }

        xOrder.Phone = $("#Phone").val();
        if($("#Phone").val()==""){
            $("#Phone").css("border","2px dashed red")

            returnit=true;
        }else{
            $("#Phone").css("border",null)
        }

        xOrder.Email = $("#Email").val();

        if(checkEmail(xOrder.Email)){
            $("#Email").css("border",null)

        }else{
            $("#Email").css("border","2px dashed red")

            returnit=true;
        }





        xOrder.VenueDate = $("#Venue_Date").val();
        if($("#Venue_Date").val()==""){
            $("#Venue_Date").css("border","2px dashed red")

            returnit=true;
        }else{
            $("#Venue_Date").css("border",null)
        }





        xOrder.VenueAddress = $("#Venue_Address").val();
        xOrder.VenueCity = $("#Venue_City").val();
        xOrder.VenueState = $("#Venue_State").val();
        xOrder.VenueZip = $("#Venue_Zip").val();




        xOrder.EstimatedCost=EstimatedCost;
        xOrder.Cart = JSON.parse(localStorage.getItem("Cart"));












        if(returnit==true){

            Notify({
                Name:"Problem with Form",
                Photo:""
            })

            return
        }





        $.ajax({

            url: "/SaveOrder/",
            type: "POST",
            dataType: "json",
            data: JSON.stringify(xOrder),
            contentType: "application/json",
            cache: false,
            timeout: 5000,
            complete: function (res) {

                alert("Venue Request Complete!")
                localStorage.setItem("Cart", []);
                Rental.Init();
                CartUpdate();
            }})

    }


    function Venue() {
        var xbit = $("#VenueClick").prop("checked")
        if (xbit == true) {


            $("#VenueLocation").show();
        } else {
            $("#VenueLocation").hide();

        }


    }

    function CartUpdate() {

        var xCart = [];
try{
        if (localStorage.getItem("Cart") != undefined) {

            if (JSON.parse(localStorage.getItem("Cart")) != null) {
                xCart = JSON.parse(localStorage.getItem("Cart"));
            }

        }
    $("#CartCount").html(xCart.length);
}catch(ex){
    $("#CartCount").html(0);
    }
    }


    function SelectChange(xthis, xid) {


        var xvalue = $(xthis).val();
        var xCart = [];

        if (localStorage.getItem("Cart") != undefined) {

            if (JSON.parse(localStorage.getItem("Cart")) != null) {
                xCart = JSON.parse(localStorage.getItem("Cart"));
            }
        }

        var found = false;
        var ff;
        for (ff = 0; ff < xCart.length; ff++) {
            if (xid == xCart[ff]._id) {
                found = true;
                xCart[ff].Amount = xvalue;
            }
        }

        localStorage.setItem("Cart", JSON.stringify(xCart));
        CartOnly();
        CartUpdate();



    }



    function Contact(){
        SetHash('Contact');

        $("#SearchArea").css("height",120);
        $(".MainContainer").css("top",150)


var out='<div id=\'ContainBox\'><h2><span class="fa fa-envelope"></span>Contact Us</h2> <div id=\"ContactForm\"><div class="ContactField">Use this form to contact us with any questions or comments:</div>'
   out=out+' <div class="ContactField"><div class="DescLabel">Email:</div><input type="email" id="EmailContact"><div id="InvalidEmail">! Invalid Email</div></div>'
        out=out+'<div class="ContactField"><div class="DescLabel">Name:</div><input type="text" id="NameContact"></div>'
        out=out+'<div class="ContactField"><div class="DescLabel" >Description:</div><div><textarea id="DescContact"></textarea></div></div>'
        out=out+'<div class="ContactField"><input onclick="Rental.SubmitContact();" class="xButton" type="button" id="SubmitContact" value="Done"></div></div>';
        out=out+'<div id="ContactSubmitted">Your message has been sent to the administrator and you will recieve a response within 24 hours.</div></div>';

$("#MainContent").html(out);


    }
    function SubmitContact(){


            var xContact={
                Email:$("#EmailContact").val(),
                Name:$("#NameContact").val(),
                Desc:$("#DescContact").val()


            }





            if(checkEmail(xContact.Email)){


            }else{

                $("#InvalidEmail").css("display","inline-block")
                return;
            }


            $.ajax({
                url: "/ClientContact/",
                type: "POST",
                dataType: "json",
                data: JSON.stringify(xContact),
                contentType: "application/json",
                cache: false,
                timeout: 5000,
                complete: function(res) {

                    $("#ContactSubmitted").show();
                    $("#EmailContact").val("")
                    $("#NameContact").val("")
                    $("#DescContact").val("")
                    $("#InvalidEmail").hide();
                }})






    }

function LoadPage(xPage){
var CurrentPage;
var dd=0;
    for(dd=0;dd<Pages.length;dd++){

if(Pages[dd].Name==xPage){

CurrentPage=Pages[dd];
    break
}

    }

    SetHash("Page="+CurrentPage.Name);

var xObject=CurrentPage;

    var xOut="<div id='MapText'>" +
        "<h2>"+xObject.Name+"</h2>" +
        decodeURIComponent(xObject.Content)+

        "</div>";






    $("#MainContent").html(xOut);


    if(xObject.Category!="None"){

        AttachItems(xObject.Category);
    }


}

    function AttachItems(xItem){



        var bb = 0;
var xBit;
        for (bb = 0; bb < Items.length; bb++) {

            if (Items[bb].Category == xItem) {

                var xCat = Items[bb];
                var xURL =  xCat.Photo ;
                 xBit = xBit+"<div class='CatBox' onclick=\"Rental.ItemDetails('" + xCat._id + "')\"> <img  class='ItemImage' src=" + xURL + "\">" +

                    "<div class='CatTitle'>" + xCat.Name + "</div>" +
                    "<div class='CatDesc'>" + xCat.Desc + "</div>" +
                    "<div class='CatFrom'>From " + xCat.MinCost + " Each</div>" +
                    "</div>";
                console.log(xCat);


            }


        }


        $("#MainContent").append("<div id='ContainBox'>"+xBit+"</div>");


    }

function Locations(){
$("#MainContent").html("<div id='MapText'><h2><span class='fa fa-map-marker'></span>Our Locations</h2>Lorem ipsum dolor sit amet, ex sea clita eleifend, no tantas impetus graecis cum, no cum aliquando consectetuer. Causae disputando ea nam. Prima ornatus debitis eam ad, modus tractatos pri at. In per altera noluisse sensibus, cum ut erant rationibus temporibus, te sale nonumes perfecto per. Te oblique sapientem eam. Quo vide eruditi repudiare ei, nominavi oporteat sit at.</div><div id='map-canvas'></div>");
    SetHash('Locations');

    $.getJSON("/GetData/?Cat=users", function (data) {
var        Users = data;


        var map;
        map = new google.maps.Map(document.getElementById('map-canvas'), {
            zoom: 4,
            center: {lat: 39.5, lng:-98.35}
        });

//        google.maps.event.addDomListener(window, 'load', initialize);

        var dd="";
        for(dd=0;dd<Users.length;dd++){

//            Users[dd];
  try{
            var xlat=Users[dd].geo.results[0].geometry.location.lat;
            var xlong=Users[dd].geo.results[0].geometry.location.lng;

            var myLatlng = new google.maps.LatLng(xlat,xlong);


            var marker = new google.maps.Marker({
                position: myLatlng,
                map: map
            });
  }catch(ex){
console.log(ex)
  }

        }






    });



    }


    function Search(){

var xItem=$("#SearchText").val().toString().toLowerCase();
        $("#SearchArea").css("height",120);
        $(".MainContainer").css("top",150)

        SetHash('Search='+xItem);


        $("#MainContent").empty();
        $("#MainContent").append("<div class='TopLinks'><div onclick=\"Rental.Init();\" class='TopLink'>All Categories < </div><div  class='TopLink'>Search Results</div></div>");


        var bb = 0;
        var xBit="";
        for (bb = 0; bb < Items.length; bb++) {
//debugger
            if (Items[bb].Name.toString().toLowerCase().indexOf(xItem)!=-1||Items[bb].Category.toString().toLowerCase().indexOf(xItem)!=-1) {

                var xCat = Items[bb];
                var xURL =  xCat.Photo;
                xBit = xBit+"<div class='CatBox' onclick=\"Rental.ItemDetails('" + xCat._id + "')\"> <img class='ItemImage' src=\"" + xURL + "\">" +

                    "<div class='ItemTitle'>" + xCat.Name + "</div>" +
                    "<div class='ItemDesc'>" + xCat.Desc + "</div>" +
                    "<div class='ItemFrom'>From " + xCat.MinCost + " Each</div>" +
                    "</div>";
                console.log(xCat);


            }


        }

        if(xBit==""){
            xBit="<div id=\"NoResults\"> No Results Found.</div>"
        }

        $("#MainContent").append("<div id='ContainBox'>"+xBit+"</div>");



    }

    function Compress(){

        $("#SearchArea").animate({
            "height": "120"

        }, 500, function() {})


        $(".MainContainer").animate({
                "top": "150"

            }, 500, function() {})








    }




    function Notify(xobject){
        $("#NotifierText").html(xobject.Desc)
        $("#NotifierImage").attr("src",xobject.Photo)


        $( "#NotifierContain" ).animate({
            "margin-left": "-220",

            width: "220"
        }, 500, function() {



            $( "#NotifierContain" ).delay(2000).animate({
                "margin-left": "0",

                width: "0"
            }, 500, function() {
                // Animation complete.
            });


        });



    }



    function SetHash(xItem){
        document.location.hash="#"+xItem;

    }


    return {
        Locations:Locations,
    SubmitContact:SubmitContact,
        VenueClick: Venue,
        Submit: Submit,
        Init: Init,
        LoadItems: LoadItems,
        ItemDetails: ItemDetails,
        AddToCart: AddToCart,
        Cart: Cart,
        RemoveFromCart: RemoveFromCart,
        SelectChange: SelectChange,
        Contact:Contact,
        Home:Init,
        LoadPage:LoadPage,
        Search:Search,
        Compress:Compress

    }
}())