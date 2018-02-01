import angular from 'angular';
import noUiSlider from 'nouislider';
import ngModule from './module';

ngModule.directive('noUiSlider', ($timeout, $q, $log) => ({
  restrict: 'AE',
  require: '?ngModel',
  scope: {
    created: '&sliderCreated',
    options: '@sliderOptions',
  },
  link: (scope, element, attrs, ngModel) => {
    const htmlElement = element[0];
    let options = angular.fromJson(scope.options);

    function extendApi(api) {
      api.$on = (eventName, callback) => {
        const wrappedCallback = () => {
          $timeout(() => {
            callback(api.get());
          });
        };

        api.on(eventName, wrappedCallback);

        return () => {
          api.off(eventName, wrappedCallback);
        };
      };

      return api;
    }

    function setCreatedWatcher(api) {
      scope.$watch('created', (newCallback) => {
        if (!angular.isFunction(newCallback)) {
          return;
        }

        newCallback({ api });
      });
    }

    function setOptionsWatcher(api) {
      scope.$watch('options', (newOptions, oldOptions) => {
        if (angular.equals(newOptions, oldOptions)) {
          return;
        }

        options = angular.fromJson(scope.options);

        $log.log(newOptions, oldOptions);
        api.updateOptions(options);
      });
    }

    function bindNgModelControls(api) {
      ngModel.$render = () => {
        api.set(ngModel.$modelValue);
      };

      api.on('update', () => {
        const positions = api.get();
        ngModel.$setViewValue(positions);
      });
    }

    function initializeNgModel() {
      if (ngModel === null) {
        return $q.resolve(null);
      }

      return $q((resolve) => {
        $timeout(() => {
          if (!(angular.isArray(ngModel.$modelValue) || angular.isNumber(ngModel.$modelValue))) {
            throw new Error(`Value provided in ngModel is not a valid noUislider start position. Expected a Number or an Array of Numbers, found: ${ ngModel.$modelValue }`);
          }

          resolve(ngModel.$modelValue);
        });
      });
    }

    function createInstance() {
      const api = extendApi(noUiSlider.create(htmlElement, options));

      setCreatedWatcher(api);
      setOptionsWatcher(api);

      if (ngModel !== null) {
        bindNgModelControls(api);
      }
    }

    initializeNgModel()
      .then(($modelValue) => {
        if ($modelValue !== null) {
          options.start = $modelValue;
        }

        createInstance();
      })
      .catch($log.error);
  },
}));
