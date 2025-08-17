import { getCountryProfile } from './profiles.js';

// Content scripts
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.action === "getCountryProfile") {
    sendResponse(getCountryProfile(request.country));
  }
});
// Initialize extension state
chrome.runtime.onInstalled.addListener(() => {
  chrome.storage.local.set({ 
    isActive: false,
    currentProfile: null,
    customProfiles: []
  });
});

// WebRTC protection
if (chrome.privacy?.network?.webRTCIPHandlingPolicy?.set) {
  chrome.privacy.network.webRTCIPHandlingPolicy.set({
    value: 'disable_non_proxied_udp'
  });
}

// Message handling
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.action === "getState") {
    chrome.storage.local.get(['isActive', 'currentProfile'], result => {
      sendResponse(result);
    });
    return true;
  }
  
  if (request.action === "setProfile") {
    chrome.storage.local.set({ 
      currentProfile: request.profile,
      isActive: true
    }, () => {
      sendResponse({ status: "success" });
    });
    return true;
  }
  
  if (request.action === "resetToDefault") {
    chrome.storage.local.set({ 
      isActive: false,
      currentProfile: null
    }, () => {
      sendResponse({ status: "reset" });
    });
    return true;
  }
  
  if (request.action === "saveCustomProfile") {
    chrome.storage.local.get(['customProfiles'], result => {
      const customProfiles = [...(result.customProfiles || []), request.profile];
      chrome.storage.local.set({ customProfiles }, () => {
        sendResponse({ status: "saved" });
      });
    });
    return true;
  }
  
  if (request.action === "enableTor") {
    chrome.proxy.settings.set({
      value: {
        mode: "fixed_servers",
        rules: {
          singleProxy: {
            scheme: "socks5",
            host: "127.0.0.1", 
            port: 9050
          },
          bypassList: ["<-loopback>"]
        }
      },
      scope: 'regular'
    }, () => {
      sendResponse({ status: "tor_enabled" });
    });
    return true;
  }
  
  if (request.action === "disableTor") {
    chrome.proxy.settings.clear({ scope: 'regular' }, () => {
      sendResponse({ status: "tor_disabled" });
    });
    return true;
  }
});

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.action === "getCountryProfile") {
    const profile = countryProfiles[request.country];
    sendResponse(profile || null);
  }
});