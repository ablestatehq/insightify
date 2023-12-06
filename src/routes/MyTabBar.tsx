import { Text, View, TouchableOpacity } from 'react-native';
import { COLOR, FONTSIZE } from '../constants/contants';


function MyTabBar({ state, descriptors, navigation }:any) {
  return (
    <View style={{ flexDirection: 'row', width:'100%', justifyContent:'space-between', paddingHorizontal:10}}>
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
              paddingVertical: 10,
              marginBottom: 2,
              marginLeft: 5
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
                  fontFamily: "RalewaySemiBold",
                  color: isFocused ? COLOR.ORANGE_300 : COLOR.B_500,
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