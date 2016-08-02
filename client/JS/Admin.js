var Admin = (function () {

    function SetHash(xItem) {
        document.location.hash = "#" + xItem;

    }

    var CurrentCat = "";


    function HashChange() {

        if (window.location.hash != "") {
            var xHash = window.location.hash;
            console.log(window.location.hash);


            if (xHash == "#EditPages") {
                GetData("pages")
            }
            if (xHash == "#EditRequests") {
                GetData("requests")
            }
            if (xHash == "#EditUsers") {
                GetData("users")
            }
            if (xHash == "#EditCategories") {
                GetData("categories")
            }
            if (xHash == "#EditItems") {
                GetData("items")
            }
            if (xHash == "#EditMessages") {
                GetData("messages")
            }
            if (xHash == "#EditInventory") {
                GetData("inventory")
            }

            if (xHash.indexOf("#EditPage=") != -1) {
                xHash = xHash.replace("#EditPage=", "")
                EditPage(xHash);
            }
            if (xHash.indexOf("#EditOrder2=") != -1) {
                xHash = xHash.replace("#EditOrder2=", "")
                EditOrder(xHash)
            }

            if (xHash.indexOf("#EditUser=") != -1) {
                xHash = xHash.replace("#EditUser=", "")
                EditUser(xHash);
            }

            if (xHash.indexOf("#EditUserInventory=") != -1) {
                xHash = xHash.replace("#EditUserInventory=", "")
                EditUserInventory(xHash);
            }
            if (xHash.indexOf("#EditCat=") != -1) {
                xHash = xHash.replace("#EditCat=", "")
                EditCat(xHash);
            }
            if (xHash.indexOf("#EditMessages=") != -1) {


                GetData("messages")

            }


        }


    }


    function Login() {

        var xuser = document.getElementById("Input_User").value;

        var pass = document.getElementById("Input_Password").value;
        $.getJSON("/Login/?user=" + xuser + "&pass=" + pass, function (data) {

            if (data.loggedin == true) {

                document.location = "interface.html";

            } else {

                alert("Invalid Login");


            }

        })

    }


    function AdminLogin() {

        var xuser = document.getElementById("Input_User").value;

        var pass = document.getElementById("Input_Password").value;
        $.getJSON("/AdminLogin/?user=" + xuser + "&pass=" + pass, function (data) {

            if (data.loggedin == true) {

                document.location = "interface.html";

            } else {

                alert("Invalid Login");


            }

        })

    }


    function CheckSession() {


        $.getJSON("/CheckSession/", function (data) {

            if (data.loggedin == true) {

            } else {
                document.location = "index.html"


            }

        })


    }


    function checkEmail(email) {
        var re = /\S+@\S+\.\S+/;
        return re.test(email);
    }


    function Init() {

        CheckSession();
//  window.onhashchange=HashChange

//        GetInitialData();
    }

    var PreventDialogs = false;

    function GetInitialData() {
        GetData("requests")
        GetData("users")
        GetData("categories")
        GetData("items")
        GetData("inventory")
        GetData("messages")
        GetData("pages")


    }

    var Clients = [];
    var Users = [];

    function ProcessClients(data, xshow) {
        Clients = data;
        if (xshow == false) {
            return;
        }
        var dd = "";
        for (dd = 0; dd < data.length; dd++) {
            ClientTemplate(data[dd])
        }


        $("#MainContainer").append("<div class='xButton' onclick=\"Admin.AddItem('Client')\"> Add Client </div>")
    }

    var Rewards = [];

    function ProcessRewards(data, xshow) {
        Rewards = data;
        if (xshow == false) {
            return;
        }

        var dd = "";
        for (dd = 0; dd < data.length; dd++) {
            RewardTemplate(data[dd])
        }


        $("#MainContainer").append("<div class='xButton' onclick=\"Admin.AddItem('Reward')\"> Add Reward </div>")
    }

    function ProcessUsers(data, xshow) {
        Users = data;
        if (xshow == false) {
            return;
        }

        var dd = "";
        for (dd = 0; dd < data.length; dd++) {
            UserTemplate(data[dd])
        }


        $("#MainContainer").append("<div class='xButton' onclick=\"Admin.AddItem('User')\"> Add User </div>")
    }


    var Pages = [];

    function ProcessPages(data, xshow) {
        Pages = data;
        if (xshow == false) {
            return;
        }

        if (PreventDialogs == true) {
            return
        }

        var dd = "";
        for (dd = 0; dd < data.length; dd++) {
            PageTemplate(data[dd])
        }


        $("#MainContainer").append("<div class='xButton' onclick=\"Admin.AddItem('Page')\"> Add Page </div>")
    }


    var Orders;

    function ProcessOrders(data, xshow) {
        Orders = data;
        if (xshow == false) {
            return;
        }

        if (PreventDialogs == true) {
            return
        }
        var dd = "";
        for (dd = 0; dd < data.length; dd++) {
            OrderTemplate(data[dd])
        }


        // $("#MainContainer").append("<div class='xButton' onclick=\"Admin.AddItem('Page')\"> Add Page </div>")
    }


    var Modules;
    var Orders;

    function ProcessModules(data, xshow) {
        Modules = data;
        if (xshow == false) {
            return;
        }

        if (PreventDialogs == true) {
            return
        }
        var dd = "";
        for (dd = 0; dd < data.length; dd++) {
            ModuleTemplate(data[dd])
        }


        $("#MainContainer").append("<div class='xButton' onclick=\"Admin.AddItem('Module')\"> Add Module </div>")
    }

    var Tests;

    function ProcessTests(data, xshow) {
        Tests = data;
        if (xshow == false) {
            return;
        }

        if (PreventDialogs == true) {
            return
        }
        var dd = "";
        for (dd = 0; dd < data.length; dd++) {
            TestsTemplate(data[dd])
        }


        $("#MainContainer").append("<div class='xButton' onclick=\"Admin.AddItem('Test')\"> Add Test </div>")
    }

    function ProcessQuestions(data, xshow) {
        Tests = data;
        if (xshow == false) {
            return;
        }

        if (PreventDialogs == true) {
            return
        }
        var dd = "";
        for (dd = 0; dd < data.length; dd++) {
            QuestionsTemplate(data[dd])
        }


        $("#MainContainer").append("<div class='xButton' onclick=\"Admin.AddItem('Question')\"> Add Question </div>")
    }


    function ProcessCats(data, xshow) {
        if (xshow == false) {
            return;
        }

        if (PreventDialogs == true) {
            return
        }

        var dd = "";
        for (dd = 0; dd < data.length; dd++) {
            CatTemplate(data[dd])

        }
        $("#MainContainer").append("<div class='xButton' onclick=\"Admin.AddItem('Category')\"> Add Category </div>")
    }

    function ProcessItems(data, xshow) {
        if (xshow == false) {
            return;
        }

        var dd = "";
        for (dd = 0; dd < data.length; dd++) {
            ItemTemplate(data[dd])

        }
        $("#MainContainer").append("<div class='xButton' onclick=\"Admin.AddItem('Item')\">Add Item </div>")
    }

    function ProcessInventory(data, xshow) {

        var dd = "";
        for (dd = 0; dd < data.length; dd++) {
            InventoryTemplate(data[dd])

        }
//        $("#MainContainer").append("<div class='xButton' onclick=\"AddItem('')\"> Add Inventory </div>")
    }

    function ProcessMessages(data, xshow) {

        var dd = "";
        for (dd = 0; dd < data.length; dd++) {
            MessageTemplate(data[dd])

        }

        $("#MainContainer").append("<div class='xButton' onclick=\"Admin.AddItem('Message')\"> Add Message </div>")

    }


    function IsChecked(xItem) {
        if (xInventory.results != false) {

            var dd = 0;
            for (dd = 0; dd < xInventory.length; dd++) {

                if (xInventory[dd].Owner == CurrentUser._id) {
                    if (xInventory[dd][xItem] != undefined) {
                        return "checked"
                    }
                }

            }


        }

        return ""
    }


    function HasValue(xItem) {
        var foundit = false;

        if (xInventory.results != false) {

            var dd = 0;
            for (dd = 0; dd < xInventory.length; dd++) {

                if (xInventory[dd].Owner == CurrentUser._id) {
                    if (xInventory[dd][xItem] != undefined) {
                        return xInventory[dd][xItem]
                    }
                }

            }


        }

        return ""


    }

    function InventoryTemplate2(xItem) {

        var xTemp = "<div class='WideBeam'>";
        xTemp = xTemp + "<div class='FieldBit ClickBit'><input class='checkboxes' type=\"checkbox\" id=\"Item_" + xItem._id + "\" " + IsChecked(xItem._id) + " value=\"" + xItem._id + "\"  > <input class=\"CostBox\" id=\"Cost_" + xItem._id + "\" value=\"" + HasValue(xItem._id) + "\" type=\"text\" placeholder='Cost Per Unit'></div>"
        xTemp = xTemp + "<div class='FieldBit'>" + xItem.Name + "</div>"
        xTemp = xTemp + "<div class='FieldBit'>" + xItem.Category + "</div>"
        xTemp = xTemp + "</div>"
        $("#MainContainer").append(xTemp)

    }

    var xInventory;


    function EditUserInventory(xID) {
        SetHash("EditUserInventory=" + xID)
        var bb = 0;
        var xObject;

        for (bb = 0; bb < Users.length; bb++) {

            if (Users[bb]._id == xID) {
                xObject = Users[bb]
            }
        }


        CurrentUser = xObject;


        $.getJSON("/GetData/?Cat=inventory", function (data) {


            xInventory = data;

            $("#MainContainer").empty()

            $.getJSON("/GetData/?Cat=items", function (data) {

                var dd = "";
                for (dd = 0; dd < data.length; dd++) {

                    InventoryTemplate2(data[dd])

                }
                $("#MainContainer").append("<div class='xButton' onclick=\"Admin.SaveInventory()\"> Save Inventory </div>")

            })


        })


    }

    function ClientTemplate(xItem) {
        var xTemp = "<div class='WideBeam'>";
        xTemp = xTemp + "<div style='float:left;margin-right:10px;' class='ClickBit' onclick=\"Admin.EditClient('" + xItem._id + "')\"><span class='fa fa-pencil-square'></span></div>"
        xTemp = xTemp + "<div style='float:left;margin-right:10px;' class='ClickBit' onclick=\"Admin.EditModules('" + xItem._id + "')\"><span class='fa fa-list'></span></div>"
        xTemp = xTemp + "<div class='FieldBit200'>" + xItem.FirstName + "," + xItem.LastName + "</div>"
        xTemp = xTemp + "<div class='FieldBit200'>" + xItem.Company + "</div>"
        xTemp = xTemp + "<div style='display:inline-block;margin-right:10px;' class='FieldBit100'>" + xItem.City + "</div>"
        xTemp = xTemp + "<div style='display:inline-block;margin-right:10px;' >" + xItem.State + "</div>"
        xTemp = xTemp + "<div style='display:inline-block;margin-right:10px;'  class='ClickBit' onclick=\"Admin.Delete('clients','" + xItem._id + "')\"><span class='fa fa-trash'></span></div>"
        xTemp = xTemp + "</div>";


        $("#MainContainer").append(xTemp)

    }


    function UserTemplate(xItem) {
        var xTemp = "<div class='WideBeam'>";
        xTemp = xTemp + "<div style='float:left;margin-right:10px;' class='ClickBit' onclick=\"Admin.EditUser('" + xItem._id + "')\"><span class='fa fa-pencil-square'></span></div>"
        xTemp = xTemp + "<div style='float:left;margin-right:10px;' class='ClickBit' onclick=\"Admin.EditUserInventory('" + xItem._id + "')\"><span class='fa fa-list'></span></div>"
        xTemp = xTemp + "<div class='FieldBit200'>" + xItem.FirstName + "," + xItem.LastName + "</div>"
        xTemp = xTemp + "<div class='FieldBit200'>" + xItem.Company + "</div>"
        xTemp = xTemp + "<div style='display:inline-block;margin-right:10px;' class='FieldBit100'>" + xItem.City + "</div>"
        xTemp = xTemp + "<div style='display:inline-block;margin-right:10px;' >" + xItem.State + "</div>"

        if (xItem.Approved == true) {
            xTemp = xTemp + "<div style='display:inline-block;margin-right:10px;' class='ClickBit' onclick=\"Admin.Disapprove('" + xItem._id + "')\"><span class='fa fa-thumbs-down'></span></div>"

        } else {
            xTemp = xTemp + "<div style='display:inline-block;margin-right:10px;'  class='ClickBit' onclick=\"Admin.Approve('" + xItem._id + "')\"><span class='fa fa-thumbs-up'></span></div>"


        }

        xTemp = xTemp + "<div style='display:inline-block;margin-right:10px;'  class='ClickBit' onclick=\"Admin.Delete('users','" + xItem._id + "')\"><span class='fa fa-trash'></span></div>"
        xTemp = xTemp + "</div>";


        $("#MainContainer").append(xTemp)

    }

    function InventoryTemplate(xItem) {
        var xTemp = "<div class='WideBeam'>";
        xTemp = xTemp + "<div  style='display:inline-block;'  class='ClickBit' onclick=\"Admin.EditInventory('" + xItem._id + "')\"><span class='fa fa-pencil-square'></span></div>"
        xTemp = xTemp + "<div class='FieldBit'>" + xItem.name + "</div>"
        xTemp = xTemp + "<div class='FieldBit'>" + xItem.category + "</div>"
        xTemp = xTemp + "<div class='FieldBit'>" + xItem.vendorcount + "</div>"
        xTemp = xTemp + "<div class='FieldBit ClickBit' onclick=\"Admin.Delete('inventory','" + xItem._id + "')\"><span class='fa fa-trash'></span></div>"
        xTemp = xTemp + "</div>"
        $("#MainContainer").append(xTemp)

    }

    function ItemTemplate(xItem) {

        var xTemp = "<div class='WideBeam'>";
        xTemp = xTemp + "<div  style='display:inline-block;'  class='ClickBit' onclick=\"Admin.EditItem('" + xItem._id + "')\"><span class='fa fa-pencil-square'></span></div>"

        xTemp = xTemp + "<div class='FieldBit'>" + xItem.Name + "</div>"
        xTemp = xTemp + "<div class='FieldBit'>" + xItem.Category + "</div>"

        xTemp = xTemp + "<div class='FieldBit ClickBit' onclick=\"Admin.Delete('items','" + xItem._id + "')\"><span class='fa fa-trash'></span></div>"
        xTemp = xTemp + "</div>"
        $("#MainContainer").append(xTemp)

    }

    function RewardTemplate(xItem) {

        var xTemp = "<div class='WideBeam'>";
        xTemp = xTemp + "<div  style='display:inline-block;'  class='ClickBit' onclick=\"Admin.EditReward('" + xItem._id + "')\"><span class='fa fa-pencil-square'></span></div>"

        xTemp = xTemp + "<div class='FieldBit'>" + xItem.Title + "</div>"

        xTemp = xTemp + "<div class='FieldBit ClickBit' onclick=\"Admin.Delete('rewards','" + xItem._id + "')\"><span class='fa fa-trash'></span></div>"
        xTemp = xTemp + "</div>"
        $("#MainContainer").append(xTemp)

    }

    function ModuleTemplate(xItem) {

        var xTemp = "<div class='WideBeam'>";
        xTemp = xTemp + "<div  style='display:inline-block;'  class='ClickBit' onclick=\"Admin.EditModule('" + xItem._id + "')\"><span class='fa fa-pencil-square'></span></div>"
        xTemp = xTemp + "<div  style='display:inline-block;'  class='ClickBit' onclick=\"Admin.EditModuleContent('" + xItem._id + "')\"><span class='fa fa-globe'></span></div>"

        xTemp = xTemp + "<div class='FieldBit'>" + xItem.Title + "</div>"
        xTemp = xTemp + "<div class='FieldBit'>" + xItem.Category + "</div>"

        xTemp = xTemp + "<div class='FieldBit ClickBit' onclick=\"Admin.Delete('modules','" + xItem._id + "')\"><span class='fa fa-trash'></span></div>"
        xTemp = xTemp + "</div>"
        $("#MainContainer").append(xTemp)

    }

    function TestsTemplate(xItem) {

        var xTemp = "<div class='WideBeam'>";
        xTemp = xTemp + "<div  style='display:inline-block;'  class='ClickBit' onclick=\"Admin.EditTest('" + xItem._id + "')\"><span class='fa fa-pencil-square'></span></div>"

        xTemp = xTemp + "<div class='FieldBit'>" + xItem.Title + "</div>"

        xTemp = xTemp + "<div class='FieldBit ClickBit' onclick=\"Admin.Delete('tests','" + xItem._id + "')\"><span class='fa fa-trash'></span></div>"
        xTemp = xTemp + "</div>"
        $("#MainContainer").append(xTemp)

    }

    function QuestionsTemplate(xItem) {

        var xTemp = "<div class='WideBeam'>";
        xTemp = xTemp + "<div  style='display:inline-block;'  class='ClickBit' onclick=\"Admin.EditQuestion('" + xItem._id + "')\"><span class='fa fa-pencil-square'></span></div>"

        xTemp = xTemp + "<div class='FieldBit'>" + xItem.Title + "</div>"

        xTemp = xTemp + "<div class='FieldBit ClickBit' onclick=\"Admin.Delete('questions','" + xItem._id + "')\"><span class='fa fa-trash'></span></div>"
        xTemp = xTemp + "</div>"
        $("#MainContainer").append(xTemp)

    }


    function OrderTemplate(xItem) {
        var xTemp = "<div class='WideBeam'>";
        xTemp = xTemp + "<div class='ClickBit' style='float:left;' onclick=\"Admin.EditOrder('" + xItem._id + "')\"><span class='fa fa-archive'></span></div>"
//        xTemp=xTemp+"<div class='FieldBit'>"+xItem.Date+"</div>"
        xTemp = xTemp + "<div class='FieldBit'>" + xItem.Name + "</div>"
        xTemp = xTemp + "<div class='FieldBit'>" + xItem.Category + "</div>"
        xTemp = xTemp + "<div class='FieldBit ClickBit' onclick=\"Admin.Delete('items','" + xItem._id + "')\"><span class='fa fa-trash'></span></div>"
        xTemp = xTemp + "</div>"
        $("#MainContainer").append(xTemp)


    }

    function OrderTemplate(xItem) {

        if (xItem.Status == undefined) {
            xItem.Status = "Open"
        }

        if (xItem.VenueCity) {
            xItem.City = xItem.VenueCity

        }
        if (xItem.VenueState) {
            xItem.State = xItem.VenueState

        }

        if (xItem.VenueDate == undefined) {
            xItem.VenueDate = "TBD"

        }

        var xTemp = "<div class='WideBeam'>";
        xTemp = xTemp + "<div class='ClickBit' style='float:left;' onclick=\"Admin.EditOrder('" + xItem._id + "')\"><span class='fa fa-archive'></span></div>"
//        xTemp=xTemp+"<div class='FieldBit'>"+xItem.Date+"</div>"
        xTemp = xTemp + "<div class='FieldBit'>" + xItem.VenueDate + "</div>"
        xTemp = xTemp + "<div class='FieldBit'>" + xItem.City + "</div>"
        xTemp = xTemp + "<div class='FieldBit'>" + xItem.State + "</div>"
        xTemp = xTemp + "<div class='FieldBit'>" + xItem.Status + "</div>"
        if (xItem.PaidOut == undefined) {
            xTemp = xTemp + "<div style='display:inline-block;' class=' ClickBit' onclick=\"Admin.Payout('" + xItem.VendorCost + "','" + xItem._id + "')\">$</div>"
        }
        xTemp = xTemp + "<div class='FieldBit ClickBit' onclick=\"Admin.Delete('items','" + xItem._id + "')\"><span class='fa fa-trash'></span></div>"
        xTemp = xTemp + "</div>"
        $("#MainContainer").append(xTemp)

    }

    function CatTemplate(xItem) {
        var xTemp = "<div class='WideBeam'>";
        xTemp = xTemp + "<div style='display:inline-block;' class='ClickBit' onclick=\"Admin.EditCat('" + xItem._id + "')\"><span class='fa fa-pencil-square'></span></div>"
        xTemp = xTemp + "<div class='FieldBit'>" + xItem.Name + "</div>"
        xTemp = xTemp + "<div class='FieldBit ClickBit' onclick=\"Admin.Delete('category','" + xItem._id + "')\"><span class='fa fa-trash'></span></div>"
        xTemp = xTemp + "</div>"

        $("#MainContainer").append(xTemp)

    }


    function PageTemplate(xItem) {
        var xTemp = "<div class='WideBeam'>";
        xTemp = xTemp + "<div  style='display:inline-block;' class='ClickBit' onclick=\"Admin.EditPage('" + xItem._id + "')\"><span class='fa fa-pencil-square'></span></div>"

        xTemp = xTemp + "<div class='FieldBit400'>" + xItem.Name + "</div>"

        if (xItem.Name.indexOf("Email") == -1) {
            xTemp = xTemp + "<div class='FieldBit ClickBit' onclick=\"Admin.Delete('pages','" + xItem._id + "')\"><span class='fa fa-trash'></span></div>"
        } else {
            xTemp = xTemp + "<div class='FieldBit'>Permanent</div>"
        }
        xTemp = xTemp + "</div>"

        $("#MainContainer").append(xTemp)

    }

    function MessageTemplate(xItem) {
        var xTemp = "<div class='WideBeam'>";

        var xDate = new Date(xItem.Date).toLocaleDateString()
        xTemp = xTemp + "<div class='FieldBit'>" + xItem.Title + "</div>"
        xTemp = xTemp + "<div class='FieldBit'>Recipient:" + xItem.Person + "</div>"
        xTemp = xTemp + "<div class='FieldBit'>" + xDate + "</div>"
        xTemp = xTemp + "<div class='FieldBit' onclick=\"Admin.ViewMessage('" + xItem._id + "')\">View</div>"
        xTemp = xTemp + "<div class='FieldBit ClickBit' onclick=\"Admin.Delete('messages'," + xItem._id + "')\"><span class='fa fa-trash'></span></div>"
        xTemp = xTemp + "<div class='MessageContent' style=\"display:none;\" id=\"MessageContent_" + xItem._id + "\">" + xItem.Content + "</div>"

        xTemp = xTemp + "</div>"

        $("#MainContainer").append(xTemp)
    }

    var xItems;
    var xCategory;

    function GetData(xCat, Owner, xShow) {
        $("#MainContainer").empty();

        var rCat = xCat

        if (rCat == "categories") {
            rCat = "category"

        }


        if (Owner == undefined) {


            Owner = null;
        }

        if (xShow == undefined) {
            xShow = true;
        }

        $.getJSON("/GetData/?Cat=" + rCat + "&O=" + Owner, function (data) {

            if (xCat == "rewards") {
                ProcessRewards(data, xShow)
                SetHash("EditPages")

            }
            if (xCat == "pages") {
                ProcessPages(data, xShow)
                SetHash("EditPages")

            }

            if (xCat == "clients") {
                ProcessClients(data, xShow);
                SetHash("EditClients")

            }

            if (xCat == "modules") {
                ProcessModules(data, xShow);
                SetHash("EditModules")

            }

            if (xCat == "questions") {
                ProcessQuestions(data, xShow);
                SetHash("EditModules")

            }


            if (xCat == "tests") {
                ProcessTests(data, xShow)
                SetHash("EditTests")

            }


            if (xCat == "requests") {
                ProcessOrders(data, xShow)
                SetHash("EditRequests")
            }

            if (xCat == "users") {
                ProcessUsers(data, xShow)
                SetHash("EditUsers")

            }
            if (xCat == "categories") {
                xCategory = data;
                ProcessCats(data, xShow)
                SetHash("EditCategories")
            }
            if (xCat == "items") {
                xItems = data;
                ProcessItems(data, xShow)
                SetHash("EditItems")

            }
            if (xCat == "inventory") {
                ProcessInventory(data, xShow)
                SetHash("EditInventory")
            }
            if (xCat == "messages") {
                ProcessMessages(data, xShow)
                SetHash("EditMessages")
            }


        })

    }

    function GetOrders() {

        GetData("requests")

    }


    function GetTests() {
        GetData("rewards", null, false)

        GetData("clients", null, false)

        GetData("tests")


    }

    function GetQuestions() {
        GetData("clients", null, false)

        GetData("questions")


    }


    function GetModules() {

        GetData("clients", null, false)
        GetData("tests", null, false)
        GetData("rewards", null, false)

        setTimeout(function () {


            GetData("modules")


        }, 1000)
    }

    function GetUsers() {

        GetData("users")

    }

    function GetRewards() {

        GetData("rewards")

    }

    function GetClients() {

        GetData("clients")
    }

    function Categories() {
        GetData("categories")

    }

    function Items() {
        GetData("items")

    }

    function Inventory() {
        GetData("inventory")

    }

    function Messages() {
        GetData("messages")

    }

    function GetPages() {
        GetData("pages")

    }

    function Logout() {

        $.getJSON("/Logout/", function (data) {

            document.location = "index.html";

        })


    }


    function LoadPage(xPage) {

        if (xPage == "Users") {
            GetUsers();
        }
        if (xPage == "Rewards") {
            GetRewards();
            CurrentCat = "Reward";
        }


        if (xPage == "Modules") {
            GetModules();
            CurrentCat = "Module";

        }

        if (xPage == "Tests") {
            GetTests();
            CurrentCat = "Tests";

        }
        if (xPage == "Questions") {
            GetQuestions();
            CurrentCat = "Tests";

        }


        if (xPage == "Clients") {
            GetClients();
        }


        if (xPage == "Orders") {
            GetOrders();
        }


        if (xPage == "Categories") {
            Categories();
        }
        if (xPage == "Pages") {
            GetPages();
            CurrentCat = "Pages";
        }
        if (xPage == "Items") {
            Items();
        }
        if (xPage == "Inventory") {
            Inventory();
        }
        if (xPage == "Messages") {
            Messages();
        }
        if (xPage == "Logout") {
            Logout();
        }


    }

    var CurrentUser = null;


    function EditPage(xID) {
        var bb = 0;
        var xObject;

        SetHash("EditPage=" + xID)


        for (bb = 0; bb < Pages.length; bb++) {

            if (Pages[bb]._id == xID) {
                xObject = Pages[bb]
            }
        }
        var xdisabled = "";
        if (xObject.Name.indexOf("Email") != -1) {

            xdisabled = " disabled "

        }

        CurrentPage = xObject;

        var xOut = "<div class='AddItem'>" +
            "<div class='AddRow'><div class='AddLabel'>Name</div><div class='AddInput'><input " + xdisabled + " type='text' value='" + xObject.Name + "' id='Name'></div></div>" +
            "<div class='AddRow'><div class='AddLabel'>Desc</div><div class='AddInput'><textarea id='PageContent'>" + decodeURIComponent(xObject.Content) + "</textarea></div></div>" +
            "<div class='AddRow'><div class='AddLabel'>Category</div><div class='AddInput'><select id='Category'><option value=\"None\">None</option></select></div></div>" +
            "<div class='AddRow'><div class='AddLabel'></div><div class='AddInput'><input type='button' value=\"Save\"  onclick=\"Admin.SavePage();\"></div></div>" +
            "</div>";


        $("#MainContainer").html(xOut);
        CKEDITOR.replace('PageContent');

        GetCategories(xObject.Category)

    }

    var CurrentPage;

    function EditUser(xID) {
        SetHash("EditUser=" + xID)

        var bb = 0;
        var xObject;

        for (bb = 0; bb < Users.length; bb++) {

            if (Users[bb]._id == xID) {
                xObject = Users[bb]
            }
        }


        CurrentUser = xObject;

        var xOut = "<div class='AddItem'>" +
            "<div class='AddRow'><div class='AddLabel'>Active</div><div class='AddInput'>" + xObject.Active + "</div></div>" +
            "<div class='AddRow'><div class='AddLabel'>First Name</div><div class='AddInput'><input type='text' value='" + xObject.FirstName + "' id='FirstName'></div></div>" +
            "<div class='AddRow'><div class='AddLabel'>Last Name</div><div class='AddInput'><input type='text' value='" + xObject.LastName + "'  id='LastName'></div></div>" +
            "<div class='AddRow'><div class='AddLabel'>Company</div><div class='AddInput'><input type='text' value='" + xObject.Company + "'  id='Company'></div></div>" +
            "<div class='AddRow'><div class='AddLabel'>Address</div><div class='AddInput'><input type='text' value='" + xObject.Address + "'  id='Address'></div></div>" +
            "<div class='AddRow'><div class='AddLabel'>City</div><div class='AddInput'><input type='text' value='" + xObject.City + "'  id='City'></div></div>" +
            "<div class='AddRow'><div class='AddLabel'>State</div><div class='AddInput'>" + SelectStates('State', xObject.State) + "</div></div>" +
            "<div class='AddRow'><div class='AddLabel'>Zip</div><div class='AddInput'><input type='text' value='" + xObject.Zip + "'  id='Zip'></div></div>" +
            "<div class='AddRow'><div class='AddLabel'>Email</div><div class='AddInput'><input type='text' value='" + xObject.Email + "'  id='Email'></div></div>" +
            "<div class='AddRow'><div class='AddLabel'>Phone</div><div class='AddInput'><input type='text' value='" + xObject.Phone + "' id='Phone'></div></div>" +
            "<div class='AddRow'><div class='AddLabel'>Password</div><div class='AddInput'><input type='password' value='OldPassword'  id='Password'></div></div>" +
            "<div class='AddRow'><div class='AddLabel'>P & D</div><div class='AddInput'><textarea   id='PANDD'>" + xObject.PANDD + "</textarea></div></div>" +
            "<div class='AddRow'><div class='AddLabel'>Shipping</div><div class='AddInput'><textarea   id='Shipping'>" + xObject.Shipping + "</textarea></div></div>" +

            "<div id=\"map-canvas\"></div>" +
            "<div class='AddRow'><div class='AddLabel'></div><div class='AddInput'><input type='button' value=\"Save\"  onclick=\"Admin.SaveUser();\"></div></div>" +
            "</div>";


        $("#MainContainer").html(xOut);
        var xlat = xObject.geo.results[0].geometry.location.lat;
        var xlong = xObject.geo.results[0].geometry.location.lng;

        var map;
        map = new google.maps.Map(document.getElementById('map-canvas'), {
            zoom: 13,
            center: {lat: xlat, lng: xlong}
        });


        var myLatlng = new google.maps.LatLng(xlat, xlong);

        var marker = new google.maps.Marker({
            position: myLatlng,
            map: map
        });
    }


    function EditReward(xID) {

        SetHash("EditReward=" + xID)

        var bb = 0;
        var xObject;

        for (bb = 0; bb < Rewards.length; bb++) {

            if (Rewards[bb]._id == xID) {
                xObject = Rewards[bb]
            }
        }


        CurrentItem = xObject;


        var xOut = "<div class='AddItem'>" +
            "<div class='AddRow'><div class='AddLabel'>Title:</div><div class='AddInput'><input type='text' id='Title'></div></div>" +
            "<div class='AddRow'><div class='AddLabel'>Owner:</div><div class='AddInput'><select name='Owner' id='Owner'></select></div></div>" +

            "<div class='AddRow'><div class='AddLabel'>Category:</div><div class='AddInput'><input type='text' id='Category'></div></div>" +
            "<div class='AddRow'><div class='AddLabel'>Description:</div><div class='AddInput'><textarea id='Description'></textarea></div></div>" +
            "<div class='AddRow'><div class='AddLabel'>Reward Type:</div><div class='AddInput'><select name='RewardType' id='RewardType'><option value='Badge'>Badge</option><option value='File'>File/URL</option><option value='Video'>Video</option></select></div></div>" +
            "<div class='AddRow'><div class='AddLabel'>Value(URL):</div><div class='AddInput'><input type='text' id='RewardValue'></div></div>" +
            "<div class='AddRow'><div class='AddLabel'>Photo</div><div id='PhotoPlaceHolder'  style=\"background-image:url(" + xObject.Photo + ");\"></div><BR><div ><input  type='file' id='Input_File' name='Input_File'></div></div>" +


            "<div class='AddRow'><div class='AddLabel'></div><div class='AddInput'><input type='button' value=\"Save\"  onclick=\"Admin.SaveReward();\"></div></div>" +
            "</div>";


        $("#MainContainer").html(xOut);

        $("#Title").val(CurrentItem.Title);
        $("#Owner").val(CurrentItem.Owner);
        $("#Category").val(CurrentItem.Category);
        $("#Description").val(CurrentItem.Desc);
        $("#RewardType").val(CurrentItem.xType);
        $("#RewardValue").val(CurrentItem.Value);


        CurrentCat = "Reward"

        $("#Owner").append("<option value='none'>None</option>")


        var dd = "";
        for (dd = 0; dd < Clients.length; dd++) {
            $("#Owner").append("<option value='" + Clients[dd]._id + "'>" + Clients[dd].Company + "</option>");
        }


        $("#PhotoPlaceHolder").on("click", function () {

            $("#Input_File").click();

        })

        $("#Input_File").on("change", FileChange)


    }


    function EditClient(xID) {
        SetHash("EditUser=" + xID)

        var bb = 0;
        var xObject;

        for (bb = 0; bb < Users.length; bb++) {

            if (Users[bb]._id == xID) {
                xObject = Users[bb]
            }
        }


        CurrentUser = xObject;

        var xOut = "<div class='AddItem'>" +
            "<div class='AddRow'><div class='AddLabel'>Active</div><div class='AddInput'>" + xObject.Active + "</div></div>" +
            "<div class='AddRow'><div class='AddLabel'>First Name</div><div class='AddInput'><input type='text' value='" + xObject.FirstName + "' id='FirstName'></div></div>" +
            "<div class='AddRow'><div class='AddLabel'>Last Name</div><div class='AddInput'><input type='text' value='" + xObject.LastName + "'  id='LastName'></div></div>" +
            "<div class='AddRow'><div class='AddLabel'>Company</div><div class='AddInput'><input type='text' value='" + xObject.Company + "'  id='Company'></div></div>" +
            "<div class='AddRow'><div class='AddLabel'>Address</div><div class='AddInput'><input type='text' value='" + xObject.Address + "'  id='Address'></div></div>" +
            "<div class='AddRow'><div class='AddLabel'>City</div><div class='AddInput'><input type='text' value='" + xObject.City + "'  id='City'></div></div>" +
            "<div class='AddRow'><div class='AddLabel'>State</div><div class='AddInput'>" + SelectStates('State', xObject.State) + "</div></div>" +
            "<div class='AddRow'><div class='AddLabel'>Zip</div><div class='AddInput'><input type='text' value='" + xObject.Zip + "'  id='Zip'></div></div>" +
            "<div class='AddRow'><div class='AddLabel'>Email</div><div class='AddInput'><input type='text' value='" + xObject.Email + "'  id='Email'></div></div>" +
            "<div class='AddRow'><div class='AddLabel'>Phone</div><div class='AddInput'><input type='text' value='" + xObject.Phone + "' id='Phone'></div></div>" +
            "<div class='AddRow'><div class='AddLabel'>Password</div><div class='AddInput'><input type='password' value='OldPassword'  id='Password'></div></div>" +
            "<div id=\"map-canvas\"></div>" +
            "<div class='AddRow'><div class='AddLabel'></div><div class='AddInput'><input type='button' value=\"Save\"  onclick=\"Admin.SaveClient();\"></div></div>" +
            "</div>";


        $("#MainContainer").html(xOut);
        var xlat = xObject.geo.results[0].geometry.location.lat;
        var xlong = xObject.geo.results[0].geometry.location.lng;

        var map;
        map = new google.maps.Map(document.getElementById('map-canvas'), {
            zoom: 13,
            center: {lat: xlat, lng: xlong}
        });


        var myLatlng = new google.maps.LatLng(xlat, xlong);

        var marker = new google.maps.Marker({
            position: myLatlng,
            map: map
        });
    }


    function EditOrder(xID) {
        SetHash("EditOrder=" + xID)


        $.getJSON("/GetData/?Cat=users", function (data) {
            Users = data;
            $.getJSON("/GetData/?Cat=inventory", function (data) {
                xInventory = data;

                EditOrder2(xID);
            })
        })


    }


    function SelectBox(xObject) {


        var xout = "<select id=\"Amount_" + xObject._id + "\"   onchange=\"Admin.SelectChange(this,'" + xObject._id + "')\">";

        var bb;

        for (bb = 1; bb < 25; bb++) {


            if (xObject.Amount == bb) {
                xout = xout + "<option value='" + bb + "' selected>" + bb + "</option>";

            } else {
                xout = xout + "<option value='" + bb + "'>" + bb + "</option>";
            }


        }
        for (bb = 1; bb < 56; bb++) {


            if (xObject.Amount == 25 + (bb * 5)) {
                xout = xout + "<option selected value='" + (25 + (bb * 5)) + "'>" + (25 + (bb * 5)) + "</option>"

            } else {
                xout = xout + "<option value='" + (25 + (bb * 5)) + "'>" + (25 + (bb * 5)) + "</option>"
            }


        }

        xout = xout + "</select>";

        return xout

    }


    var CurrentOrder;

    function EditOrder2(xID) {

        SetHash("EditOrder2=" + xID)

        var bb = 0;
        var xObject;

        for (bb = 0; bb < Orders.length; bb++) {

            if (Orders[bb]._id == xID) {
                xObject = Orders[bb]
            }
        }


        CurrentOrder = xObject;

        var xOut = "<div class='AddItem'>" +
            "<div class='AddRow'><div class='AddLabel'>First Name</div><div class='AddInput'><input type='text' value='" + xObject.FirstName + "' id='FirstName'></div></div>" +
            "<div class='AddRow'><div class='AddLabel'>Last Name</div><div class='AddInput'><input type='text' value='" + xObject.LastName + "'  id='LastName'></div></div>" +
            "<div class='AddRow'><div class='AddLabel'>Company</div><div class='AddInput'><input type='text' value='" + xObject.Company + "'  id='Company'></div></div>" +
            "<div class='AddRow'><div class='AddLabel'>Address</div><div class='AddInput'><input type='text' value='" + xObject.Address + "'  id='Address'></div></div>" +
            "<div class='AddRow'><div class='AddLabel'>Address2</div><div class='AddInput'><input type='text' value='" + xObject.Address2 + "'  id='Address2'></div></div>" +
            "<div class='AddRow'><div class='AddLabel'>City</div><div class='AddInput'><input type='text' value='" + xObject.City + "'  id='City'></div></div>" +
            "<div class='AddRow'><div class='AddLabel'>State</div><div class='AddInput'>" + SelectStates('State', xObject.State) + "</div></div>" +
            "<div class='AddRow'><div class='AddLabel'>Zip</div><div class='AddInput'><input type='text' value='" + xObject.Zip + "'  id='Zip'></div></div>" +

            "<div class='AddRow'><div class='AddLabel'>Email</div><div class='AddInput'><input type='text' value='" + xObject.Email + "'  id='Email'></div></div>" +
            "<div class='AddRow'><div class='AddLabel'>Phone</div><div class='AddInput'><input type='text' value='" + xObject.Phone + "' id='Phone'></div></div>" +
            "<div class='AddRow'><div class='AddLabel'>Event Date</div><div class='AddInput'><input type='text'  value='" + xObject.VenueDate + "' id='EventDate'></div></div>" +
//            "<div id=\"map-canvas\"></div>"+

            "<div class='AddRow'><div class='AddLabel'>Estimated Cost</div><div class='AddInput'><input type='text' value='" + xObject.EstimatedCost + "'  id='EstimatedCost'></div></div>" +
            "<div class='AddRow'><div class='AddLabel'>Vendor</div><div class='AddInput'>" + VendorList(xObject.Vendor) + "</div></div>" +
            "<div class='AddRow'><div class='AddLabel'>Vendor Cost</div><div class='AddInput'><input type='text'   value='" + xObject.VendorCost + "'  id='VendorCost'></div></div>" +
            "<div class='AddRow'><div class='AddLabel'>Billed Amount</div><div class='AddInput'><input type='text'  value='" + xObject.ActualCost + "'  id='ActualCost'></div></div>" +
            "<div class='AddRow'><div class='AddLabel'>Alert</div><div class='AddInput' id=\"AlertBox\"></div></div>" +

            "<div id=\"CartContainer\"></div>" +

            "<div id=\"xLink\"><a target=\"_blank\" href=\"http://www.party-butler.com/billing.html?ID=" + xObject._id + "\"> Billing Link</a></div>" +

            "<div class='AddRow'><div class='AddLabel'></div><div class='AddInput'><input type='button' value=\"Save\"  onclick=\"Admin.SaveEvent();\">"


        if (xObject.Status != "Accepted") {
            xOut = xOut + "<input type='button' value=\"Assign Vendor\"  onclick=\"Admin.AssignEvent();\"></div></div>"
        } else {
            xOut = xOut + "<input type='button' value=\"Bill Customer\"  onclick=\"Admin.BillCustomer();\"></div></div>"

        }
        xOut = xOut + "</div>";


        $("#MainContainer").html(xOut);
        $("#VendorList").change(VendorEstimate);

        //CartITems

        RenderCart();
        VendorEstimate();


        return;
        var xlat = xObject.geo.results[0].geometry.location.lat;
        var xlong = xObject.geo.results[0].geometry.location.lng;

        var map;
        map = new google.maps.Map(document.getElementById('map-canvas'), {
            zoom: 13,
            center: {lat: xlat, lng: xlong}
        });

        google.maps.event.addDomListener(window, 'load', initialize);

        var myLatlng = new google.maps.LatLng(xlat, xlong);

        var marker = new google.maps.Marker({
            position: myLatlng,
            map: map
        });


    }


    function RenderCart() {


        var xCart = CurrentOrder.Cart;

        var xOut = "";
        var dd = 0;
        for (dd = 0; dd < xCart.length; dd++) {

            xOut = xOut + "<div class='CartItem'>" +
                "<div class='CartTitle'>" + xCart[dd].Name + "</div>" +
                "<div class='CartAmount'>" + SelectBox(xCart[dd]) + "</div>" +
                "<div class='CartFrom'><span class='redtext'>$" + parseFloat(ObjectCost(xCart[dd]._id) * xCart[dd].Amount).toFixed(2) + "</span>/$" + parseFloat(xCart[dd].MinCost * xCart[dd].Amount).toFixed(2) + "(min)</div>" +
                "<div class='CartRemove' onclick=\"Admin.RemoveFromCart('" + xCart[dd]._id + "')\"><span class='fa fa-remove'></span></div>" +
                "</div>"
//            EstimatedCost=EstimatedCost+(xCart[dd].MinCost*xCart[dd].Amount);

        }

        $("#CartContainer").html(xOut);

    }


    function RemoveFromCart(xID) {

        var newCart = [];
        var xCart = CurrentOrder.Cart;

        var dd = 0;
        for (dd = 0; dd < xCart.length; dd++) {

            if (xCart[dd]._id == xID) {
            } else {

                newCart.push(xCart[dd]);
            }

        }


        CurrentOrder.Cart = newCart;
        alert("Item Removed From Cart.")
        RenderCart();
        VendorEstimate()
    }


    function VendorList(xid) {

        ///List off all vendors
        var bb = 0;
        var xout = "<select id=\"VendorList\">";
        for (bb = 0; bb < Users.length; bb++) {

            if (xid == Users[bb]._id) {
                xout = xout + "<option selected value=\"" + Users[bb]._id + "\">" + Users[bb].Company + "," + Users[bb].City + "," + Users[bb].State + "</option>"
            } else {
                xout = xout + "<option value=\"" + Users[bb]._id + "\">" + Users[bb].Company + "," + Users[bb].City + "," + Users[bb].State + "</option>"

            }
        }


        return xout + "</select>";

    }


    var FoundFault = false;

    function VendorEstimate() {
        FoundFault = false;
        var xid = $("#VendorList").val();

        var xvalue = 0;
        var bb = 0;

        for (bb = 0; bb < CurrentOrder.Cart.length; bb++) {
            var xAm = ObjectCost(CurrentOrder.Cart[bb]._id);
            var xR = CurrentOrder.Cart[bb].Amount;

            xvalue = parseFloat(xvalue) + parseFloat(xAm * xR);


        }

        if (FoundFault != false) {

            $("#AlertBox").html("The Vendor cannot fulfill the order in total")

        } else {
            $("#AlertBox").html("")

        }

        $("#VendorCost").val(xvalue.toFixed(2))
        $("#ActualCost").val(parseFloat(xvalue * 1.2).toFixed(2))

    }


    function ObjectCost(xID) {

        var bb = 0;
        for (bb = 0; bb < xInventory.length; bb++) {

            if (xInventory[bb].Owner == $("#VendorList").val()) {

                if (xInventory[bb][xID]) {

                    return xInventory[bb][xID]
                }


            }

        }
        FoundFault = true;
        return 0;

    }

    var CurrentCategoryx;

    function EditCat(xID) {
        $("#MainContainer").empty();
        SetHash("EditCat=" + xID)

        var bb = 0;
        var xObject;

        for (bb = 0; bb < xCategory.length; bb++) {

            if (xCategory[bb]._id == xID) {
                xObject = xCategory[bb]
            }
        }


        CurrentCategoryx = xObject;
        LastPhoto = xObject.Photo;

        var xOut = "<div class='AddItem'>" +
            "<div class='AddRow'><div class='AddLabel'>Name</div><div class='AddInput'><input type='text' id='Name' value=\"" + xObject.Name + "\"></div></div>" +
            "<div class='AddRow'><div class='AddLabel'>Desc</div><div class='AddInput'><textarea id='Desc'>" + xObject.Desc + "</textarea></div></div>" +
            "<div class='AddRow'><div class='AddLabel'>Photo</div><div id='PhotoPlaceHolder'  style=\"background-image:url(" + xObject.Photo + ");\"></div><BR><div ><input  type='file' id='Input_File' name='Input_File'></div></div>" +
            "<div class='AddRow'><div class='AddLabel'></div><div class='AddInput'><input type='button' value=\"Save\"  onclick=\"Admin.SaveCat();\"></div></div>" +
            "</div>";
        $("#MainContainer").append(xOut);


        $("#PhotoPlaceHolder").on("click", function () {

            $("#Input_File").click();

        })

        $("#Input_File").on("change", FileChange)


        CurrentCat = "Item"


    }

    var CurrentItem


    var usStates = [
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


    function SelectStates(xID, xValue) {

        var bb = 0;
        var xout = "<select id=\"" + xID + "\">";
        for (bb = 0; bb < usStates.length; bb++) {

            xout = xout + "<option value=\"" + usStates[bb].abbreviation + "\">" + usStates[bb].name + "</option>"


        }


        return xout + "</select>";

    }

    function EditItem(xID) {

        $("#MainContainer").empty();
        var bb = 0;
        var xObject;
        SetHash("EditItem=" + xID)


        for (bb = 0; bb < xItems.length; bb++) {

            if (xItems[bb]._id == xID) {
                xObject = xItems[bb]
            }
        }


        CurrentItem = xObject;
        LastPhoto = xObject.Photo;

        var xOut = "<div class='AddItem'>" +
            "<div class='AddRow'><div class='AddLabel'>Name</div><div class='AddInput'><input type='text' id='Name' value='" + xObject.Name + "'></div></div>" +
            "<div class='AddRow'><div class='AddLabel'>Desc</div><div class='AddInput'><textarea id='Desc'>" + xObject.Desc + "</textarea></div></div>" +
            "<div class='AddRow'><div class='AddLabel'>Long Desc</div><div class='AddInput'><textarea id='LongDesc'>" + xObject.LongDesc + "</textarea></div></div>" +
            "<div class='AddRow'><div class='AddLabel'>Min Cost</div><div class='AddInput'><input id='MinCost' value='" + xObject.MinCost + "'></div></div>" +
            "<div class='AddRow'><div class='AddLabel'>Photo</div><div id='PhotoPlaceHolder' style=\"background-image:url(" + xObject.Photo + ");\"></div><BR><div ><input  type='file' id='Input_File' name='Input_File'></div></div>" +
            "<div class='AddRow'><div class='AddLabel'></div><div class='AddInput'><input type='button' value=\"Save\"  onclick=\"Admin.SaveItem();\"></div></div>" +
            "</div>";
        $("#MainContainer").append(xOut);

        $("#PhotoPlaceHolder").on("click", function () {

            $("#Input_File").click();

        })

        $("#Input_File").on("change", FileChange)
    }


    function EditModule(xID) {

        $("#MainContainer").empty();
        var bb = 0;
        var xObject;
        SetHash("EditItem=" + xID)


        for (bb = 0; bb < Modules.length; bb++) {

            if (Modules[bb]._id == xID) {
                xObject = Modules[bb]
            }
        }


        CurrentItem = xObject;
        LastPhoto = xObject.Photo;

        var xOut = "<div class='AddItem'>" +
            "<div class='AddRow'><div class='AddLabel'>Title</div><div class='AddInput'><input type='text' id='Title' value='" + xObject.Title + "'></div></div>" +
            "<div class='AddRow'><div class='AddLabel'>Desc</div><div class='AddInput'><textarea id='Description'>" + xObject.Desc + "</textarea></div></div>" +
            "<div class='AddRow'><div class='AddLabel'>Owner:</div><div class='AddInput'><select name='Owner' id='Owner'></select></div></div>" +
            "<div class='AddRow'><div class='AddLabel'>Reward:</div><div class='AddInput'><select name='Reward' id='Reward'></select></div></div>" +
            "<div class='AddRow'><div class='AddLabel'>Sequential Unlocking:</div><div class='AddInput'><input type='radio' id='Seq_Unlock' value='false' checked name='Seq_Unlock'>false<input type='radio' id='Seq_Unlock' value='true'  name='Seq_Unlock'>true</div></div>" +

            "<div class='AddRow'><div class='AddLabel'>Category</div><div class='AddInput'><input type='text' id='Category' value='" + xObject.Category + "'></div></div>" +
            "<div class='AddRow'><div class='AddLabel'>Photo</div><div id='PhotoPlaceHolder' style=\"background-image:url(" + xObject.Photo + ");\"></div><BR><div ><input  type='file' id='Input_File' name='Input_File'></div></div>" +
            "<div class='AddRow'><div class='AddLabel'></div><div class='AddInput'><input type='button' value=\"Save\"  onclick=\"Admin.UpdateModule();\"></div></div>" +
            "</div>";
        $("#MainContainer").append(xOut);


        $("#Reward").append("<option value='none'>None</option>")


        var dd = "";
        for (dd = 0; dd < Rewards.length; dd++) {
            $("#Reward").append("<option value='" + Rewards[dd]._id + "'>" + Rewards[dd].Title + "</option>");
        }
        $("#Reward").val(xObject.Reward)

        $("#Seq_Unlock").val();

        $("input[id=Seq_Unlock][value=" + xObject.Seq_Unlock + "]").attr('checked', 'checked');

        $("#Owner").append("<option value='none'>None</option>")
        var dd = "";
        for (dd = 0; dd < Clients.length; dd++) {
            if (CurrentItem.Owner == Clients[dd]._id) {
                $("#Owner").append("<option value='" + Clients[dd]._id + "' selected>" + Clients[dd].Company + "</option>");
            } else {
                $("#Owner").append("<option value='" + Clients[dd]._id + "'>" + Clients[dd].Company + "</option>");

            }
        }


        $("#PhotoPlaceHolder").on("click", function () {

            $("#Input_File").click();

        })
        $("#Input_File").on("change", FileChange)


    }


    function EditTest(xID) {

        $("#MainContainer").empty();
        var bb = 0;
        var xObject;
        SetHash("EditItem=" + xID)


        for (bb = 0; bb < Tests.length; bb++) {

            if (Tests[bb]._id == xID) {
                xObject = Tests[bb]
            }
        }


        CurrentItem = xObject;
        LastPhoto = xObject.Photo;

        var xOut = "<div class='AddItem'>" +
            "<div class='AddRow'><div class='AddLabel'>Title</div><div class='AddInput'><input type='text' id='Title' value='" + xObject.Title + "'></div></div>" +
            "<div class='AddRow'><div class='AddLabel'>Desc</div><div class='AddInput'><textarea id='Description'>" + xObject.Desc + "</textarea></div></div>" +
            "<div class='AddRow'><div class='AddLabel'>Owner:</div><div class='AddInput'><select name='Owner' id='Owner'></select></div></div>" +
            "<div class='AddRow'><div class='AddLabel'>Reward:</div><div class='AddInput'><select name='Reward' id='Reward'></select></div></div>" +
            "<div class='AddRow'><div class='AddLabel'>Sequential Unlocking:</div><div class='AddInput'><input type='radio' id='Seq_Unlock' value='false' checked name='Seq_Unlock'>false<input type='radio' id='Seq_Unlock' value='true'  name='Seq_Unlock'>true</div></div>" +


            "<div class='AddRow'><div class='AddLabel'>Photo</div><div id='PhotoPlaceHolder' style=\"background-image:url(" + xObject.Photo + ");\"></div><BR><div ><input  type='file' id='Input_File' name='Input_File'></div></div>" +
            "<div class='AddRow'><div class='AddLabel'></div><div class='AddInput'><input type='button' value=\"Save\"  onclick=\"Admin.UpdateTest();\"></div></div>" +
            "</div>";


        $("#MainContainer").append(xOut);

        $("#Reward").append("<option value='none'>None</option>")


        var dd = "";
        for (dd = 0; dd < Rewards.length; dd++) {
            $("#Reward").append("<option value='" + Rewards[dd]._id + "'>" + Rewards[dd].Title + "</option>");
        }

        $("#Reward").val(xObject.Reward)


        $("#Seq_Unlock").val(xObject.Seq_Unlock);
        $("input[id=Seq_Unlock][value=" + xObject.Seq_Unlock + "]").attr('checked', 'checked');


        $("#Owner").append("<option value='none'>None</option>")
        var dd = "";
        for (dd = 0; dd < Clients.length; dd++) {
            if (CurrentItem.Owner == Clients[dd]._id) {
                $("#Owner").append("<option value='" + Clients[dd]._id + "' selected>" + Clients[dd].Company + "</option>");
            } else {
                $("#Owner").append("<option value='" + Clients[dd]._id + "'>" + Clients[dd].Company + "</option>");

            }
        }


        $("#Input_File").on("change", FileChange)


        $("#PhotoPlaceHolder").on("click", function () {

            $("#Input_File").click();

        })


    }

    function EditQuestion(xID) {

        $("#MainContainer").empty();
        var bb = 0;
        var xObject;
        SetHash("EditItem=" + xID)


        for (bb = 0; bb < Tests.length; bb++) {

            if (Tests[bb]._id == xID) {
                xObject = Tests[bb]
            }
        }


        CurrentItem = xObject;
        LastPhoto = xObject.Photo;



        var xOut = "<div class='AddItem'>" +
            "<div class='AddRow'><div class='AddLabel'>Title:</div><div class='AddInput'><input type='text' id='Title'></div></div>" +
            "<div class='AddRow'><div class='AddLabel'>Owner:</div><div class='AddInput'><select name='Owner' id='Owner'></select></div></div>" +
            "<div class='AddRow'><div class='AddLabel'>Description:</div><div class='AddInput'><textarea id='Description'></textarea></div></div>" +
            "<div class='AddRow'><div class='AddLabel'>Question Media Type:</div><div class='AddInput'><select name='QuestionMediaType' id='QuestionMediaType'><option value='Text'>Text</option><option value='Video'>Video</option><option value='Photo'>Photo</option></select></div></div>" +
            "<div class='AddRow' id='VideoRow' style='display:none;' ><div class='AddLabel'  >Video(URL):</div><div class='AddInput'><input type='text' id='QuestionValue'></div></div>" +
            "<div class='AddRow'  id='PhotoRow' style='display:none;'><div class='AddLabel' >Photo</div><div id='PhotoPlaceHolder'></div><BR><div ><input  type='file' id='Input_File' name='Input_File'></div></div>" +
            "<div class='AddRow'><div class='AddLabel'>Question Type:</div><div class='AddInput'><select name='QuestionType' id='QuestionType'><option value='TrueFalse'>True|False</option><option value='MultipleChoice'>Multiple Choice</option><option value='MultipleAnswer'>Multiple Answer</option></select></div></div>" +


            "<div class='AddRow' id='Answer_Row_1'><div class='AddLabel'>Answer 1:</div><div class='AddInput'><input value='true' type='text' id='Answer_1'><input type='checkbox' id='Answer_1_Correct'</div></div></div>" +
            "<div class='AddRow' id='Answer_Row_2'><div class='AddLabel'>Answer 2:</div><div class='AddInput'><input value='false' type='text' id='Answer_2'><input type='checkbox' id='Answer_2_Correct'</div></div></div>" +
            "<div class='AddRow' id='Answer_Row_3' style='display:none;'><div class='AddLabel'>Answer 3:</div><div class='AddInput'><input type='text' id='Answer_3'><input type='checkbox' id='Answer_3_Correct'</div></div></div>" +
            "<div class='AddRow' id='Answer_Row_4' style='display:none;'><div class='AddLabel'>Answer 4:</div><div class='AddInput'><input type='text' id='Answer_4'><input type='checkbox' id='Answer_4_Correct'</div></div></div>" +
            "<div class='AddRow' id='Answer_Row_5' style='display:none;'><div class='AddLabel'>Answer 5:</div><div class='AddInput'><input type='text' id='Answer_5'><input type='checkbox' id='Answer_5_Correct'</div></div></div>" +
            "<div class='AddRow' id='Answer_Row_6' style='display:none;'><div class='AddLabel'>Answer 6:</div><div class='AddInput'><input type='text' id='Answer_6'><input type='checkbox' id='Answer_6_Correct'</div></div></div>" +


            "<div class='AddRow'><div class='AddLabel'></div><div class='AddInput'><input type='button' value=\"Save\"  onclick=\"Admin.SaveObject();\"></div></div>" +
            "</div>";

        $("#MainContainer").append(xOut);

        CurrentCat = "Reward"

        $("#Owner").append("<option value='none'>None</option>")




        var dd = "";
        for (dd = 0; dd < Clients.length; dd++) {
            $("#Owner").append("<option value='" + Clients[dd]._id + "'>" + Clients[dd].Company + "</option>");
        }


        $("#PhotoPlaceHolder").on("click", function () {

            $("#Input_File").click();

        })

        $("#Input_File").on("change", FileChange)


        $("#QuestionMediaType").on("change", function () {
            var xval = $("#QuestionMediaType").val();
            if (xval == "Text") {
                $("#PhotoRow").hide();
                $("#VideoRow").hide();

            }
            if (xval == "Video") {
                $("#PhotoRow").hide();
                $("#VideoRow").show();

            }
            if (xval == "Photo") {
                $("#PhotoRow").show();
                $("#VideoRow").hide();

            }


        })

        $("#QuestionType").on("change", function () {
            var xval = $("#QuestionType").val();
            if (xval == "TrueFalse") {
                $("#Answer_Row_3").hide();
                $("#Answer_Row_4").hide();
                $("#Answer_Row_5").hide();
                $("#Answer_Row_6").hide();
                $("#Answer_1").prop("disabled", true).val("true")
                $("#Answer_2").prop("disabled", true).val("true")

            }
            if (xval == "MultipleChoice") {
                $("#Answer_Row_3").show();
                $("#Answer_Row_4").show();
                $("#Answer_Row_5").show();
                $("#Answer_Row_6").show();
                $("#Answer_1").prop("disabled", false).val("")
                $("#Answer_2").prop("disabled", false).val("")

            }
            if (xval == "MultipleAnswer") {
                $("#Answer_Row_3").show();
                $("#Answer_Row_4").show();
                $("#Answer_Row_5").show();
                $("#Answer_Row_6").show();
                $("#Answer_1").prop("disabled", false).val("")
                $("#Answer_2").prop("disabled", false).val("")


            }


        })

        $("#Answer_1_Correct,#Answer_2_Correct,#Answer_3_Correct,#Answer_4_Correct,#Answer_5_Correct,#Answer_6_Correct").click(function () {
            var xval = $("#QuestionType").val();
            if (xval == "TrueFalse" || xval == "MultipleChoice") {
                $("#Answer_1_Correct,#Answer_2_Correct,#Answer_3_Correct,#Answer_4_Correct,#Answer_5_Correct,#Answer_6_Correct").prop("checked", false)
                $(this).prop("checked", true);
            }

        });

    }


    function randomString(length, chars) {
        var result = '';
        for (var i = length; i > 0; --i) result += chars[Math.round(Math.random() * (chars.length - 1))];
        return result;
    }

    function AddItem(xType) {

        $("#MainContainer").empty();


        if (xType == "User") {
            var RandPass = randomString(8, '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ');
            SetHash("AddUser")


            var xOut = "<div class='AddItem'>" +
                "<div class='AddRow'><div class='AddLabel'>First Name</div><div class='AddInput'><input type='text' id='FirstName'></div></div>" +
                "<div class='AddRow'><div class='AddLabel'>Last Name</div><div class='AddInput'><input type='text' id='LastName'></div></div>" +
                "<div class='AddRow'><div class='AddLabel'>Company</div><div class='AddInput'><input type='text' id='Company'></div></div>" +
                "<div class='AddRow'><div class='AddLabel'>Address</div><div class='AddInput'><input type='text' id='Address'></div></div>" +
                "<div class='AddRow'><div class='AddLabel'>City</div><div class='AddInput'><input type='text' id='City'></div></div>" +
                "<div class='AddRow'><div class='AddLabel'>State</div><div class='AddInput'>" + SelectStates('State', "") + "</div></div>" +
                "<div class='AddRow'><div class='AddLabel'>Zip</div><div class='AddInput'><input type='text' id='Zip'></div></div>" +
                "<div class='AddRow'><div class='AddLabel'>Email</div><div class='AddInput'><input type='text' id='Email'></div></div>" +
                "<div class='AddRow'><div class='AddLabel'>Phone</div><div class='AddInput'><input type='text' id='Phone'></div></div>" +
                "<div class='AddRow'><div class='AddLabel'>Password</div><div class='AddInput'><input type='password'  id='Password' value='" + RandPass + "'></div></div>" +
                "<div class='AddRow'><div class='AddLabel'>P & D</div><div class='AddInput'><textarea   id='PANDD'></textarea></div></div>" +
                "<div class='AddRow'><div class='AddLabel'>Shipping</div><div class='AddInput'><textarea   id='Shipping'></textarea></div></div>" +

                "<div class='AddRow'><div class='AddLabel'></div><div class='AddInput'><input type='button' value=\"Save\"  onclick=\"Admin.SaveObject();\"></div></div>" +
                "</div>";

            $("#MainContainer").append(xOut);

            CurrentCat = "User"

        }


        if (xType == "Module") {
            var RandPass = randomString(8, '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ');
            SetHash("AddUser")


            var xOut = "<div class='AddItem'>" +
                "<div class='AddRow'><div class='AddLabel'>Title:</div><div class='AddInput'><input type='text' id='Title'></div></div>" +
                "<div class='AddRow'><div class='AddLabel'>Owner:</div><div class='AddInput'><select name='Owner' id='Owner'></select></div></div>" +
                "<div class='AddRow'><div class='AddLabel'>Reward:</div><div class='AddInput'><select name='Reward' id='Reward'></select></div></div>" +

                "<div class='AddRow'><div class='AddLabel'>Category:</div><div class='AddInput'><input type='text' id='Category'></div></div>" +
                "<div class='AddRow'><div class='AddLabel'>Description:</div><div class='AddInput'><textarea id='Description'></textarea></div></div>" +
                "<div class='AddRow'><div class='AddLabel'>Sequential Unlocking:</div><div class='AddInput'><input type='radio' id='Seq_Unlock' value='false' checked name='Seq_Unlock'>false<input type='radio' id='Seq_Unlock' value='true'  name='Seq_Unlock'>true</div></div>" +

                "<div class='AddRow'><div class='AddLabel'>Photo</div><div id='PhotoPlaceHolder'></div><BR><div ><input  type='file' id='Input_File' name='Input_File'></div></div>" +

                "<div class='AddRow'><div class='AddLabel'></div><div class='AddInput'><input type='button' value=\"Save\"  onclick=\"Admin.SaveObject();\"></div></div>" +

                "</div>";

            $("#MainContainer").append(xOut);

            CurrentCat = "Module"

            $("#Owner").append("<option value='none'>None</option>")


            var dd = "";
            for (dd = 0; dd < Clients.length; dd++) {
                $("#Owner").append("<option value='" + Clients[dd]._id + "'>" + Clients[dd].Company + "</option>");
            }

            $("#Reward").append("<option value='none'>None</option>")


            var dd = "";
            for (dd = 0; dd < Rewards.length; dd++) {
                $("#Reward").append("<option value='" + Rewards[dd]._id + "'>" + Rewards[dd].Title + "</option>");
            }


            $("#PhotoPlaceHolder").on("click", function () {

                $("#Input_File").click();

            })

            $("#Input_File").on("change", FileChange)


        }

        if (xType == "Reward") {
            SetHash("AddReward")


            var xOut = "<div class='AddItem'>" +
                "<div class='AddRow'><div class='AddLabel'>Title:</div><div class='AddInput'><input type='text' id='Title'></div></div>" +
                "<div class='AddRow'><div class='AddLabel'>Owner:</div><div class='AddInput'><select name='Owner' id='Owner'></select></div></div>" +

                "<div class='AddRow'><div class='AddLabel'>Description:</div><div class='AddInput'><textarea id='Description'></textarea></div></div>" +
                "<div class='AddRow'><div class='AddLabel'>Reward Type:</div><div class='AddInput'><select name='RewardType' id='RewardType'><option value='Badge'>Badge</option><option value='File'>File/URL</option><option value='Video'>Video</option></select></div></div>" +
                "<div class='AddRow'><div class='AddLabel'>Value(URL):</div><div class='AddInput'><input type='text' id='RewardValue'></div></div>" +

                "<div class='AddRow'><div class='AddLabel'>Photo</div><div id='PhotoPlaceHolder'></div><BR><div ><input  type='file' id='Input_File' name='Input_File'></div></div>" +


                "<div class='AddRow'><div class='AddLabel'></div><div class='AddInput'><input type='button' value=\"Save\"  onclick=\"Admin.SaveObject();\"></div></div>" +
                "</div>";

            $("#MainContainer").append(xOut);

            CurrentCat = "Reward"

            $("#Owner").append("<option value='none'>None</option>")


            var dd = "";
            for (dd = 0; dd < Clients.length; dd++) {
                $("#Owner").append("<option value='" + Clients[dd]._id + "'>" + Clients[dd].Company + "</option>");
            }


            $("#PhotoPlaceHolder").on("click", function () {

                $("#Input_File").click();

            })

            $("#Input_File").on("change", FileChange)


        }


        if (xType == "Question") {
            SetHash("AddQuestion")


            var xOut = "<div class='AddItem'>" +
                "<div class='AddRow'><div class='AddLabel'>Title:</div><div class='AddInput'><input type='text' id='Title'></div></div>" +
                "<div class='AddRow'><div class='AddLabel'>Owner:</div><div class='AddInput'><select name='Owner' id='Owner'></select></div></div>" +
                "<div class='AddRow'><div class='AddLabel'>Description:</div><div class='AddInput'><textarea id='Description'></textarea></div></div>" +
                "<div class='AddRow'><div class='AddLabel'>Question Media Type:</div><div class='AddInput'><select name='QuestionMediaType' id='QuestionMediaType'><option value='Text'>Text</option><option value='Video'>Video</option><option value='Photo'>Photo</option></select></div></div>" +
                "<div class='AddRow' id='VideoRow' style='display:none;' ><div class='AddLabel'  >Video(URL):</div><div class='AddInput'><input type='text' id='QuestionValue'></div></div>" +
                "<div class='AddRow'  id='PhotoRow' style='display:none;'><div class='AddLabel' >Photo</div><div id='PhotoPlaceHolder'></div><BR><div ><input  type='file' id='Input_File' name='Input_File'></div></div>" +
                "<div class='AddRow'><div class='AddLabel'>Question Type:</div><div class='AddInput'><select name='QuestionType' id='QuestionType'><option value='TrueFalse'>True|False</option><option value='MultipleChoice'>Multiple Choice</option><option value='MultipleAnswer'>Multiple Answer</option></select></div></div>" +


                "<div class='AddRow' id='Answer_Row_1'><div class='AddLabel'>Answer 1:</div><div class='AddInput'><input value='true' type='text' id='Answer_1'><input type='checkbox' id='Answer_1_Correct'</div></div></div>" +
                "<div class='AddRow' id='Answer_Row_2'><div class='AddLabel'>Answer 2:</div><div class='AddInput'><input value='false' type='text' id='Answer_2'><input type='checkbox' id='Answer_2_Correct'</div></div></div>" +
                "<div class='AddRow' id='Answer_Row_3' style='display:none;'><div class='AddLabel'>Answer 3:</div><div class='AddInput'><input type='text' id='Answer_3'><input type='checkbox' id='Answer_3_Correct'</div></div></div>" +
                "<div class='AddRow' id='Answer_Row_4' style='display:none;'><div class='AddLabel'>Answer 4:</div><div class='AddInput'><input type='text' id='Answer_4'><input type='checkbox' id='Answer_4_Correct'</div></div></div>" +
                "<div class='AddRow' id='Answer_Row_5' style='display:none;'><div class='AddLabel'>Answer 5:</div><div class='AddInput'><input type='text' id='Answer_5'><input type='checkbox' id='Answer_5_Correct'</div></div></div>" +
                "<div class='AddRow' id='Answer_Row_6' style='display:none;'><div class='AddLabel'>Answer 6:</div><div class='AddInput'><input type='text' id='Answer_6'><input type='checkbox' id='Answer_6_Correct'</div></div></div>" +


                "<div class='AddRow'><div class='AddLabel'></div><div class='AddInput'><input type='button' value=\"Save\"  onclick=\"Admin.SaveObject();\"></div></div>" +
                "</div>";

            $("#MainContainer").append(xOut);

            CurrentCat = "Reward"

            $("#Owner").append("<option value='none'>None</option>")


            var dd = "";
            for (dd = 0; dd < Clients.length; dd++) {
                $("#Owner").append("<option value='" + Clients[dd]._id + "'>" + Clients[dd].Company + "</option>");
            }


            $("#PhotoPlaceHolder").on("click", function () {

                $("#Input_File").click();

            })

            $("#Input_File").on("change", FileChange)


            $("#QuestionMediaType").on("change", function () {
                var xval = $("#QuestionMediaType").val();
                if (xval == "Text") {
                    $("#PhotoRow").hide();
                    $("#VideoRow").hide();

                }
                if (xval == "Video") {
                    $("#PhotoRow").hide();
                    $("#VideoRow").show();

                }
                if (xval == "Photo") {
                    $("#PhotoRow").show();
                    $("#VideoRow").hide();

                }


            })

            $("#QuestionType").on("change", function () {
                var xval = $("#QuestionType").val();
                if (xval == "TrueFalse") {
                    $("#Answer_Row_3").hide();
                    $("#Answer_Row_4").hide();
                    $("#Answer_Row_5").hide();
                    $("#Answer_Row_6").hide();
                    $("#Answer_1").prop("disabled", true).val("true")
                    $("#Answer_2").prop("disabled", true).val("true")

                }
                if (xval == "MultipleChoice") {
                    $("#Answer_Row_3").show();
                    $("#Answer_Row_4").show();
                    $("#Answer_Row_5").show();
                    $("#Answer_Row_6").show();
                    $("#Answer_1").prop("disabled", false).val("")
                    $("#Answer_2").prop("disabled", false).val("")

                }
                if (xval == "MultipleAnswer") {
                    $("#Answer_Row_3").show();
                    $("#Answer_Row_4").show();
                    $("#Answer_Row_5").show();
                    $("#Answer_Row_6").show();
                    $("#Answer_1").prop("disabled", false).val("")
                    $("#Answer_2").prop("disabled", false).val("")


                }


            })

            $("#Answer_1_Correct,#Answer_2_Correct,#Answer_3_Correct,#Answer_4_Correct,#Answer_5_Correct,#Answer_6_Correct").click(function () {
                var xval = $("#QuestionType").val();
                if (xval == "TrueFalse" || xval == "MultipleChoice") {
                    $("#Answer_1_Correct,#Answer_2_Correct,#Answer_3_Correct,#Answer_4_Correct,#Answer_5_Correct,#Answer_6_Correct").prop("checked", false)
                    $(this).prop("checked", true);
                }

            });

        }


        if (xType == "Test") {
            var RandPass = randomString(8, '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ');
            SetHash("AddTest")


            var xOut = "<div class='AddItem'>" +
                "<div class='AddRow'><div class='AddLabel'>Title:</div><div class='AddInput'><input type='text' id='Title'></div></div>" +
                "<div class='AddRow'><div class='AddLabel'>Description:</div><div class='AddInput'><textarea id='Description'></textarea></div></div>" +
                "<div class='AddRow'><div class='AddLabel'>Owner:</div><div class='AddInput'><select name='Owner' id='Owner'></select></div></div>" +

                "<div class='AddRow'><div class='AddLabel'>Reward:</div><div class='AddInput'><select name='Reward' id='Reward'></select></div></div>" +

                "<div class='AddRow'><div class='AddLabel'>Sequential Unlocking:</div><div class='AddInput'><input type='radio' id='Seq_Unlock' value='false' checked name='Seq_Unlock'>false<input type='radio' id='Seq_Unlock' value='true'  name='Seq_Unlock'>true</div></div>" +

                "<div class='AddRow'><div class='AddLabel'>Photo</div><div id='PhotoPlaceHolder'></div><BR><div ><input  type='file' id='Input_File' name='Input_File'></div></div>" +

                "<div class='AddRow'><div class='AddLabel'></div><div class='AddInput'><input type='button' value=\"Save\"  onclick=\"Admin.SaveObject();\"></div></div>" +
                "</div>";

            $("#MainContainer").append(xOut);

            CurrentCat = "Test"
            $("#Owner").append("<option value='none'>None</option>")


            var dd = "";
            for (dd = 0; dd < Clients.length; dd++) {
                $("#Owner").append("<option value='" + Clients[dd]._id + "'>" + Clients[dd].Company + "</option>");
            }

            $("#Reward").append("<option value='none'>None</option>")


            var dd = "";
            for (dd = 0; dd < Rewards.length; dd++) {
                $("#Reward").append("<option value='" + Rewards[dd]._id + "'>" + Rewards[dd].Title + "</option>");
            }


            $("#PhotoPlaceHolder").on("click", function () {

                $("#Input_File").click();

            })

            $("#Input_File").on("change", FileChange)


        }

        if (xType == "Client") {
            var RandPass = randomString(8, '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ');
            SetHash("AddClient")


            var xOut = "<div class='AddItem'>" +
                "<div class='AddRow'><div class='AddLabel'>Company</div><div class='AddInput'><input type='text' id='Company'></div></div>" +
                "<div class='AddRow'><div class='AddLabel'>First Name</div><div class='AddInput'><input type='text' id='FirstName'></div></div>" +
                "<div class='AddRow'><div class='AddLabel'>Last Name</div><div class='AddInput'><input type='text' id='LastName'></div></div>" +
                "<div class='AddRow'><div class='AddLabel'>Address</div><div class='AddInput'><input type='text' id='Address'></div></div>" +
                "<div class='AddRow'><div class='AddLabel'>City</div><div class='AddInput'><input type='text' id='City'></div></div>" +
                "<div class='AddRow'><div class='AddLabel'>State</div><div class='AddInput'>" + SelectStates('State', "") + "</div></div>" +
                "<div class='AddRow'><div class='AddLabel'>Zip</div><div class='AddInput'><input type='text' id='Zip'></div></div>" +
                "<div class='AddRow'><div class='AddLabel'>Email</div><div class='AddInput'><input type='text' id='_Email'  autocomplete='off'></div></div>" +
                "<div class='AddRow'><div class='AddLabel'>Phone</div><div class='AddInput'><input type='text' id='_Phone' autocomplete='off'></div></div>" +
                "<div class='AddRow'><div class='AddLabel'>Password</div><div class='AddInput'><input type='text'  id='_Password'  autocomplete='off' value='" + RandPass + "'></div></div>" +
                "<div class='AddRow'><div class='AddLabel'></div><div class='AddInput'><input type='button' value=\"Save\"  onclick=\"Admin.SaveObject();\"></div></div>" +
                "</div>";

            $("#MainContainer").append(xOut);

            CurrentCat = "Client"

        }

        if (xType == "Category") {
            SetHash("AddCat")

            var xOut = "<div class='AddItem'>" +
                "<div class='AddRow'><div class='AddLabel'>Name</div><div class='AddInput'><input type='text' id='Name'></div></div>" +
                "<div class='AddRow'><div class='AddLabel'>Desc</div><div class='AddInput'><textarea id='Desc'></textarea></div></div>" +
                "<div class='AddRow'><div class='AddLabel'>Long Desc</div><div class='AddInput'><textarea id='LongDesc'></textarea></div></div>" +
                "<div class='AddRow'><div class='AddLabel'>Min Cost</div><div class='AddInput'><input id='MinCost'></div></div>" +

                "<div class='AddRow'><div class='AddLabel'>Photo</div><div id='PhotoPlaceHolder'></div><BR><div ><input  type='file' id='Input_File' name='Input_File'></div></div>" +
                "<div class='AddRow'><div class='AddLabel'></div><div class='AddInput'><input type='button' value=\"Save\"  onclick=\"Admin.SaveObject();\"></div></div>" +
                "</div>";
            $("#MainContainer").append(xOut);

            CurrentCat = "Category";
            $("#PhotoPlaceHolder").on("click", function () {

                $("#Input_File").click();

            })

            $("#Input_File").on("change", FileChange)


        }


        if (xType == "Page") {
            SetHash("AddPage")

            var xOut = "<div class='AddItem'>" +
                "<div class='AddRow'><div class='AddLabel'>Name</div><div class='AddInput'><input type='text' id='Name'></div></div>" +
                "<div class='AddRow'><div class='AddLabel'>Content</div><div class='AddInput'><textarea id='PageContent'></textarea></div></div>" +
                "<div class='AddRow'><div class='AddLabel'>Category</div><div class='AddInput'><select id='Category'><option value=\"None\">None</option></select></div></div>" +
                "<div class='AddRow'><div class='AddLabel'></div><div class='AddInput'><input type='button' value=\"Save\"  onclick=\"Admin.SaveObject();\"></div></div>" +
                "</div>";

            $("#MainContainer").append(xOut);
            CKEDITOR.replace('PageContent');
            CurrentCat = "Pages";
            GetCategories();
        }

        if (xType == "Item") {

            SetHash("AddItem")

            var xOut = "<div class='AddItem'>" +
                "<div class='AddRow'><div class='AddLabel'>Category</div><div class='AddInput'><select id='Category'></select></div></div>" +
                "<div class='AddRow'><div class='AddLabel'>Name</div><div class='AddInput'><input type='text' id='Name'></div></div>" +
                "<div class='AddRow'><div class='AddLabel'>Min Cost</div><div class='AddInput'><input type='text' id='MinCost'></div></div>" +
                "<div class='AddRow'><div class='AddLabel'>Desc</div><div class='AddInput'><textarea id='Desc'></textarea></div></div>" +
                "<div class='AddRow'><div class='AddLabel'>Photo</div><div id='PhotoPlaceHolder'></div><BR><div ><input  type='file' id='Input_File' name='Input_File'></div></div>" +

                "<div class='AddRow'><div class='AddLabel'></div><div class='AddInput'><input type='button' value=\"Save\"  onclick=\"Admin.SaveObject();\"></div></div>" +
                "</div>";
            $("#MainContainer").append(xOut);


            $("#PhotoPlaceHolder").on("click", function () {

                $("#Input_File").click();

            })

            $("#Input_File").on("change", FileChange)


            CurrentCat = "Item"
            GetCategories();
        }

        if (xType == "Message") {

            SetHash("AddMessage")

            var xOut = "<div class='AddItem'>" +
                "<div class='AddRow'><div class='AddLabel'>Person</div><div class='AddInput'><select id='Person'><option value='All'>All</option></select></div></div>" +
                "<div class='AddRow'><div class='AddLabel'>Title</div><div class='AddInput'><input type='text' id='Title'></div></div>" +
                "<div class='AddRow'><div class='AddLabel'>Content</div><div class='AddInput'><textarea class='xContent' id='Content'></textarea></div></div>" +
                "<div class='AddRow'><div class='AddLabel'></div><div class='AddInput'><input type='button' value=\"Save\" onclick=\"Admin.SaveObject();\"></div></div>" +
                "</div>";
            $("#MainContainer").append(xOut);

            GetAllUsers();


            CurrentCat = "Message"
        }


    }




    function FileChange() {


        var fd = new FormData();
        fd.append("Input_File", $("#Input_File").get(0).files[0]);

        var xhr = new XMLHttpRequest();

        xhr.addEventListener("load", uploadComplete2, false);
        xhr.open("POST", "/SavePhoto/");
        xhr.send(fd);

        //   var fd = new FormData();
        //   fd.append("uploadingFile", $("#UploadFile").get(0).files[0]);
        //  var xhr = new XMLHttpRequest();
        //  xhr.upload.addEventListener("progress", uploadProgress, false);
        //   xhr.addEventListener("load", uploadComplete, false);
        //  xhr.addEventListener("error", uploadFailed, false);
        //   xhr.addEventListener("abort", uploadCanceled, false);


        //  xhr.open("POST", "/SavePhoto/?uid=" + VARS.Profile._id + "&xName=" + xName + "&xUser=" + VARS.Me.id + "&Spot=" + xID + "&ucolor=" + scolor);
        // xhr.send(fd);


    }

    var LastPhoto = null;

    function uploadComplete2(response) {

        var xdata = JSON.parse(response.target.responseText)
        var xpic = "url(" + xdata.picture + ")";
        $("#PhotoPlaceHolder").css("background-image", xpic)
        LastPhoto = xdata.picture;
        console.log(LastPhoto);
    }


    function GetCategories(xCategory) {


        $.getJSON("/GetData/?Cat=category", function (data) {

            var bb = 0;

            for (bb == 0; bb < data.length; bb++) {
                var x = document.getElementById("Category");
                var option = document.createElement("option");
                option.text = data[bb].Name;
                option.value = data[bb].Name;
                if (xCategory != undefined) {

                    if (xCategory == data[bb].Name) {

                        option.selected = true;

                    }


                }
                x.add(option);


            }


        })


    }


    function GetAllUsers() {


        $.getJSON("/GetData/?Cat=users", function (data) {

            var bb = 0;

            for (bb == 0; bb < data.length; bb++) {
                var x = document.getElementById("Person");
                var option = document.createElement("option");
                option.text = data[bb].Company + " - " + data[bb].Email;
                option.value = data[bb]._id;
                x.add(option);

            }


        })


    }


    function SaveItem() {

        var xObject = {}
        var xCat = "";
        if (CurrentCat == "Message") {
            xObject.Person = $("#Person").val();
            xObject.Title = $("#Title").val();
            xObject.Content = $("#Content").val();
            xObject.Sender = "ADMIN";
            xCat = "messages"
        }


        if (CurrentCat == "Client") {
            xObject.Active = false;
            xObject.FirstName = $("#FirstName").val();
            xObject.LastName = $("#LastName").val();
            xObject.Company = $("#Company").val();
            xObject.Address = $("#Address").val();
            xObject.City = $("#City").val();
            xObject.State = $("#State").val();
            xObject.Zip = $("#Zip").val();
            xObject.Password = $("#Password").val();
            xObject.Phone = $("#_Phone").val();
            xObject.Email = $("#_Email").val();

            if (checkEmail(xObject.Email)) {


            } else {
                alert("Invalid Email")
                return;
            }


            xCat = "clients"
        }

        if (CurrentCat == "User") {
            xObject.Active = false;
            xObject.FirstName = $("#FirstName").val();
            xObject.LastName = $("#LastName").val();
            xObject.Company = $("#Company").val();
            xObject.Address = $("#Address").val();
            xObject.City = $("#City").val();
            xObject.State = $("#State").val();
            xObject.Zip = $("#Zip").val();
            xObject.Password = $("#Password").val();
            xObject.Phone = $("#Phone").val();
            xObject.Email = $("#Email").val();
            xObject.PANDD = $("#PANDD").val();
            xObject.Shipping = $("#Shipping").val();

            if (checkEmail(xObject.Email)) {


            } else {
                alert("Invalid Email")
                return;
            }


            xCat = "users"
        }


        if (CurrentCat == "Module") {
            xObject.Title = $("#Title").val();
            xObject.Desc = $("#Description").val();
            xObject.Owner = $("#Owner").val();
            xObject.Tests = [];
            xObject.Reward = $("#Reward").val();
            xObject.Seq_Unlock = $('input[id=Seq_Unlock]:checked').val()

            xObject.Category = $("#Category").val();
            xObject.Photo = LastPhoto;
            LastPhoto = null;
            xCat = "modules";


        }


        if (CurrentCat == "Test") {
            xObject.Title = $("#Title").val();
            xObject.Desc = $("#Description").val();
            xObject.Question_Count = 0;
            //xObject.Seq_Unlock=$("#Seq_Unlock").val();
            xObject.Seq_Unlock = $('input[id=Seq_Unlock]:checked').val()
            xObject.Reward = $("#Reward").val();
            xObject.Photo = LastPhoto;
            LastPhoto = null;
            xCat = "tests";


        }

        if (CurrentCat == "Reward") {
            xObject.Title = $("#Title").val();
            xObject.Desc = $("#Description").val();
            xObject.Owner = $("#Owner").val();
            xObject.xType = $("#RewardType").val();
            xObject.Value = $("#RewardValue").val();
            xObject.Category = $("#Category").val();
            xObject.Photo = LastPhoto;
            LastPhoto = null;
            xCat = "rewards";


        }
        if (CurrentCat == "Reward") {
            xObject.Title = $("#Title").val();
            xObject.Desc = $("#Description").val();
            xObject.Owner = $("#Owner").val();
            xObject.mediaType = $("#QuestionMediaType").val();
            xObject.Value = $("#QuestionValue").val();
            xObject.xType = $("#QuestionType").val();
            xObject.Photo = LastPhoto;
            LastPhoto = null;
xObject.Answers=[];
xObject.Correct=[]
            var bb=0;
            for(bb=1;bb<7;bb++){
                if($("#Answer_"+bb).val()!=""){

                    xObject.Answers.push($("#Answer_"+bb).val())


                }

                if($("#Answer_"+bb+"_Correct").prop("checked")==true){

                    xObject.Correct.push(bb);


                }




            }



            xCat = "questions";


        }

        if (CurrentCat == "Item") {
            xObject.Name = $("#Name").val();
            xObject.Desc = $("#Desc").val();
            xObject.LongDesc = $("#LongDesc").val();
            xObject.MinCost = $("#MinCost").val();
            xObject.Category = $("#Category").val();
            xObject.Photo = LastPhoto;
            LastPhoto = null;
            xCat = "items";
        }
        if (CurrentCat == "Category") {
            xObject.Name = $("#Name").val();
            xObject.Desc = $("#Desc").val();
            xObject.Photo = LastPhoto;
            LastPhoto = null;
            xCat = "category"
        }
        if (CurrentCat == "Pages") {
            xObject.Name = $("#Name").val();
            xObject.Content = encodeURIComponent(CKEDITOR.instances.PageContent.getData());

            xObject.Category = $("#Category").val();
            xCat = "pages"
        }


        $.ajax({
            url: "/SaveObject/?Type=" + xCat,
            type: "POST",
            dataType: "json",
            data: JSON.stringify(xObject),
            contentType: "application/json",
            cache: false,
            timeout: 5000,
            complete: function (res) {

                alert("Item Added")
                if (CurrentCat == "Client") {
                    LoadPage("Clients")
                }
                if (CurrentCat == "Reward") {
                    LoadPage("Rewards")
                }

                if (CurrentCat == "User") {
                    LoadPage("Users")
                }
                if (CurrentCat == "Category") {
                    LoadPage("Categories")
                }
                if (CurrentCat == "Item") {
                    LoadPage("Items")
                }
                if (CurrentCat == "Message") {
                    LoadPage("Messages")
                }
                if (CurrentCat == "Module") {
                    LoadPage("Modules")
                }
                if (CurrentCat == "Test") {
                    LoadPage("Tests")
                }


                if (CurrentCat == "Pages") {
                    LoadPage("Pages")
                }
            }})


    }


    function SavexItem() {

        var xObject = {}


        xObject.Name = $("#Name").val();
        xObject.Desc = $("#Desc").val();
        xObject.LongDesc = $("#LongDesc").val();
        xObject.MinCost = $("#MinCost").val();
        xObject.Category = $("#Category").val();
        xObject.Photo = LastPhoto;
        LastPhoto = null;

        $.ajax({
            url: "/SaveItem/?ID=" + CurrentItem._id,
            type: "POST",
            dataType: "json",
            data: JSON.stringify(xObject),
            contentType: "application/json",
            cache: false,
            timeout: 5000,
            complete: function (res) {

                alert(CurrentCat + " Saved")
                if (CurrentCat == "User") {
                    GetData("users")
                }

                if (CurrentCat == "Items") {
                    GetData("items")
                }


            }})


    }


    function SaveCat() {

        var xObject = {}

        xObject.Name = $("#Name").val();
        xObject.Desc = $("#Desc").val();
        xObject.Category = $("#Category").val();
        xObject.Photo = LastPhoto;
        LastPhoto = null;

        $.ajax({
            url: "/SaveCat/?ID=" + CurrentCategoryx._id,
            type: "POST",
            dataType: "json",
            data: JSON.stringify(xObject),
            contentType: "application/json",
            cache: false,
            timeout: 5000,
            complete: function (res) {

                alert("Category Saved")
                if (CurrentCat == "User") {
                    LoadPage("Users")
                }
            }})


    }


    function SaveUser() {


        var xObject = CurrentUser;

        xObject.FirstName = $("#FirstName").val();
        xObject.LastName = $("#LastName").val();
        xObject.Company = $("#Company").val();
        xObject.Address = $("#Address").val();
        xObject.City = $("#City").val();
        xObject.State = $("#State").val();
        xObject.Zip = $("#Zip").val();
        xObject.Email = $("#Email").val();
        xObject.Phone = $("#Phone").val();
        xObject.Password = $("#Password").val();
        xObject.PANDD = $("#PANDD").val();
        xObject.Shipping = $("#Shipping").val();

        if (checkEmail(xObject.Email)) {


        } else {
            alert("Invalid Email")
            return;
        }


        var bb = 0;
        var xObject;

        for (bb = 0; bb < Users.length; bb++) {

            var bObject = $.extend(xObject, CurrentUser);

            if (Users[bb]._id == CurrentUser._id) {
                Users[bb] = bObject
            }
        }

        $.ajax({
                url: "/SaveUser/",
                type: "POST",
                dataType: "json",
                data: JSON.stringify(xObject),
                contentType: "application/json",
                cache: false,
                timeout: 5000,
                complete: function (res) {

                    setTimeout(function () {
                        LoadPage("Users");
                    }, 3000);
                }
            }

        )

    }


    function SaveClient() {


        var xObject = CurrentUser;

        xObject.FirstName = $("#FirstName").val();
        xObject.LastName = $("#LastName").val();
        xObject.Company = $("#Company").val();
        xObject.Address = $("#Address").val();
        xObject.City = $("#City").val();
        xObject.State = $("#State").val();
        xObject.Zip = $("#Zip").val();
        xObject.Email = $("#Email").val();
        xObject.Phone = $("#Phone").val();
        xObject.Password = $("#Password").val();
        xObject.PANDD = $("#PANDD").val();
        xObject.Shipping = $("#Shipping").val();

        if (checkEmail(xObject.Email)) {


        } else {
            alert("Invalid Email")
            return;
        }


        var bb = 0;
        var xObject;

        for (bb = 0; bb < Users.length; bb++) {

            var bObject = $.extend(xObject, CurrentUser);

            if (Users[bb]._id == CurrentUser._id) {
                Users[bb] = bObject
            }
        }

        $.ajax({
                url: "/SaveClient/",
                type: "POST",
                dataType: "json",
                data: JSON.stringify(xObject),
                contentType: "application/json",
                cache: false,
                timeout: 5000,
                complete: function (res) {

                    setTimeout(function () {
                        LoadPage("Clients");
                    }, 3000);
                }
            }

        )

    }


    function SavePage() {


        var xObject = CurrentPage;

        xObject.Name = $("#Name").val();
        for (var instanceName in CKEDITOR.instances)
            CKEDITOR.instances[instanceName].updateElement();
        xObject.Content = encodeURIComponent(CKEDITOR.instances.PageContent.getData());

        xObject.Category = $("#Category").val();

        $.ajax({
                url: "/SavePage/",
                type: "POST",
                dataType: "json",
                data: JSON.stringify(xObject),
                contentType: "application/json",
                cache: false,
                timeout: 5000,
                complete: function (res) {

                    LoadPage("Pages")
                }
            }

        )

    }


    var Payout0 = {}


    function PayoutAmount() {

        Payout0.Amount = $("#PayoutAmount").val();
        $.ajax({
            url: "/Payout/",
            type: "POST",
            dataType: "json",
            data: JSON.stringify(Payout0),
            contentType: "application/json",
            cache: false,
            timeout: 5000,
            complete: function (res) {

                alert("Bank Account Paid.")

            }})


        $("#Payout").hide();


        GetData("requests")


    }

    function Payout(xamount, ID) {
        Payout0.Amount = xamount;
        Payout0.ID = ID;


        $("#Payout").show();


    }

    function DeleteObject(xbar, ID) {


        var r = confirm("Are you sure you want to delete that?");
        if (r == true) {
            x = "You pressed OK!";
        } else {
            x = "You pressed Cancel!";
            return;
        }


        $.getJSON("/DeleteObject/?Type=" + xbar + "&ID=" + ID, function (data) {

            if (CurrentCat == "User") {
                LoadPage("Users")
            }
            if (CurrentCat == "Reward") {
                LoadPage("Rewards")
            }
            if (CurrentCat == "Question") {
                LoadPage("Questions")
            }


            if (CurrentCat == "Client") {
                LoadPage("Clients")
            }
            if (CurrentCat == "Category") {
                LoadPage("Categories")
            }
            if (CurrentCat == "Item") {
                LoadPage("Items")
            }
            if (CurrentCat == "Message") {
                LoadPage("Messages")
            }
            if (CurrentCat == "Pages") {
                LoadPage("Pages")
            }
            if (CurrentCat == "Tests") {
                LoadPage("Tests")
            }
            if (CurrentCat == "Modules") {
                LoadPage("Modules")
            }

        })


    }


    function Approve(xID) {


        $.getJSON("/ApproveUser/?ID=" + xID, function (data) {

            LoadPage("Users")

        })

    }

    function Disapprove(xID) {

        $.getJSON("/DisapproveUser/?ID=" + xID, function (data) {

            LoadPage("Users")

        })


    }


    function SaveInventory() {

        var xObject = {};

        $('input:checked').each(function () {

            xObject[$(this).val()] = $("#Cost_" + $(this).val()).val();


        });
        console.log(xObject)
        xObject.Owner = CurrentUser._id;

        $.ajax({
                url: "/SaveInventory/",
                type: "POST",
                dataType: "json",
                data: JSON.stringify(xObject),
                contentType: "application/json",
                cache: false,
                timeout: 5000,
                complete: function (res) {

                    LoadPage("Users")
                }
            }

        )


    }


    function SaveEvent() {


        CurrentOrder.FirstName = $("#FirstName").val();
        CurrentOrder.LastName = $("#LastName").val();
        CurrentOrder.Company = $("#Company").val();
        CurrentOrder.Address = $("#Address").val();
        CurrentOrder.Address2 = $("#Address2").val();
        CurrentOrder.City = $("#City").val();
        CurrentOrder.State = $("#State").val();
        CurrentOrder.Zip = $("#Zip").val();
        CurrentOrder.Email = $("#Email").val();
        CurrentOrder.Phone = $("#Phone").val();
        CurrentOrder.EventDate = $("#EventDate").val();
        CurrentOrder.EstimatedCost = $("#EstimatedCost").val();
        CurrentOrder.VendorCost = $("#VendorCost").val();
        CurrentOrder.Vendor = $("#VendorList").val();
        CurrentOrder.VendorEmail = VendorEmail($("#VendorList").val());
        CurrentOrder.ActualCost = $("#ActualCost").val();


        $.ajax({
            url: "/UpdateOrder/",
            type: "POST",
            dataType: "json",
            data: JSON.stringify(CurrentOrder),
            contentType: "application/json",
            cache: false,
            timeout: 5000,
            complete: function (res) {


                GetData("requests")

            }
        })

    }


    function SelectChange(xthis, xid) {


        var xvalue = $(xthis).val();
        var xCart = CurrentOrder.Cart;


        var found = false;
        var ff;
        for (ff = 0; ff < xCart.length; ff++) {
            if (xid == xCart[ff]._id) {
                found = true;
                xCart[ff].Amount = xvalue;
            }
        }

        CurrentOrder.Cart = xCart;
        RenderCart();
        VendorEstimate()
    }


    function AssignEvent() {


        CurrentOrder.FirstName = $("#FirstName").val();
        CurrentOrder.LastName = $("#LastName").val();
        CurrentOrder.Company = $("#Company").val();
        CurrentOrder.Address = $("#Address").val();
        CurrentOrder.Address2 = $("#Address2").val();

        CurrentOrder.City = $("#City").val();
        CurrentOrder.State = $("#State").val();
        CurrentOrder.Zip = $("#Zip").val();
        CurrentOrder.Email = $("#Email").val();
        CurrentOrder.Phone = $("#Phone").val();
        CurrentOrder.EventDate = $("#EventDate").val();
        CurrentOrder.EstimatedCost = $("#EstimatedCost").val();
        CurrentOrder.VendorCost = $("#VendorCost").val();
        CurrentOrder.Vendor = $("#VendorList").val();
        CurrentOrder.VendorEmail = VendorEmail($("#VendorList").val());
        CurrentOrder.ActualCost = $("#ActualCost").val();


        $.ajax({
            url: "/AssignOrder/",
            type: "POST",
            dataType: "json",
            data: JSON.stringify(CurrentOrder),
            contentType: "application/json",
            cache: false,
            timeout: 5000,
            complete: function (res) {


                GetData("requests")


            }
        })

    }

    var VendorEmail;


    function VendorEmail(xID) {


        var bb = 0;
        for (bb = 0; bb < Users.length; bb++) {

            if (Users[bb]._id == xID) {
                return Users[bb].Email;
            }
        }


    }


    function ViewMessage(xID) {

        $("#MessageContent_" + xID).show();


    }

    function BillCustomer() {


        $.getJSON("/Login/?order=" + xuser + "&pass=" + pass, function (data) {

        })


    }

    function EditModules(xClient) {

        //Get All the Modules for Specifici Client.
        //

        GetData("modules", xClient);


    }

    function UpdateModule() {

        var xObject = {};


        xObject.Title = $("#Title").val();
        xObject.Desc = $("#Description").val();
        xObject.Owner = $("#Owner").val();
        xObject._id = CurrentItem._id;
        xObject.Category = $("#Category").val();
        xObject.Photo = LastPhoto;
        xObject.Reward = $("#Reward").val();
        xObject.Seq_Unlock = $('input[id=Seq_Unlock]:checked').val()

        LastPhoto = null;


        $.ajax({
            url: "/UpdateModule/",
            type: "POST",
            dataType: "json",
            data: JSON.stringify(xObject),
            contentType: "application/json",
            cache: false,
            timeout: 5000,
            complete: function (res) {


                GetData("modules")


            }
        })


    }


    function UpdateTest() {

        var xObject = {};


        xObject.Title = $("#Title").val();
        xObject.Desc = $("#Description").val();
        xObject.Owner = $("#Owner").val();
        xObject.Seq_Unlock = $('input[id=Seq_Unlock]:checked').val()
        xObject.Reward = $("#Reward").val();


        //$("#Seq_Unlock").val();
        xObject._id = CurrentItem._id;
        xObject.Photo = LastPhoto;
        LastPhoto = null;


        $.ajax({
            url: "/UpdateTest/",
            type: "POST",
            dataType: "json",
            data: JSON.stringify(xObject),
            contentType: "application/json",
            cache: false,
            timeout: 5000,
            complete: function (res) {


                GetData("modules")


            }
        })


    }

    var TestStack = [];

    function EditModuleContent(xID) {


        $("#MainContainer").empty();
        var bb = 0;
        var xObject;
        SetHash("EditItem=" + xID)


        for (bb = 0; bb < Modules.length; bb++) {

            if (Modules[bb]._id == xID) {
                xObject = Modules[bb]
            }
        }


        CurrentItem = xObject;
        LastPhoto = xObject.Photo;

        var content = "<div id='MyTests'></div><div id='AddTestToModule'><select id='xTests'></select><input type='Button' value='Add Test' onclick='Admin.AddTestToModule();'><input type='Button' value='Save Module' onclick='Admin.SaveModuleContent();'></div></div>"

        var xItem = $("#xTests").val();

        $("#MainContainer").html(content)


        for (bb = 0; bb < Tests.length; bb++) {
//            if(Tests[bb].Owner==xID){
            $("#xTests").append("<option id='Option_" + Tests[bb]._id + "' value='" + Tests[bb]._id + "' selected>" + Tests[bb].Title + "</option>");

        }


        if (CurrentItem.Tests) {

            for (bb = 0; bb < CurrentItem.Tests.length; bb++) {

                var dd = 0;

                for (dd = 0; dd < Tests.length; dd++) {

                    if (Tests[dd]._id == CurrentItem.Tests[bb]) {
                        xObject = Tests[dd];
                        $("#Option_" + xObject._id).remove();
                        if (xObject.Question_Count == undefined) {

                            xObject.Question_Count = 0;
                        }
                        var content = "<div class='Test_Item' xid=\"" + xObject._id + "\">";
                        content = content + "<div class='Test_Title'>" + xObject.Title + "</div>"
                        content = content + "<div class='Test_Remove' onclick=\"Admin.RemoveTestFromModule(this,'" + xObject._id + "');\"><span class='fa fa-trash'></span></div>"
                        content = content + "<div class='Test_Down' onclick=\"Admin.DownTestInModule(this,'" + xObject._id + "');\"><span class='fa fa-arrow-down'></span></div>"
                        content = content + "<div class='Test_Up' onclick=\"Admin.UpTestInModule(this,'" + xObject._id + "');\"><span class='fa fa-arrow-up'></span></div>"
                        content = content + "<div class='Test_QCount'>" + xObject.Question_Count + "</div>"
                        content = content + "</div>"

                        $("#MyTests").append(content)
                    }
                }


            }


        }


    }

    function AddTestToModule() {
        var xObject = {};
        var xvalue = $("#xTests").val()
        var bb
        for (bb = 0; bb < Tests.length; bb++) {

            if (xvalue == Tests[bb]._id) {
                xObject = Tests[bb]
                $("#Option_" + xObject._id).remove();
            }

        }


        if (xObject.Question_Count == undefined) {

            xObject.Question_Count = 0;
        }
        var content = "<div class='Test_Item' xid=\"" + xObject._id + "\">";
        content = content + "<div class='Test_Title'>" + xObject.Title + "</div>"
        content = content + "<div class='Test_Remove' onclick=\"Admin.RemoveTestFromModule(this,'" + xObject._id + "');\"><span class='fa fa-trash'></span></div>"
        content = content + "<div class='Test_Down' onclick=\"Admin.DownTestInModule(this,'" + xObject._id + "');\"><span class='fa fa-arrow-down'></span></div>"
        content = content + "<div class='Test_Up' onclick=\"Admin.UpTestInModule(this,'" + xObject._id + "');\"><span class='fa fa-arrow-up'></span></div>"
        content = content + "<div class='Test_QCount'>" + xObject.Question_Count + "</div>"
        content = content + "</div>"

        $("#MyTests").append(content)

    }


    function UpTestInModule(xthis, xID) {


        var prev = $(xthis).parent().prev();

        $(prev).before($(xthis).parent());


    }

    function DownTestInModule(xthis, xID) {

        var next = $(xthis).parent().next();

        $(next).after($(xthis).parent());

    }

    function RemoveTestFromModule(xthis, xID) {

        for (bb = 0; bb < Tests.length; bb++) {
            if (Tests[bb]._id == xID) {
                $("#xTests").append("<option id='Option_" + Tests[bb]._id + "' value='" + Tests[bb]._id + "' selected>" + Tests[bb].Title + "</option>");
            }
        }


        $(xthis).parent().remove();
    }

    function SaveModuleContent() {

        var xDivs = document.getElementsByClassName("Test_Item")
        var bb = 0;
        var xTests = [];
        for (bb = 0; bb < xDivs.length; bb++) {
            xTests.push(xDivs[bb].getAttribute("xid"))

        }

        var xObject = {};
        xObject._id = CurrentItem._id;
        xObject.Tests = xTests;


        $.ajax({
            url: "/UpdateModuleContent/",
            type: "POST",
            dataType: "json",
            data: JSON.stringify(xObject),
            contentType: "application/json",
            cache: false,
            timeout: 5000,
            complete: function (res) {


                GetData("modules")


            }
        })


    }

    function SaveReward() {


        var xObject = {};
        xObject._id = CurrentItem._id;
        xObject.Title = $("#Title").val();
        xObject.Desc = $("#Description").val();
        xObject.Owner = $("#Owner").val();
        xObject.xType = $("#RewardType").val();
        xObject.Value = $("#RewardValue").val();
        xObject.Category = $("#Category").val();
        if (LastPhoto != null) {
            xObject.Photo = LastPhoto;
            LastPhoto = null;

        }

        $.ajax({
            url: "/SaveReward/",
            type: "POST",
            dataType: "json",
            data: JSON.stringify(xObject),
            contentType: "application/json",
            cache: false,
            timeout: 5000,
            complete: function (res) {


                GetData("rewards")


            }
        })


    }


    return {
        SaveReward: SaveReward,
        EditItem: EditItem,
        EditCat: EditCat,
        EditUser: EditUser,
        EditClient: EditClient,
        UpdateModule: UpdateModule,
        SaveObject: SaveItem,
        SaveUser: SaveUser,
        SaveClient: SaveClient,
        AddItem: AddItem,
        Login: Login,
        Init: Init,
        LoadPage: LoadPage,
        Delete: DeleteObject,
        EditPage: EditPage,
        SavePage: SavePage,
        Disapprove: Disapprove,
        Approve: Approve,
        SaveItem: SavexItem,
        SaveCat: SaveCat,
        EditUserInventory: EditUserInventory,
        SaveInventory: SaveInventory,
        EditOrder: EditOrder,
        SaveEvent: SaveEvent,
        AssignEvent: AssignEvent,
        SelectChange: SelectChange,
        BillCustomer: BillCustomer,
        Payout: Payout,
        ViewMessage: ViewMessage,
        PayoutAmount: PayoutAmount,
        AdminLogin: AdminLogin,
        RemoveFromCart: RemoveFromCart,
        EditModules: EditModules,
        EditModule: EditModule,
        EditModuleContent: EditModuleContent,
        AddTestToModule: AddTestToModule,
        UpTestInModule: UpTestInModule,
        DownTestInModule: DownTestInModule,
        RemoveTestFromModule: RemoveTestFromModule,
        SaveModuleContent: SaveModuleContent,
        EditReward: EditReward,
        UpdateTest: UpdateTest,
        EditTest: EditTest,
        EditQuestion:EditQuestion

    }
})()


