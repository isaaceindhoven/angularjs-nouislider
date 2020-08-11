import 'nouislider/distribute/nouislider.css';
import '../css/examples.css';

async function loadDependencies() {
  const angularRequest = import('angular' /* webpackChunkName: "angular" */);
  const nouisliderRequest = import('nouislider' /* webpackChunkName: "nouislider" */);

  const [angular] = await Promise.all([angularRequest, nouisliderRequest]);

  const angularJsonEditorRequest = import('angular-jsoneditor' /* webpackChunkName: "angular-jsoneditor" */);
  const noUiSliderModuleRequest = import('../../src/index' /* webpackChunkName: "angularjs-nouislider" */);

  const [noUiSliderModule] = await Promise.all([noUiSliderModuleRequest, angularJsonEditorRequest]);

  return { angular, noUiSliderModule };
}

loadDependencies().then(({ angular, noUiSliderModule }) => {
  const noUiSliderExamplesApp = angular.module('noUiSliderExamplesApp', [noUiSliderModule.default, 'angular-jsoneditor']);

  noUiSliderExamplesApp.controller('examplesController', ($scope, $log) => {
    $scope.sliderPositions = [20, 80];

    $scope.optionsWithoutStart = {
      connect: true,
      range: {
        min: 0,
        max: 100,
      },
    };

    $scope.optionsWithStart = angular.merge(angular.copy($scope.optionsWithoutStart), {
      start: $scope.sliderPositions,
    });

    $scope.percentage = 25;

    $scope.optionsPercentage = {
      step: 5,
      range: {
        min: 15,
        max: 70,
      },
      pips: {
        mode: 'steps',
        density: 7,
        filter: (percentage) => {
          const showText = percentage % 25 && percentage !== 5 && percentage !== 70;
          return showText ? 2 : 1;
        },
        format: {
          to: (input) => `${ input }%`,
          from: (input) => parseInt(input.replace('%', ''), 10),
        },
      },
      format: {
        to: (input) => parseInt(input, 10),
        from: (input) => input.toString(),
      },
    };

    $scope.jsonEditorOptions = {};

    $scope.onSliderCreated = (sliderInstance) => {
      const callback = (...params) => {
        $log.log(params);
      };

      sliderInstance.$on('set', callback);
    };
  });
});
