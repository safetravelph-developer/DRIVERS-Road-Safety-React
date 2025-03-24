import { useState } from "react";

const dropdownOptionsWithOptionGroups = [
    { id: 1, name: 'Barangay', optionGroup: 'Geography' },
    { id: 2, name: 'Cities', optionGroup: 'Geography' },
    { id: 3, name: 'City/Province', optionGroup: 'Geography' },
    { id: 4, name: 'Regions', optionGroup: 'Geography' },
    { id: 5, name: 'Day', optionGroup: 'Time' },
    { id: 6, name: 'Day of week', optionGroup: 'Time' },
    { id: 7, name: 'Hour of the day', optionGroup: 'Time' },
    { id: 8, name: 'Month', optionGroup: 'Time' },
    { id: 9, name: 'Week', optionGroup: 'Time' },
    { id: 10, name: 'Year', optionGroup: 'Time' },
    { id: 11, name: 'Main Cause', optionGroup: 'Filter' },
    { id: 12, name: 'Collision Type', optionGroup: 'Filter' },
    { id: 13, name: 'Reporting Agency', optionGroup: 'Filter' },
    { id: 14, name: 'Classification', optionGroup: 'Filter' },
    { id: 15, name: 'Vehicle type', optionGroup: 'Filter' },
    { id: 16, name: 'Gender', optionGroup: 'Filter' },
  ]
  
  const ReactSelectDropdownWithOptionGroups = ({ options = dropdownOptionsWithOptionGroups }) => {
    // Set the initial selected item to the first dropdown option
    const initialOptionId = options[2].id
    const [selectedOption, setSelectedOption ] = useState(initialOptionId);
    
    const handleDropdownChange = (event) => {
    const optionId = event.target.value;
      setSelectedOption(optionId);
    }
    
    const groupedOptions = options.reduce((acc, option) => {
      const accOptionGroup = acc[option.optionGroup] || [];
        
      return {
        ...acc,
        [option.optionGroup]: [...accOptionGroup, option]
      }
    }, {});
      
    return (
      <select value={selectedOption} onChange={handleDropdownChange} style={{height: '25px', width: '40%', fontSize: '13px'}}>
        { 
         Object.keys(groupedOptions).map((optionGroupName) => (
            <optgroup key={optionGroupName} label={optionGroupName}>
              {
                groupedOptions[optionGroupName].map(({ id, name }) => (
                  <option key={name} value={id}>{name}</option>
                ))
              }
            </optgroup>
          ))
        }
      </select> 
    );
  }

  export default ReactSelectDropdownWithOptionGroups;
