import React, { Component } from 'react';
import { Slider } from 'antd';
import axios from 'axios';
import 'antd/dist/antd.css';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import {hostIP} from "../../../projectConstants.js";
import Nav from '../Components/Nav';

class Settings extends Component {
    constructor(props) {
        super(props);
        this.state = {
            temperatureLowerLimit: 0,
            temperatureUpperLimit: 1000,
            temperatureThreshold: 400,
            maxTemperature: 1000,
            minTemperature: 0,
            pressureLowerLimit: 0,
            pressureUpperLimit: 2,
            pressureThreshold: 1.05,
            maxPressure: 10,
            minPressure: 0
        };
    }

    componentDidMount() {
        axios.defaults.headers.post['Content-Type'] ='application/x-www-form-urlencoded';
        axios.get(`/getTemperatureLimits`, {crossDomain: true}).then(res => {
            console.log(res)
            this.setState({
                temperatureUpperLimit: res.data.upperLimit,
                temperatureLowerLimit: res.data.lowerLimit
            })
            console.log(this.state.temperatureLowerLimit)
        })
    }
    
    changeTemperatureLimit = (value) => {
        this.setState({
            temperatureLowerLimit: value[0],
            temperatureUpperLimit: value[1],
            temperatureThreshold: value[1]
        })
    }

    changeTemperatureThreshold = (value) => {
        if(value <= this.state.temperatureUpperLimit) {
            this.setState({
                temperatureThreshold: value
            })
        }
    }

    changePressureThreshold = (value) => {
        if(value <= this.state.pressureUpperLimit) {
            this.setState({
                pressureThreshold: value
            })
        }
    }

    changePressureLimit = (value) => {
        this.setState({
            pressureLowerLimit: value[0],
            pressureUpperLimit: value[1],
            pressureThreshold: value[1]
        })
    }

    submitTemperatureChanges = () => {
        console.log("******************************")
        axios.get(`/setTemperatureLimits`, {
            params: {
                temperatureUpperLimit: this.state.temperatureUpperLimit,
                temperatureLowerLimit: this.state.temperatureLowerLimit,
                temperatureThreshold: this.state.temperatureThreshold
            }
        });

    }

    submitPressureChanges = () => {
        console.log("******************************")
        axios.get(`http://${hostIP}/setPressureLimits`, {
            params: {
                pressureUpperLimit: this.state.pressureUpperLimit,
                pressureLowerLimit: this.state.pressureLowerLimit,
                pressureThreshold: this.state.pressureThreshold
            }
        });

    }

    temperatureFormatter = (value) => {
        return `${value} C`;
    }
    render() {
        return (
            <div>
                <Nav />
                <Card>
                    <CardContent>
                        <Typography variant="h5" component="h2">
                            Temperature Settings
                        </Typography>
                        <Slider tipFormatter={this.temperatureFormatter} range onChange = {this.changeTemperatureLimit} min = {this.state.minTemperature} max = {this.state.maxTemperature} value = {[this.state.temperatureLowerLimit, this.state.temperatureUpperLimit]}/>
                        <Slider tipFormatter={this.temperatureFormatter} onChange = {this.changeTemperatureThreshold} min = {this.state.minTemperature} max = {this.state.maxTemperature} value = {this.state.temperatureThreshold}/>
                    </CardContent>
                    <CardActions>
                        <Button size="small" onClick = {this.submitTemperatureChanges}>Save Changes</Button>
                    </CardActions>
                </Card>
                <Card>
                    <CardContent>
                        <Typography variant="h5" component="h2">
                            Pressure Settings
                        </Typography>
                        <Slider range onChange = {this.changePressureLimit} min = {this.state.minPressure} max = {this.state.maxPressure} step={0.1} value = {[this.state.pressureLowerLimit, this.state.pressureUpperLimit]}/>
                        <Slider onChange = {this.changePressureThreshold} min = {this.state.minPressure} max = {this.state.maxPressure} step={0.1} value = {this.state.pressureThreshold}/>
                    </CardContent>
                    <CardActions>
                        <Button size="small" onClick = {this.submitPressureChanges}>Save Changes</Button>
                    </CardActions>
                </Card>
                
            </div>
        );
  }
}

export default Settings;
