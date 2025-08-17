const originalValues = {
  userAgent: navigator.userAgent,
  platform: navigator.platform,
  language: navigator.language,
  languages: [...navigator.languages],
  timezone: Intl.DateTimeFormat().resolvedOptions().timeZone,
  hardwareConcurrency: navigator.hardwareConcurrency,
  deviceMemory: navigator.deviceMemory,
  maxTouchPoints: navigator.maxTouchPoints,
  userAgentData: navigator.userAgentData ? [...navigator.userAgentData.brands] : null,
  plugins: [...navigator.plugins].map(p => ({name: p.name, filename: p.filename})),
  getCurrentPosition: navigator.geolocation.getCurrentPosition.bind(navigator.geolocation),
  resolvedOptions: Intl.DateTimeFormat.prototype.resolvedOptions,
  webglGetParameter: WebGLRenderingContext.prototype.getParameter,
  toDataURL: HTMLCanvasElement.prototype.toDataURL,
  getTimezoneOffset: Date.prototype.getTimezoneOffset,
  getImageData: CanvasRenderingContext2D.prototype.getImageData,
  queryLocalFonts: window.queryLocalFonts,
  getBattery: navigator.getBattery,
  connection: navigator.connection,
  matchMedia: window.matchMedia,
  addEventListener: EventTarget.prototype.addEventListener,
  console: window.console,
  performanceNow: performance.now,
  screenWidth: Object.getOwnPropertyDescriptor(Screen.prototype, 'width')?.get,
  screenHeight: Object.getOwnPropertyDescriptor(Screen.prototype, 'height')?.get
};

function getCountryProfileFromBackground(country) {
  return new Promise(resolve => {
    chrome.runtime.sendMessage(
      { action: "getCountryProfile", country },
      (profile) => resolve(profile)
    );
  });
}

function applyCountryProfile(profile) {
  // Navigator properties
  Object.defineProperties(navigator, {
    userAgent: { value: profile.userAgent, configurable: true },
    platform: { value: profile.platform, configurable: true },
    language: { value: profile.language, configurable: true },
    languages: { value: profile.languages, configurable: true },
    hardwareConcurrency: { value: profile.hardwareConcurrency, configurable: true },
    deviceMemory: { value: profile.deviceMemory, configurable: true },
    maxTouchPoints: { value: profile.maxTouchPoints || 0, configurable: true }
  });

  // UserAgentData spoofing
  if (navigator.userAgentData && profile.userAgentData) {
    try {
      navigator.userAgentData.getHighEntropyValues = () => Promise.resolve(profile.userAgentData);
      navigator.userAgentData.brands = profile.userAgentData.brands;
    } catch (e) {
      console.error("userAgentData not supported");
    }
  }

  // Timezone spoofing
  Intl.DateTimeFormat.prototype.resolvedOptions = function() {
    const options = originalValues.resolvedOptions.call(this);
    options.timeZone = profile.timezone;
    return options;
  };

  // Geolocation spoofing
  navigator.geolocation.getCurrentPosition = (success, error, options) => {
    success({
      coords: {
        latitude: profile.geolocation.latitude,
        longitude: profile.geolocation.longitude,
        accuracy: profile.geolocation.accuracy || 20,
        altitude: null,
        altitudeAccuracy: null,
        heading: null,
        speed: null
      },
      timestamp: Date.now()
    });
  };

  // Plugins spoofing
  Object.defineProperty(navigator, 'plugins', {
    get: () => profile.plugins.map(plugin => ({
      name: plugin.name,
      filename: plugin.filename,
      description: `${plugin.name} plugin`,
      length: 1
    })),
    configurable: true
  });

  // WebGL spoofing with advanced parameters
  if (typeof WebGLRenderingContext !== 'undefined') {
    const originalWebGLGetParameter = WebGLRenderingContext.prototype.getParameter;
    
    WebGLRenderingContext.prototype.getParameter = function(parameter) {
      if (parameter === 37445) return profile.webglVendor;
      if (parameter === 37446) return profile.webglRenderer;
      if (parameter === this.VERSION) return "WebGL 2.0";
      if (parameter === this.SHADING_LANGUAGE_VERSION) return "WebGL GLSL ES 3.00";
      if (parameter === this.MAX_RENDERBUFFER_SIZE) return 16384;
      if (parameter === this.MAX_VIEWPORT_DIMS) return new Int32Array([16384, 16384]);
      return originalWebGLGetParameter.call(this, parameter);
    };
  }

  // Canvas spoofing with enhanced randomization
  const originalToDataURL = HTMLCanvasElement.prototype.toDataURL;
  HTMLCanvasElement.prototype.toDataURL = function() {
    try {
      const ctx = this.getContext('2d');
      if (ctx) {
        const width = this.width;
        const height = this.height;
        
        // Add subtle noise to canvas
        const imageData = ctx.getImageData(0, 0, width, height);
        const data = imageData.data;
        
        const maxPixels = Math.min(1000, data.length / 4);
        for (let i = 0; i < maxPixels * 4; i += 4) {
          if (Math.random() > 0.99) {
            data[i] = Math.floor(Math.random() * 256);
            data[i+1] = Math.floor(Math.random() * 256);
            data[i+2] = Math.floor(Math.random() * 256);
          }
        }
        
        ctx.putImageData(imageData, 0, 0);
      }
    } catch (e) {
      console.error('Canvas noise error:', e);
    }
    
    return originalToDataURL.call(this);
  };

  // Timezone offset spoofing
  const originalGetTimezoneOffset = Date.prototype.getTimezoneOffset;
  Date.prototype.getTimezoneOffset = function() {
    if (!profile.timezone) return originalGetTimezoneOffset.call(this);
    
    try {
      const now = new Date();
      const tzDate = new Date(now.toLocaleString('en-US', { timeZone: profile.timezone }));
      const localDate = new Date(now.toLocaleString('en-US'));
      return (localDate - tzDate) / 60000;
    } catch (e) {
      return originalGetTimezoneOffset.call(this);
    }
  };
  
  // 2D Canvas fingerprint protection
  if (typeof CanvasRenderingContext2D !== 'undefined') {
    const originalGetImageData = CanvasRenderingContext2D.prototype.getImageData;
    
    CanvasRenderingContext2D.prototype.getImageData = function(...args) {
      const imageData = originalGetImageData.apply(this, args);
      
      if (profile.canvasNoise) {
        try {
          const data = imageData.data;
          for (let i = 0; i < data.length; i += 4) {
            if (Math.random() < 0.05) {
              data[i] = Math.min(255, Math.max(0, data[i] + Math.floor(Math.random() * 10 - 5)));
              data[i+1] = Math.min(255, Math.max(0, data[i+1] + Math.floor(Math.random() * 10 - 5)));
              data[i+2] = Math.min(255, Math.max(0, data[i+2] + Math.floor(Math.random() * 10 - 5)));
            }
          }
        } catch (e) {
          console.error('Canvas noise error:', e);
        }
      }
      
      return imageData;
    };
  }

  // Font fingerprint protection
  if (window.queryLocalFonts) {
    window.queryLocalFonts = async () => {
      return profile.fonts || [
        {postscriptName: "Arial", fullName: "Arial", family: "Arial"},
        {postscriptName: "TimesNewRoman", fullName: "Times New Roman", family: "Times New Roman"},
        {postscriptName: "Verdana", fullName: "Verdana", family: "Verdana"},
        {postscriptName: "Tahoma", fullName: "Tahoma", family: "Tahoma"},
        {postscriptName: "Helvetica", fullName: "Helvetica", family: "Helvetica"}
      ];
    };
  }

  // Battery API spoofing
  if ('getBattery' in navigator) {
    navigator.getBattery = () => Promise.resolve({
      charging: profile.battery?.charging || true,
      chargingTime: profile.battery?.chargingTime || 0,
      dischargingTime: profile.battery?.dischargingTime || Infinity,
      level: profile.battery?.level || 0.85
    });
  }

  // Network Information spoofing
  if ('connection' in navigator) {
    Object.defineProperty(navigator, 'connection', {
      value: {
        downlink: profile.connection?.downlink || 10,
        effectiveType: profile.connection?.effectiveType || "4g",
        rtt: profile.connection?.rtt || 50,
        saveData: profile.connection?.saveData || false,
        type: profile.connection?.type || "wifi"
      },
      configurable: true
    });
  }

  // System preferences spoofing
  const originalMatchMedia = window.matchMedia;
  window.matchMedia = (query) => {
    if (query === '(prefers-color-scheme: dark)') {
      return {
        matches: profile.prefersDarkMode || false,
        media: query,
        onchange: null,
        addListener: () => {},
        removeListener: () => {}
      };
    }
    return originalMatchMedia(query);
  };

  // Event listener filtering
  const originalAddEventListener = EventTarget.prototype.addEventListener;
  EventTarget.prototype.addEventListener = function(type, listener, options) {
    const blockedEvents = ['mousemove', 'scroll', 'keydown', 'mousedown', 'mouseup', 'touchstart', 'touchend'];
    if (blockedEvents.includes(type)) return;
    originalAddEventListener.call(this, type, listener, options);
  };

  // Debug trace protection
  Object.defineProperty(window, 'console', {
    value: new Proxy(originalValues.console, {
      get: (target, prop) => {
        if (['debug', 'trace', 'log'].includes(prop)) return () => {};
        return target[prop];
      }
    }),
    configurable: true
  });

  // Performance timing protection
  performance.now = function() {
    return originalValues.performanceNow() + (Math.random() * 10 - 5);
  };

  // Screen resolution spoofing
  if (originalValues.screenWidth) {
    Object.defineProperty(Screen.prototype, 'width', {
      get: () => profile.screen?.width || 1920,
      configurable: true
    });
    
    Object.defineProperty(Screen.prototype, 'height', {
      get: () => profile.screen?.height || 1080,
      configurable: true
    });
  }
}

function restoreOriginalValues() {
  // Restore navigator properties
  Object.entries(originalValues).forEach(([key, value]) => {
    if (key !== 'resolvedOptions' && key !== 'getCurrentPosition' && 
        key !== 'webglGetParameter' && key !== 'toDataURL' && key !== 'getTimezoneOffset' &&
        key !== 'getImageData' && key !== 'queryLocalFonts' && key !== 'getBattery' &&
        key !== 'connection' && key !== 'matchMedia' && key !== 'addEventListener' &&
        key !== 'console' && key !== 'performanceNow' && key !== 'screenWidth' &&
        key !== 'screenHeight') {
      try {
        Object.defineProperty(navigator, key, { value, configurable: true });
      } catch (e) {
        console.error(`Failed to restore navigator.${key}:`, e);
      }
    }
  });

  // Restore other properties
  try {
    Intl.DateTimeFormat.prototype.resolvedOptions = originalValues.resolvedOptions;
    navigator.geolocation.getCurrentPosition = originalValues.getCurrentPosition;
    
    if (typeof WebGLRenderingContext !== 'undefined') {
      WebGLRenderingContext.prototype.getParameter = originalValues.webglGetParameter;
    }
    
    HTMLCanvasElement.prototype.toDataURL = originalValues.toDataURL;
    Date.prototype.getTimezoneOffset = originalValues.getTimezoneOffset;
    
    if (typeof CanvasRenderingContext2D !== 'undefined') {
      CanvasRenderingContext2D.prototype.getImageData = originalValues.getImageData;
    }
    
    if (originalValues.queryLocalFonts) window.queryLocalFonts = originalValues.queryLocalFonts;
    if (originalValues.getBattery) navigator.getBattery = originalValues.getBattery;
    
    if (originalValues.connection) {
      Object.defineProperty(navigator, 'connection', { 
        value: originalValues.connection, 
        configurable: true 
      });
    }
    
    if (originalValues.matchMedia) window.matchMedia = originalValues.matchMedia;
    
    EventTarget.prototype.addEventListener = originalValues.addEventListener;
    Object.defineProperty(window, 'console', { 
      value: originalValues.console, 
      configurable: true 
    });
    
    performance.now = originalValues.performanceNow;
  } catch (e) {
    console.error('Restoration error:', e);
  }
  
  // Restore screen properties
  if (originalValues.screenWidth) {
    Object.defineProperty(Screen.prototype, 'width', {
      get: originalValues.screenWidth,
      configurable: true
    });
    
    Object.defineProperty(Screen.prototype, 'height', {
      get: originalValues.screenHeight,
      configurable: true
    });
  }
}

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.action === "applyProfile" && request.profile) {
    applyCountryProfile(request.profile);
  } else if (request.action === "restoreOriginal") {
    restoreOriginalValues();
  }
});

// Initialize
chrome.storage.local.get(['isActive', 'currentProfile'], result => {
  if (result.isActive && result.currentProfile) {
    applyCountryProfile(result.currentProfile);
  }
});

async function cleanSessionData() {
  if (window.location.href === "about:blank") return;
  
  try {
    localStorage.clear();
    sessionStorage.clear();
    
    // IndexedDB
    if (window.indexedDB) {
      if (indexedDB.databases) {
        try {
          const databases = await indexedDB.databases();
          for (const db of databases) {
            if (db.name) {
              indexedDB.deleteDatabase(db.name);
            }
          }
        } catch (e) {
          console.error("IndexedDB cleanup error:", e);
        }
      } else {
        // Fallback dla starszych przeglądarek
        const req = indexedDB.webkitGetDatabaseNames 
          ? indexedDB.webkitGetDatabaseNames() 
          : null;
        
        if (req) {
          const dbs = await new Promise(resolve => {
            req.onsuccess = () => resolve(req.result);
            req.onerror = () => resolve([]);
          });
          
          for (const dbName of dbs) {
            indexedDB.deleteDatabase(dbName);
          }
        }
      }
    }
    
    // Service Workers
    if ('serviceWorker' in navigator) {
      try {
        const registrations = await navigator.serviceWorker.getRegistrations();
        for (const registration of registrations) {
          registration.unregister();
        }
      } catch (e) {
        console.error("Service worker unregister error:", e);
      }
    }
  } catch (e) {
    console.error("Cleanup error:", e);
  }
}

// WebGL Shader Spoofing
function spoofWebGLShaders() {
  if (typeof WebGLRenderingContext === 'undefined') return;
  
  const originalGetShaderPrecisionFormat = WebGLRenderingContext.prototype.getShaderPrecisionFormat;
  
  WebGLRenderingContext.prototype.getShaderPrecisionFormat = function(type, precisionType) {
    try {
      const result = originalGetShaderPrecisionFormat.call(this, type, precisionType);
      return result || { rangeMin: 127, rangeMax: 127, precision: 23 };
    } catch (e) {
      return { rangeMin: 127, rangeMax: 127, precision: 23 };
    }
  };
}

// AudioContext Protection
function spoofAudioFingerprint() {
  if (typeof AudioContext === 'undefined' && typeof webkitAudioContext === 'undefined') return;
  
  const AudioCtx = window.AudioContext || window.webkitAudioContext;
  const originalCreateAnalyser = AudioCtx.prototype.createAnalyser;
  
  AudioCtx.prototype.createAnalyser = function() {
    const analyser = originalCreateAnalyser.call(this);
    const originalGetFloatFrequencyData = analyser.getFloatFrequencyData;
    
    analyser.getFloatFrequencyData = function(array) {
      try {
        originalGetFloatFrequencyData.call(this, array);
        for (let i = 0; i < array.length; i++) {
          array[i] += (Math.random() * 2 - 1);
        }
      } catch (e) {
        console.error('Audio spoofing error:', e);
      }
    };
    
    return analyser;
  };
}

// Load advanced protection settings
chrome.storage.local.get([
  'ghostModeEnabled', 
  'webglShaderSpoofEnabled',
  'audioFingerprintProtectionEnabled'
], (result) => {
  if (result.ghostModeEnabled) {
    window.addEventListener('beforeunload', cleanSessionData);
  }
  
  if (result.webglShaderSpoofEnabled) {
    spoofWebGLShaders();
  }
  
  if (result.audioFingerprintProtectionEnabled) {
    spoofAudioFingerprint();
  }
});