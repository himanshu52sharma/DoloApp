import {
  Dimensions,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Platform,
  PermissionsAndroid,
  Image,
  FlatList,
} from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import React, {useEffect} from 'react';
import Color from '../assets/utilis/Color';
import {Button} from 'react-native-paper';
import Fonts from '../theme/Fonts';
import RNFetchBlob from 'rn-fetch-blob';
import {useSelector} from 'react-redux';
import {getData, postData} from '../API';
import HistoryPlaceholder from '../placeholders/HistoryPlaceholder';

const AppointmentDetails = ({navigation, route}) => {
  const user = useSelector(state => state.user);
  const {appointmentId,createDate} = route.params;

  const [details, setDetails] = React.useState([]);
  const [perscriptions,setPerscriptions] = React.useState([]);
  const [loading, setLoading] = React.useState(false);
  const [img, setImg] = React.useState('');
  console.log('user?.data?.id',user?.data);

  const getDetails = async () => {
    setLoading(true);
    var result = await getData(
      `patient_appointment_previous_history/${user?.data?.id}`,
    );
    if (result.status) {
      const filterData = result.data.filter(item => item.id == appointmentId);
      console.log('filterData-->', filterData);
      setDetails(filterData);
      setLoading(false);
    }
  };

  const fileUrl =
    'https://t4.ftcdn.net/jpg/02/60/04/09/240_F_260040900_oO6YW1sHTnKxby4GcjCvtypUCWjnQRg5.jpg';
  const checkPermission = async () => {
    if (Platform.OS === 'ios') {
      // downloadFile();
      downloadImage();
    } else {
      try {
        const granted = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
          {
            title: 'Storage Permission Required',
            message:
              'Application needs access to your storage to download File',
          },
        );
        if (granted === PermissionsAndroid.RESULTS.GRANTED) {
          // Start downloading
          //  downloadFile();
          downloadImage();
          console.log('Storage Permission Granted.');
        } else {
          // If permission denied then show alert
          Alert.alert('Error', 'Storage Permission Not Granted');
        }
      } catch (err) {
        // To handle permission related exception
        console.log('++++' + err);
      }
    }
  };

  const downloadImage = () => {
    let date = new Date();
    const {fs} = RNFetchBlob;
    const dirs = RNFetchBlob.fs.dirs;
    let PictureDir = fs.dirs.PictureDir;

    let options = {
      fileCache: true,
      addAndroidDownloads: {
        description: 'downloading file...',
        notification: true,
        // useDownloadManager works with Android only
        useDownloadManager: true,
      },
    };

    var path =
      PictureDir +
      '/file_' +
      Math.floor(date.getTime() + date.getSeconds() / 2) +
      '.jpg';
    console.log('path :-', path, 'dirs :-', dirs);

    RNFetchBlob.fs
      .writeFile(path, img, 'base64')
      .then(res => {
        console.log('File : ', res);
        alert('Image downloaded successfully.');
        setImg('');
      })
      .catch(error => {
        alert(JSON.stringify(error));
      });
  };

  const getAppointmentPerscriptions = async() =>{

    let body={
      patient_id:user?.data?.id,
      create_date:createDate,
    }

    const res = await postData('appointmentprescription',body);

    console.log('reess==',res?.data[0]?.prescription,user?.data?.id);
    setPerscriptions(res?.data[0]?.prescription);

  }

  useEffect(() => {
    getDetails();
    getAppointmentPerscriptions();
  }, [appointmentId]);

  return (
    <SafeAreaView style={styles.main_container}>
      <View style={{flexDirection: 'row', padding: 20}}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <MaterialCommunityIcons
            name="arrow-left"
            size={32}
            color={Color.black}
          />
        </TouchableOpacity>
        <Text style={styles.title}>Appointment Details</Text>
      </View>

      {
        loading ? (
          <>
            <HistoryPlaceholder />
            <HistoryPlaceholder />
            <HistoryPlaceholder />
          </>
        ) : (
          // -----------------------------
          <View style={styles.details_container}>
            <View style={styles.item_container}>
              <View style={{width: '49%', alignItems: 'center'}}>
                <Text style={styles.heading_style}>Date :</Text>
              </View>
              <View style={{width: '49%', alignItems: 'center'}}>
                <Text style={styles.sub_heading_style}>
                  {details[0]?.create_date}
                </Text>
              </View>
            </View>

            <View style={styles.item_container}>
              <View style={{width: '49%', alignItems: 'center'}}>
                <Text style={styles.heading_style}>Status :</Text>
              </View>
              <View style={{width: '49%', alignItems: 'center'}}>
                <Text style={styles.sub_heading_style}>
              
                  {details[0]?.status == '2' ? 'COMPLETED' : 'ABSENT'}
                </Text>
              </View>
            </View>

            <View style={styles.item_container}>
              <View style={{width: '49%', alignItems: 'center'}}>
                <Text style={styles.heading_style}>Weight :</Text>
              </View>
              <View style={{width: '49%', alignItems: 'center'}}>
                <Text style={styles.sub_heading_style}>
                  {details[0]?.weight}
                </Text>
              </View>
            </View>

            <View style={styles.item_container}>
              <View style={{width: '49%', alignItems: 'center'}}>
                <Text style={styles.heading_style}>Shift Name :</Text>
              </View>
              <View style={{width: '49%', alignItems: 'center'}}>
                <Text style={styles.sub_heading_style}>
                  {details[0]?.shift_name}
                </Text>
              </View>
            </View>

            <View style={styles.item_container}>
              <View style={{width: '49%', alignItems: 'center'}}>
                <Text style={styles.heading_style}>Doctor Name :</Text>
              </View>
              <View style={{width: '49%', alignItems: 'center'}}>
                <Text style={styles.sub_heading_style}>
                  {details[0]?.doctorname}
                </Text>
              </View>
            </View>

            <FlatList
              keyExtractor={(item, index) => `key-${index}`}
              nestedScrollEnabled={true}
              data={perscriptions}
              renderItem={({item, index}) => (
                <View style={{marginVertical: 10}}>
                  <Image
                    source={{uri: `data:image/png;base64,${item}`}}
                    style={{height: 180, width: 300, borderRadius: 12}}
                  />
                  {/* <TouchableOpacity
        style={styles.button}
        onPress={checkPermission}>
        <Text style={styles.text}>
          Download File
        </Text>
      </TouchableOpacity> */}
                  <Button
                    style={{
                      backgroundColor: Color.black,
                      marginTop: 25,
                      marginBottom: 10,
                    }}
                    contentStyle={{height: 55, alignItems: 'center'}}
                    dark
                    mode="contained"
                    onPress={() => checkPermission(item) && setImg(item)}>
                    Download
                  </Button>
                </View>
              )}
            />
          </View>
        )
        // -----------------------------
      }
    </SafeAreaView>
  );
};

export default AppointmentDetails;

const styles = StyleSheet.create({
  main_container: {
    flex: 1,
    backgroundColor: Color.primary,
  },
  title: {
    fontSize: 20,
    fontFamily: 'Poppins-Bold',
    color: Color.black,
    paddingHorizontal: 20,
  },
  details_container: {
    width: Dimensions.get('window').width - 50,
    marginTop: 10,
    alignSelf: 'center',
  },
  item_container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  heading_style: {
    fontFamily: Fonts.primarySemiBold,
    fontSize: 18,
    color: Color.black,
  },
  sub_heading_style: {
    fontFamily: Fonts.primaryRegular,
    fontSize: 15,
    color: Color.black,
    textAlign: 'center',
  },
  button: {
    width: '80%',
    padding: 10,
    backgroundColor: 'blue',
    margin: 10,
  },
});
