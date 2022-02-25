import React from 'react';
import {View, SafeAreaView, StyleSheet} from 'react-native';
import { Layout, Text } from '@ui-kitten/components';
import {
  Avatar,
  Title,
  Caption,
  TouchableRipple,
} from 'react-native-paper';

import { Icon } from '@ui-kitten/components';

// import Share from 'react-native-share';

// import files from '../assets/filesBase64';

const ProfileScreen = () => {

//   const myCustomShare = async() => {
//     const shareOptions = {
//       message: 'Order your next meal from FoodFinder App. I\'ve already ordered more than 10 meals on it.',
//       url: files.appLogo,
//       // urls: [files.image1, files.image2]
//     }

//     try {
//       const ShareResponse = await Share.open(shareOptions);
//       console.log(JSON.stringify(ShareResponse));
//     } catch(error) {
//       console.log('Error => ', error);
//     }
//   };

  return (
    <Layout style={styles.container}>

      <View style={styles.userInfoSection}>
        <View style={{flexDirection: 'row', marginTop: 15}}>
          <Avatar.Image 
            source={{
              uri: 'https://api.adorable.io/avatars/80/abott@adorable.png',
            }}
            size={80}
          />
          <View style={{marginLeft: 20}}>
            <Text style={[styles.title, {
              marginTop:15,
              marginBottom: 5,
            }]}>Matt Vang</Text>
            <Text style={styles.caption}>@mvang</Text>
          </View>
        </View>
      </View>

      <View style={styles.userInfoSection}>
        <View style={styles.row}>
          <Icon name="person"  size={20}/>
          <Text style={{marginLeft: 20}}>Main Diet</Text>
        </View>
        <View style={styles.row}>
          <Icon name="phone"  size={20}/>
          <Text style={{marginLeft: 20}}>Phone</Text>
        </View>
        <View style={styles.row}>
          <Icon name="email" size={20}/>
          <Text style={{marginLeft: 20}}>Email</Text>
        </View>
      </View>

      {/* <View style={styles.infoBoxWrapper}>
          <View style={[styles.infoBox, {
            borderRightColor: '#dddddd',
            borderRightWidth: 1
          }]}>
            <Title>₹140.50</Title>
            <Caption>Wallet</Caption>
          </View>
          <View style={styles.infoBox}>
            <Title>12</Title>
            <Caption>Orders</Caption>
          </View>
      </View> */}

      {/* <View style={styles.menuWrapper}>
        <TouchableRipple onPress={() => {}}>
          <View style={styles.menuItem}>
            <Icon name="heart" color="#FF6347" size={25}/>
            <Text style={styles.menuItemText}>Your Favorites</Text>
          </View>
        </TouchableRipple>
        <TouchableRipple onPress={() => {}}>
          <View style={styles.menuItem}>
            <Icon name="heart" color="#FF6347" size={25}/>
            <Text style={styles.menuItemText}>Payment</Text>
          </View>
        </TouchableRipple>
        <TouchableRipple onPress={() => {}}>
          <View style={styles.menuItem}>
            <Icon name="heart" color="#FF6347" size={25}/>
            <Text style={styles.menuItemText}>Support</Text>
          </View>
        </TouchableRipple>
        <TouchableRipple onPress={() => {}}>
          <View style={styles.menuItem}>
            <Icon name="heart" color="#FF6347" size={25}/>
            <Text style={styles.menuItemText}>Settings</Text>
          </View>
        </TouchableRipple>
      </View> */}
    </Layout>
  );
};

export default ProfileScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  userInfoSection: {
    paddingHorizontal: 30,
    marginBottom: 25,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  caption: {
    fontSize: 14,
    lineHeight: 14,
    fontWeight: '500',
  },
  row: {
    flexDirection: 'row',
    marginBottom: 10,
  },
  infoBoxWrapper: {
    borderBottomColor: '#dddddd',
    borderBottomWidth: 1,
    borderTopColor: '#dddddd',
    borderTopWidth: 1,
    flexDirection: 'row',
    height: 100,
  },
  infoBox: {
    width: '50%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  menuWrapper: {
    marginTop: 10,
  },
  menuItem: {
    flexDirection: 'row',
    paddingVertical: 15,
    paddingHorizontal: 30,
  },
  menuItemText: {
    marginLeft: 20,
    fontWeight: '600',
    fontSize: 16,
    lineHeight: 26,
  },
});
