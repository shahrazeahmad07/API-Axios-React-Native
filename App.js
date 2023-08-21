import React, {useEffect, useState} from 'react';
import {ActivityIndicator, FlatList, StyleSheet, View} from 'react-native';
import ListItem from './components/ListItem';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import axios from 'axios';

const endPoint = 'https://reqres.in/api/users?page=2';

const App = ({style}) => {
  const [data, setData] = useState();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setIsLoading(true);
    //! api get
    // Axios simple get call
    axios
      .get(endPoint)
      .then(function (response) {
        setData(response.data.data);
      })
      .catch(function (error) {
        console.log(error);
      });

    // simple fetch function
    // async function fetchData() {
    //   let result = await fetch(endPoint);
    //   if (result.status == 200) {
    //     result = await result.json();
    //     setData(result);
    //   } else {
    //     console.log(result.statusText);
    //   }
    // }
    // fetchData();
    let newUser = {
      name: 'foo',
      job: 'bar',
    };

    //! api create => Post
    axios
      .post('https://reqres.in/api/users', newUser)
      .then(function (response) {
        // handle success
        console.log(response.data);
      })
      .catch(function (error) {
        // handle error
        alert(error.message);
      });

    //! api Delete
    function deleteUserWithId(id) {
      axios
        .delete(`https://reqres.in/api/users/${id}`)
        .then(function (response) {
          console.log(response.data);
        })
        .catch(function (error) {
          alert(error.message);
        });
    }
    deleteUserWithId(2);

    //! api update => put
    function updateUserWithId(id, updatedData) {
      axios
        .put(`https://reqres.in/api/users/${id}`, updatedData)
        .then(function (response) {
          console.log(response.data);
        })
        .catch(function (error) {
          alert(error.message);
        });
    }
    updateUserWithId(2, newUser);

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
              first_name={item.first_name}
              last_name={item.last_name}
              id={item.id}
              avatar={item.avatar}
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
    paddingTop: hp(3),
    paddingBottom: hp(3),
  },
});

export default App;
