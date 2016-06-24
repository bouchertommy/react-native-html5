# react-native-html5
html, html5 parser for react-native

## Example
```
  import React, { Component } from 'react';
  import {
    Text,
    View,
    StyleSheet,
  } from 'react-native';

  import Html5 from 'react-native-html5';

  const rawHtml = `
  <div>
    <p>Hello,  I'm react-native-html5.</p>
    <p><a href="http://www.qque.com">cool!</a></p>
    <img src="https://facebook.github.io/react/img/logo_og.png" />
    <p>sdf&nbsp;&nbsp;&copy;hello,&copy;</p>
  </div>
  `;

  const styleSheet = {
    a: {
      color: '#00f',
    }
  };

  class ReactNativeHtml5Test extends Component {
    render() {
      return (
        <View style={styles.container}>
          <Html5
            rawHtml={rawHtml}
            styleSheet={styleSheet}
          />
        </View>
      );
    }
  }

  const styles = StyleSheet.create({
    container: {
      marginTop: 40,
    },
  });
```