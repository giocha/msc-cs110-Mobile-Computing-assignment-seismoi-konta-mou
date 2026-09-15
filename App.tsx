import { StatusBar } from 'expo-status-bar';
import { FlatList, Linking, Pressable, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import './global.css';
import { EarthquakeListItem } from './src/components/EarthquakeListItem';
import { SensorPanel } from './src/components/SensorPanel';
import { useAccelerometer } from './src/hooks/useAccelerometer';
import { useEarthquakes } from './src/hooks/useEarthquakes';
import { useLocation } from './src/hooks/useLocation';

export default function App() {
  const location = useLocation();
  const earthquakes = useEarthquakes(location.coordinates);
  const accelerometer = useAccelerometer();

  const loading = location.loading || earthquakes.loading;
  const errorMessage = location.error ?? earthquakes.error;

  function handleRefresh() {
    if (location.permissionBlocked) {
      Linking.openSettings();
      return;
    }
    location.refresh();
    earthquakes.refresh();
  }

  return (
    <SafeAreaView className="flex-1 bg-background">
      <View className="flex-row items-center justify-between px-4 py-3">
        <Text className="text-xl font-bold text-foreground">Σεισμοί κοντά μου</Text>
        <Pressable
          onPress={handleRefresh}
          className="rounded-full bg-accent px-4 py-2 active:opacity-70">
          <Text className="text-sm font-medium text-background">Refresh</Text>
        </Pressable>
      </View>

      {location.coordinates && (
        <Text className="px-4 pb-2 text-xs text-muted">
          {location.coordinates.latitude.toFixed(4)}, {location.coordinates.longitude.toFixed(4)}
          {location.coordinates.accuracy != null &&
            ` · accuracy ±${location.coordinates.accuracy.toFixed(0)}m`}
        </Text>
      )}

      <SensorPanel accelerometer={accelerometer} />

      {errorMessage ? (
        <View className="flex-1 items-center justify-center gap-4 px-6">
          <Text className="text-center text-muted">
            {errorMessage}
            {location.permissionBlocked && ' You can grant it from your device settings.'}
          </Text>
          <Pressable
            onPress={handleRefresh}
            className="rounded-full bg-accent px-4 py-2 active:opacity-70">
            <Text className="text-sm font-medium text-background">
              {location.permissionBlocked ? 'Open Settings' : 'Retry'}
            </Text>
          </Pressable>
        </View>
      ) : (
        <FlatList
          data={earthquakes.earthquakes}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => <EarthquakeListItem earthquake={item} />}
          refreshing={loading}
          onRefresh={handleRefresh}
          ListEmptyComponent={
            !loading ? (
              <View className="items-center justify-center px-6 py-12">
                <Text className="text-center text-muted">No nearby earthquakes found.</Text>
              </View>
            ) : null
          }
        />
      )}

      <StatusBar style="light" />
    </SafeAreaView>
  );
}
