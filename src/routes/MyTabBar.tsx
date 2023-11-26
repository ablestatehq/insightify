import { Text, View, TouchableOpacity } from 'react-native';
import { COLOR, FONTSIZE } from '../constants/contants';
import {
  MaterialTopTabNavigationProp,
} from '@react-navigation/material-top-tabs';



function MyTabBar({ state, descriptors, navigation }) {
  return (
    <View style={{ flexDirection: 'row', justifyContent: 'space-around' }}>
      {state.routes.map((route, index) => {
        const { options } = descriptors[route.key];
        const label =
          options.tabBarLabel !== undefined
            ? options.tabBarLabel
            : options.title !== undefined
              ? options.title
              : route.name;

        const isFocused = state.index === index;

        const onPress = () => {
          const event = navigation.emit({
            type: 'tabPress',
            target: route.key,
            canPreventDefault: true,
          });

          if (!isFocused && !event.defaultPrevented) {
            navigation.navigate(route.name, route.params);
          }
        };

        const onLongPress = () => {
          navigation.emit({
            type: 'tabLongPress',
            target: route.key,
          });
        };

        return (
          <TouchableOpacity
            key={index}
            accessibilityRole="button"
            accessibilityState={isFocused ? { selected: true } : {}}
            accessibilityLabel={options.tabBarAccessibilityLabel}
            testID={options.tabBarTestID}
            onPress={onPress}
            onLongPress={onLongPress}
            style={{
              flex: 1,
              borderRadius: 10,
              alignSelf: 'flex-start',
              paddingVertical: 10,
              paddingHorizontal: 10,
              marginBottom: 2,
            }}
          >
            <View
              style={{
                alignSelf: 'flex-start',
                borderBottomWidth: isFocused ? 3 : 0,
                borderBottomColor: COLOR.ORANGE_300,
              }}
            >
              <Text
                style={{
                  fontSize: FONTSIZE.TITLE_1,
                  color: isFocused ? COLOR.ORANGE_300 : COLOR.B_500,
                  fontFamily: "ComfortaaBold",
                }}
              >
                {label}
              </Text>
            </View>
          </TouchableOpacity>
        );
      })}
    </View>
  );
}

export default MyTabBar