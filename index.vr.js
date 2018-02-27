
 'use strict';

import React from 'react';
import {AppRegistry, asset, Pano, Text, View, VrButton, LiveEnvCamera, NativeModules} from 'react-vr';

const NativeMethodsMixin = require('NativeMethodsMixin');
const StyleSheetPropType = require('StyleSheetPropType');
const LayoutAndTransformPropTypes = require('LayoutAndTransformPropTypes');
const ReactNativeViewAttributes = require('ReactNativeViewAttributes');
const requireNativeComponent = require('requireNativeComponent');
const createReactClass = require('create-react-class');


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