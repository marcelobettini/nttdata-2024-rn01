import MainComponent from '@/components/MainComponent';
import { StatusBar } from 'expo-status-bar';
import { SafeAreaProvider } from 'react-native-safe-area-context';
export default function App() {
  return (
    <SafeAreaProvider>
      <MainComponent />
      <StatusBar style="auto" />
    </SafeAreaProvider>
  );
}

