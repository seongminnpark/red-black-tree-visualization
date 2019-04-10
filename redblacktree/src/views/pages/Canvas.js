import React, { Component } from 'react';

import TreeCore, { Node, TreeLogger } from '../../core/tree/Tree';
import Jobs from '../../core/jobs/Jobs';

import Tree from '../components/Tree';
import Input from '../components/Input';
import TextCarousel from '../components/TextCarousel';

import playButton from '../../images/play.png';
import ffButton from '../../images/ff.png';

import './Styles/Canvas.css';

export default class Canvas extends Component {


    constructor(props) {
        super(props); 
        this.handleInsert = this.handleInsert.bind(this);
        this.handleDelete = this.handleDelete.bind(this);
        this.parseTasks = this.parseTasks.bind(this);
        var tree = new TreeCore();
        var snapshot = tree.snapshot();
        this.state = {
            tree: tree,
            tasks: [],
            taskStrings: [],
            taskId: 0,
            jobId: null,
            snapshot: snapshot,
            snapshots: [snapshot],
            nodeMap: {},
        }
    }

    parseTasks(tasks) {
        
        var taskArray = [];
        var taskStrings = []; 
        
        tasks.map((task) => {
           
           var [type, nodeId, 
               parentId, direction, extra] = task.split(':');

           var taskObject = {
               type : type,
               nodeId : nodeId,
               parentId : parentId,
               direction : direction,
               extra : extra,
           }

           var taskString = this.buildTaskString(taskObject); 
        
           taskArray.push(taskObject);
           taskStrings.push(taskString);

        });

        this.setState({
            tasks: taskArray,
            taskStrings: taskStrings
        });
    }

    buildTaskString(task) {
        var taskString = '';
        switch (task.type) {
            case TreeLogger.LOOK:
                taskString = 'Look at node ' + task.nodeId;
                break;
            case TreeLogger.COMPARE:
                taskString = 'Compare with node ' + task.nodeId;
                break;
            case TreeLogger.ROTATE:
                taskString = 'Rotate node ' + task.nodeId + ' ' + task.direction;
                break;
            case TreeLogger.ERROR: 
                taskString = 'Found error at node ' + task.nodeId;
                break;
            case TreeLogger.RECOLOR: 
                taskString = 'Recolor node ' + task.nodeId;
                break;
            case TreeLogger.INSERT: 
                taskString = 'Insert ' + task.extra;
                break;
            case TreeLogger.DELETE:
                taskString = 'Delete ' + task.extra;
                break;
            default: 
                break;
        }
        return taskString;
    }
    
    handleInsert(data) {

        var originalSnapshot = this.state.snapshot;

        if (originalSnapshot  == null) {
            originalSnapshot = this.state.tree.snapshot();
        }
    
        var jobId = data.toString() + ':' + Tree.INSERT;

        this.state.tree.insert(jobId, data);

        var tasks = this.state.tree.logger.getLogs(jobId);
        this.parseTasks(tasks);

        var snapshots = [];
        var snapshot = originalSnapshot; 
        tasks.map((task) => {  
            snapshot = snapshot.getSnapshotFromDiff(task);
            snapshots.push(snapshot);
        });

        this.setState({
            //nodeMap: this.state.tree.compile(),
            jobId: jobId,
            taskId: 0,
            snapshot: snapshot,
            snapshots: snapshots
        });
    }

    handleDelete(data) {

    }

    render() {
        return (
            <div className='canvas'> 
            
                <Tree snapshots={this.state.snapshots}
                      taskId={this.state.taskId}
                      tree={this.state.tree}/>
                <div className='inputGroup'>
                    <Input placeHolder={'Insert'} onInput={this.handleInsert}/>
                    <Input placeHolder={'Delete'} onInput={this.handleDelete}/>
                </div> 

                <div className='controls'>
                    <button id='playButton'>
                        <img id='playButtonImage'src={playButton}/>
                    </button>
                    <button id='ffButton'>
                        <img id='ffButtonImage' src={ffButton}/>
                    </button>
                </div>

                <TextCarousel 
                    data={this.state.taskStrings} 
                    active={this.state.taskIndex} />
            
            </div>
        )
    }
}
