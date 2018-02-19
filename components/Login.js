import React from 'react';
import {
    AsyncStorage,
    KeyboardAvoidingView,
    ScrollView,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity
} from 'react-native';

export default class Login extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            username: '',
            password: '',
        }
    }

    componentDidMount() {
        this._loadInititalState().done();
    }

    _loadInititalState = async () => {

        var user = await AsyncStorage.getItem('user');
        if (user != null) {
            this.props.navigation.navigate('Profile');
        }
    }

    render() {
        return (
            <KeyboardAvoidingView style={styles.wrapper} behaviour='padding'>

                    <Text style={styles.header}>LOGIN</Text>

                    <TextInput style={styles.textInput} placeholder='Username'
                               onChangeText={(username) => this.setState({username})}
                               underlineColorAndroid='transparent'
                    />

                    <TextInput style={styles.textInput} placeholder='Password'
                               onChangeText={(password) => this.setState({password})}
                               underlineColorAndroid='transparent'
                               secureTextEntry={true}
                    />

                    <TouchableOpacity style={styles.button}
                                      onPress={this.login}>
                        <Text>Login</Text>
                    </TouchableOpacity>

            </KeyboardAvoidingView>
        );
    }

    login = () => {
        let request_body = "user_name=" + this.state.username + "&" +
            "user_password=" + this.state.password;

        fetch("http://10.1.22.175:8180/loginLocalAdmin?" + request_body, {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
        }).then((response) => response.json())
            .then((res) => {

                if (res.success === "true") {
                    AsyncStorage.setItem('user', res.user);
                    this.props.navigation.navigate('Profile');
                } else {
                    //not valid user
                    alert(res.message);
                }
            }).catch(function (error) {
            alert(error);
        });


    }
}

const styles = StyleSheet.create({
    wrapper: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#00bfff',
        paddingLeft: 40,
        paddingRight: 40,
    },
    header: {
        fontSize: 24,
        marginBottom: 60,
        color: '#fff',
        fontWeight: 'bold',
    },
    textInput: {
        alignSelf: 'stretch',
        padding: 16,
        marginBottom: 20,
        backgroundColor: '#fff',
    },
    button: {
        alignSelf: 'stretch',
        backgroundColor: '#28BB08',
        padding: 20,
        alignItems: 'center',
    }
});