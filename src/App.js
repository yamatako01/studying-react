import React, { Component } from 'react';
import Form from './Form';
import List from './List';
import './index.css';

class App extends Component {

  state = {
    posts: [],
    selId: null
  }

  componentDidMount(){
    if(this.state.selId !== null) {
      this.refs.ChildComponent.addedStateSet();
      this.setState({
        selId:null
      });
    }
  }

  /** Formが作成した投稿を保存する処理 */
  saveNewPost(newPost) {
    // 投稿にidを付与する
    const newPostWithId = {
      ...newPost,
      id: Date.now()
    }

    // state内の投稿リストに加える
    this.setState({
      posts: [...this.state.posts, newPostWithId]
    });
  }

  deletePost(delPost) {
    this.state.posts.splice(delPost,1);
    this.setState({
      posts: this.state.posts
    });  
  }

  /** Listで選択した投稿を保存する処理 */
  changeSelPost(selPost) {
    // 投稿にidを付与する
    this.setState({
      selId:selPost
    });
   // this.refs.ChildComponent.addedStateSet();
    // state内の投稿リストに加える
    // this.setState({
    //   posts: [...this.state.posts, newPostWithId]
    // });
  }

  render() {
    return (
      <div className="App">
        <Form
          onSubmitNewPost={(newPost) => this.saveNewPost(newPost)}
          ref='ChildComponent'
          posts={this.state.posts}
          selId={this.state.selId} />
        <hr />
        <List
          onDeletePost={(delPost) => this.deletePost(delPost)}
          onChangeSelPost={(selPost) => this.changeSelPost(selPost)}
          posts={this.state.posts} />
      </div>
    );
  }
}

export default App;
