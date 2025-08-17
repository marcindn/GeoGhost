export const countryProfiles = {
    japan: {
        id: "japan",
        name: "Japan",
        language: "ja-JP",
        languages: ["ja", "ja-JP", "en-US"],
        timezone: "Asia/Tokyo",
        userAgent: "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/125.0.0.0 Safari/537.36",
        platform: "Win32",
        webglVendor: "Intel Inc.",
        webglRenderer: "Intel Iris OpenGL Engine",
        hardwareConcurrency: 4,
        deviceMemory: 8,
        maxTouchPoints: 0,
        geolocation: { latitude: 35.6895, longitude: 139.6917, accuracy: 50 },
        plugins: [
          {name: "Chrome PDF Viewer", filename: "internal-pdf-viewer"},
          {name: "Chromium PDF Viewer", filename: "chromium-pdf"}
        ],
        userAgentData: {
          brands: [
            {brand: "Chromium", version: "125"},
            {brand: "Google Chrome", version: "125"},
            {brand: "Not-A.Brand", version: "24"}
          ],
          mobile: false,
          platform: "Windows"
        },

        canvasNoise: true,
        fonts: [
          {postscriptName: "Arial", fullName: "Arial", family: "Arial"},
          {postscriptName: "MS Gothic", fullName: "MS Gothic", family: "MS Gothic"},
          {postscriptName: "Meiryo", fullName: "Meiryo", family: "Meiryo"},
          {postscriptName: "Yu Gothic", fullName: "Yu Gothic", family: "Yu Gothic"},
          {postscriptName: "Times New Roman", fullName: "Times New Roman", family: "Times New Roman"}
        ],
        prefersDarkMode: false,
        connection: {
          downlink: 15,
          effectiveType: "4g",
          rtt: 40,
          saveData: false,
          type: "wifi"
        },
        battery: {
          charging: true,
          level: 0.92,
          chargingTime: 0,
          dischargingTime: 7200
        },
        screen: {
          width: 1920,
          height: 1080,
          colorDepth: 24,
          pixelDepth: 24
        }
      },
      usa: {
        id: "usa",
        name: "United States",
        language: "en-US",
        languages: ["en-US", "en"],
        timezone: "America/New_York",
        userAgent: "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/125.0.0.0 Safari/537.36",
        platform: "Win32",
        webglVendor: "NVIDIA Corporation",
        webglRenderer: "NVIDIA GeForce RTX 4080",
        hardwareConcurrency: 12,
        deviceMemory: 16,
        maxTouchPoints: 0,
        geolocation: { latitude: 40.7128, longitude: -74.0060, accuracy: 50 },
        plugins: [
          {name: "Chrome PDF Viewer", filename: "internal-pdf-viewer"},
          {name: "Chromium PDF Viewer", filename: "chromium-pdf"}
        ],
        userAgentData: {
          brands: [
            {brand: "Chromium", version: "125"},
            {brand: "Google Chrome", version: "125"},
            {brand: "Not-A.Brand", version: "24"}
          ],
          mobile: false,
          platform: "Windows"
        },
        // Nowe pola antyśledzące
        canvasNoise: true,
        fonts: [
          {postscriptName: "Arial", fullName: "Arial", family: "Arial"},
          {postscriptName: "Verdana", fullName: "Verdana", family: "Verdana"},
          {postscriptName: "Tahoma", fullName: "Tahoma", family: "Tahoma"},
          {postscriptName: "Georgia", fullName: "Georgia", family: "Georgia"},
          {postscriptName: "Times New Roman", fullName: "Times New Roman", family: "Times New Roman"}
        ],
        prefersDarkMode: false,
        connection: {
          downlink: 20,
          effectiveType: "4g",
          rtt: 30,
          saveData: false,
          type: "wifi"
        },
        battery: {
          charging: true,
          level: 0.88,
          chargingTime: 0,
          dischargingTime: 6500
        },
        screen: {
          width: 1920,
          height: 1080,
          colorDepth: 24,
          pixelDepth: 24
        }
      },
      uk: {
        id: "uk",
        name: "United Kingdom",
        language: "en-GB",
        languages: ["en-GB", "en"],
        timezone: "Europe/London",
        userAgent: "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/125.0.0.0 Safari/537.36",
        platform: "Win32",
        webglVendor: "NVIDIA Corporation",
        webglRenderer: "NVIDIA GeForce RTX 3080",
        hardwareConcurrency: 8,
        deviceMemory: 32,
        maxTouchPoints: 0,
        geolocation: { latitude: 51.5074, longitude: -0.1278, accuracy: 50 },
        plugins: [
          {name: "Chrome PDF Viewer", filename: "internal-pdf-viewer"},
          {name: "Chromium PDF Viewer", filename: "chromium-pdf"}
        ],
        userAgentData: {
          brands: [
            {brand: "Chromium", version: "125"},
            {brand: "Google Chrome", version: "125"},
            {brand: "Not-A.Brand", version: "24"}
          ],
          mobile: false,
          platform: "Windows"
        },
        // Nowe pola antyśledzące
        canvasNoise: true,
        fonts: [
          {postscriptName: "Arial", fullName: "Arial", family: "Arial"},
          {postscriptName: "Gill Sans", fullName: "Gill Sans", family: "Gill Sans"},
          {postscriptName: "Verdana", fullName: "Verdana", family: "Verdana"},
          {postscriptName: "Tahoma", fullName: "Tahoma", family: "Tahoma"},
          {postscriptName: "Times New Roman", fullName: "Times New Roman", family: "Times New Roman"}
        ],
        prefersDarkMode: true,
        connection: {
          downlink: 18,
          effectiveType: "4g",
          rtt: 35,
          saveData: false,
          type: "wifi"
        },
        battery: {
          charging: false,
          level: 0.65,
          chargingTime: 1800,
          dischargingTime: 4200
        },
        screen: {
          width: 1920,
          height: 1080,
          colorDepth: 24,
          pixelDepth: 24
        }
      },
      germany: {
        id: "germany",
        name: "Germany",
        language: "de-DE",
        languages: ["de", "de-DE", "en"],
        timezone: "Europe/Berlin",
        userAgent: "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/125.0.0.0 Safari/537.36",
        platform: "Win32",
        webglVendor: "AMD Inc.",
        webglRenderer: "AMD Radeon RX 7900 XT",
        hardwareConcurrency: 16,
        deviceMemory: 64,
        maxTouchPoints: 0,
        geolocation: { latitude: 52.5200, longitude: 13.4050, accuracy: 50 },
        plugins: [
          {name: "Chrome PDF Viewer", filename: "internal-pdf-viewer"},
          {name: "Chromium PDF Viewer", filename: "chromium-pdf"}
        ],
        userAgentData: {
          brands: [
            {brand: "Chromium", version: "125"},
            {brand: "Google Chrome", version: "125"},
            {brand: "Not-A.Brand", version: "24"}
          ],
          mobile: false,
          platform: "Windows"
        },
        // Nowe pola antyśledzące
        canvasNoise: true,
        fonts: [
          {postscriptName: "Arial", fullName: "Arial", family: "Arial"},
          {postscriptName: "Verdana", fullName: "Verdana", family: "Verdana"},
          {postscriptName: "Tahoma", fullName: "Tahoma", family: "Tahoma"},
          {postscriptName: "Helvetica", fullName: "Helvetica", family: "Helvetica"},
          {postscriptName: "Times New Roman", fullName: "Times New Roman", family: "Times New Roman"}
        ],
        prefersDarkMode: true,
        connection: {
          downlink: 22,
          effectiveType: "4g",
          rtt: 25,
          saveData: false,
          type: "wifi"
        },
        battery: {
          charging: true,
          level: 0.78,
          chargingTime: 0,
          dischargingTime: 5800
        },
        screen: {
          width: 1920,
          height: 1080,
          colorDepth: 24,
          pixelDepth: 24
        }
      },
      russia: {
        id: "russia",
        name: "Russia",
        language: "ru-RU",
        languages: ["ru", "ru-RU", "en"],
        timezone: "Europe/Moscow",
        userAgent: "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/125.0.0.0 Safari/537.36",
        platform: "Win32",
        webglVendor: "NVIDIA Corporation",
        webglRenderer: "NVIDIA GeForce GTX 1080",
        hardwareConcurrency: 8,
        deviceMemory: 16,
        maxTouchPoints: 0,
        geolocation: { latitude: 55.7558, longitude: 37.6173, accuracy: 50 },
        plugins: [
          {name: "Chrome PDF Viewer", filename: "internal-pdf-viewer"},
          {name: "Chromium PDF Viewer", filename: "chromium-pdf"}
        ],
        userAgentData: {
          brands: [
            {brand: "Chromium", version: "125"},
            {brand: "Google Chrome", version: "125"},
            {brand: "Not-A.Brand", version: "24"}
          ],
          mobile: false,
          platform: "Windows"
        },
        canvasNoise: true,
        fonts: [
          {postscriptName: "Arial", fullName: "Arial", family: "Arial"},
          {postscriptName: "Verdana", fullName: "Verdana", family: "Verdana"},
          {postscriptName: "Tahoma", fullName: "Tahoma", family: "Tahoma"},
          {postscriptName: "Times New Roman", fullName: "Times New Roman", family: "Times New Roman"},
          {postscriptName: "Courier New", fullName: "Courier New", family: "Courier New"}
        ],
        prefersDarkMode: false,
        connection: {
          downlink: 12,
          effectiveType: "4g",
          rtt: 45,
          saveData: false,
          type: "wifi"
        },
        battery: {
          charging: false,
          level: 0.42,
          chargingTime: 2400,
          dischargingTime: 3600
        },
        screen: {
          width: 1920,
          height: 1080,
          colorDepth: 24,
          pixelDepth: 24
        }
      },
      brazil: {
        id: "brazil",
        name: "Brazil",
        language: "pt-BR",
        languages: ["pt-BR", "pt", "en"],
        timezone: "America/Sao_Paulo",
        userAgent: "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/125.0.0.0 Safari/537.36",
        platform: "Win32",
        webglVendor: "AMD Inc.",
        webglRenderer: "AMD Radeon RX 580",
        hardwareConcurrency: 6,
        deviceMemory: 8,
        maxTouchPoints: 0,
        geolocation: { latitude: -23.5505, longitude: -46.6333, accuracy: 50 },
        plugins: [
          {name: "Chrome PDF Viewer", filename: "internal-pdf-viewer"},
          {name: "Chromium PDF Viewer", filename: "chromium-pdf"}
        ],
        userAgentData: {
          brands: [
            {brand: "Chromium", version: "125"},
            {brand: "Google Chrome", version: "125"},
            {brand: "Not-A.Brand", version: "24"}
          ],
          mobile: false,
          platform: "Windows"
        },
        // Nowe pola antyśledzące
        canvasNoise: true,
        fonts: [
          {postscriptName: "Arial", fullName: "Arial", family: "Arial"},
          {postscriptName: "Verdana", fullName: "Verdana", family: "Verdana"},
          {postscriptName: "Tahoma", fullName: "Tahoma", family: "Tahoma"},
          {postscriptName: "Times New Roman", fullName: "Times New Roman", family: "Times New Roman"},
          {postscriptName: "Helvetica", fullName: "Helvetica", family: "Helvetica"}
        ],
        prefersDarkMode: false,
        connection: {
          downlink: 10,
          effectiveType: "4g",
          rtt: 55,
          saveData: false,
          type: "wifi"
        },
        battery: {
          charging: true,
          level: 0.95,
          chargingTime: 0,
          dischargingTime: 7000
        },
        screen: {
          width: 1920,
          height: 1080,
          colorDepth: 24,
          pixelDepth: 24
        }
      },
      spain: {
        id: "spain",
        name: "Spain",
        language: "es-ES",
        languages: ["es", "es-ES", "ca", "en"],
        timezone: "Europe/Madrid",
        userAgent: "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/125.0.0.0 Safari/537.36",
        platform: "Win32",
        webglVendor: "NVIDIA Corporation",
        webglRenderer: "NVIDIA GeForce RTX 3060",
        hardwareConcurrency: 6,
        deviceMemory: 16,
        maxTouchPoints: 0,
        geolocation: { latitude: 40.4168, longitude: -3.7038, accuracy: 50 },
        plugins: [
          {name: "Chrome PDF Viewer", filename: "internal-pdf-viewer"},
          {name: "Chromium PDF Viewer", filename: "chromium-pdf"}
        ],
        userAgentData: {
          brands: [
            {brand: "Chromium", version: "125"},
            {brand: "Google Chrome", version: "125"},
            {brand: "Not-A.Brand", version: "24"}
          ],
          mobile: false,
          platform: "Windows"
        },
        // Nowe pola antyśledzące
        canvasNoise: true,
        fonts: [
          {postscriptName: "Arial", fullName: "Arial", family: "Arial"},
          {postscriptName: "Verdana", fullName: "Verdana", family: "Verdana"},
          {postscriptName: "Tahoma", fullName: "Tahoma", family: "Tahoma"},
          {postscriptName: "Times New Roman", fullName: "Times New Roman", family: "Times New Roman"},
          {postscriptName: "Helvetica", fullName: "Helvetica", family: "Helvetica"}
        ],
        prefersDarkMode: true,
        connection: {
          downlink: 16,
          effectiveType: "4g",
          rtt: 35,
          saveData: false,
          type: "wifi"
        },
        battery: {
          charging: false,
          level: 0.58,
          chargingTime: 2100,
          dischargingTime: 3900
        },
        screen: {
          width: 1920,
          height: 1080,
          colorDepth: 24,
          pixelDepth: 24
        }
      },
      india: {
        id: "india",
        name: "India",
        language: "hi-IN",
        languages: ["hi", "en", "ta", "te"],
        timezone: "Asia/Kolkata",
        userAgent: "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/125.0.0.0 Safari/537.36",
        platform: "Win32",
        webglVendor: "Intel Inc.",
        webglRenderer: "Intel UHD Graphics 630",
        hardwareConcurrency: 8,
        deviceMemory: 8,
        maxTouchPoints: 0,
        geolocation: { latitude: 28.6139, longitude: 77.2090, accuracy: 50 },
        plugins: [
          {name: "Chrome PDF Viewer", filename: "internal-pdf-viewer"},
          {name: "Chromium PDF Viewer", filename: "chromium-pdf"}
        ],
        userAgentData: {
          brands: [
            {brand: "Chromium", version: "125"},
            {brand: "Google Chrome", version: "125"},
            {brand: "Not-A.Brand", version: "24"}
          ],
          mobile: false,
          platform: "Windows"
        },
        // Nowe pola antyśledzące
        canvasNoise: true,
        fonts: [
          {postscriptName: "Arial", fullName: "Arial", family: "Arial"},
          {postscriptName: "Nirmala UI", fullName: "Nirmala UI", family: "Nirmala UI"},
          {postscriptName: "Verdana", fullName: "Verdana", family: "Verdana"},
          {postscriptName: "Tahoma", fullName: "Tahoma", family: "Tahoma"},
          {postscriptName: "Times New Roman", fullName: "Times New Roman", family: "Times New Roman"}
        ],
        prefersDarkMode: false,
        connection: {
          downlink: 8,
          effectiveType: "3g",
          rtt: 100,
          saveData: false,
          type: "cellular"
        },
        battery: {
          charging: true,
          level: 0.82,
          chargingTime: 0,
          dischargingTime: 4800
        },
        screen: {
          width: 1920,
          height: 1080,
          colorDepth: 24,
          pixelDepth: 24
        }
      },
      china: {
        id: "china",
        name: "China",
        language: "zh-CN",
        languages: ["zh", "zh-CN", "en"],
        timezone: "Asia/Shanghai",
        userAgent: "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/125.0.0.0 Safari/537.36",
        platform: "Win32",
        webglVendor: "NVIDIA Corporation",
        webglRenderer: "NVIDIA GeForce RTX 4090",
        hardwareConcurrency: 24,
        deviceMemory: 64,
        maxTouchPoints: 0,
        geolocation: { latitude: 39.9042, longitude: 116.4074, accuracy: 50 },
        plugins: [
          {name: "Chrome PDF Viewer", filename: "internal-pdf-viewer"},
          {name: "Chromium PDF Viewer", filename: "chromium-pdf"}
        ],
        userAgentData: {
          brands: [
            {brand: "Chromium", version: "125"},
            {brand: "Google Chrome", version: "125"},
            {brand: "Not-A.Brand", version: "24"}
          ],
          mobile: false,
          platform: "Windows"
        },
        canvasNoise: true,
        fonts: [
          {postscriptName: "Arial", fullName: "Arial", family: "Arial"},
          {postscriptName: "SimSun", fullName: "SimSun", family: "SimSun"},
          {postscriptName: "Microsoft YaHei", fullName: "Microsoft YaHei", family: "Microsoft YaHei"},
          {postscriptName: "Tahoma", fullName: "Tahoma", family: "Tahoma"},
          {postscriptName: "Times New Roman", fullName: "Times New Roman", family: "Times New Roman"}
        ],
        prefersDarkMode: true,
        connection: {
          downlink: 25,
          effectiveType: "5g",
          rtt: 20,
          saveData: false,
          type: "wifi"
        },
        battery: {
          charging: true,
          level: 0.90,
          chargingTime: 0,
          dischargingTime: 6000
        },
        screen: {
          width: 1920,
          height: 1080,
          colorDepth: 24,
          pixelDepth: 24
        }
      }
    };

    export function getCountryProfile(country) {
      return countryProfiles[country];
    }