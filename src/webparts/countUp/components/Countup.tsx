import * as React from 'react';
import { IDateTimeFieldValue } from '@pnp/spfx-property-controls/lib/PropertyFieldDateTimePicker';
import * as countdown from 'countdown';
import styles from '../CountUpWebPart.module.scss';
import { Icon } from 'office-ui-fabric-react/lib/components/Icon';

export interface IShowOptions {
    years: boolean;
    months: boolean;
    days: boolean;
    hours: boolean;
    minutes: boolean;
    seconds: boolean;
}

export interface ICountupProps {
    date: Date;
    text: string;
    iconName: string;
    showOptions: IShowOptions;
}

export interface ICountupState {
    date: Date;
    text: string;
    years: number;
    months: number;
    days: number;
    hours: number;
    minutes: number;
    seconds: number;
    chronologic: boolean; // true is future date, false is past date
    showOptions: IShowOptions;
}


export class Countup extends React.Component<ICountupProps, ICountupState> {
    private _timerID: any;

    public componentDidMount() {
        this._timerID = setInterval(() => this._convertTime(), 1000);
    }

    public componentWillUnmount() {
        clearInterval(this._timerID);
      }

    constructor(props: ICountupProps) {
        super(props);
        let years;
        let months;
        let days;
        let hours;
        let minutes;
        let seconds;
        const time = countdown(this.props.date);
        if (!time.years) {years = 0;} else {years = time.years;}
        if (!time.months) {months = 0;} else {months = time.months;}
        if (!time.days) {days = 0;} else {days = time.days;}  
        if (!time.hours) {hours = 0;} else {hours = time.hours;}  
        if (!time.minutes) {minutes = 0;} else {minutes = time.minutes;}  
        if (!time.seconds) {seconds = 0;} else {seconds = time.seconds;} 
        this.state = {
            date: this.props.date,
            text: this.props.text,
            years: years,
            months: months,
            days: days,
            hours: hours,
            minutes: minutes,
            seconds: seconds,
            chronologic: false,
            showOptions: {years: true, months: true, days: true, hours: true, minutes: true, seconds: true} as IShowOptions
        };
    }

    public render(): React.ReactElement<ICountupProps> {
        let years;
        let months;
        let days;
        let hours;
        let minutes;
        let seconds;
        console.log(this.state.date);
        if(this.state.years > 0) {years = <span>{this.state.years}</span>;} else {years = <span>0</span>;}
        if(this.state.months > 0) {months = <span>{this.state.months}</span>;} else {months = <span>0</span>;}
        if(this.state.days > 0) {days = <span>{this.state.days}</span>;} else {days = <span>0</span>;}
        if(this.state.hours > 0) {hours = <span>{this.state.hours}</span>;} else {hours = <span>0</span>;}
        if(this.state.minutes > 0) {minutes = <span>{this.state.minutes}</span>;} else {minutes = <span>0</span>;}
        if(this.state.seconds > 0) {seconds = <span>{this.state.seconds}</span>;} else {seconds = <span>0</span>;}

        return(
            <div className={styles.tile}>
                <div>
                    <div className={styles.tileBlock}>
                        <div className={styles.tileIcon}>
                            <Icon iconName={this.props.iconName} />
                        </div>
                        <div className={styles.tileTitle}>{this.props.text} {this.state.chronologic ? "Until" : "Since" }:</div>
                        <span hidden={!this.props.showOptions.years}>{years} years<br /></span>
                        <span hidden={!this.props.showOptions.months}>{months} months<br /></span>
                        <span hidden={!this.props.showOptions.days}>{days} days<br /></span>
                        <span hidden={!this.props.showOptions.hours}>{hours} hours<br /></span>
                        <span hidden={!this.props.showOptions.minutes}>{minutes} minutes<br /></span>
                        <span hidden={!this.props.showOptions.seconds}>{seconds} seconds<br /></span>
                    </div>
                </div>
            </div>
        );
    }

    private _convertTime() {
        let years;
        let months;
        let days;
        let hours;
        let minutes;
        let seconds;
        let chrono;
        const time = countdown(this.props.date);
        if (!time.years) {years = 0;} else {years = time.years;}
        if (!time.months) {months = 0;} else {months = time.months;}  
        if (!time.days) {days = 0;} else {days = time.days;}  
        if (!time.hours) {hours = 0;} else {hours = time.hours;}  
        if (!time.minutes) {minutes = 0;} else {minutes = time.minutes;}  
        if (!time.seconds) {seconds = 0;} else {seconds = time.seconds;}
        if (new Date() < this.props.date) {chrono = true;}  else {chrono = false;}
        this.setState({            
            years: years,
            months: months,
            days: days,
            hours: hours,
            minutes: minutes,
            seconds: seconds,
            chronologic: chrono 
        });
    }
}