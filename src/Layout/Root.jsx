import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useState } from "react";
import { Avatar, Drawer, IconButton } from "react-native-paper";

export default function Root() {
  const [active, setActive] = useState("");
  const [drawerOpen, setDrawerOpen] = useState(false);
  const toggleDrawer = () => {
    setDrawerOpen(!drawerOpen);
  };

  return (
    <View style={styles.container}>
      <View style={styles.navbar}>
        <View>
          <IconButton 
            icon="menu"
            iconColor={"white"}
            size={25}
            onPress={() => console.log("Pressed")}
          />
        </View>
        <View>
        <Avatar.Text size={45} label="S" style={{backgroundColor:'#7367f0'}}/>
        </View>
      </View>
      {/* Touchable area to close drawer when touched */}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "pink",
    paddingHorizontal: 15,
  },
  navbar: {
    marginTop: 40,
    borderRadius: 8,
    backgroundColor: "black",
    paddingHorizontal: 5,
    paddingVertical: 5,
    width: "100%",
  },
  menuIcon: {
    position: "absolute",
    top: 20,
    left: 20,
    zIndex: 1,
    backgroundColor: "rgba(255, 255, 255, 0.8)", // Optional: Overlay color for icon
  },
  scrollView: {
    flex: 1,
    paddingHorizontal: 20,
  },
  scrollViewContent: {
    paddingTop: 20,
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "rgba(0, 0, 0, 0.4)",
  },
});
