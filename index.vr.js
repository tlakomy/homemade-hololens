/**
 * The examples provided by Oculus are for non-commercial testing and
 * evaluation purposes only.
 *
 * Oculus reserves all rights not expressly granted.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS
 * OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NON INFRINGEMENT. IN NO EVENT SHALL
 * OCULUS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN
 * AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN
 * CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
 */

'use strict';
/**
 *
 * CubeSample displays a ReactVR button and text, along with a Three.js cube.
 * The cube will change color when the button is selected. The React context
 * and Three.js scene are in separate threads, so they communicate over the
 * React Native bridge via the CubeModule, a custom Native Module. This
 * shows how ReactVR UI elements can be added to an existing Three.js scene.
 */

import React from 'react';
import {AppRegistry, asset, Pano, Text, View, VrButton, LiveEnvCamera, NativeModules} from 'react-vr';

const NativeMethodsMixin = require('NativeMethodsMixin');
const StyleSheetPropType = require('StyleSheetPropType');
const LayoutAndTransformPropTypes = require('LayoutAndTransformPropTypes');
const ReactNativeViewAttributes = require('ReactNativeViewAttributes');
const requireNativeComponent = require('requireNativeComponent');
const createReactClass = require('create-react-class');

// Native Module defined in vr/client.js
const CubeModule = NativeModules.CubeModule;

const TestDom = createReactClass({
  mixins: [NativeMethodsMixin],

  propTypes: {
    ...View.propTypes,
    style: StyleSheetPropType(LayoutAndTransformPropTypes),
  },

  viewConfig: {
    uiViewClassName: 'TestDom',
    validAttributes: {
      ...ReactNativeViewAttributes.RCTView,
    },
  },

  getDefaultProps: function() {
    return {};
  },

  render: function() {
    return (
      <RKTestDom/>
    );
  },
});

const RKTestDom = requireNativeComponent('TestDom', TestDom, {
  nativeOnly: {},
});


/**
 * CubeSample implements a custom button that calls a native module method,
 * changing the color of a cube that is managed on the native (Three.js) side.
 */
class CubeSample extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      borderColor: 'rgba(0, 0, 0, 0)', // transparent
      btnColor: 'grey',
      cubeColor: 'yellow',
    };
    CubeModule.changeCubeColor(this.state.cubeColor);
  }

  render() {
    return (
      <View>
        <LiveEnvCamera />
        <TestDom />
      </View>
    );
  }
}

AppRegistry.registerComponent('CubeSample', () => CubeSample);