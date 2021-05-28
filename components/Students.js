import { useState } from 'react'
import { Radio, Button, List, Form, Select, Space, Input } from 'antd'

import { PlusOutlined, SelectOutlined, MinusCircleOutlined } from '@ant-design/icons'

import styles from '../styles/Students.module.css'
const { Option } = Select;


export default function Students() {
  
  const [newStudent, setNewStudent] = useState(false)

  
  return (
    <>
      <div className={styles.Header}>
        <Button type="primary" icon={<PlusOutlined />} value={newStudent} onClick={() => setNewStudent(!newStudent)}>
            Add Student
        </Button>
        <Button type="primary" icon={<SelectOutlined />} >
            Select
        </Button>
        <Radio.Group>
          <Radio.Button value="large">Class</Radio.Button>
          <Radio.Button value="default">Grade</Radio.Button>
          <Radio.Button value="small">Date Added</Radio.Button>
        </Radio.Group>
      </div>

      <List>
        <List.Item  actions={[<Button type="dashed" size='small'>Edit</Button>,]}>
          <List.Item.Meta
            title={"First Name Last Name"}
            description="Grade - Class(es)"
          />
          <div>{`Email: ${'Email'} | User: ${'User'} | Passhash: ${'Pass'}`}</div>
        </List.Item>
      </List>
      
      
    </>
  )
}



// import { List, message, Avatar, Spin } from 'antd';

// import reqwest from 'reqwest';

// import WindowScroller from 'react-virtualized/dist/commonjs/WindowScroller';
// import AutoSizer from 'react-virtualized/dist/commonjs/AutoSizer';
// import VList from 'react-virtualized/dist/commonjs/List';
// import InfiniteLoader from 'react-virtualized/dist/commonjs/InfiniteLoader';

// const fakeDataUrl = 'https://randomuser.me/api/?results=5&inc=name,gender,email,nat&noinfo';

// export default class VirtualizedExample extends React.Component {
//   state = {
//     data: [],
//     loading: false,
//   };

//   loadedRowsMap = {};

//   componentDidMount() {
//     this.fetchData(res => {
//       this.setState({
//         data: res.results,
//       });
//     });
//   }

//   fetchData = callback => {
//     reqwest({
//       url: fakeDataUrl,
//       type: 'json',
//       method: 'get',
//       contentType: 'application/json',
//       success: res => {
//         callback(res);
//       },
//     });
//   };

//   handleInfiniteOnLoad = ({ startIndex, stopIndex }) => {
//     let { data } = this.state;
//     this.setState({
//       loading: true,
//     });
//     for (let i = startIndex; i <= stopIndex; i++) {
//       // 1 means loading
//       this.loadedRowsMap[i] = 1;
//     }
//     if (data.length > 19) {
//       message.warning('Virtualized List loaded all');
//       this.setState({
//         loading: false,
//       });
//       return;
//     }
//     this.fetchData(res => {
//       data = data.concat(res.results);
//       this.setState({
//         data,
//         loading: false,
//       });
//     });
//   };

//   isRowLoaded = ({ index }) => !!this.loadedRowsMap[index];

//   renderItem = ({ index, key, style }) => {
//     const { data } = this.state;
//     const item = data[index];
//     return (
//       <List.Item key={key} style={style}>
//         <List.Item.Meta
//           title={<a href="https://ant.design">{item.name.last}</a>}
//           description={item.email}
//         />
//         <div>Content</div>
//       </List.Item>
//     );
//   };

//   render() {
//     const { data } = this.state;
//     const vlist = ({ height, isScrolling, onChildScroll, scrollTop, onRowsRendered, width }) => (
//       <VList
//         autoHeight
//         height={height}
//         isScrolling={isScrolling}
//         onScroll={onChildScroll}
//         overscanRowCount={2}
//         rowCount={data.length}
//         rowHeight={73}
//         rowRenderer={this.renderItem}
//         onRowsRendered={onRowsRendered}
//         scrollTop={scrollTop}
//         width={width}
//       />
//     );
//     const autoSize = ({ height, isScrolling, onChildScroll, scrollTop, onRowsRendered }) => (
//       <AutoSizer disableHeight>
//         {({ width }) =>
//           vlist({
//             height,
//             isScrolling,
//             onChildScroll,
//             scrollTop,
//             onRowsRendered,
//             width,
//           })
//         }
//       </AutoSizer>
//     );
//     const infiniteLoader = ({ height, isScrolling, onChildScroll, scrollTop }) => (
//       <InfiniteLoader
//         isRowLoaded={this.isRowLoaded}
//         loadMoreRows={this.handleInfiniteOnLoad}
//         rowCount={data.length}
//       >
//         {({ onRowsRendered }) =>
//           autoSize({
//             height,
//             isScrolling,
//             onChildScroll,
//             scrollTop,
//             onRowsRendered,
//           })
//         }
//       </InfiniteLoader>
//     );
//     return (
//       <List>
//         {data.length > 0 && <WindowScroller>{infiniteLoader}</WindowScroller>}
//         {this.state.loading && <Spin className="demo-loading" />}
//       </List>
//     );
//   }
// }