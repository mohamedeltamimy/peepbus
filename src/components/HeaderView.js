import React , {Component} from 'react';
import { Icon } from './';
import { withNavigation } from 'react-navigation';
import { Appbar } from 'react-native-paper';
import { fonts, color } from '../../app.json';

class ToolBarComponent extends Component {

    _goBack = () => {
        const { pop } = this.props.navigation;
        pop();
    }

    _toggleMenu = () => {
        const { toggleDrawer } = this.props.navigation;
        toggleDrawer();
    }
  
    render() {
    const { contanier, titleStyle, subtitleStyle } = styles;
    const { title, subtitle, initMenu } = this.props;
      return (
        <Appbar.Header style={contanier}>
          {!initMenu ? <Appbar.BackAction
            onPress={this._goBack}
          /> : <Appbar.Action onPress={this._toggleMenu} icon={'menu'} color={color} size={30} />}
          
          <Appbar.Content
            titleStyle={titleStyle}
            subtitleStyle={subtitleStyle}
            title={title}
            subtitle={subtitle}
          />
          <Appbar.Action />
          <Appbar.Action />
        </Appbar.Header>
      );
    }
}

const styles = {
    contanier: {
        backgroundColor: 'transparent', 
        elevation: 0
    },
    titleStyle: {
        color: "#313131",
        fontFamily: fonts.bold,
        fontSize: 20
    }, 
    subtitleStyle: {
        color: "#A7A7A7",
        fontFamily: fonts.regluar,
        fontSize: 14
    }
}

const ToolBar = withNavigation(ToolBarComponent);

export {ToolBar as HeaderView};