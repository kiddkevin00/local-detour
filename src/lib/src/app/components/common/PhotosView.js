import React, { Component } from 'react';
import {
  Image,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
  Text,
} from 'react-native';
import Swiper from 'react-native-swiper';
import PhotoView from 'react-native-photo-view';


const { width, height } = Dimensions.get('window');
const styles = StyleSheet.create({
  wrapper: {
    backgroundColor: '#000',
    top: 0,
    right: 0,
    bottom: 0,
    left: 0,
  },
  slide: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  photo: {
    width,
    height,
    flex: 1,
  },
  text: {
    color: '#fff',
    fontSize: 30,
    fontWeight: 'bold',
  },
  thumbWrap: {
    marginTop: 100,
    borderWidth: 5,
    borderColor: '#000',
    flexDirection: 'row',
  },
  thumb: {
    width: 50,
    height: 50,
  },
});

const renderPagination = (index, total, context) => (
  <View
    style={ {
      //justifyContent: 'center',
      alignItems: 'center',
      position: 'absolute',
      top: 25,
      left: 0,
      right: 0,
    } }
  >
    <View
      style={ {
        borderRadius: 7,
        backgroundColor: 'rgba(255,255,255,.15)',
        padding: 3,
        paddingHorizontal: 7,
      } }
    >
      <Text
        style={ {
          color: '#fff',
          fontSize: 14,
        } }
      >
        { index + 1 } / {total}
      </Text>
    </View>
  </View>
);

const Viewer = (props) => (
  <Swiper
    style={ styles.wrapper }
    index={ props.index }
    renderPagination={ renderPagination }
  >
      {
        props.imgList.map((item, index) => (
          <View style={ styles.slide } key={ index }>
            <TouchableWithoutFeedback onPress={ (event) => props.pressHandle() }>
              <PhotoView
                source={ { uri: item } }
                resizeMode="stretch"
                minimumZoomScale={ 0.5 }
                maximumZoomScale={ 3 }
                androidScaleType="center"
                style={ styles.photo }
              />
            </TouchableWithoutFeedback>
          </View>
        ))
      }
  </Swiper>
);

class PhotosView extends Component {

  constructor(props) {
    super(props);
    this.state = {
      imgList: [
        'https://firebasestorage.googleapis.com/v0/b/spiritual-guide-476dd.appspot.com/o/nyc%2Ffireworks%2Ffireworks-display-from-SeaFair-yacht.jpg?alt=media&token=eddda0a4-ab32-48ea-a311-e91e03dcd4d3',
        'https://firebasestorage.googleapis.com/v0/b/spiritual-guide-476dd.appspot.com/o/nyc%2Ffireworks%2Ffireworks-photo.jpg?alt=media&token=131fbac8-95d6-4983-b1a2-619f410b286b',
        'https://firebasestorage.googleapis.com/v0/b/spiritual-guide-476dd.appspot.com/o/nyc%2Ffireworks%2Ffireworks.jpg?alt=media&token=094444b9-d776-46ee-b1ec-8a05990c20c4',
        'https://firebasestorage.googleapis.com/v0/b/spiritual-guide-476dd.appspot.com/o/nyc%2FEDM%2Fsample-event_1.jpg?alt=media&token=4225f3aa-609e-4f27-a68b-76f55b417ad9',
        'https://firebasestorage.googleapis.com/v0/b/spiritual-guide-476dd.appspot.com/o/nyc%2Ffireworks%2Fsample-event_2.jpeg?alt=media&token=79aaa2f0-0f57-4635-bd50-bbcfd67ecc6b',
        'https://firebasestorage.googleapis.com/v0/b/spiritual-guide-476dd.appspot.com/o/nyc%2FEDM%2FElectric_Love_2013.jpg?alt=media&token=24269bdf-2fee-45f4-9136-f8828697bfdc',
        'https://firebasestorage.googleapis.com/v0/b/spiritual-guide-476dd.appspot.com/o/nyc%2FEDM%2Fedm.jpg?alt=media&token=b44c9fb6-1694-449b-834f-7914cd684e52',
        'https://firebasestorage.googleapis.com/v0/b/spiritual-guide-476dd.appspot.com/o/nyc%2FEDM%2FElectric_Love_2013.jpg?alt=media&token=24269bdf-2fee-45f4-9136-f8828697bfdc',
      ],
      showViewer: true,
      showIndex: 0,
    };
    this.viewerPressHandle = this.viewerPressHandle.bind(this);
    this.thumbPressHandle = this.thumbPressHandle.bind(this);
  }

  viewerPressHandle() {
    this.setState({
      showViewer: false,
    });
  }

  thumbPressHandle(i) {
    this.setState({
      showIndex: i,
      showViewer: true,
    });
  }

  render() {
    return (
      <View style={ { position: 'relative' } }>
        {
          this.state.isViewerShown && (
            <Viewer
              index={ this.state.indexShown }
              pressHandle={ this.viewerPressHandle }
              imgList={ this.state.imgList }
            />
          )
        }
        <View style={ styles.thumbWrap }>
          {
            this.state.imgList.map((item, i) => (
              <TouchableOpacity key={ i } onPress={ (e) => this.thumbPressHandle(i) }>
                <Image style={ styles.thumb } key={ i } source={ { uri: item } } />
              </TouchableOpacity>
            ))
          }
        </View>
      </View>
    );
  }

}

export { PhotosView as default };
