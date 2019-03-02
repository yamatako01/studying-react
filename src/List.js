import React, { Component } from 'react';
import { Ages } from './Form';
//import MuiThemeProvider from '@material-ui/core/styles/MuiThemeProvider';
//import { withStyles } from '@material-ui/core/styles';
import Avatar from '@material-ui/core/Avatar';
import Chip from '@material-ui/core/Chip';

const styles = {
  chip: {
    margin: 5,
},
  wrapper: {
    display: 'flex',
    flexWrap: 'wrap',
    float: 'left',
    marginRight: '40px',
    width: '200px',
  },
};
/*function handleTouchDelete() {
  alert('削除ボタンが押されました');
}
*/
function handleTouchTap() {
  alert('チップが選択されました。');
}

/** 投稿のリスト */
class List extends Component {
//class List extends React.Component {

  /** 投稿ひとつ分を描画する */
  renderPost(post, index) {
    return (
      <div>
        <div style={{float:"left"}}>
          <div style={styles.wrapper}>
          <Chip
            avatar={<Avatar>
                {this.convertAge(post.age)}
              </Avatar>}
            label={post.name}
            color={post.sex==="1"?"primary":"secondary"}
            onClick={handleTouchTap}
            onDelete={() => this.delete(index)}
            style={styles.chip}
          />
          </div>
          {/* <div>名前: {post.name}</div> */}
          {/* <div>年齢: {this.convertAge(post.age)}</div> */}
        </div>
        {/* <div style={{float:"left",margin:"20px 20px 20px 40px"}}> 
          <form>
            <input type="button" onClick={() => this.delete(index)} value="削除"/>
          </form>        
        </div> */}
        <div style={{paddingTop:"6px"}}>{post.body}</div>
      </div>
    );
  }

  delete(index) {
    if(window.confirm(this.props.posts[index].name+"を削除します。") === false) {
      return;
    }
    // console.log(this.state.posts);
   
    this.props.posts.splice(index,1);
    this.setState({
      posts: this.props.posts
    });

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

export default List;