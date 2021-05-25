import React, { Component } from 'react';
import './Comment.scss';
import axios from 'axios';
import pic from '../pic.png';
import moment from 'moment';

class Comment extends Component {
  constructor(props) {
    super(props);
    this.state = {name: "", message: "", replies: [], replybox: false};
  }
  
  componentDidMount() {
    this.getValues(this.props.log.id);
  }

  componentWillUpdate(nextProps){
    if (nextProps.log.id !== this.props.log.id) {
      this.getValues(nextProps.log.id);
    } 
  }

  getValues(id) {
    axios.get('http://localhost:3002/replies?id='+id+'')
    .then((response) => {
      const result = response.data.replies;
      this.setState({replies: result});
    })
    .catch(() => {
      alert('Failed to get value...');
    });
  }
  
  reply(evt) {
    evt.preventDefault();
    const input = {name: this.state.name, comment: this.state.message, comment_id: this.props.id, parent_id: this.props.log.id};
    
    axios.post('http://localhost:3002/reply', input)
    .then((response) => {
      const reply = response.data;
      let replies = this.state.replies;
      replies.unshift(reply);
      this.setState({ replies: replies, name: "", message: "", replybox: false });
    })
    .catch(() => {
      alert('Failed to post reply...');
    });
    
  }
  
  nameChange(event) {
    this.setState({ name: event.target.value });
  }
  
  messageChange(event) {
    this.setState({ message: event.target.value });
  }
  
  replyButClick() {
    this.setState({ replybox: true });
  }
  
  replyCancel() {
    this.setState({ replybox: false });
  }
   
  render() {
    const replies = this.state.replies;
    return (
	<div className="comment-page">
	<div className="comment">
	
		<div className="comment-heading">
			<img src={pic} className="imgIcon" alt="logo" />
			<div className="comment-info">
				<span className="comment-author">{this.props.log.name}</span>
				<p className="date"> {moment(this.props.log.created_at).fromNow()} </p>
			</div>
		</div>

		<div className="comment-body">
			<p>{this.props.log.comment}</p>
			<button type="button" className="replyButton" onClick={this.replyButClick.bind(this)}>Reply</button>


			{this.state.replybox ?
				<div className="replyBox">
				<form onSubmit={this.reply.bind(this)}>
				
					<label>Reply as: <input type="text" placeHolder="Enter Name" className="cmtName" required
						onChange={this.nameChange.bind(this)} value={this.state.name}/></label>
						
					<textarea className="cmtText" rows="3" placeHolder="Enter Your Message..." required
						onChange={this.messageChange.bind(this)} value={this.state.message}/>
					
					<button className="cmtButton" type="submit"> Reply </button>
					<button className="cancelButton" onClick={this.replyCancel.bind(this)}> Cancel </button>
				</form>
				</div>
			: null }



			<div className="replies">
			{replies.map((reply) =>
				<Comment id={this.props.id} log={reply} viewmode={'reply'} />
			)}
			</div>
		</div>

	    </div>

	</div>
    );
  }
}

export default Comment;
