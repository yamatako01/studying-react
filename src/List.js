import React, { Component } from 'react';
import { Ages } from './Form';
//import MuiThemeProvider from '@material-ui/core/styles/MuiThemeProvider';
import { withStyles } from '@material-ui/core/styles';
import Avatar from '@material-ui/core/Avatar';
import Chip from '@material-ui/core/Chip';
import PropTypes from 'prop-types';
import SnackbarContent from '@material-ui/core/SnackbarContent';
import amber from '@material-ui/core/colors/amber';

const styles = theme => ({
  chip: {
    margin: 5,
  } ,
  wrapper: {
    // display: 'flex',
    // flexWrap: 'wrap',
    //float: 'left',
    marginRight: '60px',
    width: '200px',
  },
  title: {
    fontSize: 14,
    // paddingTop: '0px',
  },
  snackbar: {
    margin: theme.spacing.unit,
    backgroundColor: amber[100],
    color:'black',
  },
});

/** 投稿のリスト */
class List extends Component {
//class List extends React.Component {

  /** 投稿ひとつ分を描画する */
  renderPost(post, index) {
    const { classes } = this.props;
    return (
      <div>
        {/* <div style={{float:'left',width:'22%'}}> */}
        <div>
          <div style={styles.wrapper}>
            <Chip
              avatar={<Avatar>
                  {this.convertAge(post.age)}
                </Avatar>}
              label={post.name}
              color={post.sex==="1"?"primary":"secondary"}
              onClick={() => this.handleTouchTap(index)}
              onDelete={() => this.delete(index)}
              style={styles.chip}
            />
          </div>
          {/* <div>名前: {post.name}</div> */}
          {/* <div>年齢: {this.convertAge(post.age)}</div> */}
        </div>
        {/* <div style={{float:'left',width:'68%'}}> */}
        <div>
          <SnackbarContent
            className={classes.snackbar}
            message={post.body}
          />
        </div>
      </div>
    );
  }

  handleTouchTap(index) {
    alert('チップが選択されました。'+index);
    // 投稿する
		this.props.onChangeSelPost(index);
    
  }
  delete(index) {
    if(window.confirm(this.props.posts[index].name+"を削除します。") === false) {
      return;
    }
    this.props.onDeletePost(index);
	}		

  /** ageを日本語表記に変換する */
  convertAge(age) {
    switch(age) {
      case Ages.TEEN:
        return "10";
      case Ages.TWENTIES:
        return "20";
      case Ages.THIRTIES:
        return "30";
      case Ages.FOURTIES:
        return "40";
      case Ages.FIFTIES:
        return "50";
      default:
        throw Error(`不明なageです: ${age}`);
    }
  }

  /** 投稿の間に<hr/>を描画する */
  renderHrIfNotTail(posts, index) {
    const isTail = (posts.length - 1) === index;
    return isTail ? null : <hr style={{clear:"both"}}/>
  }

  render() {
    const { posts } = this.props;
    return (
      <div>
        { posts.map((post, index) => {
          return (
            <div key={`${post.id}`}>
              {this.renderPost(post, index)}
              {this.renderHrIfNotTail(posts, index)}
            </div>
          );
        }) }
      </div>
    )
  }
}

List.propTypes = {
  classes: PropTypes.object.isRequired,
};
export default withStyles(styles)(List);
//export default List;