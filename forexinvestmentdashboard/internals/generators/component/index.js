/**
 * Component Generator
 */

const componentExists = require('../utils/componentExists');

module.exports = {
  description: 'Add a component',
  prompts: [
    {
      type: 'list',
      name: 'type',
      message: 'Select the base component type:',
      default: 'Complete',
      choices: () => ['Complete'],
    },
    {
      type: 'input',
      name: 'name',
      message: 'What should it be called?',
      default: 'Component',
      validate: value => {
        if (/.+/.test(value)) {
          return componentExists(value)
            ? 'A component or container with this name already exists'
            : true;
        }

        return 'The name is required';
      },
    },
  ],
  actions: data => {
    // Generate index.js and index.test.js
    const componentTemplate = [];
    const actions = [];

    switch (data.type) {
      case 'Complete': {
        componentTemplate.push({
          template: './component/component.js.hbs',
          name: '{{properCase name}}.component.js',
        });
        componentTemplate.push({
          template: './component/component.test.js.hbs',
          name: '{{properCase name}}.component.test.js',
        });
        componentTemplate.push({
          template: './component/template.js.hbs',
          name: '{{properCase name}}.template.js',
        });
        componentTemplate.push({
          template: './component/template.test.js.hbs',
          name: '{{properCase name}}.template.test.js',
        });
        componentTemplate.push({
          template: './component/index.js.hbs',
          name: 'index.js',
        });
        componentTemplate.push({
          template: './component/index.test.js.hbs',
          name: 'index.test.js',
        });
        componentTemplate.push({
          template: './component/styles.js.hbs',
          name: 'styles.js',
        });
        break;
      }
      default: {
        componentTemplate.push('./component/component.js.hbs');
      }
    }

    componentTemplate.map(comp => {
      const path =
        '../../src/components/{{properCase name}}Component/' + comp.name;
      const templateFile = comp.template;
      actions.push({
        type: 'add',
        path,
        templateFile,
        abortOnFail: true,
      });
    });

    actions.push({
      type: 'prettify',
      path: '/components/',
    });

    return actions;
  },
};
