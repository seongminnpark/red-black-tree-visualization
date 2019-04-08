import React, { Component } from 'react';

import TreeCore, { Node, TreeLogger } from '../../core/tree/Tree';
import Jobs from '../../core/jobs/Jobs';

import Tree from '../components/Tree';
import Input from '../components/Input';

import './Styles/Canvas.css';

export default class Canvas extends Component {


    constructor(props) {
        super(props); 
        this.handleInsert = this.handleInsert.bind(this);
        this.handleDelete = this.handleDelete.bind(this);
        this.state = {
            tree: new TreeCore(),
            jobs: new Jobs(),
            tasks: [],
            nodeMap: {}
        }
    }

    parseTask(task) {
        var taskArray = task.split(':');
        return {
            type: taskArray[0],
            nodeId: taskArray[1],
            parentId: taskArray[2], 
            extra: taskArray[3] 
        }
    }
    
    handleInsert(data) {

        var jobId = data.toString() + ':' + Tree.INSERT;
        this.state.jobs.addJob(jobId);

        this.state.tree.insert(jobId, data);

        var tasks = this.state.tree.logger.getLogs(jobId);
        tasks.map((task) => { 
            this.state.jobs.addTask(jobId, this.parseTask(task)); 
        });

        this.setState({
            nodeMap: this.state.tree.compile(),
            tasks: this.state.jobs.getTasks(jobId)
        });
    }

    handleDelete(data) {

    }

    render() {
        return (
            <div className='canvas'> 
            
                <Tree tasks={this.state.tasks}
                      nodeMap={this.state.nodeMap}/>
                <div className='inputGroup'>
                    <Input placeHolder={'Insert'} onInput={this.handleInsert}/>
                    <Input placeHolder={'Delete'} onInput={this.handleDelete}/>
                </div> 
            
            </div>
        )
    }
}
