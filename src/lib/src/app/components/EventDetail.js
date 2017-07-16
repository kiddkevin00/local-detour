import WebViewWrapper from './common/WebViewWrapper';
import Separator from './common/Separator';
import BaseComponent from './common/BaseComponent';
import { Container, Header, Title, Content, Footer, FooterTab, Button, Left, Right, Body, Icon, Text } from 'native-base';
import {
  StyleSheet,
  //Text,
  View,
  ScrollView,
  TouchableHighlight,
} from 'react-native';
import React from 'react';
import PropTypes from 'prop-types';


const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
  },
  rowContainer: {
    padding: 10,
  },
  rowTitle: {
    color: '#48BBEC',
    fontSize: 16,
  },
  rowContent: {
    fontSize: 19,
  },
});

class EventDetail extends BaseComponent {

  constructor(props) {
    super(props);

    this._bind('_openPage');
  }

  static propTypes = {
    event: PropTypes.object.isRequired,
  };

  render() {
    const event = this.props.event;
    const shownTitles = [
      { key: 'name', title: 'Name' },
      { key: 'address', title: 'Address' },
      { key: 'startDate', title: 'Start Date' },
      { key: 'endDate', title: 'End Date' },
      { key: 'type', title: 'Type' },
      { key: 'description', title: 'Description' },
      { key: 'cost', title: 'Cost' },
      { key: 'externalLink', title: 'External Resource' },
    ];

    const list = shownTitles.map((titleObj, index) => {
      const content = event[titleObj.key];

      return (
        <View key={ `repo-${index}` }>
          <View style={ styles.rowContainer }>
            <Text style={ styles.rowTitle }>{ titleObj.title }</Text>
            { titleObj.key === 'externalLink' ? (
              <TouchableHighlight
                onPress={ this._openPage.bind(this, content) }
                underlayColor="transparent"
              >
                <Text style={ styles.rowContent }>{ content || 'N/A' }</Text>
              </TouchableHighlight>
            ) : (
              <Text style={ styles.rowContent }>{ content || 'N/A' }</Text>
            ) }
          </View>
          <Separator />
        </View>
      );
    });

    return (
      <Container>
        <Header style={ { height: 64, backgroundColor: '#f4f7f9', } } />
        <Content>
          <ScrollView style={ styles.container }>
            { list }
          </ScrollView>
        </Content>
        <Footer>
          <FooterTab>
            <Button full onPress={ () => alert('Saved!') }>
              <Text>Save</Text>
            </Button>
          </FooterTab>
        </Footer>
      </Container>
    );
  }

  _openPage(url) {
    this.props.navigator.push({
      title: 'Web Page',
      component: WebViewWrapper,
      passProps: { url },
    });
  }

}

export { EventDetail as default };
