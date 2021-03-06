/*
    Estado de Inicio de Sesión
*/
import React, { Component } from 'react'
import { connect } from 'react-redux'
import firebase from 'firebase/app'

import SigninForm from './../components/signin/SigninForm'

/*
    Actions
*/
import {
    
    signinStarted,
    signinFinalized,
    signinError,

} from './../state/actions/signInAction'

class SigninContainer extends Component {

    constructor(props) {
        super(props);
        this.signinPage = React.createRef();
    }

    isUserAuth = () => {

        return (this.props.userAccount !== undefined);

    };

    signInWithEmailAndPassword = (email, password) => {

        try {

            firebase.auth().signInWithEmailAndPassword(email, password)
            .then(() => {
                
            })
            .catch((error) => {

                console.log('Error Michel Promise Catch:');

                console.log(error);

                this.props.signinError(error);

            });

        }
        catch(error) {

            console.log('Error Michel Try Catch:');

            console.log(error);

        }

    };

    handleClickSignin = () => {

        this.props.signinStarted();

        this.signInWithEmailAndPassword();

    };

    render() {

        return (

            <SigninForm
                isUserAuth={this.isUserAuth()}
                onClickAuth={this.handleClickSignin}
            />

        );
        
    }

}

const mapStateToProps = (newState, props) => {

    var { signin, userAccount } = newState;

    if(!signin) {
        signin = {
            isLoading: false,
            error: undefined,
        };
    }

    return {
        isLoading: signin.isLoading ? signin.isLoading : false,
        error: signin.error,
        userAccount: userAccount,
        email: '',
        password: '',
    };

};

const mapDispatchToProps = dispatch => ({

    signinStarted: () => dispatch(signinStarted()),
    signinFinalized: () => dispatch(signinFinalized()),
    signinError: (error) => dispatch(signinError(error)),

});

export default connect(mapStateToProps, mapDispatchToProps)(SigninContainer);