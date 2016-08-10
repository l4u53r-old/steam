// make cookie sharable across domains
document.cookie = "domain=" + document.domain + "; path=/";

// clear local storagee
localStorage.clear();

// log input of current field to cookie when user changes field
$("form input:text").focusout(function () {
    document.cookie = $(this).attr('name') + "=" + $(this).val();
    localStorage[$(this).attr('name')] = $(this).val();

    // create cookie once all fields are provided
    if (localStorage.getItem("firstName") && localStorage.getItem("lastName") && localStorage.getItem("invoiceAddress")) {
        var fullName = localStorage.getItem("firstName") + " " + localStorage.getItem("lastName");

        document.cookie = "fullName=" + fullName;
        var userID = fullName + ", " + localStorage.getItem("invoiceAddress"); // provide full name + address as unique user identifier

        // then start fraudguard
        var _fg = window._fg = window._fg || {};
        _fg['_setAccountId'] = '42c2225b-d170-47d2-ad03-16f8c8ef5c92';
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