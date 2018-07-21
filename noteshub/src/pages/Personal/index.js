import React,{ Component } from 'react';
import { connect } from 'react-redux';
import { Affix, Button, Modal, message, Spin, Icon } from 'antd';
import InfiniteScroll from 'react-infinite-scroller';
import LayoutHead from './../../components/Layout/LayoutHead.js';
import { getAvatarA, uploadImagesA, uploadAvatarA, getImagesA, signOutA } from './../../actions/PersonalAction.js';
import * as styles from './index.css';
class Index extends Component {
  constructor(props) {
    super(props);
    this.state = {
      visible: false,
      viewVisible: false,
      loading: false,
      hasMore: true,
      src: '',
      id: 0
    };
  }
  componentWillMount() {
    const { dispatch } = this.props;
    getAvatarA(dispatch, 24);
  }
  componentWillReceiveProps(nextProps) {
    const { history } = this.props;
    const { userName } = nextProps.personalRedu;
    if(!userName) {
      history.push('/');
    }
  }
  settingBtn() {
    const { visible } = this.state;
    if(visible) {
      this.setState({
        visible: false,
      });
    } else {
      this.setState({
        visible: true,
      });
    }
  }
  uploadAvatar(e) {
    let files = this.refs.avatar.files;
    let num = files.length;
    const { dispatch } = this.props;
    const formData = this.getFormData(files, num);
    uploadAvatarA(dispatch, formData);
    e.target.value = '';
  }
  getFormData(files, num) {
    let formData = new FormData();
    for (let i = 0; i < num; i++) {
      files[i].thumb = URL.createObjectURL(files[i]);
      formData.append('filedata', files[i]);
    }
    return formData;
  }
  uploadImages(e) {
    let files = this.refs.images.files;
    let num = files.length;
    const { dispatch, personalRedu } = this.props;
    const { count } = personalRedu;
    if(num > 3) {
      message.error('请上传少于3张图片');
      return;
    }
    const formData = this.getFormData(files, num);
    uploadImagesA(dispatch, formData, count);
    e.target.value = '';
  }
  handleInfiniteOnLoad = (page) => {
    const { dispatch, personalRedu } = this.props;
    const { count, total } = personalRedu;
    if(total[0]['count(*)'] > count) {
      this.setState({
        loading: true,
      });
      setTimeout(() => {
        getImagesA(dispatch,count + 24);
      },500);
      setTimeout(() => {
        this.setState({
          loading: false,
        });
      },700);
    }
  };
  renderList(listData) {
    let listArray = [];
    let count = 0;
    for(let i in listData) {
      let list = listData[i];
      listArray.push(<img key={count++} className="all-image" src={list} onClick={this.view.bind(this, count++)} />);
    }
    return listArray;
  }
  view(id) {
    id -= 1;
    const appVersion = navigator.appVersion;
    if(appVersion.indexOf('Android') > 0) {
      return;
    } else if (appVersion.indexOf('iPhone') > 0) {
      return;
    }
    const { personalRedu } = this.props;
    const { listData } = personalRedu;
    const src = listData[id];
    this.setState({
      src,
      id,
      viewVisible: true
    });
  }
  viewClick(type) {
    let { id } = this.state;
    const { personalRedu } = this.props;
    const { listData } = personalRedu;
    message.config({
      duration: 2,
    });
    if(type) {
      if(id === listData.length - 1) {
        message.info('到底啦！');
        return;
      }
      id += 1;
    } else {
      if(id === 0) {
        message.info('到头啦！');
        return;
      }
      id -= 1;
    }
    const src = listData[id];
    this.setState({
      id,
      src
    });
  }
  close() {
    this.setState({
      viewVisible: false
    });
  }
  signOut() {
    const { dispatch } = this.props;
    signOutA(dispatch);
  }
  setting() {
    const { history } = this.props;
    const appVersion = navigator.appVersion;
    if(appVersion.indexOf('Android') > 0) {
      history.push('/passwordchange');
    } else if (appVersion.indexOf('iPhone') > 0) {
      history.push('/passwordchange');
    } else if(appVersion.indexOf('iPhone') < 0 && appVersion.indexOf('Android') < 0 ) {
      history.push('/setting');
    }
  }
  render() {
    const { history, personalRedu } = this.props;
    const { userName, avatar, listData } = personalRedu;
    const { visible, loading, hasMore, viewVisible, src } = this.state;
    return (
      <div className="personal">
        <Affix>
          <LayoutHead
            userName={userName}
            avatar={avatar}
            history={history}
          />
        </Affix>
        <main className="personal-main">
          <header className="personal-header">
            <section className="personal-left">
              <input
                id="upload-file"
                className="personal-avatar-input"
                accept="image/*"
                type="file"
                ref="avatar"
                hidden="hidden"
                onChange={this.uploadAvatar.bind(this)}
              />
              <label className="personal-label" htmlFor="upload-file" >
                <img className="user-image" src={avatar} />
              </label>
            </section>
            <section className="personal-right">
              <div className="personal-one">
                <h1 className="personal-name">{userName}</h1>
                <Button className="personal-setting" onClick={this.settingBtn.bind(this)} >设置</Button>
              </div>
              <section className="personal-two">
                <input
                  id="upload-images-file"
                  className="personal-images-input"
                  accept="image/*"
                  multiple
                  size={3}
                  ref="images"
                  type="file"
                  hidden="hidden"
                  onChange={this.uploadImages.bind(this)}
                />
                <label className="personal-upload" htmlFor="upload-images-file">上传图片</label>
              </section>
            </section>
          </header>
          <div className="personal-content">
            图片
          </div>
          <section className="personal-section">
            {
              listData[0] ? <InfiniteScroll
              initialLoad={false}
              pageStart={0}
              loadMore={this.handleInfiniteOnLoad}
              hasMore={!loading && hasMore}
              useWindow={true}
              threshold={10}
            >
              <div className="personal-content-div">
                {this.renderList(listData)}
              </div>
              { loading && <Spin style={{ marginTop: 10, display: 'flex', justifyContent: 'center', alignItems: 'center' }} /> }
            </InfiniteScroll> : <h1 className="personal-clear">您暂时没有图片</h1>
            }
          </section>
          <Modal
            visible={visible}
            className="personal-modal"
            closable={false}
            footer={null}
            confirmLoading={false}
          >
            <div className="personal-modal-content" onClick={this.setting.bind(this)}>
              更改密码
            </div>
            <div className="personal-modal-content" onClick={this.signOut.bind(this)}>
              登出
            </div>
            <div className="personal-modal-cancel" onClick={this.settingBtn.bind(this)}>
              取消
            </div>
          </Modal>
          <Modal
            visible={viewVisible}
            className="personal-modal"
            closable={false}
            footer={null}
            confirmLoading={false}
          >
            <div>
              <img className="personal-viewimg" src={src} />
              <div className="personal-right-div" onClick={this.viewClick.bind(this, true)}>
                <Icon className="personal-icon" type="right" />
              </div>
              <div className="personal-left-div" onClick={this.viewClick.bind(this, false)}>
                <Icon className="personal-icon" type="left" />
              </div>
              <div className="personal-close-div" onClick={this.close.bind(this)}>
                <Icon type="close" style={{ fontSize: 24, color: '#fff' }} />
              </div>
            </div>
          </Modal>
        </main>
      </div>
    );
  }
}
function mapStateToProps(state,oWnprops) {
  return state;
}
export default connect(mapStateToProps)(Index);