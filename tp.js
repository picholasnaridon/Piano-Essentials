var aid = document.currentScript.getAttribute('aid')
var environment = document.currentScript.getAttribute('environment')

// ADD ADBLOCK
var adblock = document.createElement('script');
adblock.type = 'text/javascript';
adblock.innerHTML = 
`
    document.cookie = "__adblocker=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/";
    var setNptTechAdblockerCookie = function(adblocker) {
        var d = new Date();
        d.setTime(d.getTime() + 60 * 60 * 24 * 2 * 1000);
        document.cookie = "__adblocker=" + (adblocker ? "true" : "false") + "; expires=" + d.toUTCString() + "; path=/";
    };
    var script = document.createElement("script");
    script.setAttribute("async", true);
    script.setAttribute("src", "//www.npttech.com/advertising.js");
    script.setAttribute("onerror", "setNptTechAdblockerCookie(true);");
    document.getElementsByTagName("head")[0].appendChild(script);
`

// ADD COMPOSER
document.head.appendChild(adblock);
var composer = document.createElement('script')
composer.type='text/javascript'
composer.innerHTML = `
    (function(src) {
        var a = document.createElement("script");
        a.type = "text/javascript";
        a.async = true;
        a.src = src;
        var b = document.getElementsByTagName("script")[0];
        b.parentNode.insertBefore(a, b)
    })("//${environment}.tinypass.com/xbuilder/experience/load?aid=${aid}")
`
document.body.appendChild(composer);

 //BUTTONS
 tp = window.tp || []


var loginLogoutBtns = document.getElementsByTagName("piano-login-logout")
var registerMyAccountBtns = document.getElementsByTagName("piano-register-myaccount")
var myAccount = document.getElementsByTagName("piano-my-account")

myAccount[0].classList.add("myAccountClass")

tp.push(["init", function(){
    if (tp.user.isUserValid()){
        for (let i=0; i < loginLogoutBtns.length; i++){
            loginLogoutBtns[i].innerHTML = "Logout"
            loginLogoutBtns[i].addEventListener("click", function(){
                tp.user.logout()
                location.reload()
            })
        }
        for (let i=0; i < registerMyAccountBtns.length; i++){
            registerMyAccountBtns[i].innerHTML = "My Account"
            myAccount[0].setAttribute("style", "visibility: visible; width: 1000px")
            registerMyAccountBtns[i].addEventListener("click", function(){
                tp.myaccount.show({
                    displayMode: "inline",
                    containerSelector: ".myAccountClass"
                })
            })
        }
    }else {
        for (let i=0; i < loginLogoutBtns.length; i++){
            loginLogoutBtns[i].innerHTML = "Login"
            loginLogoutBtns[i].addEventListener("click", function(){
                tp.pianoId.show({
                    screen: "login",
                    loggedIn: function(){
                        location.reload()
                    }
                })
            })
        }
        for (let i=0; i < registerMyAccountBtns.length; i++){
            registerMyAccountBtns[i].innerHTML = "Register"
            registerMyAccountBtns[i].addEventListener("click", function(){
                tp.pianoId.show({
                    screen: "register",
                    loggedIn: function(){
                        location.reload()
                    }
                })
            })
        }
    }
}])

// PASSWORD RESET

tp.push(['init', function() {
    // Password can be reset only if user is anonymous
    if (!tp.user.isUserValid()) {
        // If URL has reset_token parameter
        var tokenMatch = location.search.match(/reset_token=([A-Za-z0-9]+)/);
        if (tokenMatch) {
            // Get value of the token
            var token = tokenMatch[1];
            // Present password reset form with the found token
            tp.pianoId.show({
                'resetPasswordToken': token, loggedIn: function () {
                    // Once user logs in - refresh the page
                    location.reload();
                }
            });
        }
    }
}]);

// 