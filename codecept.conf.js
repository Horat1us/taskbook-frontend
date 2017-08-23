const env = process.env.NODE_ENV || 'dev';

const url = [
    {
        url: "http://frontend.local",
        environment: "scrutinizer",
    },
    {
        url: "http://localhost:8089",
        environment: "dev",
    },
].reduce(function (carry, config) {
    return config.environment === env ? config.url : carry;
}, "http://localhost:8088");

console.log("Using " + url + " as app url");

const config = {
    "tests": "./tests/acceptance/*.js",
    "timeout": 10000,
    "output": "./tests/output",
    "helpers": {
        "WebDriverIO": {
            "url": url,
            "browser": "chrome",
            "windowSize": "1600x1000",
        },
    },
    "include": {},
    "bootstrap": false,
    "reporterOptions": {
        "reportDir": "output"
    },
    "name": "wearesho-frontend",
    "translation": "ru-RU",
    "mocha": {
        "reporterOptions": {
            "reportDir": env === 'scrutinizer' ? '/home/scrutinizer/artifacts' : "./tests/output",
        }
    }
};

exports.config = config;