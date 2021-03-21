export default {

    browsers: [
        'AppleWebKit/605',
        'Version/12.0',
        'Mozilla',
        'Chrome'
    ],

    ORIENTATION: {
        LANDSCAPE : 'landscape',
        PORTRAIT: 'portrait'
    },

    isARAvailable() {
        const ua = navigator.userAgent;
        return this.browsers.some( function(item) {
            return ua.indexOf(item) > -1;
        })
    },

    getOrientation() {
        if (window.screen.orientation) {
            const expr = /landscape/;
            return expr.test(window.screen.orientation.type) ? this.ORIENTATION.LANDSCAPE : this.ORIENTATION.PORTRAIT;
        } else if(window.matchMedia("(orientation: portrait)").matches ) {
            return this.ORIENTATION.PORTRAIT;
            
        } else if(window.matchMedia("(orientation: landscape)").matches ) {
            return this.ORIENTATION.LANDSCAPE;
        } else {
            return (window.innerHeight > window.innerWidth) ? this.ORIENTATION.PORTRAIT : this.ORIENTATION.LANDSCAPE;
        }
    },

    getOS() {
        var nVer = navigator.appVersion;
        var nAgt = navigator.userAgent;
        var osVersion = "unknown";
        var os = "unknown";
        // system
    
        var clientStrings = [
            { s: 'Windows 3.11', r: /Win16/ },
            { s: 'Windows 95', r: /(Windows 95|Win95|Windows_95)/ },
            { s: 'Windows ME', r: /(Win 9x 4.90|Windows ME)/ },
            { s: 'Windows 98', r: /(Windows 98|Win98)/ },
            { s: 'Windows CE', r: /Windows CE/ },
            { s: 'Windows 2000', r: /(Windows NT 5.0|Windows 2000)/ },
            { s: 'Windows XP', r: /(Windows NT 5.1|Windows XP)/ },
            { s: 'Windows Server 2003', r: /Windows NT 5.2/ },
            { s: 'Windows Vista', r: /Windows NT 6.0/ },
            { s: 'Windows 7', r: /(Windows 7|Windows NT 6.1)/ },
            { s: 'Windows 8.1', r: /(Windows 8.1|Windows NT 6.3)/ },
            { s: 'Windows 8', r: /(Windows 8|Windows NT 6.2)/ },
            { s: 'Windows NT 4.0', r: /(Windows NT 4.0|WinNT4.0|WinNT|Windows NT)/ },
            { s: 'Windows ME', r: /Windows ME/ },
            { s: 'Android', r: /Android/ },
            { s: 'Open BSD', r: /OpenBSD/ },
            { s: 'Sun OS', r: /SunOS/ },
            { s: 'Linux', r: /(Linux|X11)/ },
            { s: 'iOS', r: /(iPhone|iPad|iPod)/ },
            { s: 'Mac OS X', r: /Mac OS X/ },
            { s: 'Mac OS', r: /(MacPPC|MacIntel|Mac_PowerPC|Macintosh)/ },
            { s: 'QNX', r: /QNX/ },
            { s: 'UNIX', r: /UNIX/ },
            { s: 'BeOS', r: /BeOS/ },
            { s: 'OS/2', r: /OS\/2/ },
            { s: 'Search Bot', r: /(nuhk|Googlebot|Yammybot|Openbot|Slurp|MSNBot|Ask Jeeves\/Teoma|ia_archiver)/ }
        ];
        for (var id in clientStrings) {
            var cs = clientStrings[id];
            if (cs.r.test(nAgt)) {
                os = cs.s;
                break;
            }
        }

        if (/Windows/.test(os)) {
            osVersion = /Windows (.*)/.exec(os)[1];
            os = 'Windows';
        }

        switch (os) {
            case 'Mac OS X':
                osVersion = /Mac OS X (10[\.\_\d]+)/.exec(nAgt)[1];
                break;

            case 'Android':
                osVersion = /Android ([\.\_\d]+)/.exec(nAgt)[1];
                break;

            case 'iOS':
                osVersion = /OS (\d+)_(\d+)_?(\d+)?/.exec(nVer);
                osVersion = osVersion[1] + '.' + osVersion[2] + '.' + (osVersion[3] | 0);
                break;

        }

        return {
            name: os,
            versionString: osVersion
        };
    },

    enableMotion() {
        console.log('2');
        return new Promise((resolve, reject) => {
            console.log('3');
            if(navigator.permissions && navigator.permissions.query) {
                console.log('4');
                Promise.all([navigator.permissions.query({ name: "accelerometer" }),
                    navigator.permissions.query({ name: "gyroscope" })])
                .then(results => {
                    console.log("done");
                    resolve();
                }).catch(err => {
                    console.log(err);
                    reject();
                })
            } else if (DeviceOrientationEvent && DeviceOrientationEvent.requestPermission) {
                console.log('5');
                DeviceOrientationEvent.requestPermission()
                .then((_result) => {
                    console.log('6');
                    const msg = navigator.userAgent+'--'+JSON.stringify(_result);
                    reportService.report(msg);
                    resolve();
                })
                .catch ((err) => {
                    console.log(err);
                    console.log('DeviceOrientationEvent.requestPermission error', err);
                    reject();
                })
            } else {
                console.log('resolve');
                resolve();
            }
        });

    }
}