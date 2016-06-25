# react-native-html5
html, html5 parser for react-native

![Mou icon](https://pillys.github.io/react-native-html5/images/0.png)
![Mou icon](https://pillys.github.io/react-native-html5/images/1.png)

## Install
```
npm install react-native-html5
```

## Usage

### rawHtml

HTML Text

### styleSheet

optional, styles

### externalStyleSheet

optional, external styles, textIndent for &lt;p&gt; supported

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
    <h1>h1. heading</h1>
    <h2>h2. heading</h2>
    <h3>h3. heading</h3>
    <h4>h4. heading</h4>
    <h5>h5. heading</h5>
    <h6>h6. heading</h6>
    <p>&lt;p&gt; is a paragraph</p>
    <p>&lt;image&gt; rendered as an image</p>
    <img src="https://facebook.github.io/react/img/logo_og.png" />
    <p>&lt;mark&gt; renderd as <mark>highlight text</mark></p>
    <p>&lt;del&gt; or &lt;s&gt; rendered as <del>deleted text</del> </p>
    <p>&lt;u&gt; or &lt;ins&gt; rendered as <u>underlined text</u></p>
    <p>&lt;small&gt; rendered as <small>small text</small></p>
    <p>&lt;strong&gt; or &lt;b&gt; <strong>rendered as bold text</strong></p>
    <p>&lt;em&gt; or &lt;i&gt; <em>rendered as italicized text</em></p>
    <blockquote>
      <p>&lt;blockquote&gt; rendered as a blockquote</p>
    </blockquote>
    <p>&lt;code&gt; <code>rendered as code</code></p>
    <p>and other most of html tags supported.</p>
  </div>
  `;
  
  const styleSheet = {
    a: {
      color: '#00f',
    }
  };
  const externalStyleSheet = {
    p: {
      textIndent: 0,
    },
  };

  class ReactNativeHtml5Test extends Component {
    render() {
      return (
        <ScrollView style={styles.container}>
          <Html5
            rawHtml={rawHtml}
            styleSheet={styleSheet}
            externalStyleSheet={externalStyleSheet}
          />
        </ScrollView>
      );
    }
  }

  const styles = StyleSheet.create({
    container: {
      marginTop: 40,
      padding: 20,
    },
  });
```