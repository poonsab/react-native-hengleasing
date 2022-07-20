import {useEffect, useState} from 'react';
import {
  View,
  Text,
  FlatList,
  Image,
  StyleSheet,
  ImageBackground,
  Modal,
  Button,
  TouchableOpacity,
  SafeAreaView,
  TextInput,
} from 'react-native';
import * as React from 'react';
import {ScreenStackHeaderSearchBarView} from 'react-native-screens';
// import { NavigationContainer } from '@react-navigation/native';

export default function App() {
  const [isLoading, setLoading] = useState(true);
  // const [data, setData] = useState([]);
  // console.log(data);
  const [openModal, setOpen] = useState(false);

  const [filterData, setfilterData] = useState([]);
  const [masterData, setmasterData] = useState([]);
  const [search, setsearch] = useState('');

  const searchFilter = text => {
    if (text) {
      const newData = masterData.filter(item => {
        const itemData =
          item.firstname.th &&
          item.firstname.en.toUpperCase() &&
          item.lastname.th &&
          item.lastname.en.toUpperCase() &&
          item.nickname.th &&
          item.nickname.en.toUpperCase()
            ? item.firstname.th &&
              item.firstname.en.toUpperCase() &&
              item.lastname.th &&
              item.lastname.en.toUpperCase() &&
              item.nickname.th &&
              item.lastname.en.toUpperCase()
            : ''.toUpperCase();

        // && item.firstname.en ? item.firstname.en.toUpperCase() : ''.toUpperCase()
        // && item.nickname.th ? item.nickname.th.toUpperCase() : ''.toUpperCase()
        // && item.nickname.en ? item.nickname.en.toUpperCase() : ''.toUpperCase();
        const textData = text.toUpperCase();
        return itemData.indexOf(textData) > -1;
      });
      setfilterData(newData);
      setsearch(text);
    } else {
      setfilterData(masterData);
      setsearch(text);
    }
  };

  useEffect(() => {
    fetch('https://powerful-reef-47354.herokuapp.com/members')
      .then(res => res.json())
      .then(json => {
        setfilterData(json);
        setmasterData(json);
      })
      .catch(error => console.error(error))
      .finally(() => setLoading(false));
  }, []);

  return (
    <View style={{flex: 1}}>
      <ImageBackground
        style={{width: '100%', height: '100%'}}
        source={require('./img/bg.jpg')}>
        <Text style={styles.HeaderText}>Members List</Text>

        {isLoading ? (
          <Text>Loading ....</Text>
        ) : (
          // <Text>True</Text>
          <View style={styles.container}>
            <View style={{flexDirection: 'row'}}>
              <Text
                style={{
                  flex: 25,
                  padding: 25,
                  fontSize: 16,
                  fontWeight: 'bold',
                  fontFamily: 'Cochin',
                  alignItems: 'center',
                }}>
                Search :
              </Text>
              <TextInput
                style={styles.input}
                value={search}
                placeholder="ค้นหา"
                underlineColorAndroid="transpar"
                onChangeText={text => searchFilter(text)}
              />
            </View>
            <FlatList
              style={styles.FlatList}
              data={filterData}
              keyExtractor={({id}, index) => id}
              renderItem={({item}) => (
                <TouchableOpacity onPress={() => setOpen(true)}>
                  <View style={styles.ViewList}>
                    <Image
                      style={styles.Logo}
                      source={{
                        uri: 'https://reactnative.dev/img/tiny_logo.png',
                      }}
                    />
                    <Text style={styles.DetailText}>
                      ชื่อ : {item.firstname.th} {item.lastname.th} {'\n'}
                      ชื่อเล่น : {item.nickname.th} {'\n'}
                    </Text>
                  </View>
                </TouchableOpacity>
              )}
            />
          </View>
        )}

        <Modal visible={openModal} transparent={true}>
          <View style={styles.ModalViewCenter}>
            <View style={styles.ModalView}>
              <View style={styles.ModalViewCenter}>
                <Text style={styles.HeaderText}>Description</Text>
                <View style={{flexDirection: 'column', marginBottom: 40}}>
                  <Image
                    style={styles.Logo}
                    source={{
                      uri: 'https://reactnative.dev/img/tiny_logo.png',
                    }}
                  />
                  <Text style={styles.desText}>ชื่อ : นามสกุล</Text>
                  <Text style={styles.desText}>ชื่อเล่น : </Text>
                  <Text style={styles.desText}>FirstName : LastName</Text>
                  <Text style={styles.desText}>NickName : </Text>
                  <Text style={styles.desText}>วันเกิด : </Text>
                  <Text style={styles.desText}>จังหวัด : </Text>
                  <Text style={styles.desText}>สิ่งที่ชอบ : </Text>
                  <Text style={styles.desText}>รุ่น : </Text>
                </View>
                <View
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'flex-end',
                    alignItems: 'center',
                  }}>
                  <Button
                    title=" Save "
                    onPress={() => setOpen(false)}></Button>
                  <Button
                    color="red"
                    title=" Cancel "
                    onPress={() => setOpen(false)}></Button>
                </View>
              </View>
            </View>
          </View>
        </Modal>
      </ImageBackground>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 10,
    flex: 1,
    flexDirection: 'column',
  },
  Logo: {
    justifyContent: 'center',
    alignItems: 'center',
    width: 100,
    height: 100,
  },
  HeaderText: {
    padding: 25,
    fontSize: 22,
    fontWeight: 'bold',
    fontFamily: 'Cochin',
    alignItems: 'center',
  },
  desText: {
    padding: 6,
    fontSize: 16,
    fontWeight: 'bold',
    fontFamily: 'Cochin',
    alignItems: 'center',
  },
  DetailText: {
    padding: 10,
    fontSize: 16,
    fontWeight: 'bold',
    fontFamily: 'Cochin',
  },
  FlatList: {
    flex: 1,
    flexDirection: 'column',
  },
  ViewList: {
    flexDirection: 'row',
    backgroundColor: '#FDF5E6',
    padding: 12,
    marginBottom: 12,
    borderRadius: 18,
  },
  ModalViewCenter: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
    flexDirection: 'column',
  },
  ModalView: {
    width: '80%',
    height: '80%',
    backgroundColor: '#F5F5F5',
    borderRadius: 20,
  },
  btnSave: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'green',
  },
  btnCancel: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'red',
  },
  input: {
    height: 40,
    margin: 12,
    borderWidth: 1,
    padding: 10,
    backgroundColor: '#F5F5F5',
    borderRadius: 10,
    padding: 20,
    flex: 75,
  },
});
