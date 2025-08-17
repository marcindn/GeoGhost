document.addEventListener('DOMContentLoaded', initPopup);

async function initPopup() {
  const elements = {
    statusIndicator: document.getElementById('statusIndicator'),
    ipAddress: document.getElementById('ipAddress'),
    ipLocation: document.getElementById('ipLocation'),
    ipTimezone: document.getElementById('ipTimezone'),
    countryGrid: document.querySelector('.country-grid'),
    currentTime: document.getElementById('currentTime'),
    languageDisplay: document.getElementById('languageDisplay'),
    resetButton: document.getElementById('resetButton'),
    importBtn: document.getElementById('importBtn'),
    exportBtn: document.getElementById('exportBtn'),
    testFingerprint: document.getElementById('testFingerprint'),
    testResults: document.getElementById('testResults'),
    customProfilesList: document.getElementById('customProfilesList'),
    proFeatures: document.getElementById('proFeatures'),
    scanCookies: document.getElementById('scanCookies'),
    cookieResults: document.getElementById('cookieResults'),
    ghostMode: document.getElementById('ghostMode'),
    webglShaderSpoof: document.getElementById('webglShaderSpoof'),
    audioFingerprintProtection: document.getElementById('audioFingerprintProtection'),
    torToggle: document.getElementById('torToggle'),
    torStatus: document.getElementById('torStatus'),
    toggleAdvanced: document.getElementById('toggleAdvanced')
  };

  let timeInterval;
  const state = {
    active: false,
    currentProfile: null,
    realIp: 'Loading...',
    location: 'Unknown',
    timezone: 'UTC',
    ipRevealed: false,
    originalLanguage: navigator.language,
    customProfiles: [],
    advancedVisible: false
  };

  window.addEventListener('beforeunload', () => {
    clearInterval(timeInterval);
  });

  // Initialize
  await fetchRealIp();
  loadState();
  loadCustomProfiles();
  renderCountryCards(elements, state);
  setupEventListeners(elements, state);
  updateUI(elements, state);
  startTimeUpdate(elements, state);

  // Functions
  async function fetchRealIp() {
    try {
      const response = await fetch('https://api.ipify.org?format=json');
      const data = await response.json();
      state.realIp = data.ip;
      await fetchGeolocation();
    } catch (error) {
      console.error('IP fetch error:', error);
      state.realIp = '192.xxx.xxx.xxx';
      state.location = 'Unknown location';
    }
    updateUI(elements, state);
  }

  async function fetchGeolocation() {
    try {
      const response = await fetch(`https://ipapi.co/${state.realIp}/json/`);
      const data = await response.json();
      state.location = `${data.city || 'Unknown'}, ${data.country_name || 'Unknown'}`;
      state.timezone = data.timezone || 'UTC';
    } catch (error) {
      console.error('Geolocation error:', error);
      state.location = 'Unknown location';
    }
    updateUI(elements, state);
  }

  function loadState() {
    chrome.runtime.sendMessage({action: "getState"}, (result) => {
      state.active = result.isActive || false;
      state.currentProfile = result.currentProfile || null;
      
      // Load advanced features visibility
      chrome.storage.local.get(['advancedVisible'], (data) => {
        state.advancedVisible = data.advancedVisible || false;
        updateUI(elements, state);
      });
    });
  }

  function loadCustomProfiles() {
    chrome.storage.local.get(['customProfiles'], (result) => {
      if (result.customProfiles) {
        state.customProfiles = result.customProfiles;
        renderCustomProfiles(elements, state);
      }
    });
  }

  function saveState() {
    chrome.storage.local.set({
      isActive: state.active,
      currentProfile: state.currentProfile
    });
    updateBrowserIcon();
  }

  function updateUI(elements, state) {
    // Update status indicator
    elements.statusIndicator.classList.toggle('active', state.active);
    
    // Update IP info
    elements.ipAddress.textContent = state.realIp;
    elements.ipLocation.textContent = state.location;
    elements.ipTimezone.textContent = state.timezone;
    
    // Update language based on profile or original
    if (state.active && state.currentProfile) {
      elements.languageDisplay.textContent = state.currentProfile.language;
    } else {
      elements.languageDisplay.textContent = state.originalLanguage;
    }
    
    // Update country cards
    document.querySelectorAll('.country-card').forEach(card => {
      const isActive = state.currentProfile?.id === card.dataset.country;
      card.classList.toggle('active', isActive);
    });
    
    // Update IP blur
    if (state.ipRevealed) {
      elements.ipAddress.classList.remove('blurred');
      elements.ipAddress.classList.add('revealed');
    } else {
      elements.ipAddress.classList.add('blurred');
      elements.ipAddress.classList.remove('revealed');
    }
    
    // Update advanced features visibility
    elements.proFeatures.style.display = state.advancedVisible ? 'block' : 'none';
  }

  function startTimeUpdate(elements, state) {
    function updateTime() {
      const now = new Date();
      try {
        if (state.active && state.currentProfile) {
          // Use profile timezone
          elements.currentTime.textContent = now.toLocaleTimeString(
            'en-US', 
            { 
              timeZone: state.currentProfile.timezone,
              hour: '2-digit',
              minute: '2-digit',
              second: '2-digit'
            }
          );
        } else {
          // Use local timezone
          elements.currentTime.textContent = now.toLocaleTimeString([], {
            hour: '2-digit',
            minute: '2-digit',
            second: '2-digit'
          });
        }
      } catch (e) {
        console.error('Error updating time:', e);
        elements.currentTime.textContent = '--:--:--';
      }
    }
    
    updateTime();
    timeInterval = setInterval(updateTime, 1000); // TimeInterval
  }

  function updateBrowserIcon() {
    const iconPath = state.active ? 
      "../assets/icons/icon-active48.png" : "../assets/icons/icon48.png";
    chrome.action.setIcon({ path: iconPath });
  }

  function renderCountryCards(elements, state) {
    const countries = [
      {id: 'japan', name: 'Japan', flag: '../assets/flags/jp.svg'},
      {id: 'usa', name: 'USA', flag: '../assets/flags/us.svg'},
      {id: 'uk', name: 'UK', flag: '../assets/flags/gb.svg'},
      {id: 'germany', name: 'Germany', flag: '../assets/flags/de.svg'},
      {id: 'russia', name: 'Russia', flag: '../assets/flags/ru.svg'},
      {id: 'brazil', name: 'Brazil', flag: '../assets/flags/br.svg'},
      {id: 'spain', name: 'Spain', flag: '../assets/flags/es.svg'},
      {id: 'india', name: 'India', flag: '../assets/flags/in.svg'},
      {id: 'china', name: 'China', flag: '../assets/flags/cn.svg'}
    ];

    const fragment = document.createDocumentFragment(); // DocumentFragment
    
    countries.forEach(country => {
      const card = document.createElement('div');
      card.className = 'country-card';
      card.dataset.country = country.id;
      card.innerHTML = `
        <img src="${country.flag}" alt="${country.name}">
        <span>${country.name}</span>
        <div class="active-indicator"></div>
      `;
      fragment.appendChild(card);
    });

    elements.countryGrid.innerHTML = '';
    elements.countryGrid.appendChild(fragment);
  }

  function renderCustomProfiles(elements, state) {
    elements.customProfilesList.innerHTML = '';
    state.customProfiles.forEach(profile => {
      const item = document.createElement('div');
      item.className = 'custom-profile-item';
      item.innerHTML = `
        <span>${profile.name}</span>
        <button class="use-profile-btn" data-id="${profile.id}">Use</button>
      `;
      elements.customProfilesList.appendChild(item);
    });
    
    // Add event listeners for custom profile buttons
    document.querySelectorAll('.use-profile-btn').forEach(btn => {
      btn.addEventListener('click', (e) => {
        const profileId = e.target.dataset.id;
        const profile = state.customProfiles.find(p => p.id === profileId);
        if (profile) {
          state.currentProfile = profile;
          state.active = true;
          saveState();
          updateUI(elements, state);
          
          // Apply profile
          chrome.runtime.sendMessage({
            action: "setProfile",
            profile: state.currentProfile
          });
        }
      });
    });
  }

  function setupEventListeners(elements, state) {
    // Country selection
    elements.countryGrid.addEventListener('click', (e) => {
      const card = e.target.closest('.country-card');
      if (card) {
        const country = card.dataset.country;
        getCountryProfile(country).then(profile => {
          state.currentProfile = profile;
          state.active = true;
          saveState();
          updateUI(elements, state);
          
          // Apply profile
          chrome.runtime.sendMessage({
            action: "setProfile",
            profile: state.currentProfile
          });
        });
      }
    });
    
    // IP reveal toggle
    elements.ipAddress.addEventListener('click', () => {
      state.ipRevealed = !state.ipRevealed;
      updateUI(elements, state);
    });
    
    // Reset button
    elements.resetButton.addEventListener('click', () => {
      state.active = false;
      state.currentProfile = null;
      state.ipRevealed = false;
      saveState();
      updateUI(elements, state);
      
      chrome.runtime.sendMessage({
        action: "resetToDefault"
      }, () => {
        // Restore original values in content script
        chrome.tabs.query({active: true, currentWindow: true}, (tabs) => {
          if (tabs[0]?.id) {
            chrome.tabs.sendMessage(tabs[0].id, {action: "restoreOriginal"}, () => {
              if (chrome.runtime.lastError) {
                console.warn("Content script not ready:", chrome.runtime.lastError);
              }
            });
          }
        });
      });
    });
    
    // Import profile
    elements.importBtn.addEventListener('click', () => {
      const input = document.createElement('input');
      input.type = 'file';
      input.accept = '.json';
      input.onchange = e => {
        const file = e.target.files[0];
        const reader = new FileReader();
        reader.onload = event => {
          try {
            const profile = JSON.parse(event.target.result);
            chrome.runtime.sendMessage({
              action: "saveCustomProfile",
              profile
            }, () => {
              loadCustomProfiles();
              alert(`Profile "${profile.name}" imported!`);
            });
          } catch (e) {
            alert('Invalid profile file');
          }
        };
        reader.readAsText(file);
      };
      input.click();
    });
    
    // Export profile
    elements.exportBtn.addEventListener('click', () => {
      if (!state.currentProfile) {
        alert('No active profile to export');
        return;
      }
      
      const data = JSON.stringify(state.currentProfile, null, 2);
      const blob = new Blob([data], {type: 'application/json'});
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `geoghost-${state.currentProfile.id}-profile.json`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
    });
    
    // Test fingerprint
    elements.testFingerprint.addEventListener('click', async () => {
      elements.testResults.textContent = 'Testing...';
      try {
        const tests = {
          ip: await testIP(),
          webgl: testWebGL(),
          timezone: testTimezone(),
          language: testLanguage(),
          trackers: await testTrackers(),
          webglShader: testWebGLShader(),
          audioFingerprint: testAudioFingerprint()
        };
        
        let successCount = 0;
        let resultsHTML = '';
        
        for (const [testName, result] of Object.entries(tests)) {
          resultsHTML += `<div class="test-result ${result.success ? 'success' : 'fail'}">
            ${testName.toUpperCase()}: ${result.message}
          </div>`;
          if (result.success) successCount++;
        }
        
        const successRate = Math.round((successCount / Object.keys(tests).length) * 100);
        resultsHTML = `<div class="test-summary">Success rate: ${successRate}%</div>` + resultsHTML;
        
        elements.testResults.innerHTML = resultsHTML;
      } catch (e) {
        elements.testResults.textContent = 'Test failed: ' + e.message;
      }
    });
    
    // Toggle advanced features
    elements.toggleAdvanced.addEventListener('click', () => {
      state.advancedVisible = !state.advancedVisible;
      chrome.storage.local.set({ advancedVisible: state.advancedVisible });
      updateUI(elements, state);
    });
    
    // Cookie scanner
    elements.scanCookies.addEventListener('click', async () => {
      elements.cookieResults.textContent = "Scanning cookies...";
      
      chrome.cookies.getAll({}, (cookies) => {
        const trackers = cookies.filter(cookie => 
          cookie.domain.includes('google') || 
          cookie.domain.includes('facebook') ||
          cookie.domain.includes('tracking')
        );
        
        elements.cookieResults.innerHTML = `
          <div class="test-summary">Found ${trackers.length} tracking cookies</div>
          <button id="removeTrackers" class="test-btn">Remove Trackers</button>
        `;
        
        document.getElementById('removeTrackers').addEventListener('click', () => {
          trackers.forEach(cookie => {
            chrome.cookies.remove({
              url: `http${cookie.secure ? 's' : ''}://${cookie.domain}${cookie.path}`,
              name: cookie.name
            });
          });
          elements.cookieResults.innerHTML += '<div class="test-result success">Tracking cookies removed!</div>';
        });
      });
    });
    
    // Ghost Navigation
    elements.ghostMode.addEventListener('change', (e) => {
      chrome.storage.local.set({ ghostModeEnabled: e.target.checked });
    });
    
    // WebGL Shader Spoofing
    elements.webglShaderSpoof.addEventListener('change', (e) => {
      chrome.storage.local.set({ webglShaderSpoofEnabled: e.target.checked });
    });
    
    // AudioContext Protection
    elements.audioFingerprintProtection.addEventListener('change', (e) => {
      chrome.storage.local.set({ audioFingerprintProtectionEnabled: e.target.checked });
    });
    
    // Tor Integration
    elements.torToggle.addEventListener('change', (e) => {
      const enabled = e.target.checked;
      chrome.runtime.sendMessage({
        action: enabled ? "enableTor" : "disableTor"
      }, (response) => {
        elements.torStatus.textContent = `Status: ${enabled ? 'Enabled' : 'Disabled'}`;
      });
    });
    
    chrome.storage.local.get(['advancedVisible'], (result) => {
      if (result.advancedVisible) {
        state.advancedVisible = true;
        updateUI(elements, state);
      }
    });
    
    async function testIP() {
      try {
        const response = await fetch('https://api.ipify.org?format=json');
        const data = await response.json();
        return {
          success: data.ip !== state.realIp,
          message: `Current: ${data.ip} | Real: ${state.realIp}`
        };
      } catch (e) {
        return {
          success: false,
          message: `IP test failed: ${e.message}`
        };
      }
    }
    
    function testWebGL() {
      try {
        const canvas = document.createElement('canvas');
        const gl = canvas.getContext('webgl') || canvas.getContext('experimental-webgl');
        if (!gl) {
          return {
            success: false,
            message: "WebGL not supported"
          };
        }
        
        const renderer = gl.getParameter(gl.RENDERER);
        const expected = state.currentProfile?.webglRenderer || '';
        
        return {
          success: renderer.includes(expected),
          message: `Detected: ${renderer} | Expected: ${expected}`
        };
      } catch (e) {
        return {
          success: false,
          message: `WebGL error: ${e.message}`
        };
      }
    }
    
    function testTimezone() {
      try {
        const detected = Intl.DateTimeFormat().resolvedOptions().timeZone;
        const expected = state.currentProfile?.timezone || '';
        
        return {
          success: detected === expected,
          message: `Detected: ${detected} | Expected: ${expected}`
        };
      } catch (e) {
        return {
          success: false,
          message: `Timezone test failed: ${e.message}`
        };
      }
    }
    
    function testLanguage() {
      try {
        const detected = navigator.language;
        const expected = state.currentProfile?.language || '';
        
        return {
          success: detected === expected,
          message: `Detected: ${detected} | Expected: ${expected}`
        };
      } catch (e) {
        return {
          success: false,
          message: `Language test failed: ${e.message}`
        };
      }
    }
    
    async function testTrackers() {
      try {
        const cookies = await new Promise(resolve => {
          chrome.cookies.getAll({}, resolve);
        });
        
        const trackerCount = cookies.filter(c => 
          c.domain.includes('google') || 
          c.domain.includes('facebook')
        ).length;
        
        return {
          success: trackerCount === 0,
          message: `Trackers: ${trackerCount} found`
        };
      } catch (e) {
        return {
          success: false,
          message: `Tracker test failed: ${e.message}`
        };
      }
    }
    
    function testWebGLShader() {
      try {
        const canvas = document.createElement('canvas');
        const gl = canvas.getContext('webgl');
        if (!gl) {
          return {
            success: false,
            message: "WebGL not available"
          };
        }
        
        const format = gl.getShaderPrecisionFormat(gl.FRAGMENT_SHADER, gl.HIGH_FLOAT);
        return {
          success: format.rangeMin === 127 && format.rangeMax === 127,
          message: `Shader precision: ${format.rangeMin}-${format.rangeMax}`
        };
      } catch (e) {
        return {
          success: false,
          message: "Shader test failed"
        };
      }
    }
    
    function testAudioFingerprint() {
      try {
        const AudioContext = window.AudioContext || window.webkitAudioContext;
        if (!AudioContext) {
          return {
            success: false,
            message: "AudioContext not supported"
          };
        }
        
        const context = new AudioContext();
        const oscillator = context.createOscillator();
        const analyser = context.createAnalyser();
        
        oscillator.connect(analyser);
        analyser.connect(context.destination);
        oscillator.start();
        context.close();
        
        const dataArray = new Float32Array(analyser.frequencyBinCount);
        analyser.getFloatFrequencyData(dataArray);
        
        oscillator.stop();
        
        const variance = Math.max(...dataArray) - Math.min(...dataArray);
        return {
          success: variance < 5,
          message: `Audio variance: ${variance.toFixed(2)} dB`
        };
      } catch (e) {
        return {
          success: false,
          message: `Audio test failed: ${e.message}`
        };
      }
    }
  }

  async function getCountryProfile(country) {
    return new Promise((resolve) => {
      chrome.runtime.sendMessage(
        { action: "getCountryProfile", country },
        (profile) => resolve(profile)
      );
    });
  }
}