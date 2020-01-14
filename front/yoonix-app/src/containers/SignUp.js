import React from 'react'
import { TextField, Snackbar, Button } from "@material-ui/core";
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import { Link } from 'react-router-dom'


class SignUp extends React.Component {
    state = {
        email: "",
        password: "",
        name: "",
        lastname: "",
        flash: "Sign up !",
        open: false,
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

    handleChangeName = e => {
        this.setState({ name: e.target.value })
    }

    handleChangeLastname = e => {
        this.setState({ lastname: e.target.value })
    }

    handleSubmit = (e) => {
        this.setState({ open: true })
        fetch("/auth/signup",
            {
                method: 'POST',
                headers: new Headers({
                    'Content-Type': 'application/json'
                }),
                body: JSON.stringify(this.state),
            })
            .then(res => res.json())
            .then(
                res => this.setState({ flash: res.flash, error: res.error }),
                err => this.setState({ flash: err.flash })
            );
        e.preventDefault()
        console.log(this.state)
    }

    validatePassword = () => {
        const password = document.getElementById("password")
        const passwordbis = document.getElementById("passwordbis");
        if (password.value !== passwordbis.value) {
            passwordbis.setCustomValidity("Passwords Don't Match");
        } else {
            passwordbis.setCustomValidity('');
        }
    }

    render() {
        return (
            <div>
                <h1>Sign up !</h1>

                <form onSubmit={this.handleSubmit}>
                    <TextField onChange={this.handleChangeMail} type="email" name="email" placeholder="email" margin="normal" required />
                    <br />
                    <TextField id="password" onChange={e => { this.handleChangePassword(e); this.validatePassword(e) }} type="password" name="password" placeholder="password" margin="normal" required />
                    <br />
                    <TextField id="passwordbis" type="password" name="passwordbis" onKeyUp={this.validatePassword} placeholder="confirmation password" margin="normal" required />
                    <br />
                    <TextField onChange={this.handleChangeName} type="text" name="name" placeholder="name" margin="normal" required />
                    <br />
                    <TextField onChange={this.handleChangeLastname} type="text" name="lastname" placeholder="lastname" margin="normal" required />
                    <br />
                    {/* <Link to="/"> */}
                    <Button onClick={(e) => { this.handleClick(e) }} variant="contained" size="large" color="primary" type="submit" margin="normal">
                        Sign Up !
                        </Button>
                    {/* </Link> */}
                    <br />
                    <Link className="registered" to="/signin"><p>Already Registered? Sign in!</p></Link>
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

export default SignUp