import * as React from 'react';
import * as ReactDom from 'react-dom';
import * as strings from 'CountUpWebPartStrings';
import { Version } from '@microsoft/sp-core-library';
import { BaseClientSideWebPart } from '@microsoft/sp-webpart-base';
import {
  IPropertyPaneConfiguration,
  PropertyPaneTextField,
  PropertyPaneToggle,
  PropertyPaneLabel,
  PropertyPaneDropdown,
  IPropertyPaneDropdownOption
} from '@microsoft/sp-property-pane';

import { PropertyFieldDateTimePicker, DateConvention, TimeConvention, IDateTimeFieldValue } from '@pnp/spfx-property-controls/lib/PropertyFieldDateTimePicker';
import { Countup, ICountupProps, IShowOptions } from './components/Countup';

export interface ICountUpWebPartProps {
  description: string;
  dateTime: IDateTimeFieldValue;
  displayOption: IPropertyPaneDropdownOption;
  years: boolean;
  months: boolean;
  days: boolean;
  hours: boolean;
  minutes: boolean;
  seconds: boolean;
  timeset: boolean;
  text: string;
  iconName: string;
}

export default class CountUpWebPart extends BaseClientSideWebPart<ICountUpWebPartProps> {

  public render(): void {
    if (!this.properties.dateTime) {
      const now: Date = new Date();
      let newDate: Date = new Date(now.setDate(now.getDate() + 10));
      this.properties.dateTime = { value: newDate, displayValue: newDate.toDateString()} as IDateTimeFieldValue;
    }

    const showOptions = {
      years: this.properties.years,
      months: this.properties.months,
      days: this.properties.days,
      hours: this.properties.hours,
      minutes: this.properties.minutes,
      seconds: this.properties.seconds,
    };

    const element: React.ReactElement<ICountupProps> = React.createElement(
      Countup, {
        text: this.properties.text,
        date: this.properties.dateTime.value,
        iconName: this.properties.iconName,
        showOptions: showOptions
      }
    );

    ReactDom.render(element, this.domElement);
  }

  protected get dataVersion(): Version {
    return Version.parse('1.0');
  }

  protected getPropertyPaneConfiguration(): IPropertyPaneConfiguration {
    return {
      pages: [
        {
          header: {
            description: strings.PropertyPaneDescription
          },
          groups: [
            {
              groupName: strings.BasicGroupName,
              groupFields: [
                PropertyPaneLabel('description', {
                  text: strings.DescriptionFieldLabel
                }),
                PropertyFieldDateTimePicker('dateTime', {
                  label: 'Select the date and time',
                  initialDate: this.properties.dateTime,
                  dateConvention: DateConvention.DateTime,
                  timeConvention: TimeConvention.Hours12,
                  onPropertyChange: this.onPropertyPaneFieldChanged,
                  properties: this.properties,
                  onGetErrorMessage: null,
                  deferredValidationTime: 0,
                  key: 'dateTimeFieldId'
                }),
                PropertyPaneTextField('iconName', {
                  label: "CountUp Icon"
                }),
                PropertyPaneTextField('text', {
                  label: "CountUp Text"
                }),
                PropertyPaneDropdown('displayOption', {
                  label: 'Display Options',
                  options: [{
                    key: '1',
                    text: 'Digital'
                  }, {
                    key: '2',
                    text: 'Worded'
                  }, {
                    key: '3',
                    text: 'Numbers and Words'
                  }],
                  selectedKey: '1'
                }),
                PropertyPaneToggle('years', {
                  label: 'Years',
                  checked: this.properties.years,
                  key: 'yearsId',
                  offText: 'No',
                  onText: 'Yes'
                }),
                PropertyPaneToggle('months', {
                  label: 'Months',
                  checked: this.properties.months,
                  key: 'monthsId',
                  offText: 'No',
                  onText: 'Yes'
                }),
                PropertyPaneToggle('days', {
                  label: 'Days',
                  checked: this.properties.days,
                  key: 'daysId',
                  offText: 'No',
                  onText: 'Yes'
                }),
                PropertyPaneToggle('hours', {
                  label: 'Hours',
                  checked: this.properties.hours,
                  key: 'hoursId',
                  offText: 'No',
                  onText: 'Yes'
                }),
                PropertyPaneToggle('minutes', {
                  label: 'Minutes',
                  checked: this.properties.minutes,
                  key: 'minutesId',
                  offText: 'No',
                  onText: 'Yes'
                }),
                PropertyPaneToggle('seconds', {
                  label: 'Seconds',
                  checked: this.properties.seconds,
                  key: 'secondsId',
                  offText: 'No',
                  onText: 'Yes'
                }),
                PropertyPaneToggle('timeset', {
                  label: '24 / 48 hours',
                  checked: this.properties.timeset,
                  key: 'timesetId',
                  offText: '24 Hours',
                  onText: '12 Hours'
                })
              ]
            }
          ]
        }
      ]
    };
  }
}
