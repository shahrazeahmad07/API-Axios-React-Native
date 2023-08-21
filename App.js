import React, {useEffect, useState} from 'react';
import {ActivityIndicator, FlatList, StyleSheet, View} from 'react-native';
import ListItem from './components/ListItem';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

const endPoint = 'https://api.github.com/users';

const App = ({style}) => {
  const [data, setData] = useState();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setIsLoading(true);
    async function fetchData() {
      let result = await fetch(endPoint);
      if (result.status == 200) {
        result = await result.json();
        setData(result);
      } else {
        console.log(result.statusText);
      }
    }
    fetchData();
    setIsLoading(false);
  }, []);

  if (isLoading) {
    return (
      <View
        style={{
          flex: 1,
          justifyContent: 'center',
          alignItems: 'center',
          backgroundColor: 'black',
        }}>
        <ActivityIndicator size="large" color={'black'} />
      </View>
    );
  } else if (data)
    return (
      <View style={[styles.container, style]}>
        <FlatList
          style={styles.flatList}
          data={data}
          keyExtractor={item => {
            return item.id;
          }}
          renderItem={({item}) => (
            <ListItem
              style={styles.listItem}
              name={item.login.toUpperCase()}
              id={item.id}
              image_url={item.avatar_url}
            />
          )}
        />
      </View>
    );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  flatList: {
    marginTop: hp(3),
  },
});

export default App;
