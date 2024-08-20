import MainComponent from '@/components/MainComponent';
import { StatusBar } from 'expo-status-bar';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { PaperProvider } from 'react-native-paper';
export default function App() {
  return (
    <PaperProvider>
      <SafeAreaProvider>
        <MainComponent />
        <StatusBar style="auto" />
      </SafeAreaProvider>
    </PaperProvider>
  );
}

