// SystemJS configuration file, see links for more information
// https://github.com/systemjs/systemjs
// https://github.com/systemjs/systemjs/blob/master/docs/config-api.md

/***********************************************************************************************
 * User Configuration.
 **********************************************************************************************/
/** Map relative paths to URLs. */
const map: any = {
  'angular2-clipboard':         'https://npmcdn.com/angular2-clipboard@0.2.8',
  'clipboard':                  'https://npmcdn.com/clipboard@1.5.10/dist/clipboard.js',

  'ng2-bootstrap':           'vendor/ng2-bootstrap',
  'moment':                  'vendor/ng2-bootstrap/node_modules/moment/moment.js',
    // 'angular2-clipboard': 'vendor/angular2-clipboard',
    // 'clipboard':          'vendor/angular2-clipboard/node_modules/clipboard/lib/clipboard.js',
    // 'tiny-emitter':       'vendor/angular2-clipboard/node_modules/clipboard/node_modules/tiny-emitter/index.js',
    // 'good-listener':      'vendor/angular2-clipboard/node_modules/clipboard/node_modules/good-listener/dist/good-listener.js',
    // 'select':             'vendor/angular2-clipboard/node_modules/clipboard/node_modules/select/dist/select.js',
};

/** User packages configuration. */
const packages: any = {
    'angular2-clipboard': { main: 'index.js', defaultExtension: 'js' },
    'ng2-bootstrap': { main: 'index.js', defaultExtension: 'js' },
};

////////////////////////////////////////////////////////////////////////////////////////////////
/***********************************************************************************************
 * Everything underneath this line is managed by the CLI.
 **********************************************************************************************/
const barrels: string[] = [
  // Angular specific barrels.
  '@angular/core',
  '@angular/forms',
  '@angular/common',
  '@angular/compiler',
  '@angular/http',
  '@angular/router',
  '@angular/platform-browser',
  '@angular/platform-browser-dynamic',

  // Thirdparty barrels.
  'rxjs',

  // App specific barrels.
  'app',
  'app/shared',
  'app/emote-form',
  'app/emote-builder',
  /** @cli-barrel */
];

const cliSystemConfigPackages: any = {};
barrels.forEach((barrelName: string) => {
  cliSystemConfigPackages[barrelName] = { main: 'index' };
});

/** Type declaration for ambient System. */
declare var System: any;

// Apply the CLI SystemJS configuration.
System.config({
  map: {
    '@angular': 'vendor/@angular',
    'rxjs': 'vendor/rxjs',
    'main': 'main.js'
  },
  packages: cliSystemConfigPackages
});

// Apply the user's configuration.
System.config({ map, packages });
