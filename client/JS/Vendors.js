
var Vendors=(function(){

    var CurrentCat="";

    function Login(){

        var xuser=document.getElementById("Input_User").value;

        var pass=document.getElementById("Input_Password").value;
        $.getJSON("/Login/?user="+xuser+"&pass="+pass, function(data) {

            if( data.loggedin==true){


                localStorage.setItem("ID",data.id)

                document.location="interface.html";

            }else{

                alert("Invalid Login") ;


            }

        })

    }

    function CheckSession(){


        $.getJSON("/CheckSession/", function(data) {

            if( data.loggedin==true){
$("#UserName").html("Welcome Back"+data.user)

            }else{
                document.location="index.html"



            }

        })





    }


    function Init(){


CheckSession();


    }

    var Users=[];
    function ProcessUsers(data){
        Users=data;
        var dd="";
        for(dd=0;dd<data.length;dd++){
            UserTemplate(data[dd])
        }


        $("#MainContainer").append("<div class='xButton' onclick=\"Admin.AddItem('User')\"> Add User </div>")
    }
    function ProcessCats(data){

        var dd="";
        for(dd=0;dd<data.length;dd++){
            CatTemplate(data[dd])

        }
        $("#MainContainer").append("<div class='xButton' onclick=\"Admin.AddItem('Category')\"> Add Category </div>")
    }
    function ProcessItems(data){

        var dd="";
        for(dd=0;dd<data.length;dd++){
            ItemTemplate(data[dd])

        }
        $("#MainContainer").append("<div class='xButton' onclick=\"Admin.AddItem('Item')\">Add Item </div>")
    }

    var xInventory;

    function ProcessInventory(data){

        xInventory=data;

        $.getJSON("/GetData/?Cat=items", function(data) {

            var dd="";
            for(dd=0;dd<data.length;dd++){

                InventoryTemplate(data[dd])

            }
            $("#MainContainer").append("<div class='xButton' onclick=\"Vendors.SaveInventory()\"> Save Inventory </div>")

        })

    }
    function ProcessMessages(data){

        var dd="";
        for(dd=0;dd<data.length;dd++){
            MessageTemplate(data[dd])

        }

        $("#MainContainer").append("<div class='xButton' onclick=\"Vendors.AddItem('Message')\"> Add Message </div>")

    }

    function UserTemplate(xItem){
        var xTemp="<div class='WideBeam'>";
        xTemp=xTemp+"<div class='FieldBit ClickBit' onclick=\"Admin.EditUser('"+xItem._id+"')\">Edit</div>"
        xTemp=xTemp+"<div class='FieldBit'>"+xItem.FirstName+"</div>"
        xTemp=xTemp+"<div class='FieldBit'>"+xItem.LastName+"</div>"
        xTemp=xTemp+"<div class='FieldBit'>"+xItem.Company+"</div>"
        xTemp=xTemp+"<div class='FieldBit'>"+xItem.City+"</div>"
        xTemp=xTemp+"<div class='FieldBit'>"+xItem.State+"</div>"
        xTemp=xTemp+"<div class='FieldBit'>"+xItem.Zip+"</div>"
        xTemp=xTemp+"<div class='FieldBit ClickBit' onclick=\"Admin.Delete('"+xItem._id+"')\">Delete</div>"

        xTemp=xTemp+"</div>"

        $("#MainContainer").append(xTemp)

    }

     function IsChecked(xItem){
         var foundit=false;

if(xInventory.results!=false){



if (xInventory[0][xItem]!=undefined){
    foundit=true
}

}
if (foundit==true){
return "checked"
}else{
    return ""
}


     }


    function HasValue(xItem){
        var foundit=false;

        if(xInventory.results!=false){



            if (xInventory[0][xItem]!=undefined){
                foundit=true
            }

        }
        if (foundit==true){
            return xInventory[0][xItem]
        }else{
            return ""
        }


    }

    function InventoryTemplate(xItem){

        var xTemp="<div class='WideBeam'>";
        xTemp=xTemp+"<div class='FieldBit ClickBit'><input class='checkboxes' type=\"checkbox\" id=\"Item_"+xItem._id+"\" "+IsChecked(xItem._id)+" value=\""+xItem._id+"\"  > <input class=\"CostBox\" id=\"Cost_"+xItem._id+"\" value=\""+HasValue(xItem._id)+"\" type=\"text\" placeholder='Cost Per Unit'></div>"
        xTemp=xTemp+"<div class='FieldBit'>"+xItem.Name+"</div>"
        xTemp=xTemp+"<div class='FieldBit'>"+xItem.Category+"</div>"
        xTemp=xTemp+"</div>"
        $("#MainContainer").append(xTemp)

    }
    function ItemTemplate(xItem){

        var xTemp="<div class='WideBeam'>";
        xTemp=xTemp+"<div class='FieldBit'>"+xItem.Name+"</div>"
        xTemp=xTemp+"<div class='FieldBit'>"+xItem.Category+"</div>"

        xTemp=xTemp+"<div class='FieldBit ClickBit' onclick=\"Vendor.Delete('"+xItem._id+"')\">Delete</div>"
        xTemp=xTemp+"</div>"
        $("#MainContainer").append(xTemp)

    }
    function CatTemplate(xItem){
        var xTemp="<div class='WideBeam'>";
        xTemp=xTemp+"<div class='FieldBit'>"+xItem.Name+"</div>"
        xTemp=xTemp+"<div class='FieldBit ClickBit' onclick=\"Vendor.Delete('"+xItem._id+"')\">Delete</div>"
        xTemp=xTemp+"</div>"

        $("#MainContainer").append(xTemp)

    }
    function MessageTemplate(xItem){
        var xTemp="<div class='WideBeam'>";

        var xDate=new Date(xItem.Date).toLocaleDateString()
        xTemp=xTemp+"<div class='FieldBit'>"+xItem.Title+"</div>"
        xTemp=xTemp+"<div class='FieldBit'>"+xItem.Person+"</div>"
        xTemp=xTemp+"<div class='FieldBit'>"+xDate+"</div>"
        xTemp=xTemp+"<div class='FieldBit ClickBit' onclick=\"Vendors.Delete('"+xItem._id+"')\">Delete</div>"
        xTemp=xTemp+"<div class='FieldBit' onclick=\"Vendors.ViewMessage('"+xItem._id+"')\">View Content</div>"
        xTemp=xTemp+"</div>"
        xTemp=xTemp+"<div class='MessageContent' style=\"display:none;\" id=\"MessageContent_"+xItem._id+"\">"+xItem.Content+"</div>"


        $("#MainContainer").append(xTemp)
    }



    function GetData(xCat){
        $("#MainContainer").empty();

        var        rCat=xCat

        if(rCat=="categories"){
            rCat="category"

        }

        $.getJSON("/GetData/?Cat="+rCat, function(data) {

            if(xCat=="users"){
                ProcessUsers(data)
            }
            if(xCat=="categories"){
                ProcessCats(data)
            }
            if(xCat=="items"){
                ProcessItems(data)
            }
            if(xCat=="inventory"){
                ProcessInventory(data)
            }
            if(xCat=="messages"){
                ProcessMessages(data)
            }



        })


    }


    function OrderTemplate(xItem){

        if (xItem.Status==undefined){
            xItem.Status="Open"
        }

        if( xItem.VenueCity){
            xItem.City=            xItem.VenueCity

        }
        if( xItem.VenueState){
            xItem.State=            xItem.VenueState

        }

        if( xItem.VenueDate==undefined){
            xItem.VenueDate="TBD"

        }

        var xTemp="<div class='WideBeam'>";
        xTemp=xTemp+"<div class='FieldBit ClickBit' onclick=\"Vendors.EditOrder('"+xItem._id+"')\">Review Order</div>"
        xTemp=xTemp+"<div class='FieldBit'>"+xItem.Date+"</div>"
        xTemp=xTemp+"<div class='FieldBit'>"+xItem.VenueDate+"</div>"
        xTemp=xTemp+"<div class='FieldBit'>"+xItem.City+"</div>"
        xTemp=xTemp+"<div class='FieldBit'>"+xItem.State+"</div>"
        xTemp=xTemp+"<div class='FieldBit'>"+xItem.Status+"</div>"

        xTemp=xTemp+"</div>"
        $("#MainContainer").append(xTemp)

    }


    function EditOrder(xID){


        $.getJSON("/GetData/?Cat=users", function(data) {
            Users=data;
            $.getJSON("/GetData/?Cat=inventory", function(data) {
                xInventory=data;

                EditOrder2(xID);
            })
        })


    }





    var CurrentOrder;
    function EditOrder2(xID){

        var bb=0;
        var xObject;

        for(bb=0;bb<Orders.length;bb++){

            if(Orders[bb]._id==xID){
                xObject=Orders[bb]
            }
        }


        CurrentOrder=xObject;

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
//            "<div id=\"map-canvas\"></div>"+

            "<div class='AddRow'><div class='AddLabel'>Estimated Cost</div><div class='AddInput'>"+xObject.EstimatedCost+"</div></div>" +
            "<div class='AddRow'><div class='AddLabel'>Vendor Cost</div><div class='AddInput'>"+xObject.VendorCost+"</div></div>" +
            "<div class='AddRow'><div class='AddLabel'>Alert</div><div class='AddInput' id=\"AlertBox\"></div></div>" +

            "<div id=\"CartContainer\"></div>"


            if(xObject.Status=="Assigned"){
       xOut=xOut+     "<div class='AddRow'><div class='AddLabel'></div><div class='AddInput'><input type='button' value=\"Reject Order\"  onclick=\"Vendors.RejectOrder();\"><input type='button' value=\"Accept Order\"  onclick=\"Vendors.AcceptOrder();\"></div></div>"
            }
        if(xObject.Status=="Accepted"){
            xOut=xOut+       "<div class='AddRow'><input type='button' value=\"Order Delivered\"  onclick=\"Vendors.ShipOrder();\"></div>";
        }
        if(xObject.Status=="Delivered"){
            xOut=xOut+       "<div class='AddRow'><input type='button' value=\"Order Completed\"  onclick=\"Vendors.CompleteOrder();\"><input type='button' value=\"Order Damaged\"  onclick=\"Vendors.DamageOrder();\"></div>";
        }



        xOut=xOut+            "</div>";







        $("#MainContainer").html(xOut);

        //CartITems

        var xCart=CurrentOrder.Cart;

        var xOut = "";
        var dd = 0;
        for (dd = 0; dd < xCart.length; dd++) {

            xOut = xOut + "<div class='CartItem'>" +
                "<div class='CartTitle'>" + xCart[dd].Name + "</div>" +
                "<div class='CartAmount'>" + xCart[dd].Amount + "</div>" +
                "<div class='CartFrom'>From $"+(xCart[dd].MinCost*xCart[dd].Amount) + "</div>" +
                "</div>"
//            EstimatedCost=EstimatedCost+(xCart[dd].MinCost*xCart[dd].Amount);

        }

        $("#CartContainer").html(xOut);


        return;
        var xlat=xObject.geo.results[0].geometry.location.lat;
        var xlong=xObject.geo.results[0].geometry.location.lng;

        var map;
        map = new google.maps.Map(document.getElementById('map-canvas'), {
            zoom: 13,
            center: {lat: xlat, lng:xlong}
        });

        google.maps.event.addDomListener(window, 'load', initialize);

        var myLatlng = new google.maps.LatLng(xlat,xlong);

        var marker = new google.maps.Marker({
            position: myLatlng,
            map: map
        });


    }



    function GetOrders(){
var xID=localStorage.getItem("ID")
        $.getJSON("/GetMyOrders/?ID="+xID, function(data) {
$("#MainContainer").empty();
            Orders=data;
            var dd="";
            for(dd=0;dd<data.length;dd++){
                OrderTemplate(data[dd])
            }




        })

    }

    function GetUsers(){

        GetData("users")

    }
    function Categories(){
        GetData("categories")

    }
    function Items(){
        GetData("items")

    }
    function Inventory(){
        GetData("inventory")

    }
    function Messages(){
        GetData("messages")

    }
    function Logout(){

        $.getJSON("/Logout/", function(data) {

            document.location="index.html";

        })



    }




    function LoadPage(xPage){


        if(xPage=="Account"){

            EditUser(localStorage.getItem("ID"));


        }
        if (xPage=="Orders"){
            GetOrders();
        }
        if (xPage=="Users"){
            GetUsers();
        }
        if (xPage=="Categories"){
            Categories();
        }
        if (xPage=="Items"){
            Items();
        }
        if (xPage=="Inventory"){
            Inventory();
        }
        if (xPage=="Messages"){
            Messages();
        }
        if (xPage=="Logout"){
            Logout();
        }



    }

    var CurrentUser=null;

    function EditUser(xID){



        $.getJSON("/GetUser/?ID="+xID, function(data) {

            EditUser2(data[0]);

})

    }

    function EditUser2(xObject){




        CurrentUser=xObject;




        var xOut="<div class='AddItem'>"

if(xObject.Active==true){
    xOut=xOut+ "<div class='AddRow'><div class='AddLabel'>Active</div><div class='AddInput'><input type='checkbox' checked id='Active'></div></div>"
    }else{
    xOut=xOut+ "<div class='AddRow'><div class='AddLabel'>Active</div><div class='AddInput'><input type='checkbox'  id='Active'></div></div>"
}
        xOut=xOut+"<div class='AddRow'><div class='AddLabel'>First Name</div><div class='AddInput'><input type='text' value='"+xObject.FirstName+"' id='FirstName'></div></div>" +

            "<div class='AddRow'><div class='AddLabel'>Last Name</div><div class='AddInput'><input type='text' value='"+xObject.LastName+"'  id='LastName'></div></div>" +
            "<div class='AddRow'><div class='AddLabel'>Company</div><div class='AddInput'><input type='text' value='"+xObject.Company+"'  id='Company'></div></div>" +
            "<div class='AddRow'><div class='AddLabel'>Address</div><div class='AddInput'><input type='text' value='"+xObject.Address+"'  id='Address'></div></div>" +
            "<div class='AddRow'><div class='AddLabel'>City</div><div class='AddInput'><input type='text' value='"+xObject.City+"'  id='City'></div></div>" +
            "<div class='AddRow'><div class='AddLabel'>State</div><div class='AddInput'><input type='text' value='"+xObject.State+"'  id='State'></div></div>" +
            "<div class='AddRow'><div class='AddLabel'>Zip</div><div class='AddInput'><input type='text' value='"+xObject.Zip+"'  id='Zip'></div></div>" +
            "<div class='AddRow'><div class='AddLabel'>Email</div><div class='AddInput'><input type='text' value='"+xObject.Email+"'  id='Email'></div></div>" +
            "<div class='AddRow'><div class='AddLabel'>Password</div><div class='AddInput'><input type='text' value='OldPassword'  id='Password'></div></div>" +

            "<div class='AddRow'><div class='AddLabel'>P & D</div><div class='AddInput'><textarea   id='PANDD'>"+xObject.PANDD+"</textarea></div></div>" +
            "<div class='AddRow'><div class='AddLabel'>Shipping</div><div class='AddInput'><textarea   id='Shipping'>"+xObject.Shipping+"</textarea></div></div>" +


            "<div class='AddRow'><div class='AddLabel'>Photo</div><div id='PhotoPlaceHolder'  style=\"background-image:url("+xObject.Photo+");\"></div><BR><div ><input  type='file' id='Input_File' name='Input_File'></div></div>" +

            "<div class='AddRow'><div class='AddLabel'></div><div class='AddInput'><input type='button' value=\"Save\"  onclick=\"Vendors.SaveUser();\"></div></div>" +
            "</div>";



        xOut=xOut+"<div id=\"BankAccount\" onclick=\"Vendors.CreateBankAccount()\"> My Bank Account</div>"









        CurrentCat="User";


        $("#MainContainer").html(xOut);
        $("#PhotoPlaceHolder").on("click",function(){

            $("#Input_File").click();

        })

        $("#Input_File").on("change",FileChange)

    }

    var LastPhoto=null;
    function uploadComplete2(response){

        var xdata=JSON.parse(response.target.responseText)
        var xpic="url("+xdata.picture+")";
        $("#PhotoPlaceHolder").css("background-image",xpic)
        LastPhoto=xdata.picture;
        console.log(LastPhoto);
    }


    function BankAccount(){

var bank_routing_number=$("#routingnumber")
        var bank_account_number=$("#accountnumber")


        Stripe.bankAccount.createToken({
            country: 'US',
            routingNumber: bank_routing_number,
            accountNumber: bank_account_number
        }, function(status, response) {
            if (response.error)
            {
                console.log(response);
                alert(response.error.message);
            }
            else
            {
                var token = response.id;
                /* send the token to the server along with the withdraw request */
        $("#BankAccount").hide()
            SaveToken(token);
            }
        });


    }



    function SaveToken(token){

var xObject={}
        xObject.Token=token;
        xObject.User=localStorage.getItem("ID");


        $.ajax({
            url: "/SaveAccount/",
            type: "POST",
            dataType: "json",
            data: JSON.stringify(xObject),
            contentType: "application/json",
            cache: false,
            timeout: 5000,
            complete: function(res) {

        alert("Bank Account Saved.")

            }})






    }



    function FileChange(){


        var fd = new FormData();
        fd.append("Input_File", $("#Input_File").get(0).files[0]);

        var xhr = new XMLHttpRequest();

        xhr.addEventListener("load", uploadComplete2, false);

        xhr.open("POST", "/SavePhoto/");
        xhr.send(fd);


    }

    function AddItem(xType){

        $("#MainContainer").empty();

        if(xType=="User"){
            var xOut="<div class='AddItem'>" +
                "<div class='AddRow'><div class='AddLabel'>First Name</div><div class='AddInput'><input type='text' id='FirstName'></div></div>" +
                "<div class='AddRow'><div class='AddLabel'>Last Name</div><div class='AddInput'><input type='text' id='LastName'></div></div>" +
                "<div class='AddRow'><div class='AddLabel'>Company</div><div class='AddInput'><input type='text' id='Company'></div></div>" +
                "<div class='AddRow'><div class='AddLabel'>Address</div><div class='AddInput'><input type='text' id='Address'></div></div>" +
                "<div class='AddRow'><div class='AddLabel'>City</div><div class='AddInput'><input type='text' id='City'></div></div>" +
                "<div class='AddRow'><div class='AddLabel'>State</div><div class='AddInput'><input type='text' id='State'></div></div>" +
                "<div class='AddRow'><div class='AddLabel'>Zip</div><div class='AddInput'><input type='text' id='Zip'></div></div>" +
                "<div class='AddRow'><div class='AddLabel'>Email</div><div class='AddInput'><input type='text' id='Email'></div></div>" +
                "<div class='AddRow'><div class='AddLabel'>Password</div><div class='AddInput'><input type='text'  id='Password'></div></div>" +
                "<div class='AddRow'><div class='AddLabel'></div><div class='AddInput'><input type='button' value=\"Save\"  onclick=\"Admin.CreateUser();\"></div></div>" +
                "</div>";

            $("#MainContainer").append(xOut);

            CurrentCat="User"

        }

        if(xType=="Category"){
            var xOut="<div class='AddItem'>" +
                "<div class='AddRow'><div class='AddLabel'>Name</div><div class='AddInput'><input type='text' id='Name'></div></div>" +
                "<div class='AddRow'><div class='AddLabel'></div><div class='AddInput'><input type='button' value=\"Save\"  onclick=\"Admin.SaveObject();\"></div></div>" +
                "</div>";
            $("#MainContainer").append(xOut);

            CurrentCat="Category"

        }

        if(xType=="Item"){
            var xOut="<div class='AddItem'>" +
                "<div class='AddRow'><div class='AddLabel'>Category</div><div class='AddInput'><select id='Category'></select></div></div>" +
                "<div class='AddRow'><div class='AddLabel'>Name</div><div class='AddInput'><input type='text' id='Name'></div></div>" +
                "<div class='AddRow'><div class='AddLabel'></div><div class='AddInput'><input type='button' value=\"Save\"  onclick=\"Admin.SaveObject();\"></div></div>" +
                "</div>";
            $("#MainContainer").append(xOut);

            CurrentCat="Item"
            GetCategories();
        }

        if(xType=="Message"){
            var xOut="<div class='AddItem'>" +
                "<div class='AddRow'><div class='AddLabel'>Recipient:</div><div class='AddInput'><select id='Person'><option value='Admin'>Admin</option></select></div></div>" +
                "<div class='AddRow'><div class='AddLabel'>Title:</div><div class='AddInput'><input type='text' id='Title'></div></div>" +
                "<div class='AddRow'><div class='AddLabel'>Content:</div><div class='AddInput'><input type='text' id='Content'></div></div>" +
                "<div class='AddRow'><div class='AddLabel'></div><div class='AddInput'><input type='button' value=\"Save\" onclick=\"Admin.SaveObject();\"></div></div>" +
                "</div>";
            $("#MainContainer").append(xOut);



            CurrentCat="Message"
        }




    }


    function GetCategories(){


        $.getJSON("/GetMyMessages/?Cat=category&ID="+localStorage.getItem("ID"), function(data) {

            var bb=0;

            for(bb==0;bb<data.length;bb++){
                var x = document.getElementById("Category");
                var option = document.createElement("option");
                option.text =data[bb].Name;
                option.value=data[bb].Name;
                x.add(option);

            }


        })


    }



    function GetAllUsers(){


        $.getJSON("/GetData/?Cat=users", function(data) {

            var bb=0;

            for(bb==0;bb<data.length;bb++){
                var x = document.getElementById("Person");
                var option = document.createElement("option");
                option.text =data[bb].Company+" - "+data[bb].Email;
                option.value=data[bb]._id;
                x.add(option);

            }


        })


    }


    function SaveItem(){

        var xObject={}
        var xCat="";
        if(CurrentCat=="Message"){
            xObject.Person=$("#Person").val();
            xObject.Title=$("#Title").val();
            xObject.Content=$("#Content").val();
            xCat="messages"
        }
        if(CurrentCat=="User"){
            xObject.FirstName=$("#FirstName").val();
            xObject.LastName=$("#LastName").val();
            xObject.Company=$("#Company").val();
            xObject.Address=$("#Address").val();
            xObject.City=$("#City").val();
            xObject.State=$("#State").val();
            xObject.Zip=$("#Zip").val();
            xObject.Phone=$("#Phone").val();
            xObject.Email=$("#Email").val();
            xCat="users"
        }
        if(CurrentCat=="Item"){
            xObject.Name=$("#Name").val();
            xObject.Category=$("#Category").val();
            xCat="items";
        }
        if(CurrentCat=="Category"){
            xObject.Name=$("#Name").val();
            xCat="category"
        }






        $.ajax({
            url: "/SaveObject/?Type="+xCat,
            type: "POST",
            dataType: "json",
            data: JSON.stringify(xObject),
            contentType: "application/json",
            cache: false,
            timeout: 5000,
            complete: function(res) {

                alert("Item Added")
                if(CurrentCat=="User"){
                    LoadPage("Users")
                }
                if(CurrentCat=="Category"){
                    LoadPage("Categories")
                }
                if(CurrentCat=="Item"){
                    LoadPage("Items")
                }
                if(CurrentCat=="Message"){
                    LoadPage("Messages")
                }
            }})






    }




    function SaveItem(){

        var xObject={}
        var xCat="";
        if(CurrentCat=="Message"){
            xObject.Person=$("#Person").val();
            xObject.Title=$("#Title").val();
            xObject.Content=$("#Content").val();
            xCat="messages"
        }
        if(CurrentCat=="User"){
            xObject.FirstName=$("#FirstName").val();
            xObject.LastName=$("#LastName").val();
            xObject.Company=$("#Company").val();
            xObject.Address=$("#Address").val();
            xObject.City=$("#City").val();
            xObject.State=$("#State").val();
            xObject.Zip=$("#Zip").val();
            xObject.Phone=$("#Phone").val();
            xObject.Email=$("#Email").val();
            xCat="users"
        }
        if(CurrentCat=="Item"){
            xObject.Name=$("#Name").val();
            xObject.Category=$("#Category").val();
            xCat="items";
        }
        if(CurrentCat=="Category"){
            xObject.Name=$("#Name").val();
            xCat="category"
        }






        $.ajax({
            url: "/CreateUser/",
            type: "POST",
            dataType: "json",
            data: JSON.stringify(xObject),
            contentType: "application/json",
            cache: false,
            timeout: 5000,
            complete: function(res) {


                    LoadPage("Users")

            }})






    }



    function SaveUser(){


        var xObject=CurrentUser;

        xObject.FirstName=$("#FirstName").val();
        xObject.LastName=$("#LastName").val();
        xObject.Company=$("#Company").val();
        xObject.Address=$("#Address").val();
        xObject.City=$("#City").val();
        xObject.State=$("#State").val();
        xObject.Zip=$("#Zip").val();
        xObject.Email=$("#Email").val();
        xObject.Phone=$("#Phone").val();
        xObject.Password=$("#Password").val();
        xObject.PANDD=$("#PANDD").val();
        xObject.Shipping=$("#Shipping").val();

       if($("#Active").prop("checked")==true){

            xObject.Active=true;

        }else{
            xObject.Active=false;

        }

        xObject.Photo=LastPhoto;
        LastPhoto=null;

        $.ajax({
                url: "/SaveUser/",
                type: "POST",
                dataType: "json",
                data: JSON.stringify(xObject),
                contentType: "application/json",
                cache: false,
                timeout: 5000,
                complete: function(res) {

                    LoadPage("Account")
                }
            }

        )

    }


    function DeleteObject(ID){

        $.getJSON("/DeleteObject/?Type="+CurrentCat+"&ID="+ID, function(data) {

            if(CurrentCat=="User"){
                LoadPage("Users")
            }
            if(CurrentCat=="Category"){
                LoadPage("Categories")
            }
            if(CurrentCat=="Item"){
                LoadPage("Items")
            }
            if(CurrentCat=="Message"){
                LoadPage("Messages")
            }



        })


    }


    function SaveInventory(){

        var xObject={};

        $('input:checked').each(function() {

            xObject[$(this).val()]=$("#Cost_"+$(this).val()).val();



        });
console.log(xObject)
xObject.Owner=localStorage.getItem("ID");

        $.ajax({
                url: "/SaveInventory/",
                type: "POST",
                dataType: "json",
                data: JSON.stringify(xObject),
                contentType: "application/json",
                cache: false,
                timeout: 5000,
                complete: function(res) {

                    LoadPage("Inventory")
                }
            }

        )




    }
    function CompleteOrder(){

        $.getJSON("/OrderChange/?Status=Complete&ID="+CurrentOrder._id, function(data) {

            LoadPage("Orders")

        })

    }
    function DamageOrder(){

        $.getJSON("/OrderChange/?Status=Damage&ID="+CurrentOrder._id, function(data) {

            LoadPage("Orders")

        })

    }

    function ShipOrder(){

        $.getJSON("/OrderChange/?Status=Delivered&ID="+CurrentOrder._id, function(data) {

            LoadPage("Orders")

        })

        }
    function RejectOrder(){
        $.getJSON("/OrderChange/?Status=Rejected&ID="+CurrentOrder._id, function(data) {

LoadPage("Orders")
        })

    }
    function AcceptOrder(){
        $.getJSON("/OrderChange/?Status=Accepted&ID="+CurrentOrder._id, function(data) {
            LoadPage("Orders")


        })

    }


    function ViewMessage(xID){

        $("#MessageContent_"+xID).show();


    }


    function CBA(){


        $("#BankAccount").show();



    }

    return {
        EditUser:EditUser,
        SaveObject:SaveItem,
        AddItem:AddItem,
        Login:Login,
        Init:Init,
        LoadPage:LoadPage,
        SaveUser:SaveUser,
        SaveInventory:SaveInventory,
EditOrder:EditOrder,
        AcceptOrder:AcceptOrder,
        RejectOrder:RejectOrder,
        ShipOrder:ShipOrder,
        DamageOrder:DamageOrder,
        CompleteOrder:CompleteOrder,
ViewMessage:ViewMessage,
        CreateBankAccount:CBA,
        SaveBankAccount:BankAccount
    }
})()


