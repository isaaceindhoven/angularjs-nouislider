# angularjs-nouislider
An AngularJS wrapper for the [noUiSlider](https://refreshless.com/nouislider/) range slider with minimal overhead. The module is ~2kb when minimized and gzipped.

## Demo
Two demos can be found [here](https://luudjanssen.github.io/angularjs-nouislider/examples). One demo without the use of `ngModel` and one with the use of `ngModel`.

## Installation
angularjs-nouislider does not include Angular nor does it include noUiSlider, therefore Angular and noUiSlider need to
be included or installed separately.

### Using NPM
Make sure you have the [angular](https://www.npmjs.com/package/angular) and [nouislider](https://www.npmjs.com/package/nouislider) NPM packages installed, and then you can install the angularjs-nouislider NPM package with
```
npm install angularjs-nouislider --save
```

### Using Bower
Make sure you have the `angular` and `nouislider` Bower packages installed, and then you can install the angularjs-nouislider Bower package with
```
bower install angularjs-nouislider --save
```

### Using Yarn
Make sure you have the [angular](https://yarnpkg.com/en/package/angular) and [nouislider](https://yarnpkg.com/en/package/nouislider) Yarn packages installed, and then you can install the angularjs-nouislider Yarn package with
```
yarn add angularjs-nouislider
```

### Downloading the source (not recommended)
You can download the [`angularjs-nouislider.js`](https://raw.githubusercontent.com/LuudJanssen/angularjs-nouislider/master/dist/angularjs-nouislider.js) and [`angularjs-nouislider.min.js`](https://raw.githubusercontent.com/LuudJanssen/angularjs-nouislider/master/dist/angularjs-nouislider.min.js) source in the dist folder and import them using a `<script>` tag. angularjs-nouislider needs to be imported **after** Angular and noUiSlider are imported.
```html
<script src="path/to/angular.min.js"></script>
<script src="path/to/nouislider.min.js"></script>
<script src="path/to/angularjs-nouislider.min.js"></script>
```

*It is recommended that you also download the [`angularjs-nouislider.js.map`](https://raw.githubusercontent.com/LuudJanssen/angularjs-nouislider/master/dist/angularjs-nouislider.js.map)  and / or [`angularjs-nouislider.min.js.map`](https://raw.githubusercontent.com/LuudJanssen/angularjs-nouislider/master/dist/angularjs-nouislider.min.js.map) files and put them in the same folder to enable sourcemaps for easy debugging.*

## Usage
The module is wrapped using a [Universal Module Definition (UMD)](https://github.com/umdjs/umd). This way it can be included multiple ways:

### Using ECMAScript modules
```javascript
import angular from 'angular'; // This is optional since angularjs-nouislider imports Angular itself
import noUiSliderModule from 'angularjs-nouislider'; // We export the module name for you

angular.module('myModule', [noUiSliderModule]);
```

### Using RequireJS
```javascript
var angular = require('angular'); // This is optional since angularjs-nouislider imports Angular itself
var noUiSliderModule = require('angularjs-nouislider');

angular.module('myModule', [noUiSliderModule]);
```


### Using global variables (not recommended)
Because webpack currently [doesn't support exporting multiple library names](https://github.com/webpack/webpack/issues/5877) we're stuck with the hyphenated globally exported variable, which can be accessed and used using
```javascript
var noUiSliderModule = window['angularjs-nouislider'];

angular.module('myModule', [noUiSliderModule]);
```

If this seems ugly to you, you can simply use:

```javascript
angular.module('myModule', ['noUiSlider']);
```

## Examples
The directive exported by this module is called `noUiSlider` and can be used with and without `ngModel`. Examples can be found [here](https://luudjanssen.github.io/angularjs-nouislider/examples)

### Using ngModel
When using ngModel you can use the directive like this:
[//]: <> ({% raw %})
```html
<div no-ui-slider
     slider-options="{{ optionsWithoutStart }}"
     ng-model="sliderPositions"></div>
```
[//]: <> ({% endraw %})

In this case you don't have to add the `start` option to the noUiSlider options because the model value is used. In this case your scope could be:

```javascript
$scope.optionsWithoutStart = {
  connect: true,
  range: {
    min: 0,
    max: 100,
  },
};

$scope.sliderPositions = [20, 80];
```

Note that the directive uses the [`noUiSliderInstance.get()` and `noUiSliderInstance.set()` methods](https://refreshless.com/nouislider/slider-read-write/) to communicate with ngModel. This means that your formatters can be defined in the [noUiSlider options](https://refreshless.com/nouislider/slider-options/). 

### Without using ngModel
When you don't want to use the ngModel you will probably want to use the API that `noUiSlider.create()` returns. This instance can be retreived from the directive by writing an expression in the `slider-created` attribute. Example:

**Your model**
```html
<div no-ui-slider
     slider-options="{{ optionsWithStart }}"
     slider-created="onSliderCreated(api)"></div>
```

**Your scope**
```javascript
$scope.optionsWithStart = {
  start: [20, 80],
  connect: true,
  range: {
    min: 0,
    max: 100,
  },
};

$scope.onSliderCreated = (sliderInstance) => {
  const callback = (...params) => {
    $log.log(params);
  };

  sliderInstance.$on('set', callback);
};
```

In this case the onSliderCreated function is called once the noUiSlider instance was created with the returned API as a parameter. This API contains all methods described in the [noUiSlider documentation](https://refreshless.com/nouislider/).

### The $on method
In the previous example you can notice that a method is called on the noUiSlider instance that is not in the official documentation, the `$on(event, callback)` method. This is because this method is added to the instance after creation by the directive.

This method is simply an Angular wrapper for [noUiSlider's `on()` method](https://refreshless.com/nouislider/events-callbacks/). This wraps the callback in a $timeout() to ensure angular knows about the event being fired. Plus, it also adds the slider position(s) returned by `noUiSliderInstance.get()` as a parameter, because in most cases, that's the reason you're adding an event listener.

*Warning: When you register a callback via the `$on()` method, a digest cycle is ran every time the event is emitted by the noUiSlider instance. This might cause performance problems. The solution is to register on events that aren't updated during handle movement (the `set`, `start` and `end` events) or to use `ngModel` with the `debounce` setting set to a reasonable number.*

#### Wait, no $off as well?
To stick with [Angular's `$on` syntax](https://docs.angularjs.org/api/ng/type/$rootScope.Scope#$on), the `$on` method returns a function that can be called to deactivate the event listener.

### Updating options
The `slider-options` attribute is being watched by the directive. Every time a change in the options is detected, the [`noUiSliderInstance.updateOptions()`](https://refreshless.com/nouislider/more/#section-update) method will be called which updates the slider according to the current settings. Note that the [`noUiSliderInstance.updateOptions()`](https://refreshless.com/nouislider/more/#section-update) method only updates for the 'margin', 'limit', 'step', 'range', 'animate' and 'snap' options. For updating other options you should destroy the instance and create a new one.

## License
Just like [noUiSlider's license](https://github.com/leongersen/noUiSlider#license) this plugin is licensed [WTFPL](http://www.wtfpl.net/about/). You can use it **for free** and **without any attribution**, in any personal or commercial project. You may also fork the project and re-release it under another license you prefer.
