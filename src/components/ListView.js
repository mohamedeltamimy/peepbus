import React , {Component} from 'react';
import {FlatList , RefreshControl , StyleSheet , View, Dimensions , ActivityIndicator} from 'react-native';
import {colors} from '../../app.json';

class ListView extends Component {
    constructor() {
        super();

        this.state = {
            isRefreshing: false,
            hideLazyLoad: false
        };
    }

    onRefresh() {
        const {onRefresh} = this.props;
        this.setState({
            isRefreshing: true,
            hideLazyLoad: false
        });

        onRefresh(() => {
            this.setState({
                isRefreshing: false
            });
        });
    }

    renderFooter() {
        if (this.state.hideLazyLoad) {
            return null;
        };

        return (
            <View style={styles.footerView}>
                <ActivityIndicator color={colors.color} animating size="small"/>
            </View>
        );
    };

    onEndReached() {
        const {onEndReached} = this.props;

        onEndReached((length) => {
            if(length === 0){
                this.setState({
                    hideLazyLoad: true
                });
            }
        });
    }

    renderEmptyView() {
        return (
            <EmptyView />
        );
    }

    render() {
        const {style , getItemLayout , initialScrollIndex , initialNumToRender , data , renderItem , listHeaderComponent , itemSeparatorComponent , horizontal , numColumns , initRefresh , initLazyLoad , inverted , listFooterComponent , hideEmptyView} = this.props;
        let footerView = null;
        
        if (initLazyLoad){
            footerView = this.renderFooter();
        }

        if (listFooterComponent){
            footerView = listFooterComponent();
        }

        const isArabic = global.isRTL;
        const RTLStyle = (isArabic && !this.props.ignoreRTL) ? {
            "transform": [{
              "scaleX": -1
            }, {
              "scaleY": 1
            }]
          } : {};


        return (
            <FlatList 
                ref={'listView'}
                inverted={inverted}
                getItemLayout={getItemLayout ? getItemLayout : null}
                initialScrollIndex={initialScrollIndex}
                initialNumToRender={initialNumToRender}
                style={[style, RTLStyle]}
                horizontal={horizontal} // <== support horizontal
                numColumns={numColumns} // <== number of columns
                data={data} // <== data
                renderItem={(item) => renderItem(item)} // <== render item
                keyExtractor={(item , index) => index.toString()}
                ListHeaderComponent={listHeaderComponent ? () => listHeaderComponent() : null} // <== header view
                ListFooterComponent={data.length !== 0 ? footerView : null} // <== footer view
                // ListFooterComponent={listFooterComponent ? () => listFooterComponent() : null} // <== footer view
                ItemSeparatorComponent={itemSeparatorComponent ? () => itemSeparatorComponent() : null}
                showsHorizontalScrollIndicator={false}
                onEndReachedThreshold={0.5} // <== lazy load
                onEndReached={initLazyLoad ? () => this.onEndReached() : null} // <== lazy load
                refreshControl={initRefresh &&  // <== refresh control
                <RefreshControl colors = {[colors.baseColor]}
                    refreshing = {this.state.isRefreshing}
                    onRefresh={this.onRefresh.bind(this)} />
                } />
        )
    }
}

const {width} = Dimensions.get('window');
const styles = StyleSheet.create({
    footerView: {
        paddingVertical: 20,
        borderTopWidth: 1,
        borderColor: "#CED0CE",
        width: width
    }
});

export {ListView};