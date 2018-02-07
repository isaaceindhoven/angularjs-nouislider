import angular from 'angular';
import 'angular-jsoneditor';
import '../css/examples.css';

const noUiSliderExamplesApp = angular.module('noUiSliderExamplesApp', ['noUiSlider', 'angular-jsoneditor']);

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

  $scope.jsonEditorOptions = {};

  $scope.onSliderCreated = (sliderInstance) => {
    const callback = (...params) => {
      $log.log(params);
    };

    sliderInstance.$on('set', callback);
  };
});
