#!/usr/bin/env node
'use strict';

// Nice ES6 syntax
// const { Promise, _, icli } = require('@lager/lager/src/lib/lager').import;
const lager = require('@lager/lager/src/lib/lager');
const icli = lager.import.icli;
const _ = lager.import._;
const Promise = lager.import.Promise;
const figlet = Promise.promisify(require('figlet'));
figlet.fonts = Promise.promisify(figlet.fonts);

/**
 * This module exports a function that enrich the interactive command line and return a promise
 * @returns {Promise} - a promise that resolve when the operation is done
 */
module.exports = () => {
  // Build the lists of choices
  const choicesLists = getChoices();

  const config = {
    section: 'Core plugin',
    cmd: 'please',
    description: 'create a new project',
    options: { noHelp: true },
    parameters: [{
      cmdSpec: '[--language]',
      type: 'list',
      choices: choicesLists.languages
    }]
  };

  /**
   * Create the command and the prompt
   */
  return icli.createSubCommand(config, executeCommand);
};


/**
 * Build the choices for "list" and "checkbox" parameters
 * @param {Array} endpoints - the list o available endpoint specifications
 * @returns {Object} - collection of lists of choices for "list" and "checkbox" parameters
 */
function getChoices() {
  return {
    language: [
      'french',
      'english',
      'spanish',
      'german',
      'portuguese'
    ]
  };
}

/**
 * Create the new project
 * @param {Object} parameters - the parameters provided in the command and in the prompt
 * @returns {Promise<null>} - The execution stops here
 */
function executeCommand(parameters) {
  const allCheers = {
    'Afrikaans': 'Gesondheid',
    'Albanian': 'Gëzuar',
    'Arabic (Egypt)': 'Fe sahetek',
    'Armenian (Western)': 'Genatzt',
    'Azerbaijani': 'Nuş olsun',
    'Bosnian': 'Živjeli',
    'Bulgarian': 'Naz-dra-vey',
    'Burmese': 'Aung myin par say',
    'Catalan': 'Salut',
    'Chamorro (Guam)': 'Biba',
    'Chinese (Mandarin)': 'gān bēi',
    'Croatian': 'Nazdravlje',
    'Czech': 'Na zdravi',
    'Danish': 'Skål',
    'Dutch': 'Proost',
    'Estonian': 'Terviseks',
    'Filipino/Tagalog': 'Mabuhay',
    'Finnish': 'Kippis',
    'French': 'Santé ',
    'French2': 'A la votre',
    'Galician': 'Salud',
    'German': 'Prost',
    'German2': 'Zum wohl',
    'Greek': 'Yamas',
    'Hawaiian': 'Okole maluna',
    'Hebrew': 'L\'chaim',
    'Hungarian': 'Egészségedre',
    'Hungarian2': 'Fenékig',
    'Icelandic': 'Skál',
    'Irish Gaelic': 'Sláinte',
    'Italian': 'Salute',
    'Italian2': 'Cin cin',
    'Japanese': 'Kanpai',
    'Korean': 'Gun bae',
    'Latvian': 'Priekā',
    'Latvian2': 'Prosit',
    'Lithuanian': 'į sveikatą',
    'Norwegian': 'Skål',
    'Polish': 'Na zdrowie',
    'Portuguese': 'Saúde',
    'Romanian': 'Noroc',
    'Romanian2': 'Sanatate',
    'Russian': 'Budem zdorovi',
    'Russian2': 'Na zdorovie',
    'Serbian': 'živeli',
    'Slovak': 'Na zdravie',
    'Slovenian': 'Na zdravje',
    'Spanish': 'Salud',
    'Swedish': 'Skål',
    'Thai': 'Chok dee',
    'Turkish': 'Şerefe',
    'Ukranian': 'Boodmo',
    'Vietnamese': 'Môt hai ba, yo',
    'Welsh': 'Iechyd da',
    'Yiddish': 'Sei gesund',
  };
  figlet.fonts()
  .then(fonts => {
    const font = _.sample(fonts);
    let cheers = _.sample(allCheers);
    if (['default'].indexOf(font) === -1) { cheers = _.deburr(cheers); }
    return figlet(cheers, { font });
  })
  .then(cheers => {
    const b = txt => { return icli.format.custom(txt, '\x1b[93m'); };
    const m = txt => { return icli.format.custom(txt, '\x1b[1m'); };
    const beer = ['',
      m('    ,~~~,,`´´°°,,,~~~°°~`´´~°°o,         '),
      m('   ( °      °        °      °°  )        '),
      m('  (    °    °)          (     °  )       '),
      m(' (      )          °°  (       ,)°       '),
      m(' (  °    ),,,,,°°o,,,O°°~,~,,,,)         '),
      m('  (    )°') + '°)°  °( °  )  °°( ° )°|         ',
      m('   o') + '|' + m('°') + '( ° ) °  ( ° o) ° °(   ) |         ',
      '    |o(°°°)°°oo(~o~~)~O°°(°°°)¨|         ',
      '    |' + b(' (   ) °  ( °  )    (   ) ') + '|___      ',
      '    |' + b(' (   )    (°   )    (   )°') + '    `\\    ',
      '    |' + b(' (   )  ° ( °  )    (   ) ') + ' __   \\   ',
      '    |' + b(' (   )  ° (°   )    ( ° ) ') + '|  `\\  \\  ',
      '    |' + b(' (   ) °  (    )    (   ) ') + '|    \\  \\ ',
      '    |' + b(' (   )    (°   )    (   ) ') + '|    )  ) ',
      '    |' + b(' (   )  ° ( °  )    (   ) ') + '|    )  ) ',
      '    |' + b(' (   )  ° ( °  )  ° (   ) ') + '|    )  ) ',
      '    |' + b(' (°  ) °  ( °  )    (   ) ') + '|    )  ) ',
      '    |' + b(' (   ) °  (°   )    (   ) ') + '|    /  / ',
      '    |' + b(' (   )  ° (    )    (   ) ') + '|__,/  /  ',
      '    |' + b(' (   ) °  ( °  )    (   ) ') + '      /   ',
      '    |' + b(' (   ) °  (°   )  ° (   ) ') + ' ___,/    ',
      '    |' + b(' (   )  ° (°   )  ° (   ) ') + '|         ',
      '    |' + b(' (   )  ° ( °  )    (  °) ') + '|         ',
      '    |' + b('°(   )  ° ( °  )    (   ) ') + '|         ',
      '    |' + b('  ¨¨¨  °  `~~~~´     ¨¨¨  ') + '|         ',
      '    l__' + b('     °   °            ') + '__j         ',
      'ah     ````¨¨¨^~~~~~~^¨¨¨´´´´            ',
      ''
    ];
    cheers = cheers.split('\n');
    const top = Math.round((beer.length - cheers.length) / 2);
    for (let i = 0; i < cheers.length; i++) {
      beer[top + i + 1] += '   ' + cheers[i];
    }
    console.log(beer.join('\n'));
  });
}