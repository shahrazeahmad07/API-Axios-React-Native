import React from 'react';
import {Image, StyleSheet, Text, View} from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

const ListItem = ({style, name, id, image_url}) => {
  return (
    <View style={[styles.container, style]}>
      <Image source={{uri: image_url}} style={styles.image} />
      <View style={styles.detailsContainer}>
        <Text style={styles.name}>{name}</Text>
        <Text>ID: {id}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginHorizontal: wp(5),
    marginVertical: hp(0.7),
    backgroundColor: 'white',
    borderRadius: wp(2),
    elevation: wp(3),
    shadowColor: 'black',
    shadowOffset: {width: wp(3), height: hp(3)},
    shadowOpacity: 1,
    flexDirection: 'row',
    overflow: 'hidden',
    alignItems: 'center',
  },
  image: {
    width: wp(22),
    height: hp(11),
  },
  detailsContainer: {
    marginLeft: wp(3),
  },
  name: {
    fontSize: wp(4.8),
  },
});

export default ListItem;
