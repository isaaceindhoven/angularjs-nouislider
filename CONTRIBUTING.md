# Contributing guidelines
You want to contribute to this plugin? Great! To ensure changes can get through quickly and issues can be resolved quickly we have a couple of guidelines we hope you guys will stick to. For general noUiSlider questions and issues, please refer to noUiSlider's own [contributing guidelines](https://github.com/leongersen/noUiSlider/blob/master/CONTRIBUTING.md).

## Questions
Questions regarding the use can be posted on [Stackoverflow](https://stackoverflow.com/questions/tagged/angularjs-nouislider) using the 'angularjs-nouislider' tag. I'll check this tag as often as possible.

## Issues & feature request
When you found an issue or have a feature request, please report it to the [GitHub repository](https://github.com/isaaceindhoven/angularjs-nouislider/issues) and clearly describe your problem or feature request. And preferably a way to recreate the issue.

## Submitting a pull request
You can also create pull requests when you've fixed a bug or introduced a new feature. Please fork the repository and follow the following steps to get the development environment up and running:

1. Clone the repository using `git clone https://github.com/<github-username>/angularjs-nouislider.git` (replace `<github-username>` with your own github username on which you forked the repository).
2. Install all development dependencies using NPM by running `npm install` inside the project root folder.
3. Start the development server by running `npm start` to start the examples development server which exposes and points your browser to the `index.html` file found in `src-examples` to `localhost:8080`.
4. In a different terminal run `npm run minify-watch`, this will watch the files in `src` and transpile and minify them to be used by the examples page. 

Using this setup you can test your code using the examples page. As an extra it encourages you to make an example specific to your use, if you're building a new feature.

When finished writing your code, execute the following to build the dist files:

1. Run `npm run build` to transpile and build the module's files
3. Tun `npm run examples` to build the example files. **Always run this command after running `npm start` since this command removes the `dist` folders to ensure correct building and to be able to run the development server in memory.**

## Linting
We use ESLint using the [Airbnb base ESLint configuration](https://www.npmjs.com/package/eslint-config-airbnb-base) with some small additions. 
