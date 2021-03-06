import React, { Component } from "react";
import TextField from "@material-ui/core/TextField";
import { Form, Field, FormSpy } from "react-final-form";
import styles from "./styles";
import { withStyles } from "@material-ui/core";
import Button from "@material-ui/core/Button";
import { ItemPreviewContext } from "../../context/ItemPreviewProvider";
import { Mutation } from "react-apollo";
import { ADD_ITEM_MUTATION } from "../../apollo/queries";
import PropTypes from "prop-types";

let error = null;

const validate = values => {
  let { name, description } = values;
  if (name === "" || description === "") {
    error = "Must provide name and description";
  }
};

class ShareItemForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      checkedTags: [],
      tags: [],
      error: null
    };
  }

  applyTags = (tags, allTags) => {
    return tags.map(tag => {
      const updatedTag = { title: tag };
      allTags.filter(t => {
        if (t.title === tag) {
          updatedTag.id = t.id;
        }
        return true;
      });
      return updatedTag;
    });
  };

  dispatchUpdate = (values, allTags, updatePreview) => {
    updatePreview({
      ...values,
      tags: this.applyTags(values.tags || [], allTags)
    });
  };

  saveItem = async (values, allTags, addItem) => {
    try {
      const newItem = {
        ...values,
        tags: this.applyTags(values.tags || [], allTags)
      };
      await addItem({ variables: { item: newItem } });
    } catch (e) {
      this.setState({
        error: "Must provide all the fields and at least one tag"
      });
      throw e;
    }
  };

  render() {
    const { classes, tags } = this.props;

    return (
      <ItemPreviewContext.Consumer>
        {({ updatePreview, resetPreview }) => (
          <Mutation mutation={ADD_ITEM_MUTATION}>
            {addItem => (
              <Form
                onSubmit={values => {
                  this.saveItem(values, tags, addItem);
                  resetPreview();
                }}
                validate={validate}
                render={({ handleSubmit, form }) => (
                  <form
                    className={classes.shareFormContainer}
                    onSubmit={e => {
                      e.preventDefault();
                      handleSubmit();
                      form.reset();
                      resetPreview();
                    }}
                  >
                    <FormSpy
                      subscription={{ values: true }}
                      onChange={({ values }) => {
                        if (values) {
                          this.dispatchUpdate(values, tags, updatePreview);
                        } else {
                          this.resetPreview();
                        }
                        return "";
                      }}
                    />
                    <h1 className={classes.formTitle}>
                      Share. Borrow. Prosper.
                    </h1>
                    <div className={classes.formContainer}>
                      <Field
                        name="title"
                        render={({ input, meta }) => (
                          <TextField
                            id="standard-with-placeholder"
                            label="Name your item"
                            placeholder=""
                            className={classes.textField}
                            margin="normal"
                            {...input}
                            value={input.value}
                          />
                        )}
                      />
                      <Field
                        name="description"
                        render={({ input, meta }) => (
                          <TextField
                            id="standard-with-placeholder"
                            label="Describe your item"
                            placeholder=""
                            className={classes.textField}
                            margin="normal"
                            {...input}
                            value={input.value}
                          />
                        )}
                      />
                      <Field
                        name="imageurl"
                        render={({ input, meta }) => (
                          <TextField
                            id="standard-with-placeholder"
                            label="Image url for your item"
                            placeholder=""
                            className={classes.textField}
                            margin="normal"
                            {...input}
                            value={input.value}
                          />
                        )}
                      />
                      <div>
                        <p>Add Tags:</p>

                        <div>
                          {tags.map(tag => {
                            return (
                              <label className={classes.tagsList} key={tag.id}>
                                <Field
                                  key={tag.id}
                                  name="tags"
                                  component="input"
                                  type="checkbox"
                                  value={tag.title}
                                />
                                <span className={classes.tagTitle}>
                                  {tag.title}
                                </span>
                              </label>
                            );
                          })}
                        </div>
                      </div>
                      <Button
                        type="submit"
                        variant="contained"
                        color="secondary"
                        className={classes.button}
                      >
                        SHARE
                      </Button>
                    </div>
                    {error ? error : ""}
                  </form>
                )}
              />
            )}
          </Mutation>
        )}
      </ItemPreviewContext.Consumer>
    );
  }
}
ShareItemForm.propTypes = {
  tags: PropTypes.array.isRequired
};

export default withStyles(styles)(ShareItemForm);
