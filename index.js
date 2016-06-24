import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  Linking,
  PixelRatio,
} from 'react-native';

import htmlparser from './lib/htmlparser';

const ratio = PixelRatio.get();

const defaultStyle = {
  a: {
    color: '#007aff',
    fontWeight: '500',
  },
  b: {
    fontWeight: 'bold',
  },
  strong: {
    fontWeight: 'bold',
  },
};

export default class Html5 extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {
    this.parse();
  }

  parse() {
    var handler = new htmlparser.DefaultHandler((err, doms) => {
      if(err) {
        console.log(err);
      } else {
        this.setState({
          doms: doms
        });
      }
    }, {
      ignoreWhitespace: true
    });
    var parser = new htmlparser.Parser(handler);
    parser.parseComplete(this.props.rawHtml.trim());
  }

  unescapeHTML(source) {
    return source
      .replace(/&lt;/g, '<')
      .replace(/&gt;/g, '>')
      .replace(/&nbsp;/g, ' ')
      .replace(/&quot;/g, '"')
      .replace(/&amp;/g, '&')
      .replace(/&copy;/g, '©');
  }

  compile(doms) {
    var styleSheet = this.props.styleSheet;
    return doms.map((dom, index) => {
      if(dom.type === 'tag') {
        let style = Object.assign({}, defaultStyle[dom.name], styleSheet[dom.name]);
        switch(dom.name) {
          case 'img':
            if(dom.attribs.width) {
              style.width = parseInt(dom.attribs.width);
            }
            if(dom.attribs.height) {
              style.height = parseInt(dom.attribs.height);
            }
            return (
              <XImage
                key={index}
                source={{uri: dom.attribs.src, }}
                style={style}
                resizeMode={Image.resizeMode.strech}
              />
            );
          case 'span':
          case 'time':
          case 'b':
          case 'strong':
            return (
              <Text
                key={index}
                style={style}
              >{this.compile(dom.children)}</Text>
            );
          case 'a':
            return (
              <Text
                key={index}
                style={style}
                onPress={() => Linking.openURL(dom.attribs.href)}
              >{this.compile(dom.children)}</Text>
            );
          case 'br':
            return (
              <Text key={index}>{'\n'}</Text>
            );
          default:
            return (
              <View
                key={index}
                style={style}
              >{this.compile(dom.children)}</View>
            );
        }
      } else if(dom.type === 'text') {
        return (
          <Text key={index}>{this.unescapeHTML(dom.data)}</Text>
        );
      } else {
        return (
          <View key={index}>{this.compile(dom.children)}</View>
        );
      }
    });
  }

  render() {
    if(!this.state.doms) {
      return (
        <View></View>
      );
    } else {
      return (
        <View>
          {this.compile(this.state.doms)}
        </View>
      );
    }
  }
}

class XImage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loaded: false,
    };
  }

  componentDidMount() {
    this.fetch();
  }

  fetch() {
    var { style } = this.props;
    if(style.width && style.height) {
      this.setState({
        width: style.width,
        height: style.height,
        loaded: true
      });
    } else {
      Image.getSize(this.props.source.uri, (width, height) => {
        this.setState({
          width: width / ratio,
          height: height / ratio,
          loaded: true
        });
      });
    }
  }

  render() {
    if(!this.state.loaded) {
      return <Text></Text>;
    } else {
      var size = {
        width: this.state.width,
        height: this.state.height,
      };
      Object.assign(this.props.style, size);
      return (
        <Image
          {...this.props}
        />
      );
    }
  }
}