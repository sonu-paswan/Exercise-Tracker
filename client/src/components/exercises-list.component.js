import React, { Component } from "react";
import axios from 'axios';
import {Link} from 'react-router-dom';

// importent to observe 
function Exercise(props){
return (
    <tr>
        <td>{props.exercise.username}</td>
        <td>{props.exercise.description}</td>
        <td>{props.exercise.duration}</td>
        <td>{props.exercise.date.substring(0,10)}</td>
        <td>
            <Link  to={"/edit/"+props.exercise._id}>EDIT</Link> | <a href="#" onClick={ ()=>props.deleteExercise(props.exercise._id)}>DELETE</a>
        </td>
    </tr>
)
}

export default class ExerciseList extends Component{
    constructor(props){
        super(props);

        this.onDeleteExercises=this.onDeleteExercises.bind(this);

        this.state={
            exercises:[]
        }
    }
    componentDidMount(){
        axios.get('http://localhost:5000/exercises')
        .then(response=>{
            this.setState({
                exercises:response.data
            })
        })
        .catch(err=>{
            console.log(err)
        })
    }
    onDeleteExercises(id){
        axios.delete('http://localhost:5000/exercises/'+id)
        .then(res=>console.log(res.data))
        .catch(err=>console.log(err))

        this.setState({
            exercises:this.state.exercises.filter(ele=>ele._id!==id)
        })
    }

    exerciseList(){
        return this.state.exercises.map(currentExercise=>{
            return <Exercise exercise={currentExercise} deleteExercise={this.onDeleteExercises} key={currentExercise._id}/>
        })
    }
    render(){
        return(
            <div>
                <h3>Exercise List</h3>
                <table className="table">
                    <thead className="thead-light">
                        <tr>
                        <th>Username</th>
                        <th>Description</th>
                        <th>Duration</th>
                        <th>Date</th>
                        <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {this.exerciseList()}
                    </tbody>
                </table>
            </div>
        )
    }
}