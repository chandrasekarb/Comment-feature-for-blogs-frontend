import React, { Component } from 'react';
import './App.scss';
import Comment from './components/Comment.js';
import axios from 'axios';
import blog from './blog.jpg';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {name: '', comment: '', comments: []};
  }
  
  componentDidMount() {
    axios.get('http://localhost:3002/comments')
    .then((response) => {
      const result = response.data.comments;
      this.setState({comments: result});
    })
    .catch(() => {
      alert('Failed to get value...');
    });
  }

  commentSave(evt) {
    evt.preventDefault();
    const input = {name: this.state.name, comment: this.state.comment};
    
    axios.post('http://localhost:3002/comment', input)
    .then((response) => {
      const comment = response.data;
      let comments = this.state.comments;
      comments.unshift(comment);
      this.setState({comments: comments, name: '', comment: ''});
    })
    .catch(() => {
      alert('Failed to post reply...');
    });
    
  }
  
  nameChange(event) {
    this.setState({ name: event.target.value });
  }
  
  commentChange(event) {
    this.setState({ comment: event.target.value });
  }
  
  render() {
    const comments = this.state.comments;
    return (
	<div className="App">
	<div className="innerApp">
		<center><h4 className="headertext"> What To Know About COVID-19 Vaccines </h4></center>
		
		<center><img src={blog} className="imgBlog" alt="logo" /></center>
		
		<div className="blogText">	
		<p>At this time, there is an unprecedented logistical effort by federal, state and county agencies to distribute and administer COVID-19 vaccines to essential frontline workers and people most at risk of severe complications from COVID-19. At One Medical, we are committed to keeping our members informed every step of the way until the COVID-19 vaccine is available to everyone.</p>

		<p>Here are our answers to some of your most commonly asked questions:</p>

		<h4>Can I sign up for a vaccine waitlist?</h4>
		<p>At One Medical, we will offer vaccination to everyone we can, according to the plans established by our public health partners, so a waitlist isn’t needed. We understand that the media has differing reports daily, and rest assured we'll let all our members know as soon we have vaccines available.</p>
		
		
		<h4>How does the COVID-19 vaccine work?</h4>
		<p>The Pfizer/BioNTech and Moderna COVID-19 vaccines, approved in December, use messenger RNA (mRNA) which delivers a small genetic “message” that causes your own cells to make a protein that resembles the spike on the outer shell of the tiny COVID-19 virus. Your immune system then recognizes this protein as foreign, and produces specific antibodies and specialized immune cells (T-lymphocytes and B-lymphocytes) that quickly spring into action if the virus itself shows up in the future.</p>
		
		
		<h4>What are the benefits of the COVID-19 vaccine?</h4>
		<p>Both the Pfizer/BioNTech and Moderna vaccines have been shown to be over 90% effective in preventing illness from COVID-19. How long this protection lasts is currently unknown. The J&J vaccine is slightly less effective in preventing illness; however, what is more impressive is that it is virtually 100% protective against severe disease leading to hospitalization or death.</p>
		<p>Once fully vaccinated (which means 2 weeks have passed after you received your final dose for Pfizer/Moderna and 4 weeks have passed for J&J), for the first 3 months afterwards, you do not need to quarantine if you are exposed to someone with COVID-19.</p>
		</div>
		<br/>
		
		<div className="cmtBox">
		<form onSubmit={this.commentSave.bind(this)}>
		
			<label>Comment as: <input type="text" placeHolder="Enter Name" className="cmtName" required
				onChange={this.nameChange.bind(this)} value={this.state.name}/></label>
				
			<textarea className="cmtText" rows="3" placeHolder="Enter Your Comment..." required
				onChange={this.commentChange.bind(this)} value={this.state.comment}/>
				
			<button className="cmtButton" type="submit"> Comment </button>
		</form>
		</div>
		
		{comments.map((comment) =>
			<div>
				<Comment id={comment.id} log={comment} viewmode={'comment'}/>
			</div>
		)}
	</div>
	</div>
    );
  }
}

export default App;
