import React,{ Component } from 'react';
import InfiniteScroll from 'react-infinite-scroller';
import { connect } from 'react-redux';
import { Spin, Affix, message, BackTop } from 'antd';
import ItemCard from './../../components/ItemCard/ItemCard.js';
import LayoutHead from './../../components/Layout/LayoutHead.js';
import LayoutFooter from './../../components/Layout/LayoutFooter.js';
import PropTypes from 'prop-types';
import { getData, userClick, clear } from './../../actions/HomeAction';
import './index.css';

class Index extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: false,
      hasMore: true,
      isRender: false,
    };
    this.loadedItems = [];
  }
  componentWillReceiveProps(nextProps) {
    message.config({
      top: 24,
      duration: 2,
      maxCount: 3,
    });
    const { dispatch } = this.props;
    const { code, message } = nextProps.homeRedu;
    if(code === 400) {
      message.warning(message, 2);
      clear(dispatch, nextProps.homeRedu);
    }
  }
  componentDidMount() {
    const { dispatch } = this.props;
    getData(dispatch,24);
  }
  handleInfiniteOnLoad = (page) => {
    const { dispatch, homeRedu } = this.props;
    const { count, total } = homeRedu;
    if(total[0]['count(*)'] > count) {
      this.setState({
        loading: true,
      });
      setTimeout(() => {
        getData(dispatch,count + 24);
      },500);
      setTimeout(() => {
        this.setState({
          loading: false,
        });
      },700);
    }
  };
  renderList(listData) {
    const listArray = listData.map((list,index) => {
      const { id } = list;
      return (
        <ItemCard
          list={list}
          key={"card" + index}
          index={index}
          collection={this.clickCollection.bind(this, id)}
          like={this.clickLike.bind(this, id)}
          cardClick={this.cardClick.bind(this, list.src, list.userName)}
        />
      );
    });
    return listArray;
  }
  clickCollection(id) {
    const { dispatch, homeRedu } = this.props;
    userClick(dispatch, homeRedu, id, 1);
  };
  clickLike(id) {
    const { dispatch, homeRedu } = this.props;
    userClick(dispatch, homeRedu, id, 2);
  }
  cardClick(img, userName) {
    const { history } = this.props;
    sessionStorage.setItem('img', img);
    sessionStorage.setItem('imgName', userName);
    history.push(`/detail`);
  }
  onLoad(item, index) {
    const { listData } = this.props.homeRedu;
    this.loadedItems.push(item);
    if(this.loadedItems.length == listData.length) {
      this.setState({
        isRender: true
      });
    }
  }
  render() {
    const { loading, data, hasMore } = this.state;
    const { history, homeRedu } = this.props;
    const { listData, count, userName, avatar } = homeRedu;
    return (
      <div style={{ maxHeight: '100%', position: 'relative' }}>
        <Affix>
          <LayoutHead 
            userName={userName}
            avatar={avatar}
            history={history}
          />
        </Affix>
        <InfiniteScroll
          initialLoad={false}
          pageStart={0}
          loadMore={this.handleInfiniteOnLoad}
          hasMore={!loading && hasMore}
          useWindow={true}
          threshold={10}
          style={{ maxHeight: '100%' }}
        >
          <div className="cardDiv" >
            <div className="cardDiv-div">
              {this.renderList(listData)}
            </div>
          </div>
          { loading && <Spin style={{ marginTop: 10, display: 'flex', justifyContent: 'center', alignItems: 'center' }} /> }
        </InfiniteScroll>
        {/*<div className="div-hidden">
          {
            listData.map((item, index) => 
              <img
                src={item.src}
                onLoad={this.onLoad.bind(this, item, index)} 
                key={index}
              />
            )
          }
        </div>*/}
        <BackTop />
        <LayoutFooter />
      </div>
    );
  }
}
Index.propTypes = {
  listData: PropTypes.array,
  count: PropTypes.number,
  userName: PropTypes.string,
  avatar: PropTypes.string

};
function mapStateToProps(state,oWnprops) {
  return state;
}
export default connect(mapStateToProps)(Index);