import React, { Component } from 'react';
import { Table } from 'antd';

class App extends React.Component {
  render() {
    return (
        <div>
            <h4>{this.props.title}</h4>
            <Table
                style={{marginBottom:"1rem"}}
                showHeader={false} 
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