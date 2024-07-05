import React, { useState } from "react";
import {
  View,
  StyleSheet,
  TouchableWithoutFeedback,
  Animated,
  Text,
} from "react-native";
import { Avatar, Drawer, IconButton } from "react-native-paper";
import Icon from "react-native-vector-icons/FontAwesome5";

export default function AppNavbar() {
  const [active, setActive] = useState("Dashboard");
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [sidebarOffset] = useState(new Animated.Value(-250));
  const toggleDrawer = () => {
    if (drawerOpen) {
      closeDrawer();
    } else {
      openDrawer();
    }
  };

  const openDrawer = () => {
    Animated.timing(sidebarOffset, {
      toValue: 0,
      duration: 300,
      useNativeDriver: false,
    }).start();
    setDrawerOpen(true);
  };

  const closeDrawer = () => {
    Animated.timing(sidebarOffset, {
      toValue: -300,
      duration: 300,
      useNativeDriver: false,
    }).start(() => {
      setDrawerOpen(false);
    });
  };

  return (
    <TouchableWithoutFeedback onPress={closeDrawer}>
      <View style={styles.container}>
        <View style={styles.navbar}>
          <IconButton
            style={{ padding: 0, width: "auto" }}
            icon="menu"
            color="black"
            size={25}
            rippleColor={"transparent"}
            onPress={toggleDrawer}
          />
          <Avatar.Text size={35} label="S" style={styles.avatar} />
        </View>
        <Animated.View
          style={[
            styles.sidebar,
            { width: "70%", left: sidebarOffset }, // Set width and adjust left position
          ]}
        >
          <Drawer.Section showDivider={false}>
            <View style={styles.logoContainer}>
              <Icon.Button
                name="react"
                backgroundColor="transparent"
                color="#7367f0"
                size={30}
                style={{ padding: 0, width: "auto" }}
              ></Icon.Button>
              <Text style={[styles.item, styles.brandName]}>Shabuj Global</Text>
            </View>
            <Text
              style={[styles.item, active === "Dashboard" && styles.activeItem]}
              onPress={() => setActive("Dashboard")}
            >
              Dashboard
            </Text>
            <Text
              style={[
                styles.item,
                active === "Add a member" && styles.activeItem,
              ]}
              onPress={() => setActive("Add a member")}
            >
              Add a member
            </Text>
            <Text
              style={[
                styles.item,
                active === "Members History" && styles.activeItem,
              ]}
              onPress={() => setActive("Members History")}
            >
              Members History
            </Text>
          </Drawer.Section>
        </Animated.View>
      </View>
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
    paddingHorizontal: 15,
    position: "relative",
  },
  navbar: {
    marginTop: 40,
    borderRadius: 8,
    backgroundColor: "white",
    paddingHorizontal: 15,
    paddingVertical: 5,
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    elevation: 4,
  },
  sidebar: {
    backgroundColor: "#2f3349",
    position: "absolute",
    top: 20,
    bottom: 0,
    paddingVertical: 30,
  },
  item: {
    textAlign: "center",
    color: "white",
    fontFamily: "Raleway_400Regular",
    marginTop: 1,
    borderRadius: 8,
    paddingVertical: 18,
    marginHorizontal: 15,
  },
  activeItem: {
    backgroundColor: "#655ccd",
  },
  logoContainer: {
    flexDirection: "row",
    gap: 5,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 30,
    s,
  },
  brandName: {
    fontSize: 20,
    fontFamily: "Raleway_700Bold",
    backgroundColor: "transparent",
  },
});
