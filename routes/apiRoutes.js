var friendData = require("../data/friends");

var datamatch = {
    name : '',
    photo: '',
    total:''
};


module.exports = function(app) {

    app.get("/api/friends", function(req, res) {

        res.json(friendData);
      });


    app.post("/api/survey", function(req, res) {
    // Note the code here. Our "server" will respond to requests and let users know if they have a table or not.
    // It will do this by sending out the value "true" have a table
    // req.body is available since we're using the body parsing middleware
        var person = req.body;

        console.log(person);
        console.log(friendData);

        console.log(friendData.length);
        var name = [];
        var total = [];
        var Photo = []

        for (i=0; i<friendData.length;i++){

            //console.log(friendData[i].name);

            name.push(friendData[i].name);
            Photo.push(friendData[i].photo);
            var score = 0;
            var len = friendData[i].scores.length;
            //console.log(len);
            for (k=0; k<len; k++){
                //console.log("got in");
                //console.log(Math.abs(person.scores[k]-friendData[i].scores[k]));
                score += Math.abs(person.scores[k]-friendData[i].scores[k]);
                //console.log("The diff is"+match.diff);
            }

            //console.log("The Match object" + match);
            total.push(score);
        }
        //datamatch.sort();
        console.log(name);
        console.log(total);
        console.log(Photo);


        for(i=1;i<=total.length;i++){

            if(total[i]<total[i-1]){
                
                var num1 = total[i-1];
                var name1 = name[i-1];
                var photo1 = Photo[i-1];
                total[i-1] = total[i];
                name[i-1] = name[i];
                Photo[i-1] = Photo[i];
                total[i] = num1;
                name[i] = name1;
                Photo[i] = photo1;

            }
        }

        console.log(name);
        console.log(total);
        console.log(Photo);

        datamatch.name = name[0];
        datamatch.photo = Photo[0];
        datamatch.total = total[0];

        console.log(datamatch);

        res.json(datamatch);
    });  


    

};

