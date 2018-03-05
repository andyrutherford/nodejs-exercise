const https = require('https');
const http = require('http');

//Print error messages
function printError(error) {
  console.error(error.message); 
}

//Function to print message to console
function printMessage(username, badgeCount, points) {
   const message = `${username} has ${badgeCount} total badges and ${points} points in Javascript.`;
  console.log(message);
}

//Get profile information with supplied username
function get(username) {
  try {
    //Connect to the API URL (https://teamtreehouse.com/${username}.json)
    const request = https.get(`https://teamtreehouse.com/${username}.json`, response => {
      if (response.statusCode === 200) {
        let body = "";
        
        //Read data
        response.on('data', data => { 
          body += data.toString();
        });
        
        response.on('end', () => {
          try {
            //Parse data
            const profile = JSON.parse(body);
            //Print data
            printMessage(username, profile.badges.length, profile.points.JavaScript);
          } catch (error) {
            printError(error);
          }
        }); 
      } else {
        const message = `There was an error getting the profile for ${username} (${response.statusCode} ${http.STATUS_CODES[response.statusCode]})`;
        const statusCodeError = new Error(message);
        printError(statusCodeError);
      }
    });
    
    request.on('error', printError);
  } 
  catch (error) {
    printError(error);
  } 
}

module.exports.get = get;
