import { React, Component } from 'react';
import firebase from 'firebase';

class DtbsConn extends Component {
    constructor(props)
    {
        super(props);
        firebase.initializeApp({          
                apiKey: "AIzaSyDrssCstHJYF07bIF1DeIzYZN9SdCgA85U",
                authDomain: "demark-dtbs.firebaseapp.com",
                databaseURL: "https://demark-dtbs.firebaseio.com",
                projectId: "demark-dtbs",
                storageBucket: "demark-dtbs.appspot.com",
                messagingSenderId: "518328352226"             
        });
    }
}

export default DtbsConn;