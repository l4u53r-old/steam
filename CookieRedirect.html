// delay until page 2 kicks in.
// In MILLISECONDS. So 60 minutes = 3600000 ms.
delay = 3600000;
// Page to go to if cookie exists
// this will ALWAYS go to yourdomain.com/secondvisit
// so simply create an unbounce page that links to yourdomain.com/secondvisit
newsite = window.location + "/secondvisit"
go_to = newsite;
// number of days cookie lives for
num_days = 60;

function ged(noDays){
    var today = new Date();
    var expr = new Date(today.getTime() + noDays*24*60*60*1000);
    return expr.toGMTString();
}

// get current timestamp
function timestamp_minusDelay(number) {
    var now = Date.now();
    var threshold = now - number;
    return threshold;
}

// retrieve timestamp of the cookie
function cookie_timestamp(cname) {
    var name = cname + "=";
    var ca = document.cookie.split(';');
    for(var i = 0; i <ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0)==' ') {
            c = c.substring(1);
        }
        if (c.indexOf(name) == 0) {
            return c.substring(name.length,c.length);
        }
    }
    return "";
}

// Redirect logic
function readCookie(cookieName){
// set a cookie of none is set
    var start = document.cookie.indexOf(cookieName);
    if (start == -1){
        // set content of cookie
        document.cookie = "seenit=yes"; // name of cookie
        document.cookie = "expires=" + ged(num_days); // expiration date
        document.cookie = "timestamp=" + timestamp_minusDelay(0);
        // redirect only if timestamp of cookie < timestamp - delay
    } else if (cookie_timestamp("timestamp") < timestamp_minusDelay(delay)) {
        window.location = go_to;
    }
}

readCookie("seenit");

// FOR DEBUGGING
//
// View cookie
// function getCookie(){
//     alert(document.cookie);
// }
// getCookie();
//
// Compare timestamps
// console.log("Browser TS-60: " + timestamp_minusDelay(delay));
// console.log("Cookie TS: " + cookie_timestamp("timestamp"));
// console.log("Cookie timestamp - browser timestamp");
// console.log(cookie_timestamp("timestamp") - timestamp_minusDelay(0));
// if (cookie_timestamp("timestamp") < timestamp_minusDelay(delay)) {
//     console.log("The cookie needs some time to ripe.");
// } else {
//     console.log("The cookie is ready to be eaten.");
// }