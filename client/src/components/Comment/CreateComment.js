import React, { useState, useContext } from "react";
import { withStyles } from "@material-ui/core";
import InputBase from "@material-ui/core/InputBase";
import IconButton from "@material-ui/core/IconButton";
import ClearIcon from "@material-ui/icons/Clear";
import SendIcon from "@material-ui/icons/Send";
import Divider from "@material-ui/core/Divider";

import { CREATE_COMMENT_MUTATION } from '../../graphql/mutations';
import { useClient } from '../../client';
import Context from '../../context';

const CreateComment = ({ classes }) => {
  const client = useClient();
  const [comment, setComment] = useState('');
  const { state } = useContext(Context);

  const handleSubmitComment = async () => {
    const variables = {
      text: comment,
      pinId: state.currentPin._id
    };
    await client.request(CREATE_COMMENT_MUTATION, variables);
    setComment('');
  };

  return (
    <>
      <form className={classes.form}>
        <IconButton
          disabled={!comment.trim()}
          className={classes.clearButton}
          onClick={() => setComment('')}
        >
          <ClearIcon />
        </IconButton>
        <InputBase
          className={classes.input}
          placeholder='Add comment'
          multiline={true}
          value={comment}
          onChange={e => setComment(e.target.value)}
        />
        <IconButton
          disabled={!comment.trim()}
          className={classes.sendButton}
          onClick={handleSubmitComment}
        >
          <SendIcon />
        </IconButton>
      </form>
      <Divider />
    </>
  );
};

const styles = theme => ({
  form: {
    display: "flex",
    alignItems: "center"
  },
  input: {
    marginLeft: 8,
    flex: 1
  },
  clearButton: {
    padding: 0,
    color: "red"
  },
  sendButton: {
    padding: 0,
    color: theme.palette.secondary.dark
  }
});

export default withStyles(styles)(CreateComment);
