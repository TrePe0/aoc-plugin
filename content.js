chrome.runtime.onMessage.addListener((msg, sender, sendResponse) => {
    'use strict';
    if (msg.text === 'get_user_name') {
        const el = document.querySelector('header .user');
        const error = (document.getElementsByClassName('day-desc').length === 0);
        if (el === null) sendResponse({ userName: '', part: 1, error: error });
        else {
            const i = el.innerHTML.indexOf('<');
            sendResponse({
                userName: (i <= 0 ? el.innerHTML : el.innerHTML.substring(0, i)),
                part: (document.getElementById('part2') !== null) + 1,
                error: error
            });
        }
    }
});
