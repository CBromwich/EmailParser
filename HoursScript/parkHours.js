//Author: Cody Bromwich
//Date: 6/23/2016
//Github url: https://github.com/CBromwich/parkHours 

/*

Dynamically retrieves park hours and EMH from the Disney World website

Output: 
Data is stored in a 2D array dataList in format [[name, hours, emh]] for each .clickRow object

*/


//Dependencies for scraping data
var request = require("request");
var cheerio = require("cheerio");


var url = "https://disneyworld.disney.go.com/calendars/"; //Disney"s official page for park hours
var dataList = []; //Multidimensional array to hold arrays of each park field (Park name, hours EMH)
    
request(url, function (error, response, html) {
    "use strict"; //so JSLint will stop yelling at me
    
    if (!error) {
        var $ = cheerio.load(html);
        
        //filter() creates a subset of the DOM using only the matching selectors (.clickRow in this case)
        $(".clickRow").filter(function() {
            var list = []; // holds the three data values (name, hours, emh). This list is appended to dataList
            
            var data = $(this).children(); // data is the children of the .clickRow object in the DOM
            
            var name = data.first().text(); // get first child of .clickRow, park name
            var hours = data.eq(1).text(); // Get second child of .clickRow (index from 0), hours
            var emh = data.eq(2).text(); // Extra Magic Hours, third child of .clickRow
            
            // Eliminate leading and trailing spaces
            name = name.trim();
            hours = hours.trim();   
            emh = emh.trim();
            
            // Eliminate escape characters (\n)
            name = unescape(name); 
            hours = unescape(hours);
            emh = unescape(emh);
            
            list.push(name, hours, emh);
            dataList.push(list);
        });
    }
    //console.log(dataList); For testing
});
