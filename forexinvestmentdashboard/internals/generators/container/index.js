/**
 * Container Generator
 */

const componentExists = require('../utils/componentExists');

module.exports = {
  description: 'Add a container component',
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
      default: 'Form',
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
          template: './container/container.js.hbs',
          name: '{{properCase name}}.container.js',
        });
        componentTemplate.push({
          template: './container/container.test.js.hbs',
          name: '{{properCase name}}.container.test.js',
        });
        componentTemplate.push({
          template: './container/template.js.hbs',
          name: '{{properCase name}}.template.js',
        });
        componentTemplate.push({
          template: './container/template.test.js.hbs',
          name: '{{properCase name}}.template.test.js',
        });
        componentTemplate.push({
          template: './container/index.js.hbs',
          name: 'index.js',
        });
        componentTemplate.push({
          template: './container/index.test.js.hbs',
          name: 'index.test.js',
        });
        componentTemplate.push({
          template: './container/styles.js.hbs',
          name: 'styles.js',
        });
        break;
      }
      default: {
        componentTemplate.push('./container/container.js.hbs');
      }
    }

    componentTemplate.map(comp => {
      const path =
        '../../src/containers/{{properCase name}}Container/' + comp.name;
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
      path: '/containers/',
    });

    return actions;
  },
};
