import React,{ Component } from 'react';
import { connect } from 'react-redux';
import { Icon, Avatar, Card } from 'antd';
import PropTypes from 'prop-types';
import './ItemCard.css';
const { Meta } = Card;
class ItemCard extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    const { index, list, collection, like, cardClick } = this.props;
    return (
      <div className="card">
        <Card
          key={"card" + index}
          loading
          hoverable
          cover={<img alt="src" src={list.src} onClick={cardClick} className="image" />}
          actions={[
            <div onClick={collection} className="icon-div" >
              { list.userCollection ? <Icon type='star' style={{ marginRight: 8, color: 'red' }} /> : <Icon type='star' style={{ marginRight: 8 }} /> }
              {list.collection}
            </div>,
            <div onClick={like} className="icon-div" >
              { list.userLikes ? <Icon type='like' style={{ marginRight: 8, color: '#eb7350' }} /> : <Icon type='like' style={{ marginRight: 8 }} /> }
              {list.likes}
            </div>
          ]}
        >
        </Card>
      </div>
    );
  }
}
ItemCard.proptypes = {
  index: PropTypes.number,
  list: PropTypes.object,
  collection: PropTypes.func,
  like: PropTypes.func,
  cardClick: PropTypes.func
}
function mapStateToProps(state,oWnprops) {
  return state;
}
export default connect(mapStateToProps)(ItemCard);
