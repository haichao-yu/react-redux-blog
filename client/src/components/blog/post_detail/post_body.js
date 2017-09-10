import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchPost } from '../../../actions';

class PostBody extends Component {

  componentDidMount() {
    if (!this.props.post) {
      const {id} = this.props;
      this.props.fetchPost(id);
    }
  }

  renderTags(tags) {
    return tags.map(tag => {
      return <span className="badge badge-info span-with-margin" key={tag}>{tag}</span>;
    });
  }

  render() {

    const {post} = this.props;

    if (!post) {
      return <div>Loading...</div>
    }

    // for displaying inner html: https://facebook.github.io/react/docs/dom-elements.html
    return (
      <div>
        <h3>{post.title}</h3>
        {this.renderTags(post.categories)}
        <span className="span-with-margin"> • </span>
        <span className="span-with-margin">{post.authorName}</span>
        <span className="span-with-margin"> • </span>
        <span className="span-with-margin">{new Date(post.time).toLocaleString()}</span>
        <hr />
        <div className="text-justify" dangerouslySetInnerHTML={{ __html: post.content }} />
        <hr />
      </div>
    );
  }
}

function mapStateToProps({ posts }, ownProps) {
  return { post: posts[ownProps.id] };
}

export default connect(mapStateToProps, { fetchPost })(PostBody);