# {ProjectName}
[![Build Status](https://travis-ci.org/Horat1us/taskbook-frontend.svg?branch=master)](https://travis-ci.org/Horat1us/taskbook-frontend)
[![codecov](https://codecov.io/gh/Horat1us/taskbook-frontend/branch/master/graph/badge.svg)](https://codecov.io/gh/Horat1us/taskbook-frontend)


## Running tests
To run all tests just use `npm test`
### E2E Tests ([CodeceptJS](https://codeceptjs.io))
Run Selenium server (requires Java):
```bash
npm run selenium
```
Run tests:
```bash
npm run e2e
```

### Unit Tests (Mocha)
```bash
npm run unit
```

### TSLint
```bash
npm run lint
```

## Deployment
You should serve `web/` directory in your server after building bundle. 
  
- **Nginx**: you may use [config template](./templates/nginx.conf)  
- **Apache2**: for `.htaccess` generation see *Production build* section for details

## Build
### Development server
Will be served at <http://localhost:8089>.

```bash
npm run dev
```
### Development build. 
Just create files in `web/` folder with development settings (without compression and with sourcemaps).
```bash
npm run preview
```
### Production build
Must be run before deployment.
Build all files to `web/` directory.
```bash
npm run build
```
For building with `.htaccess` file:
```bash
APACHE=1 npm run build
```

## Contributors
- [Alexander <Horat1us> Letnikow](https://github.com/horat1us)

## License
[MIT](./LICENSE)