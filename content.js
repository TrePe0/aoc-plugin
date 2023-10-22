chrome.runtime.onMessage.addListener((msg, sender, sendResponse) => {
    'use strict';

    if (msg.text === 'get_start_data') {
        onGetStartData(sendResponse);
    } else if (msg.text === 'get_stop_data') {
        onGetStopData(sendResponse);
    }
});

const onGetStartData = (sendResponse) => {
    'use strict';

    const error = (document.getElementsByClassName('day-desc').length === 0);
    if (error) {
        sendResponse({ error: true });
        return;
    }

    const userName = getUserName();
    if (!userName) {
        sendResponse({ error: true });
        return;
    }

    const part = (document.getElementById('part2') === null ? 1 : 2);
    sendResponse({ userName, part });
};

const onGetStopData = (sendResponse) => {
    'use strict';

    const error = (document.getElementsByClassName('day-success').length === 0);
    if (error) {
        sendResponse({ error: true });
        return;
    }

    const userName = getUserName();
    if (!userName) {
        sendResponse({ error: true });
        return;
    }

    const part = (document.getElementsByClassName('share') === null ? 1 : 2);
    sendResponse({ userName, part });
};

const getUserName = () => {
    'use strict';

    const element = document.querySelector('header .user');
    if (!element) {
        return undefined;
    }

    return element.textContent.trim();
};
