import React, {useState} from 'react';
import {
  SafeAreaView,
  Text,
  StyleSheet,
  View,
  ScrollView,
  Linking,
  Alert,
} from 'react-native';
import {Button, TextInput} from 'react-native-paper';

const App = () => {
  const [FormDetails, setFormDetails] = useState({
    name: '',
    mobile: '',
    email: '',
    message: '',
  });
  let sendMailInstalled = () => {
    // TODO: Use Formik and Yup for validation
    if (
      FormDetails.name === '' ||
      FormDetails.mobile === '' ||
      FormDetails.email === '' ||
      FormDetails.message === ''
    ) {
      Alert.alert('Error', 'Please enter all required values');
      return;
    }
    let emailBody = `mailto:<info@redpositive.in>?subject=Message from Nodemailer Task&body=
Name: ${FormDetails.name}
E-Mail: ${FormDetails.email}
Mobile No.: ${FormDetails.mobile}
Message: ${FormDetails.message}`;
    Linking.openURL(emailBody);
  };
  let sendMailThroughNodeMailer = async () => {
    // TODO: Use Formik and Yup for validation
    if (
      FormDetails.name === '' ||
      FormDetails.mobile === '' ||
      FormDetails.email === '' ||
      FormDetails.message === ''
    ) {
      Alert.alert('Error', 'Please enter all required values');
      return;
    }
    try {
      await fetch('https://nodemailer.up.railway.app/send-mail/', {
        method: 'POST',
        headers: {
          Accept: 'application.json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(FormDetails),
      }).then(res => {
        res = res.json().then(r => {
          Alert.alert('Info', r.message);
        });
      });
    } catch (err) {
      Alert.alert('Error', err);
    }
  };
  return (
    <SafeAreaView style={styles.MainView}>
      <ScrollView>
        <View>
          <Text style={styles.head}>React Native Node Mailer Task</Text>
          <TextInput
            style={styles.TextInput}
            placeholder="Name"
            mode="outlined"
            value={FormDetails.name}
            onChangeText={t => setFormDetails({...FormDetails, name: t})}
          />
          <TextInput
            style={styles.TextInput}
            placeholder="Mobile No."
            keyboardType="phone-pad"
            mode="outlined"
            value={FormDetails.mobile}
            onChangeText={t => setFormDetails({...FormDetails, mobile: t})}
          />
          <TextInput
            style={styles.TextInput}
            placeholder="E-Mail"
            mode="outlined"
            keyboardType="email-address"
            value={FormDetails.email}
            onChangeText={t => setFormDetails({...FormDetails, email: t})}
          />
          <TextInput
            style={styles.TextInput}
            placeholder="Message"
            mode="outlined"
            multiline
            numberOfLines={8}
            value={FormDetails.message}
            onChangeText={t => setFormDetails({...FormDetails, message: t})}
          />
        </View>
        <View>
          <Button
            onPress={sendMailThroughNodeMailer}
            buttonColor="#727"
            style={styles.Button}
            mode="contained">
            Send
          </Button>
          <Button
            onPress={sendMailInstalled}
            style={styles.Button}
            mode="outlined">
            Send using Installed Mail clients
          </Button>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};
let styles = StyleSheet.create({
  head: {
    color: '#000',
    fontSize: 32,
  },
  MainView: {
    backgroundColor: '#fff',
    height: '100%',
    width: '100%',
    padding: 30,
  },
  TextInput: {
    marginVertical: 10,
  },
  Button: {
    marginVertical: 10,
  },
});
export default App;
