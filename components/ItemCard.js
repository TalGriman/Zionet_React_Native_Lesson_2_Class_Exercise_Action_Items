import React, { useState } from "react";
import { View, StyleSheet } from 'react-native';
import { Card, IconButton, Divider, Menu } from 'react-native-paper';
import { Children } from "react/cjs/react.production.min";


const ItemCard = (props) => {
    // props
    const { item,
        handleDeleteItem,
        handleTopItem,
        handleRemarkItem,
        handleCriricalItem,
        handleShowEdit,
        isInRemarks,
        isInCriticals,
        containerStyle,
        children
    } = props;

    // states
    const [visible, setVisible] = useState(false);

    const borderRadiusWidth = isInRemarks ? 5 : 0;
    const backGroundColor = isInCriticals ? "red" : "white";

    const openMenu = () => setVisible(true);

    const closeMenu = () => setVisible(false);

    const RightContent = props => <View style={styles.rightContentContainer}>
        <IconButton {...props} icon="arrow-up" onPress={() => handleAction(handleTopItem, item.id)} />
        <Menu visible={visible} onDismiss={closeMenu} anchor={<IconButton {...props} icon="dots-vertical" onPress={openMenu} />}>
            <Menu.Item icon="checkbox-marked-outline" onPress={() => handleAction(handleRemarkItem, item.id)} title={`${isInRemarks ? "Remove From" : "Add To"} Remarks`} />
            <Divider style={styles.menuDivider} />
            <Menu.Item icon="information" onPress={() => handleAction(handleCriricalItem, item.id)} title={`${isInCriticals ? "Remove From" : "Add To"}  Criticals`} />
            <Divider style={styles.menuDivider} />
            <Menu.Item icon="square-edit-outline" onPress={() => handleAction(handleShowEdit, item)} title="Edit" />
            <Divider style={styles.menuDivider} />
            <Menu.Item icon="delete" onPress={() => handleAction(handleDeleteItem, item.id)} title="Delete" />

        </Menu>
    </View>

    const handleAction = (func, itemToPass) => {
        func(itemToPass);
        closeMenu();
    };

    return (
        <View style={{ ...styles.container, ...containerStyle }}>
            <Card style={{ backgroundColor: backGroundColor, borderWidth: borderRadiusWidth }}>
                <Card.Title title={item.title} right={RightContent}  />
                {
                    children &&
                    <Card.Content>
                        {children}
                    </Card.Content>
                }
            </Card>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        marginHorizontal: 10,
        marginVertical: 7.5
    },
    rightContentContainer: {
        flexDirection: "row"
    }
});

export default ItemCard;