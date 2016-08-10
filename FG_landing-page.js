// clear local storage
localStorage.clear();

// make cookie sharable across domains
var trackAcross = ";domain=" + location.host.replace('www.','') + "; path=/";

// log input of current field to cookie when user changes field
$("form input:text").focusout(function () {
    localStorage[$(this).attr('name')] = $(this).val();
    document.cookie = $(this).attr('name') + "=" + $(this).val() + trackAcross;

    // create cookie & start FraudGuard once all fields have been provided
    if (localStorage.getItem("firstName") &&
        localStorage.getItem("lastName") &&
        localStorage.getItem("invoiceAddress") &&
        localStorage.getItem("invoiceZipcode") &&
        localStorage.getItem("invoiceCity")) {
        // userID = unique user identifier, created with full name + address
        var userID =    localStorage.getItem("firstName") + " " +
                        localStorage.getItem("lastName")  + " " +
                        localStorage.getItem("invoiceAddress");

        document.cookie = "userID=" + userID + trackAcross;

        // start FraudGuard
        var _fg = window._fg = window._fg || {};
        _fg['_setAccountId'] = '39ba52c6-1fd4-465d-945a-c0b7cb23222e';
        _fg['_setUserId'] = userID;
        _fg['_setSessionId'] = "";
        _fg['_setTrack'] = 'page_view';

        (function(d, s, id) {
            var e, f = d.getElementsByTagName(s)[0];
            if (d.getElementById(id)) {return;}
            e = d.createElement(s); e.id = id;
            e.src = '//fraud.aletia.io/snippet/s.js',
                f.parentNode.insertBefore(e, f);
        })(document, 'script', 'fg-beacon');

        console.log("This userID was sent to FraudGuard: " + userID);
    }
});