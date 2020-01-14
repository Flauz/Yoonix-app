import React from 'react'
import { connect } from 'react-redux';
import { TextField, Snackbar, Button } from "@material-ui/core";
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import { Link } from 'react-router-dom'


class SignIn extends React.Component {
    state = {
        email: "",
        password: "",
        flash: "Sign in !",
        error: false,
        open: false,
        token: null
    }

    componentDidUpdate = () => {
        if (this.props.authenticated === true) {
            this.props.history.replace('/');
        }
    }

    handleClose = () => {
        this.setState({ open: false });
    }

    handleClick = () => {
        this.setState({ open: true });
    }

    handleChangeMail = e => {
        this.setState({ email: e.target.value})
    }

    handleChangePassword = e => {
        this.setState({ password: e.target.value})
    }

    handleSubmit = (e) => {
        this.setState({ open: true })
        fetch("/auth/signin",
            {
                method: 'POST',
                headers: new Headers({
                    'Content-Type': 'application/json'
                }),
                body: JSON.stringify(this.state),
            })
            .then(res => res.json())
            .then(
                res => (this.setState({ flash: res.flash, error: res.error }),
                this.props.dispatch(
                    {
                        type: "CREATE_SESSION",
                        user: res.user,
                        token: res.token,
                        message: res.message
                    }
                )),
                err => this.setState({ flash: err.flash })
            );
        e.preventDefault()
        console.log(this.state)
    }
    render() {
        return (
            <div>
                <h1>Sign In !</h1>
                <form onSubmit={this.handleSubmit}>
                    <TextField onChange={this.handleChangeMail} type="email" name="email" placeholder="email" margin="normal" required />
                    <br />
                    <TextField id="password" onChange={e => { this.handleChangePassword(e) }} type="password" name="password" placeholder="password" margin="normal" required />
                    <br />
                    <Button onClick={this.handleClick} variant="contained" size="large" color="primary" type="submit" margin="normal">Sign In !</Button>
                    <br />
                    <Link exact to="/signup"><p>Not registered ? Click here !</p></Link>
                    <Snackbar
                        anchorOrigin={{
                            vertical: 'center',
                            horizontal: 'left',
                        }}
                        open={this.state.open}
                        autoHideDuration={6000}
                        onClose={this.handleClose}
                        message={this.state.flash}
                        action={[
                            <IconButton
                                key="close"
                                aria-label="close"
                                color="inherit"
                                onClick={this.handleClose}
                            >
                                <CloseIcon />
                            </IconButton>,
                        ]}
                    />
                </form>
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        flash: state.auth.token,
    }
};

export default connect(mapStateToProps)(SignIn);