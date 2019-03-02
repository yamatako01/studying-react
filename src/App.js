import React, { Component } from 'react';
import Form from './Form';
import List from './List';
import './index.css';

class App extends Component {

  state = {
    posts: []
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

  render() {
    return (
      <div className="App">
        <Form
          onSubmitNewPost={(newPost) => this.saveNewPost(newPost)}
          posts={this.state.posts} />
        <hr />
        <List
          posts={this.state.posts} />
      </div>
    );
  }
}

export default App;
