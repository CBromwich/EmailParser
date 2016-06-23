//Author: Cody Bromwich
//Date: 6/23/2016
//Github url: https://github.com/CBromwich/parkHours

/*
Dynamically retrieves park hours and EMH from the Disney World website
*/


//Dependencies for scraping data
var request = require("request");
var cheerio = require("cheerio");


var url = "https://disneyworld.disney.go.com/calendars/"; //Disney"s official page for park hours
    
request(url, function (error, response, html) {
    "use strict"; //so JSLint will stop yelling at me
    
    //if request does not return an error
    if (!error) {
        var $ = cheerio.load(html);
        
        //filter() creates a subset of the DOM using only the matching selectors (.clickRow in this case)
        $(".clickRow").filter(function() { 
            var data = $(this); // data is the .clickRow object in the DOM
            
            var name = data.children().first().text(); //get first child of .clickRow, park name
            var hours = data.children().eq(1).text(); // Get second child of .clickRow (index from 0), hours
            var emh = data.children().eq(2).text(); // Extra Magic Hours, third child of .clickRow
            
            console.log(name);
            console.log(hours);
            console.log("\nExtra Magic Hours\n" + emh);
        });
    }
});