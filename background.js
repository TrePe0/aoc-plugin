const aocBotUrl = 'https://7b79gj2si4.execute-api.eu-central-1.amazonaws.com/Prod/start';

// With manifest V2 and Firefox, chrome.* APIs don't return promises, but browser.* APIs do.
const browserOrChrome = typeof browser !== "undefined" ? browser : chrome;

browserOrChrome.tabs.onUpdated.addListener(async (tabId, changeInfo, tab) => {
    'use strict';
    if (changeInfo.status == 'complete' && tab.url) {
        const matches = tab.url.match(/\.com\/([0-9]{4})\/day\/([0-9]+)/);
        const timestamp = Math.floor(Date.now() / 1000);
        if (matches !== null) {
            const [, year, day] = matches;
            const { userName, part, error } = await browserOrChrome.tabs.sendMessage(tab.id, { text: 'get_user_name' });
            if (error) return;
            let { aoc_times: times } = await browserOrChrome.storage.sync.get(['aoc_times']);
            if (times === undefined) times = {};
            if (times[year] === undefined) times[year] = {};
            if (times[year][day] === undefined) times[year][day] = {};
            if (times[year][day][part] === undefined) {
                if (userName) {
                    const body = {
                        version: 1,
                        year: Number(year),
                        day: Number(day),
                        part: Number(part),
                        name: userName
                    };
                    const response = await fetch(aocBotUrl, {
                        method: 'post',
                        headers: {
                            'Content-Type': 'application/json'
                        },
                        body: JSON.stringify(body)
                    });
                    console.log(response);
                }

                times[year][day][part] = timestamp;
                await browserOrChrome.storage.sync.set({ aoc_times: times });
                console.log('User:', userName);
                console.log(times);
            }
        }
    }
});
