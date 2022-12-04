chrome.tabs.onUpdated.addListener(function (tabId, changeInfo, tab) {
    if (changeInfo.status == 'complete' && tab.url) {
        var matches = tab.url.match(/\.com\/([0-9]{4})\/day\/([0-9]+)$/);
        var timestamp = Math.floor(Date.now() / 1000);
        if (matches !== null) {
            var year = matches[1];
            var day = matches[2];
            chrome.tabs.sendMessage(tab.id, {text: 'get_user_name'}, function(response) {
                if (response.error) return;
                var userName = response.userName;
                var part = response.part;
                chrome.storage.sync.get(['aoc_times'], function(result) {
                    if (result.times === undefined) {
                        result = {times: {}};
                    }
                    if (result.times[year] === undefined) result.times[year] = {};
                    if (result.times[year][day] === undefined) result.times[year][day] = {};
                    if (result.times[year][day][part] === undefined) {
                        if (userName) {
                            var url = 'https://rb5ncgzaxj.execute-api.eu-central-1.amazonaws.com/Prod/'+year+'/day/'+day+'?part='+part+'&name='+encodeURIComponent(userName);
                            fetch(url).then((data) => { console.log(url); });
                        }
                        result.times[year][day][part] = timestamp;
                        chrome.storage.sync.set({aoc_times: result.times}, function() {
                            console.log('User: '+userName);
                            console.log(result.times);
                        });
                    }
                });
            });
        }
    }
});
