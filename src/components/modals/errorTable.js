import React, { Component } from 'react';
import { Table } from 'antd';

class App extends React.Component {
  render() {
    return (
        <div>
            <Table
                style={{marginTop:"-1rem"}}
                pagination={false}
                columns={this.props.columns} 
                dataSource={this.props.data}
                scroll={{x:this.props.scrollx}}
                size="small" 
            />
        </div>
    );
  }
}

export default App