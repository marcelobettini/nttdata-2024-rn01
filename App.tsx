import MainComponent from '@/components/MainComponent';
import { StatusBar } from 'expo-status-bar';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { PaperProvider } from 'react-native-paper';
import { SQLiteProvider } from 'expo-sqlite';
import { initDb } from '@/database/initDb';
export default function App() {
  return (
    <PaperProvider>
      <SQLiteProvider databaseName='tasks.db' onInit={initDb}>

        <SafeAreaProvider>
          <MainComponent />
          <StatusBar style="auto" />
        </SafeAreaProvider>
      </SQLiteProvider>
    </PaperProvider>
  );
}

