import { withStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import FormControl from "@material-ui/core/FormControl";
import Grid from "@material-ui/core/Grid";
import Input from "@material-ui/core/Input";
import InputLabel from "@material-ui/core/InputLabel";
import React, { Component } from "react";
import Typography from "@material-ui/core/Typography";
import { Form, Field } from "react-final-form";
import {
  LOGIN_MUTATION,
  SIGNUP_MUTATION,
  VIEWER_QUERY
} from "../../apollo/queries";
import { graphql, compose } from "react-apollo";
import validate from "./helpers/validation";
import PropTypes from "prop-types";

import styles from "./styles";

class AccountForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      formToggle: true,
      error: null
    };
    this.validate = validate;
  }

  render() {
    const { classes, login, signup } = this.props;

    return (
      <Form
        onSubmit={async values => {
          try {
            this.validate(values);
            this.state.formToggle
              ? await login({ variables: { user: values } })
              : await signup({ variables: { user: values } });
          } catch (e) {
            this.state.formToggle
              ? this.setState({ error: "User or password not valid" })
              : this.setState({
                  error: "Please fill all fields with valid information"
                });
            throw e;
          }
        }}
        render={({ handleSubmit, pristine, invalid, submitting, form }) => (
          <form onSubmit={handleSubmit} className={classes.accountForm}>
            {!this.state.formToggle && (
              <FormControl fullWidth className={classes.formControl}>
                <InputLabel htmlFor="fullname">Username</InputLabel>
                <Field name="fullname">
                  {({ input, meta }) => (
                    <Input
                      id="fullname"
                      type="text"
                      inputProps={{
                        ...input,
                        autoComplete: "off"
                      }}
                      value={input.value}
                    />
                  )}
                </Field>
              </FormControl>
            )}
            <FormControl fullWidth className={classes.formControl}>
              <InputLabel htmlFor="email">Email</InputLabel>
              <Field name="email">
                {({ input, meta }) => (
                  <Input
                    id="email"
                    inputProps={{
                      ...input,
                      autoComplete: "off",
                      type: "email"
                    }}
                  />
                )}
              </Field>
            </FormControl>
            <FormControl fullWidth className={classes.formControl}>
              <InputLabel htmlFor="password">Password</InputLabel>
              <Field name="password">
                {({ input, meta }) => (
                  <Input
                    id="password"
                    inputProps={{
                      autoComplete: "off",
                      ...input,
                      type: "password"
                    }}
                  />
                )}
              </Field>
            </FormControl>
            <FormControl className={classes.formControl}>
              <Grid
                container
                direction="row"
                justify="space-between"
                alignItems="center"
              >
                <Button
                  type="submit"
                  className={classes.formButton}
                  variant="contained"
                  size="large"
                  color="secondary"
                  disabled={pristine || submitting}
                >
                  {this.state.formToggle ? "Enter" : "Create Account"}
                </Button>
                <Typography>
                  <button
                    className={classes.formToggle}
                    type="button"
                    onClick={() => {
                      this.setState({
                        formToggle: !this.state.formToggle
                      });
                    }}
                  >
                    {this.state.formToggle
                      ? "Create an account."
                      : "Login to existing account."}
                  </button>
                </Typography>
              </Grid>
            </FormControl>
            <Typography className={classes.errorMessage}>
              {this.state.error ? this.state.error : ""}
            </Typography>
          </form>
        )}
      />
    );
  }
}

AccountForm.propTypes = {
  LOGIN_MUTATION: PropTypes.func.isRequired,
  SIGNUP_MUTATION: PropTypes.func.isRequired
};

const refetchQueries = [{ query: VIEWER_QUERY }];

export default compose(
  graphql(LOGIN_MUTATION, {
    options: {
      refetchQueries: refetchQueries
    },
    name: "login"
  }),
  graphql(SIGNUP_MUTATION, {
    options: {
      refetchQueries: refetchQueries
    },
    name: "signup"
  }),
  withStyles(styles)
)(AccountForm);
