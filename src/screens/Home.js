/* eslint-disable react-native/no-inline-styles */
import React, {Component} from 'react';
import {
  Dimensions,
  FlatList,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import Feather from 'react-native-vector-icons/Feather';
import {auth, firebase} from '../config/DbConfig';

const {width} = Dimensions.get('window');
const PADDING = width * 0.05;
const ItemsNote = ({onPress, data}) => {
  return (
    <TouchableOpacity activeOpacity={1} onPress={onPress}>
      <View style={styles.itemContainer}>
        <View style={styles.subcontainerItem}>
          <Text style={styles.itemsNotes}>{data.notes || ''}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};
export class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      notesList: [],
      loading: true,
      usersData: null,
    };
    this.unsubscribe = null;
  }
  componentDidMount() {
    this.unsubscribe = this.props.navigation.addListener('focus', () => {
      auth().onAuthStateChanged((d) => {
        this.setState({
          usersData: d,
        });
        this._getNotesData(d.uid);
      });
    });
    auth().onAuthStateChanged((d) => {
      this.setState({
        usersData: d,
      });
      this._getNotesData(d.uid);
    });
  }
  componentWillUnmount() {
    this.unsubscribe.remove();
  }
  _getNotesData(uid) {
    firebase
      .database()
      .ref('notes')
      .child(uid)
      .once('value', (value) => {
        this.setState({
          notesList: value.val(),
          loading: false,
        });
      });
  }
  _editData(data, i) {
    this.props.navigation.navigate('AddNotes', {
      notes: data,
      index: i,
    });
  }
  render() {
    const {loading, notesList, usersData} = this.state;
    if (loading) {
      return <View />;
    }
    if (!usersData) {
      return <View />;
    }
    return (
      <>
        <View style={styles.container}>
          <StatusBar barStyle="dark-content" backgroundColor="#fff" />
          <FlatList
            ListHeaderComponent={() => {
              return (
                <View style={styles.headerContainer}>
                  <Text style={styles.headerlabel}>
                    {usersData.displayName}
                  </Text>
                </View>
              );
            }}
            data={notesList}
            numColumns={2}
            renderItem={({item, index}) => {
              return (
                <ItemsNote
                  data={item}
                  index={index}
                  onPress={() => this._editData(item, index)}
                />
              );
            }}
            keyExtractor={(item, index) => index.toString()}
          />
        </View>
        <TouchableOpacity
          activeOpacity={1}
          onPress={() => {
            this.props.navigation.navigate('AddNotes');
          }}
          style={styles.floatingButton}>
          <Feather name="plus" color="#fff" size={30} />
        </TouchableOpacity>
      </>
    );
  }
}

export default Home;

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#efefef',
    flex: 1,
  },
  floatingButton: {
    backgroundColor: '#3498DB',
    position: 'absolute',
    height: width * 0.12,
    width: width * 0.12,
    bottom: PADDING,
    right: PADDING,
    borderRadius: 100,
    elevation: 5,
    justifyContent: 'center',
    alignItems: 'center',
  },
  headerContainer: {
    padding: PADDING,
    backgroundColor: '#fff',
  },
  headerlabel: {
    fontSize: width * 0.04,
    fontWeight: 'bold',
  },
  itemContainer: {
    width: width / 2,
    paddingVertical: PADDING / 2,
    paddingHorizontal: PADDING / 2,
  },
  subcontainerItem: {
    backgroundColor: '#fff',
    borderRadius: 10,
    minHeight: width * 0.1,
    padding: PADDING / 2,
    maxHeight: width / 2,
    overflow: 'hidden',
  },
  itemsNotes: {
    fontSize: width * 0.035,
  },
});
// /* eslint-disable react-native/no-inline-styles */
// import AsyncStorage from '@react-native-async-storage/async-storage';
// import React, {Component} from 'react';
// import {
//   Dimensions,
//   TouchableWithoutFeedback,
//   StatusBar,
//   Text,
//   View,
//   Image,
//   ScrollView,
//   FlatList,
//   Platform,
//   Animated,
// } from 'react-native';
// import {ButtonForm} from '../components/ButtonForm';
// const {width} = Dimensions.get('window');
// const PADDING = width * 0.05;
// const OVERFLOW_HEIGHT = 70;
// const SPACING = 10;
// const VISIBLE_ITEMS = 3;

// const ITEM_WIDTH = width * 0.5;
// const dummy = [{}, {item: 1}, {item: 1}, {item: 1}, {item: 1}, {item: 1}, {}];
// export class Home extends Component {
//   constructor(props) {
//     super(props);
//     this._scrollX = new Animated.Value(0);
//   }
//   render() {
//     return (
//       <ScrollView
//         style={{
//           backgroundColor: '#fff',
//         }}>
//         <StatusBar backgroundColor="#fff" barStyle="dark-content" />
//         <Animated.FlatList
//           horizontal
//           snapToAlignment="start"
//           showsHorizontalScrollIndicator={false}
//           data={dummy}
//           renderToHardwareTextureAndroid
//           decelerationRate={0.5}
//           onScroll={Animated.event(
//             [{nativeEvent: {contentOffset: {x: this._scrollX}}}],
//             {useNativeDriver: true},
//           )}
//           snapToInterval={ITEM_WIDTH}
//           scrollEventThrottle={16}
//           bounces={false}
//           renderItem={({item, index}) => {
//             const inputRange = [
//               (index - 2) * ITEM_WIDTH,
//               (index - 1) * ITEM_WIDTH,
//               index * ITEM_WIDTH,
//             ];
//             const translateX = this._scrollX.interpolate({
//               inputRange,
//               outputRange: [-(width - ITEM_WIDTH) / dummy.length + 5, 0, 50],
//             });
//             const scale = this._scrollX.interpolate({
//               inputRange,
//               outputRange: [0.9, 1, 2],
//             });
//             const opacity = this._scrollX.interpolate({
//               inputRange,
//               outputRange: [0.5, 1, 0],
//             });

//             if (!item.item) {
//               return (
//                 <View
//                   style={{
//                     width: (width - ITEM_WIDTH) / 2,
//                   }}
//                 />
//               );
//             }
//             return (
//               <Animated.View
//                 style={{
//                   width: ITEM_WIDTH - 20,
//                   borderRadius: 10,
//                   overflow: 'hidden',
//                   marginHorizontal: 10,
//                   height: ITEM_WIDTH,
//                   opacity,
//                   transform: [{translateX}, {scale}],
//                 }}>
//                 <Animated.Image
//                   source={{
//                     uri:
//                       'https://cdn.pixabay.com/photo/2015/06/22/08/40/child-817373__340.jpg',
//                   }}
//                   style={{
//                     width: null,
//                     height: null,
//                     flex: 1,
//                     resizeMode: 'cover',
//                   }}
//                 />
//               </Animated.View>
//             );
//           }}
//         />
//       </ScrollView>
//     );
//   }
// }

// export default Home;
