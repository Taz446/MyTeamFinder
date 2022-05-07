import React from 'react';
import { connect } from "react-redux";
import { fetchPosts, resetPosts, resetFilters, fetchTeamInvites, fetchTeamRequests, deletePost } from '../../actions';
import { isEmpty, orderBy } from 'lodash';
import { Link } from 'react-router-dom';

import mtf from '../../apis/mtf';

import getLolPositionImage from '../UserProfile/LolProfile/LolPositionImage';

import MtfLoader from '../MtfLoader';

import './posts.css';

class BrowsePosts extends React.Component {

    componentDidMount() {
        if(isEmpty(this.props.posts) || this.props.posts[0].game.id !== this.props.gameId) {
            this.postsInit(this.props.gameId, 'team');
        }
        this.props.resetFilters();
    }

    postsInit = async (gameId, type) => {
        await this.props.fetchPosts(gameId, type);
    }

    applyFilters(posts, filters) {
        if (isEmpty(this.props.filters)) return this.props.posts
        if (this.props.gameId === 1) return this.applyLolFilters(posts, filters)
        if (this.props.gameId === 2) return this.applyDotaFilters(posts, filters)
    }

    applyLolFilters(posts, filters) {
        let newPosts = posts;
        
        if (filters.region) newPosts = newPosts.filter(post => {return post.lolFilters.region === filters.region})
        if (filters.minRank) newPosts = newPosts.filter(post => {return post.lolFilters.rank >= filters.minRank})
        if (filters.maxRank) newPosts = newPosts.filter(post => {return post.lolFilters.rank <= filters.maxRank})

        let finalPosts = []
        let tempPosts = []
        let check = false

        if (filters.top) {
            tempPosts = [...newPosts.filter(post => {return post.lolFilters.top})]
            finalPosts.push(...tempPosts);
            check = true
        }
        if (filters.jungle) {
            tempPosts = [...newPosts.filter(post => {return post.lolFilters.jungle})]
            finalPosts.push(...tempPosts);
            check = true
        }
        if (filters.mid) {
            tempPosts = [...newPosts.filter(post => {return post.lolFilters.mid})]
            finalPosts.push(...tempPosts);
            check = true
        }
        if (filters.bottom) {
            tempPosts = [...newPosts.filter(post => {return post.lolFilters.bottom})]
            finalPosts.push(...tempPosts);
            check = true
        }
        if (filters.support) {
            tempPosts = [...newPosts.filter(post => {return post.lolFilters.support})]
            finalPosts.push(...tempPosts);
            check = true
        }

        finalPosts = [...new Set(finalPosts)]

        return (check ? finalPosts : newPosts);
    }

    applyDotaFilters(posts, filters) {
        let newPosts = posts;
        if (filters.minMmr) newPosts = newPosts.filter(post => {return post.dotaFilters.mmr >= filters.minMmr})
        if (filters.maxMmr) newPosts = newPosts.filter(post => {return post.dotaFilters.mmr <= filters.maxMmr})

        let finalPosts = []
        let tempPosts = []
        let check = false

        if (filters.carry) {
            tempPosts = [...newPosts.filter(post => {return post.dotaFilters.carry})]
            finalPosts.push(...tempPosts);
            check = true
        }
        if (filters.mid2) {
            tempPosts = [...newPosts.filter(post => {return post.dotaFilters.mid2})]
            finalPosts.push(...tempPosts);
            check = true
        }
        if (filters.offlane) {
            tempPosts = [...newPosts.filter(post => {return post.dotaFilters.offlane})]
            finalPosts.push(...tempPosts);
            check = true
        }
        if (filters.farmSupoort) {
            tempPosts = [...newPosts.filter(post => {return post.dotaFilters.farmSupport})]
            finalPosts.push(...tempPosts);
            check = true
        }
        if (filters.hardSupport) {
            tempPosts = [...newPosts.filter(post => {return post.dotaFilters.hardSupport})]
            finalPosts.push(...tempPosts);
            check = true
        }

        finalPosts = [...new Set(finalPosts)]

        return (check ? finalPosts : newPosts);
    }

    renderName(p) {
        if(p.postType === "TEAM") return p.user.teamOwned.teamName;
        if(this.props.gameId === 1) {
            return p.user.lolUser.summonerName
        } 
        if(this.props.gameId === 2) {
            return p.user.dotaUser.dotaName
        } 
        return <MtfLoader/>
    }

    renderPositions(positions, post) {
        return positions.map( p => {
            return (
                <img key={[p, post.id]} src={getLolPositionImage(p)} alt={getLolPositionImage(p)} className="post-pos"/>
            )
        })
    }

    getLolPositions(filters) {
        const positions = [];

        if (filters.top) positions.push('top');
        if (filters.jungle) positions.push('jungle');
        if (filters.mid) positions.push('mid');
        if (filters.bottom) positions.push('bottom');
        if (filters.support) positions.push('support');

        return positions;
    }

    getDotaPositions(filters) {
        const positions = [];

        if (filters.carry) positions.push('carry');
        if (filters.mid2) positions.push('mid2');
        if (filters.offlane) positions.push('offlane');
        if (filters.farmSupport) positions.push('farmSupport');
        if (filters.hardSupport) positions.push('hardSupport');

        return positions;
    }

    getLink(post) {
        if(post.postType === 'PLAYER') {
            return `/viewprofile/${post.user.id}/${post.user.displayName}`
        }
        if(post.game.id === 1){
            return `/viewteam/${post.user.lolUser.team.id}/${post.user.lolUser.team.teamName}`
        }
        return `/viewteam/${post.user.dotaUser.team.id}/${post.user.dotaUser.team.teamName}`
    }

    renderInvButton(post) {
        if(!this.props.user) return null
        if(post.postType === "PLAYER") {
            if(this.props.user.teamOwned) {
                if (post.game.id === 1) {
                    if (this.props.teamInvites.lolTeamInvites.find( i => {return i.lolUser.id === post.user.lolUser.id})) return null
                }
                if (post.game.id === 2) {
                    if (this.props.teamInvites.dotaTeamInvites.find( i => {return i.dotaUser.id === post.user.dotaUser.id})) return null
                }
                return <button className='ui bottom attached teal button' style={{margin:"-1px"}} onClick={() => this.createInvite(post)}>Invite Player</button>
            }
        } else {
            if(this.props.user.teamOwned) return null
            if(post.game.id === 1) {
                if(this.props.user.lolUser) {
                    if(!this.props.user.lolUser.team) {
                        if(!isEmpty(this.props.teamRequests)) {
                            if (this.props.teamRequests.lolTeamRequests.find( i => {return i.team.id === post.user.teamOwned.id})) return null
                        }
                        return <button className='ui bottom attached teal button' style={{margin:"-1px"}} onClick={() => this.createInvite(post)}>Request to Join</button>
                    }
                }
            }
            if(post.game.id === 2) {
                if(this.props.user.dotaUser) {
                    if(!this.props.user.dotaUser.team) {
                        if(!isEmpty(this.props.teamRequests)) {
                            if (this.props.teamRequests.dotaTeamRequests.find( i => {return i.team.id === post.user.teamOwned.id})) return null
                        }
                        return <button className='ui bottom attached teal button' style={{margin:"-1px"}} onClick={() => this.createInvite(post)}>Request Join</button>
                    }
                }
            }
        }
        return null
    }

    createInvite = async (post) => {
        const type = post.postType === 'TEAM' ? 'REQUEST' : 'INVITE';
        const user = () => {
            if(type === 'INVITE') {
                if(post.game.id ===1) {
                    return {lolUser: post.user.lolUser, dotaUser: null }
                }else {
                    return {lolUser: null, dotaUser: post.user.dotaUser }
                }
            }else {
                if(post.game.id ===1) {
                    return {lolUser: this.props.user.lolUser, dotaUser: null }
                }else {
                    return {lolUser: null, dotaUser: this.props.user.dotaUser }
                }
            }
        }
        const team = type === 'INVITE' ? this.props.user.teamOwned : post.user.teamOwned;
        try{
            await mtf.post(`/team-invites`, {type: type, game: post.game, team: team, lolUser: user().lolUser, dotaUser: user().dotaUser})
        }catch(e) {
            console.log('error')
        }
        this.props.fetchTeamInvites(this.props.user);
        this.props.fetchTeamRequests(this.props.user);
    }

    renderDeleteButton(post) {
        if(!this.props.user) return null
        if(post.user.id !== this.props.user.id) return null
        return(
            <button className='ui bottom attached red button' style={{margin:"-1px"}} onClick={() => this.deletePost(post)}>Delete</button>
        )
    }

    deletePost = async post => {
        this.props.deletePost(post.id);
    }

    renderRank(post) {
        if(post.game.id === 1) {
            if(post.postType == 'TEAM') {
                return post.user.teamOwned.avgLolRank
            }
            return post.user.lolUser.rank
        }
        if(post.postType == 'TEAM') {
            return `mmr: ${post.user.teamOwned.avgDotaMmr}`
        }
        return `mmr: ${post.user.dotaUser.soloMmr}`
    }

    renderPosts() {
        if (!this.posts) {
            return <MtfLoader/>
        } else {
            return this.posts.map(
                post => {
                    return (
                        <div className="item" key={post.id}>
                            <div className="ui cards">
                                <div className="card">
                                    <div className="content">
                                        <div className="header">
                                            <Link to={this.getLink(post)} id="post-name">
                                                {this.renderName(post)}
                                            </Link>
                                            <span className='right floated post-rank'><b>{this.renderRank(post)}</b></span>
                                        </div>
                                        <div className="ui divider" id="my-divider"></div>
                                        <div className="description" style={{height:'50px', width:"200px", wordWrap: "break-word"}}>
                                            {post.content}
                                        </div>
                                        <div className='post-positions'>
                                            {this.renderPositions(post.lolFilters ? this.getLolPositions(post.lolFilters) : this.getDotaPositions(post.dotaFilters), post)}
                                            <span className='right floated' style={{color: "black"}}><b>{post.lolFilters ? post.lolFilters.region : null}</b></span>
                                        </div>
                                    </div>
                                    {this.renderInvButton(post)}
                                    {this.renderDeleteButton(post)}
                                </div>
                            </div>
                        </div>
                    );
                }
            );
        } 
    }

    render() {
        this.posts = orderBy(this.applyFilters(this.props.posts, this.props.filters), 'timestamp', 'desc');
        return(
            <div className= 'mid-content post-list'>
                {this.renderPosts()}
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return { user: state.auth.user, posts: Object.values(state.posts), filters: state.filters, teamInvites: state.teamInvites, teamRequests: state.teamRequests}
}

export default connect(mapStateToProps, {fetchPosts, resetPosts, resetFilters, fetchTeamInvites, fetchTeamRequests, deletePost})(BrowsePosts);