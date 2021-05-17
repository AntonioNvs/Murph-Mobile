/* eslint-disable camelcase */
import React, { useState } from 'react';
import {
  StatusBar,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

import colors from './src/styles/colors.json';

import {
  InputCommand,
  Text,
  TextContainer,
} from './src/styles/app';

import { Heebo_400Regular, useFonts } from '@expo-google-fonts/heebo';
import AppLoading from './src/pages/AppLoading';

interface ICommandOrAnswer {
  text: string;
  type: 'command' | 'answer';
}

const App: React.FC = () => {
  const [textCommand, setTextCommand] = useState('');
  const [listCommandsOrAnswers, setListCommandsOrAnswers] = useState<ICommandOrAnswer[]>([]);

  const [fontsLoaded] = useFonts({
    Heebo_400Regular,
  });

  if (!fontsLoaded) {
    return <AppLoading />;
  }

  function submitCommand(): void {
    setListCommandsOrAnswers([...listCommandsOrAnswers, {
      text: textCommand,
      type: 'command',
    }]);

    setTextCommand('');
  }

  return (
    <>
      <StatusBar barStyle="light-content" backgroundColor={colors.black} />
      <LinearGradient
        colors={[colors.black, colors.gray]}
        style={{ flex: 1 }}
      >
        <TextContainer>
          {listCommandsOrAnswers && listCommandsOrAnswers.map((option, index) => (
            <Text
              key={index}
              font="Heebo_400Regular"
              direction={option.type === 'command' ? 'flex-start' : 'flex-end'}
              color={option.type === 'command' ? colors.white : colors.green}
            >
              {option.text}
            </Text>
          ))}
        </TextContainer>
        <InputCommand
          font="Heebo_400Regular"
          onChangeText={(value: string) => setTextCommand(value)}
          value={textCommand}
          onSubmitEditing={submitCommand}
        />
      </LinearGradient>
    </>
  );
};

export default App;
