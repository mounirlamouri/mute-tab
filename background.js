chrome.browserAction.onClicked.addListener(tab => {
  chrome.tabs.update(tab.id, { muted: !tab.mutedInfo.muted });
});

chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
  if (changeInfo.audible === undefined && changeInfo.mutedInfo === undefined)
    return;

  if (tab.mutedInfo.muted)
    chrome.browserAction.setTitle({ tabId: tabId, title: "Unmute this tab" });
  else
    chrome.browserAction.setTitle({ tabId: tabId, title: "Mute this tab" });

  if (tab.mutedInfo.muted) {
    chrome.browserAction.setIcon({
      tabId: tabId,
      path: {
        "18": "icons/ic_volume_off/ic_volume_off_black_1x_web_18dp.png",
        "36": "icons/ic_volume_off/ic_volume_off_black_2x_web_18dp.png",
      }
    });
  } else if (tab.audible) {
    chrome.browserAction.setIcon({
      tabId: tabId,
      path: {
        "18": "icons/ic_volume_up/ic_volume_up_black_1x_web_18dp.png",
        "36": "icons/ic_volume_up/ic_volume_up_black_2x_web_18dp.png",
      }
    });
  } else {
    chrome.browserAction.setIcon({
      tabId: tabId,
      path: {
        "18": "icons/ic_volume_mute/ic_volume_mute_black_1x_web_18dp.png",
        "36": "icons/ic_volume_mute/ic_volume_mute_black_2x_web_18dp.png",
      }
    });
  }
});
