import React, { Component, Fragment } from 'react';
import DragPanel from './components/DragPanel';
import CompressList from './components/CompressList';
import { isDir, compress } from './utils';
import './styles/index.scss';
import './app.scss';
class App extends Component<any> {
  state = {
    list: [
      // {
      //   name: 'person_c80d27c.png',
      //   path: '/Users/joe.zhou/xmly/sound-image/out/images/person_c80d27c.png',
      //   size: 41651,
      //   status: 0,
      // },
    ],
    dragOver: false,
  };
  componentDidMount() {
    document.addEventListener('dragenter', (e) => {
      e.preventDefault();
      console.log('dragenter....');
      this.setState({ dragOver: true });
    });
    document.addEventListener('dragleave', (e) => {
      e.preventDefault();
      console.log('dragleave....');
      this.setState({ dragOver: false });
    });
    document.addEventListener('dragover', (e) => {
      e.preventDefault();
      console.log('dragover...');
    });
    document.addEventListener('drop', (e) => {
      e.stopPropagation();
      e.preventDefault();
      const { files = [] } = e.dataTransfer as any;
      for (const file of files) {
        this.getClist(file)
          .then((list: Array<IFile>) => {
            this.setState({ dragOver: false, list });
            return list.concat();
          })
          .then(this.toCompress)
          .catch((err) => {
            this.setState({ dragOver: false });
          });
      }
    });
  }
  getClist = ({ path, name, size }: IFile) => {
    return isDir(path).then((res) => {
      if (res) {
        return [];
      } else {
        return [{ path, name, size, status: 0 }];
      }
    });
  };
  toCompress = (list: Array<IFile>) => {
    Promise.all(
      list.map(({ path }: IFile, index) => {
        return compress(path, path).then((size) => {
          list[index].status = 1;
          list[index].compressSize = size;
          this.setState({ list });
        });
      }),
    );
  };
  render() {
    const { list = [], dragOver } = this.state;
    return (
      <Fragment>
        {list.length > 0 && !dragOver ? (
          <CompressList list={list} />
        ) : (
          <DragPanel />
        )}
      </Fragment>
    );
  }
}

export default App;
