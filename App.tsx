/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React from 'react';
import {Button, SafeAreaView, ScrollView, StatusBar, View} from 'react-native';
import {AdyenCheckout, Configuration} from '@adyen/react-native';
import {useAdyenCheckout} from '@adyen/react-native';

const YourCheckoutView = () => {
  const {start} = useAdyenCheckout();

  return (
    // Create a way, like a checkout button, that starts Drop-in.
    <View style={{marginHorizontal: 20, marginVertical: 30}}>
      <Button
        title="Checkout"
        onPress={() => {
          start('dropIn');
        }}
      />
    </View>
  );
};

function App(): JSX.Element {
  const adyenConfiguration: Configuration = {
    // When you're ready to accept live payments, change the value to one of our live environments.
    environment: 'test',
    clientKey: 'test_xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx',
    // For iOS, this is the URL to your app. For Android, this is automatically overridden by AdyenCheckout.
    returnUrl: 'app.bundle.id://',
    // Must be included to show the amount on the Pay button.
    countryCode: 'SE',
    amount: {currency: 'SEK', value: 100},
  };
  return (
    <SafeAreaView>
      <StatusBar barStyle={'light-content'} />
      <ScrollView contentInsetAdjustmentBehavior="automatic">
        <View>
          <AdyenCheckout
            config={adyenConfiguration}
            paymentMethods={{
              paymentMethods: [
                {
                  brands: ['visa', 'mc'],
                  name: 'Kreditkort',
                  type: 'scheme',
                },
              ],
            }}
            onSubmit={result => {
              console.log('submit', result);
            }}
            onError={error => {
              console.log('error', error);
            }}
            onAdditionalDetails={details => {
              console.log('details', details);
            }}
            onComplete={details => {
              console.log('complete', details);
            }}>
            <YourCheckoutView />
          </AdyenCheckout>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

export default App;
