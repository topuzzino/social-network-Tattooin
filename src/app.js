import React from "react";
import axios from "./axios";
import ProfilePic from "./profilepic";
import Uploader from "./uploader";
import Profile from "./profile";
import { BrowserRouter, Route, Link } from "react-router-dom";
import OtherProfile from "./otherProfile";
import Friends from "./friends";
import Chat from "./chat";
import Online from "./online";

export default class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
        this.setBio = this.setBio.bind(this);
    }
    // is invoked immediately after a component is mounted
    componentDidMount() {
        axios.get("/user").then(({ data }) => {
            this.setState(data); // in state there will be a user id
        });
    }
    setBio(newBio) {
        this.setState({ bio: newBio });
    }
    render() {
        if (!this.state.id) {
            return null;
        }
        return (
            <div className="main-container">
                <div className="header">
                    <div className="logo">
                        <a className="header-link" href="/">
                            <img src="/img/logo.png" width="70" height="70" />
                        </a>
                    </div>
                    <a className="header-link" href="/friends">
                        FRIENDS
                    </a>
                    <a className="header-link" href="/">
                        PROFILE
                    </a>

                    <ProfilePic
                        id={this.state.id}
                        first={this.state.first}
                        last={this.state.last}
                        users_pic={this.state.users_pic}
                        clickHandler={() =>
                            this.setState({ isUploaderVisible: true })
                        }
                    />
                </div>
                <BrowserRouter>
                    <div className="browserRouter-container">
                        <Route
                            exact
                            path="/"
                            render={props => {
                                return (
                                    <Profile
                                        id={this.state.id}
                                        first={this.state.first}
                                        last={this.state.last}
                                        users_pic={this.state.users_pic}
                                        bio={this.state.bio}
                                        setBio={this.setBio}
                                        clickHandler={() =>
                                            this.setState({
                                                isUploaderVisible: true
                                            })
                                        }
                                    />
                                );
                            }}
                        />
                        <Route
                            path="/user/:id"
                            render={props => (
                                <OtherProfile
                                    loggedId={this.state.id}
                                    key={props.match.url}
                                    match={props.match}
                                    history={props.history}
                                />
                            )}
                        />
                        <Route
                            exact
                            path="/friends"
                            render={() => <Friends />}
                        />
                        <Route path="/chat" component={Chat} />
                        <Route path="/online" component={Online} />
                    </div>
                </BrowserRouter>

                {this.state.isUploaderVisible && (
                    <Uploader
                        setImage={url => this.setState({ users_pic: url })}
                        hideUploader={() =>
                            this.setState({
                                isUploaderVisible: false
                            })
                        }
                    />
                )}
            </div>
        );
    }
}
