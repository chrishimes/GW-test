
var adminuser="admin";
//var adminpass="acc9281";
var adminpass="admin";

var http = require('http');
var path = require('path');
var url = require("url");
var express = require('express');

var databaseUrl =  "mongodb://localhost:27017/brandecation";
//var databaseUrl =  "localhost:27017/brandecation";
var collections = ["tests","modules","users","clients","questions","messages","rewards"];
var mongojs=require("mongojs");
var db = mongojs.connect(databaseUrl, collections);
var ObjectId = mongojs.ObjectId;
var fs=require('fs') ;
var crypto = require('crypto');

var geocoder = require('geocoder');


var router = express();
var server = http.createServer(router);
router.use(express.bodyParser());
router.use(express.static(path.resolve(__dirname, 'client')));
router.use( express.cookieParser() );
router.use(express.session({secret: '1234567890QWERTY'}));

var nodemailer = require("nodemailer");

server.listen(process.env.PORT || 80, process.env.IP || "0.0.0.0", function(){
    var addr = server.address();
    console.log("server listening at", addr.address + ":" + addr.port);
});




//Migrated Functions

function getExtension(filename) {
    ////console.log(filename)
    var z=filename.split('.').pop();
    ////console.log(z)
    return z;

}



function SendMessage(Recip,Title,Content,Response){

    console.log("Sending Email...");

    var smtpTransport = nodemailer.createTransport("SMTP",{

        service: "Gmail",
        auth: {
            XOAuth2: {
                user: "feedback@party-butler.com", // Your gmail address.
                // Not @developer.gserviceaccount.com
                clientId: "284259387687-ekpq589d9kum9r82958iomkjrkr1b0ug.apps.googleusercontent.com",
                clientSecret: "1aYBJvCilSAMRzMG_YJPH1pi",
                refreshToken: "1/ECTXbGMTFAlgdLiyyOQKcciwLcpwvGM2gPXVIownzQFIgOrJDtdun6zK6XiATCKT"
            }
        }
    });

// setup e-mail data with unicode symbols
    var mailOptions = {
        from: "Admin <partybutler@yahoo.com>", // list of receivers
        to: Recip, // sender address
        subject: Title, // Subject line
        //  text: Content // plaintext body
        html: Content
    }

// send mail with defined transport object
    smtpTransport.sendMail(mailOptions, function(error, response){
        if(error){
            console.log(error);
            console.log(response)
            Response.send(false)
        }else{
            console.log("Message sent: " + response.message);
            Response.send(true)


        }

    });


}


function SendMessageOld(Recip,Title,Content,Response){

console.log("Sending Email...")

    var smtpTransport = nodemailer.createTransport("SMTP",{
       service: "yahoo", // hostname
       // secureConnection: false, // TLS requires secureConnection to be false
      //  port: 587, // port for secure SMTP

      //  tls: {
      //      ciphers:'SSLv3'
       // },
        auth: {
            user: "partyButler@yahoo.com",
            pass: "Cactus113"
        }
    });

// setup e-mail data with unicode symbols
    var mailOptions = {
        from: "Admin <partybutler@yahoo.com>", // list of receivers
        to: Recip, // sender address
        subject: Title, // Subject line
      //  text: Content // plaintext body
    html: Content
    }

// send mail with defined transport object
    smtpTransport.sendMail(mailOptions, function(error, response){
        if(error){
            console.log(error);
            Response.send(false)
        }else{
            console.log("Message sent: " + response.message);
            Response.send(true)


        }

    });


}


function randomString(length, chars) {
    var result = '';
    for (var i = length; i > 0; --i) result += chars[Math.round(Math.random() * (chars.length - 1))];
    return result;
}

router.get('/Login/',function(req,response){

    var url_parts = url.parse(req.url, true);
    var query = url_parts.query;
    var userid= query.user;
    var pass= query.pass;
    var shasum = crypto.createHash('md5');

    if(pass==adminpass&&userid==adminuser){

        response.send({loggedin:true,admin:true})
        req.session.admin = true;
    }else{

        shasum.update(pass);

        var       pass = shasum.digest('hex');



console.log(pass);
        db.users.find({Email:userid,Password:pass}).sort({name:1}).toArray(
            function(err, items) {

                if (items.length==0){

                    response.send({loggedin:false})
                }else{
                    req.session.user = true;
                    response.send({loggedin:true,id:items[0]._id})

                }


            }
        );










    }



})
router.get('/AdminLogin/',function(req,response){

    var url_parts = url.parse(req.url, true);
    var query = url_parts.query;
    var userid= query.user;
    var pass= query.pass;
    var shasum = crypto.createHash('md5');

    if(pass==adminpass&&userid==adminuser){

        response.send({loggedin:true,admin:true})
        req.session.admin = true;
    }else{
 response.send({loggedin:false})










    }



})

router.get('/GetUser/',function(req,response){


    var url_parts = url.parse(req.url, true);
    var query = url_parts.query;
    var xCat= query.ID;


    db.users.find({_id:db.ObjectId(xCat)}).toArray(
        function(err, items) {

            if (items.length==0){

                response.send("{\"results\":false}")
            }else{
                response.send(items);

            }


        }
    );





})

router.get('/GetUsers/',function(req,response){


    var url_parts = url.parse(req.url, true);
    var query = url_parts.query;
    var xCat= query.ID;


    db.users.find().toArray(
        function(err, items) {

            if (items.length==0){

                response.send("{\"results\":false}")
            }else{
                response.send(items);

            }


        }
    );





})

router.get('/GetData/',function(req,response){

    var url_parts = url.parse(req.url, true);
    var query = url_parts.query;
    var xCat= query.Cat;
    var xOwner=query.O;
    var search={};
    if(xOwner!="null"){

    search={Owner:xOwner};

    }

    console.log(search);


db[xCat].find(search).sort({title:1}).toArray(
    function(err, items) {

        if (items.length==0){

            response.send("{\"results\":false}")
        }else{
            response.send(items);

        }


    }
);

})


router.get('/GetMyMessages/',function(req,response){

    var url_parts = url.parse(req.url, true);
    var query = url_parts.query;
    var xCat= query.Cat;
    var xID= query.ID;


    db[xCat].find({$or: [ { Person:null }, {Person:xID }]}).sort({name:1}).toArray(
        function(err, items) {

            if (items.length==0){

                response.send("{\"results\":false}")
            }else{
                response.send(items);

            }


        }
    );

})





router.get('/GetMyOrders/',function(req,response){

    var url_parts = url.parse(req.url, true);
    var query = url_parts.query;
    var xCat= query.ID;


    db.requests.find({Vendor:xCat,$or: [ { Status: "Assigned" }, { Status: "Delivered" }, { Status: "Accepted" } ]}).sort({name:1}).toArray(
        function(err, items) {

            if (items.length==0){

                response.send("{\"results\":false}")
            }else{
                response.send(items);

            }


        }
    );

})



router.get('/Logout/',function(req,response){

    var url_parts = url.parse(req.url, true);
    var query = url_parts.query;
    var userid= query.user;
    var pass= query.pass;

      req.session.admin = undefined;


        response.send({loggedin:false})




})



router.get('/CheckSessionB/',function(req,response){


    if(req.session.user!=undefined){
        console.log("Logged In")
        response.send({loggedin:true,user:req.session.user});
    }else{
        console.log("Logged Out")
        response.send({loggedin:false});


    }


})

router.get('/CheckSession/',function(req,response){


    if(req.session.admin!=undefined||req.session.user!=undefined){
        console.log("Logged In")
        response.send({loggedin:true});
    }else{
        console.log("Logged Out")
        response.send({loggedin:false});


    }


})





router.post('/SavePhoto/',function(req,response){




    var xTime = new Date();
var rFile=randomString(16,'0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ');
    xTime = xTime.getTime();

//    console.log(req.files)
        var newPath = __dirname + '/client/Photos/' + rFile.toString() +"."+getExtension(req.files.Input_File.name);
//console.log(rFile)

        fs.readFile(req.files.Input_File.path, function (err, data) {
console.log("File Read");
            fs.writeFile(newPath, data, function (err) {
console.log("File Write");


                if( err || !data ) {
                    ////console.log(err)
                    response.send("{\"saved\":false}");
                }

                else {


                    var xpic={
                     picture:'../Photos/' + rFile.toString() +"."+getExtension(req.files.Input_File.name)
                    }
                    console.log(rFile)
response.send(xpic);

                }


            });
        });


});



router.post('/SaveObject/', function(req, res) {
    var userdata=  req.body ;
    userdata.Date=new Date().getTime();
    var url_parts = url.parse(req.url, true);
    var query = url_parts.query;
    var cat=  query.Type.toString();

    if(userdata.Password){
        var shasum = crypto.createHash('md5');

        shasum.update(userdata.Password);

        userdata.Password = shasum.digest('hex');

    }


if(userdata.FirstName){

    var rItem=userdata.Address+","+userdata.City+","+userdata.State+","+userdata.Zip;
    console.log(rItem);
    geocoder.geocode(rItem, function ( err, data ) {

        console.log(err);
        console.log(data);


        db[cat].save(userdata, function(err, saved) {
        if( err || !saved ) {
            console.log(err)
            res.send("{\"saved\":false}");
        }
        else {     res.send(saved)}
    });

    });

}else{

    db[cat].save(userdata, function(err, saved) {
        if( err || !saved ) {
            console.log(err)
            res.send("{\"saved\":false}");
        }
        else {     res.send(saved)}}
    );

};



});


router.post('/CreateUser/', function(req, res) {
    var userdata=  req.body ;
    userdata.Date=new Date().getTime();
    var url_parts = url.parse(req.url, true);
    var query = url_parts.query;
    var cat=  "users"
var oPass=userdata.Password;
    if(userdata.Password){
        var shasum = crypto.createHash('md5');

        shasum.update(userdata.Password);

        userdata.Password = shasum.digest('hex');

    }



        var rItem=userdata.Address+","+userdata.City+","+userdata.State+","+userdata.Zip;
        console.log(rItem);
        geocoder.geocode(rItem, function ( err, data ) {

            console.log(err);
            console.log(data);






            db[cat].save(userdata, function(err, saved) {
                if( err || !saved ) {
                    console.log(err)
                    res.send("{\"saved\":false}");
                }
                else {

                    res.send(saved)
                    GetEmailTemplate("Vendor Created Email",function(xTemplate){
                        xTemplate=xTemplate.replace("#InitialPassword#",oPass)
                        SendMessage(userdata.Email,"Welcome!",xTemplate,res)


                    })



                }
            });

        });





});




router.post('/SaveCat/', function(req, res) {
    var userdata=  req.body ;
    userdata.Date=new Date().getTime();
    var url_parts = url.parse(req.url, true);
    var query = url_parts.query;
    var cat=  query.ID.toString();

    db.category.update(
        { _id : db.ObjectId(cat) },
        { $set : userdata},
        { multi: false }
    )

    res.send(true)


});


router.post('/UpdateTest/', function(req, res) {
    var userdata=  req.body ;
    userdata.Date=new Date().getTime();

    var url_parts = url.parse(req.url, true);
    var query = url_parts.query;
    var cat=  userdata._id.toString();
    delete userdata._id;
    db.tests.update(
        { _id : db.ObjectId(cat) },
        { $set : userdata},
        { multi: false }
    )

    res.send(true)


});




router.post('/UpdateModule/', function(req, res) {
    var userdata=  req.body ;
    userdata.Date=new Date().getTime();

    var url_parts = url.parse(req.url, true);
    var query = url_parts.query;
    var cat=  userdata._id.toString();
    delete userdata._id;
    db.modules.update(
        { _id : db.ObjectId(cat) },
        { $set : userdata},
        { multi: false }
    )

    res.send(true)


});

router.post('/UpdateModuleContent/', function(req, res) {
    var userdata=  req.body ;
    userdata.Date=new Date().getTime();

    var url_parts = url.parse(req.url, true);
    var query = url_parts.query;
    var cat=  userdata._id.toString();
    delete userdata._id;
    db.modules.update(
        { _id : db.ObjectId(cat) },
        { $set : userdata},
        { multi: false }
    )

    res.send(true)


});
router.post('/SaveReward/', function(req, res) {
    var userdata=  req.body ;
    userdata.Date=new Date().getTime();

    var url_parts = url.parse(req.url, true);
    var query = url_parts.query;
    var cat=  userdata._id.toString();
    delete userdata._id;
    db.rewards.update(
        { _id : db.ObjectId(cat) },
        { $set : userdata},
        { multi: false }
    )

    res.send(true)


});






router.post('/SaveAccount/', function(req, res) {
    var userdata=  req.body ;

    db.users.update(
        { _id : db.ObjectId(userdata.User) },
        { $set : {BankAccount:userdata.Token}},
        { multi: false }
    )

    res.send(true)


});

router.post('/SaveItem/', function(req, res) {
    var userdata=  req.body ;
    userdata.Date=new Date().getTime();
    var url_parts = url.parse(req.url, true);
    var query = url_parts.query;
    var cat=  query.ID.toString();

    db.items.update(
        { _id : db.ObjectId(cat) },
        { $set : userdata},
        { multi: false }
    )
res.send(true)


});




router.post('/SaveUser/', function(req, res) {
    var userdata=  req.body ;

var xID=userdata._id;

    delete userdata._id;

    if(userdata.Password!="OldPassword"){

    var shasum = crypto.createHash('md5');
        console.log("Change password");
        console.log(userdata.Password)

    shasum.update(userdata.Password);
    userdata.Password = shasum.digest('hex');
        console.log("Password Hash");
        console.log(userdata.Password)
}else{

        delete userdata.Password;
    }

var rItem=userdata.Address+","+userdata.City+","+userdata.State+","+userdata.Zip;
    console.log(rItem);
    geocoder.geocode(rItem, function ( err, data ) {
        // do stuff with data

userdata.geo=data;
console.log(err);
        console.log(data);
        db.users.update(
            { _id : db.ObjectId(xID) },
            { $set : userdata},
            { multi: false }
        )




    });




res.send(true)

});



router.post('/SaveClient/', function(req, res) {
    var userdata=  req.body ;

    var xID=userdata._id;

    delete userdata._id;

    if(userdata.Password!="OldPassword"){

        var shasum = crypto.createHash('md5');
        console.log("Change password");
        console.log(userdata.Password)

        shasum.update(userdata.Password);
        userdata.Password = shasum.digest('hex');
        console.log("Password Hash");
        console.log(userdata.Password)
    }else{

        delete userdata.Password;
    }

    var rItem=userdata.Address+","+userdata.City+","+userdata.State+","+userdata.Zip;
    console.log(rItem);
    geocoder.geocode(rItem, function ( err, data ) {
        // do stuff with data

        userdata.geo=data;
        console.log(err);
        console.log(data);
        db.clients.update(
            { _id : db.ObjectId(xID) },
            { $set : userdata},
            { multi: false }
        )




    });




    res.send(true)

});





router.post('/SavePage/', function(req, res) {
    var userdata=  req.body ;

    var xID=userdata._id;

    delete userdata._id;


       db.pages.update(
            { _id : db.ObjectId(xID) },
            { $set : userdata},
            { multi: false }
        )

    res.send(true)

});

router.post('/SaveInventory/', function(req, res) {
    var userdata=  req.body ;
    var xOwner=  userdata.Owner.toString();



    db.inventory.remove({"Owner": xOwner},function(err, saved) {

        if( err || !saved ) {

//            response.send("{\"removed\":false}");
        }
        else {


            db.inventory.save(userdata, function(err, saved) {
                if( err || !saved ) {
                    console.log(err)
                    res.send("{\"saved\":false}");
                }
                else {     res.send(saved)}
            });

        }

    });

});








router.post('/SaveOrder/', function(req, res) {
    var userdata=  req.body ;

userdata.Date=new Date().getTime();


    db.requests.save(userdata, function(err, saved) {
        if( err || !saved ) {
            console.log(err)
         //   res.send("{\"saved\":false}");
        }
        else {
           // res.send(saved)
        }
    });

});



router.post('/ClientContact/', function(req, res) {
    var userdata=  req.body ;

    userdata.Date=new Date().getTime();
    userdata.Recip="Admin";

    db.messages.save(userdata, function(err, saved) {
        if( err || !saved ) {
            console.log(err)
            res.send("{\"saved\":false}");
        }
        else {     res.send(saved)}
    });

});



router.get('/DeleteObject/',function(req,response){
    var url_parts = url.parse(req.url, true);
    var query = url_parts.query;
    var xType=  query.Type.toString();
    var ID=  query.ID.toString();
db[xType].remove({"_id": db.ObjectId(ID)},function(err, saved) {
    ////console.log(saved)
    if( err || !saved ) {

        response.send("{\"removed\":false}");
    }
    else {     response.send("{\"removed\":true}")}

});
});



router.get('/ApproveUser/',function(req,response){
    var url_parts = url.parse(req.url, true);
    var query = url_parts.query;

    var ID=  query.ID.toString();
    db.users.update(
        { _id : db.ObjectId(ID) },
        { $set : {Approved:true}},
        { multi: false }
    )
response.send(true);

});



router.post('/AssignOrder/',function(req,response){
    var userdata=  req.body ;
    var xID=userdata._id;

    delete userdata._id;

    userdata.Status="Assigned";
console.log("ASSIGN")
    db.requests.update(
        { _id : db.ObjectId(xID) },
        { $set : userdata},
        { multi: false }
    );
console.log(userdata.VendorEmail);

    GetEmailTemplate("Vendor Assigned Email",function(xTemplate){

    SendMessage(userdata.VendorEmail,"Order Requested",xTemplate,response)


    })

});

router.post('/UpdateOrder/',function(req,response){

    var userdata=  req.body ;
var xID=userdata._id;

    delete userdata._id;


    db.requests.update(
        { _id : db.ObjectId(xID) },
        { $set : userdata},
        { multi: false }
    )
    response.send(true);

});



router.get('/SendBill/',function(req,response){
    var url_parts = url.parse(req.url, true);
    var query = url_parts.query;

    var xID=  query.ID.toString();

    //Get User Data;


    db.requests.find({_id:db.ObjectId(xID)}).toArray(
        function(err, items) {

            if (items.length==0){

                response.send("{\"results\":false}")
            }else{
                response.send(items);

            }


        }
    );


    var xEmail=response[0].Email

    GetEmailTemplate("Billing Email",function(xTemplate){

        xTemplate=xTemplate.replace("%LINK%","http://www.party-butler.com/Billing.html?ID="+xID)

    SendMessage(xEmail,"Order Billing",xTemplate,response);
    })




})

router.get('/OrderChange/',function(req,response){
    var url_parts = url.parse(req.url, true);
    var query = url_parts.query;
    var userdata=  query.Status.toString();

    var xID=  query.ID.toString();

    db.requests.update(
        { _id : db.ObjectId(xID) },
        { $set : {Status:userdata}},
        { multi: false }
    )

if(userdata=="Accepted"){

    GetEmailTemplate("Vendor Accepted Email",function(xTemplate){

        SendMessage("partybutler@yahoo.com","Order Accepted",xTemplate,response)
    });
}else{

    GetEmailTemplate("Vendor Rejected Email",function(xTemplate){

        SendMessage("partybutler@yahoo.com","Order Rejected by Vendor",xTemplate,response)
    })
}

});



router.get('/DisapproveUser/',function(req,response){
    var url_parts = url.parse(req.url, true);
    var query = url_parts.query;

    var ID=  query.ID.toString();
    db.users.update(
        { _id : db.ObjectId(ID) },
        { $set : {Approved:false}},
        { multi: false }
    )
    response.send(true);


});





router.get('/GetOrder/',function(req,response){

    var url_parts = url.parse(req.url, true);
    var query = url_parts.query;
    var xCat= query.ID;


    db.requests.find({_id:db.ObjectId(xCat)}).toArray(
        function(err, items) {

            if (items.length==0){

                response.send("{\"results\":false}")
            }else{


                var xID=items[0].Vendor;


                db.users.find({_id:db.ObjectId(xID)}).toArray(
                    function(err, items2) {

                        if (items2.length==0){

                            response.send("{\"results\":false}")
                        }else{
                            response.send({order:items,vendor:items2});

                        }

                    }
                );



            }

        }
    );

})


function GetEmailTemplate(xName,callback){



    db.pages.find({Name:xName}).sort({name:1}).toArray(
        function(err, items) {

            if (items.length==0){
                console.log("No Document Found")
                callback(null);
            }else{

console.log(items[0].Content);
                callback(decodeURIComponent(items[0].Content));


            }


        }
    );

}