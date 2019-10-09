import React, { Component } from 'react';
import classname from 'classnames';
import { showItemInFolder } from '../../utils';
import './style.scss';
export default class CompressList extends Component<{ list: Array<IFile> }> {
  showItemInFolder(path: string) {
    showItemInFolder(path);
  }
  render() {
    const { list } = this.props;
    return (
      <div className="compress-list">
        <div className="tool-bar"></div>
        <ul>
          {list.map(({ name, path, size = 0, status, compressSize = 0 }) => {
            return (
              <li className="compress-list-item" key={path}>
                <span className="wrap">
                  <span
                    className={classname('mark iconfont', {
                      loading: status === 0,
                      gou: status === 1,
                      cha: status === -1,
                    })}
                  ></span>
                </span>
                <section className="thumbnail"></section>
                <section className="content">
                  <h4 className="title ellipsis">{name}</h4>
                  <div className="desc ellipsis">
                    <span className="size-info">
                      {(size / 1000).toFixed(2)}KB
                    </span>
                    {status === 1 ? (
                      <span className="compress-info">
                        {(compressSize / 1000).toFixed(2)}KB
                      </span>
                    ) : status === -1 ? (
                      <span className="compress-error">压缩失败</span>
                    ) : null}
                  </div>
                </section>
                <section className="oper-info">
                  <i
                    onClick={this.showItemInFolder.bind(this, path)}
                    className="iconfont fold"
                  ></i>
                </section>
              </li>
            );
          })}
        </ul>
      </div>
    );
  }
}
