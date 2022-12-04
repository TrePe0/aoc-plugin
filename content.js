chrome.runtime.onMessage.addListener(function (msg, sender, sendResponse) {
    if (msg.text === 'get_user_name') {
        var el = document.querySelector('header .user');
        var error = (document.getElementsByClassName('day-desc').length == 0);
        if (el === null) sendResponse({userName:'', part:1, error: error});
        else {
            var i = el.innerHTML.indexOf('<');
            sendResponse({
                userName: (i <= 0 ? el.innerHTML : el.innerHTML.substr(0, i - 1)),
                part: (document.getElementById('part2') !== null) + 1,
                error: error
            });
        }
    }
});
