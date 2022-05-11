import React, { useState, useEffect } from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, TextInput, Button, Alert, ScrollView, I18nManager } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Divider, Headline, Provider as PaperProvider } from 'react-native-paper';
import ItemCard from './components/ItemCard';
import TopArea from './components/TopArea';

I18nManager.allowRTL(false);

export default function App() {
  const [arr, setArr] = useState([]);
  const [text, setText] = useState("");
  const [remarkItems, setRemarkItems] = useState([]);
  const [criricalItems, setCriticalItems] = useState([]);
  const [itemToEdit, setItemToEdit] = useState(undefined);

  useEffect(() => {
    if (itemToEdit) {
      setText(itemToEdit.title)
    }
  }, [itemToEdit]);

  const handleAddItem = () => {
    if (text === "") {
      Alert.alert("To add item input can't be empty!");
      return;
    }

    let itemID = arr.length === 0 ? 1 : Math.max(...arr.map(item => item.id)) + 1;
    let tempArr = [...arr, { id: itemID, title: text }];
    setArr(tempArr);
    handleCleanStates();
  };

  const handleOnChangeText = (txt) => {
    setText(txt);
  };

  const handleDeleteItem = (itemId) => {
    const tempRemarks = remarkItems.filter((id) => id !== itemId);
    const tempCiricals = criricalItems.filter((id) => id !== itemId);
    const tempArr = arr.filter((item) => item.id !== itemId);
    setRemarkItems(tempRemarks);
    setCriticalItems(tempCiricals);
    setArr(tempArr);
  };

  const handleRemarkItem = (itemId) => {
    const tempRemarkItems = helperFuncToAddOrRemoveIdFromAndArray(remarkItems, itemId);
    setRemarkItems(tempRemarkItems);
  };

  const handleCriricalItem = (itemId) => {
    const tempCriricalItems = helperFuncToAddOrRemoveIdFromAndArray(criricalItems, itemId);
    setCriticalItems(tempCriricalItems);
  };

  const helperFuncToAddOrRemoveIdFromAndArray = (arr, itemId) => {
    const itemIsExist = arr.find((id) => id === itemId);
    let tempArr;
    if (itemIsExist) {
      tempArr = arr.filter((id) => id !== itemId);
    }
    else {
      tempArr = [...arr, itemId];
    }
    return tempArr;
  };

  const handleTopItem = (itemId) => {
    const currentItem = arr.find((item) => item.id === itemId);
    const filteredArr = arr.filter((item) => item.id !== itemId);
    setArr([currentItem, ...filteredArr]);
  };

  const handleShowEdit = (item) => {
    setItemToEdit(item);
  };

  const handleEditItem = () => {
    if (text === "") {
      Alert.alert("To edit item input can't be empty!");
      return;
    }
    const editedItem = { ...itemToEdit, title: text };
    const itemIndex = arr.findIndex((item) => item.id === editedItem.id);
    const tempArr = [...arr];
    tempArr[itemIndex] = editedItem;
    setArr(tempArr);
    handleCleanStates();
  };

  const handleCleanStates = () => {
    setText("");
    setItemToEdit(undefined);
  };

  const renderItems = arr.map((item) => {
    const isInRemarks = remarkItems.find(id => id === item.id);
    const isInCriticals = criricalItems.find(id => id === item.id);
    const isItemToEdit = itemToEdit && itemToEdit.id === item.id;

    return (
      <ItemCard
        key={item.id}
        item={item}
        handleDeleteItem={handleDeleteItem}
        handleTopItem={handleTopItem}
        handleRemarkItem={handleRemarkItem}
        handleCriricalItem={handleCriricalItem}
        isInRemarks={isInRemarks}
        isInCriticals={isInCriticals}
        handleShowEdit={handleShowEdit}
      />
    );
  });

  console.log(arr)
  return (
    <PaperProvider>
      <SafeAreaView style={{ flex: 1 }}>
        <View style={styles.container}>
          <StatusBar style="auto" />
          <Divider style={[styles.divider, styles.dividerTop]} />
          {
            itemToEdit ?
              <TopArea
                textValue={text} handleOnChangeText={handleOnChangeText} headlineText="Edit item" confrimButtonAction={handleEditItem}
                confirmButtonTitle="Edit the item" declineButtonAction={handleCleanStates}
                declineButtonTitle="Cancel edit" placeHolder="Enter here your item title"
              />
              :
              <TopArea textValue={text} handleOnChangeText={handleOnChangeText} headlineText="Add item to the list"
                confrimButtonAction={handleAddItem} btnStyle={styles.btn} btnContainerStyle={styles.btnContainer}
                confirmButtonTitle="Add the item" placeHolder="Enter here your item title"
              />
          }
          <Divider style={[styles.divider, styles.dividerBottom]} />
          {
            renderItems.length > 0 ?
              <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
                {renderItems}
              </ScrollView>
              :
              <View style={styles.noContent}>
                <Headline>No data in the list</Headline>
              </View>
          }
        </View>
      </SafeAreaView>
    </PaperProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5'
  },
  divider: {
    backgroundColor: "#c1c1c1",
    borderWidth: 1,
    borderColor: "#c1c1c1"
  },
  dividerTop: {
    marginTop: 10
  },
  dividerBottom: {
    marginBottom: 10
  },
  btnContainer: {
    justifyContent: "center"
  },
  btn: {
    width: "100%"
  },
  noContent: {
    flexGrow: 1,
    justifyContent: "center",
    alignItems: "center"
  }
});
