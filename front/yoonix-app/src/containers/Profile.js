import React from 'react'
import { connect } from 'react-redux'
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem'
import ListItemText from '@material-ui/core/ListItemText';
import { Button } from "@material-ui/core";
import { Link } from "react-router-dom";

class Profile extends React.Component {
    state = {
        profile: {
            email: "homer.simpson@wildcodeschool.fr",
            name: "Homer",
            lastname: "Simpson"
        }
    }
    componentDidMount = () => {
        fetch("/profile", {
            headers: {
                Authorization: "Bearer " + this.props.token
            },
            body: JSON.stringify(this.props.email)
        })
            .then(res => res.json())
            .then(res => {
                this.setState({ profile: { email: res[0].email, name: res[0].name, lastname: res[0].lastname } });
            })
            .catch();
    };

    logOut = () => {
        this.props.dispatch(
            {
                type: "UNSET_SESSION"
            }
        )
    }



    render() {
        return (
            <div>
                <h1>Profile</h1>
                <List>
                    <ListItem>
                        <ListItemText primary="email" secondary={this.state.profile.email} />
                        <ListItemText primary="name" secondary={this.state.profile.name} />
                        <ListItemText primary="lastname" secondary={this.state.profile.lastname} />
                    </ListItem>
                </List>
                <Button onClick={this.logOut} className="Submit" variant="contained" color="primary" >Déconnexion</Button>
            </div>
        )
    }
}

function mapStateToProps(state) {
    // console.log(state)
    return { token: state.auth.token, user: state.auth.email };
}

export default connect(mapStateToProps)(Profile);