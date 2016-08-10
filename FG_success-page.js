// <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.1.0/jquery.min.js"></script>
// Get information required by FraudGuard

    // Get current time in accordance to RFC 3339
    function ISODateString(d){
        function pad(n){return n<10 ? '0'+n : n}
        return d.getUTCFullYear()+'-'
            + pad(d.getUTCMonth()+1)+'-'
            + pad(d.getUTCDate())+'T'
            + pad(d.getUTCHours())+':'
            + pad(d.getUTCMinutes())+':'
            + pad(d.getUTCSeconds())+'Z'}

    var d = new Date();
    var currentTime = ISODateString(d);

    // Get Viskan's information from URL in browser
    function getQueryParams(qs) {
        qs = qs.split('+').join(' ');

        var params = {},
            tokens,
            re = /[?&]?([^=]+)=([^&]*)/g;

        while (tokens = re.exec(qs)) {
            params[decodeURIComponent(tokens[1])] = decodeURIComponent(tokens[2]);
        }

        return params;
    }

        var query = getQueryParams(document.location.search);
        var viskan_purchaseNumber = query.purchaseNumber;
        var viskan_currency = query.currency;
        var viskan_totalValue = query.totalValue;
        var viskan_country = query.country;
        // var viskan_customerNumber = query.customerNumber;

    // Read cookie from landing page - get customer's address information
        (function(){
            var cookies;

            function readCookie(name,c,C,i){
                if(cookies){ return cookies[name]; }

                c = document.cookie.split('; ');
                cookies = {};

                for(i=c.length-1; i>=0; i--){
                    C = c[i].split('=');
                    cookies[C[0]] = C[1];
                }

                return cookies[name];
            }

            window.readCookie = readCookie;
        })();

        // Assign cookie values to variables
        var firstName = readCookie("firstName");
        var lastName = readCookie("lastName");
        var invoiceAddress = readCookie("invoiceAddress");
        var invoiceZipcode = readCookie("invoiceZipcode");
        var invoiceCity = readCookie("invoiceCity");
        var userID = readCookie("userID");

// Feed FraudGuard with above values

        // Get user's ip
        var currentIP = null;

        var getCurrentIP = function() {
            $.when($.ajax({
                url: 'https://api.ipify.org?format=jsonp&callback=?',
                async: false,
                dataType: 'json',
                contentType: 'application/j-son;charset=UTF-8',
                success: function (data) {
                    currentIP = data.ip;
                }
            })).then(function () {
                console.log(currentIP);
                startFG();
                return currentIP;
            });
        }

        currentIP = getCurrentIP();

        // Start FraudGuard
    function startFG() {
        var _fg = window._fg = window._fg || {};
        var _purchase = {
            device: {
                ip: currentIP,
                session_id: '',
                user_agent: '',
                accept_language: ''
            },
            event: {
                transaction_id: viskan_purchaseNumber,
                shop_id: window.location.host,
                time: currentTime,
                type: 'create_order'
            },
            account: {
                user_id: userID, // provide full name + address as unique user identifier
                email: ''
            },
            billing: {
                first_name: firstName,
                last_name: lastName,
                address: invoiceAddress,
                city: invoiceCity,
                country: viskan_country,
                postal: invoiceZipcode
            },
            shipping: {
                first_name: firstName,
                last_name: lastName,
                address: invoiceAddress,
                city: invoiceCity,
                country: viskan_country,
                postal: invoiceZipcode,
                delivery_speed: 'standard'
            },
            order: {
                amount: viskan_totalValue,
                currency: viskan_currency
            },
            shopping_cart: [
                {
                    category: '',
                    item_id: '',
                    quantity: 1,
                    price: viskan_totalValue
                }
            ]
            };

        _fg['_setAccountId'] = '39ba52c6-1fd4-465d-945a-c0b7cb23222e';
        _fg['_setUserId'] = userID;
        _fg['_setSessionId'] = '';
        _fg['_setTrack'] = 'create_order';
        _fg['_setWebhookUrl'] = 'https://www.freesmoke.no/success';
        _fg['_setTransaction'] = _purchase;

        (function(d, s, id) {
            var e, f = d.getElementsByTagName(s)[0];
            if (d.getElementById(id)) {return;}
            e = d.createElement(s); e.id = id;
            e.src = '//fraud.aletia.io/snippet/s.js',
                f.parentNode.insertBefore(e, f);
        })(document, 'script', 'fg-beacon');
        }