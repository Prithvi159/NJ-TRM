import React, { useEffect, useState } from "react";
import { Button } from "@mui/material";
import { Input } from "../fields/Input";
import "./SearchContainer.scss";
import { formatDate } from "../../../utils/globalMethods";

const searchFields = [
  {
    name: "Sample Date",
    label: "Upload Date ",
    type: "date",
    id: "1.1",
    "required": true,
    "validations": []
  },
  {
    name: "Station Code",
    label: "Station Code",
    type: "select",
    "required": false,
    options: [
      { label: "Option 1", value: "Option 1" },
      { label: "Option 2", value: "Option 2" },
      { label: "Option 3", value: "Option 3" },
    ],
    id: "1.2",
    "validations": []
  },
  {
    name: "Agent",
    label: "Agent",
    type: "text",
    id: "1.3",
    "required": false,
    "validations": []
  },
  {
    name: "ExcludeTVM",
    label: "Exclude TVM",
    type: "radio",
    "required": false,
    options: [
      { label: "Yes", value: "Yes" },
      { label: "No", value: "No" },
    ],
    id: "1.4",
    "validations": []
  },
];

export default function SearchContainer() {
    const [searchData, setSearchData] = useState({});
    const [isSearchEnabled, setIsSearchEnabled] = useState(false);

    useEffect(() => {
        setIsSearchEnabled(
          searchFields.every((field) => {
            const value = searchData[field.name];
            if (field.required) {
              if (field.type === 'date') {
                return value instanceof Date || (typeof value === 'string' && Boolean(value.trim()));
              } else if (field.type === 'checkbox' || field.type === 'radio') {
                return value != null;
              } else if (typeof value === 'string') {
                return value.trim() !== '';
              }
              return false;
            }
            return true;
          })
        );
      }, [searchData]);
      

    const handleInputChange = (event) => {
        const { name, value, type, checked } = event.target;
        const newValue = type === 'checkbox' ? checked : value;
        setSearchData(prev => ({ ...prev, [name]: newValue }));
    };

    
    const handleDateChange = (name, newValue) => {
        setSearchData(prev => ({ ...prev, [name]: formatDate(newValue) }));
    };

    const handleSearch = () => {
        console.log('Search:', searchData);
    };

    const handleClear = () => {
        setSearchData({});
    };

    return (
        <div className="search-container">
            {searchFields.map((field) => (
                <div key={field.id} className="input-field">
                    <Input
                        type={field.type}
                        name={field.name}
                        label={field.label}
                        value={searchData[field.name] || ''}
                        handleInputChange={handleInputChange}
                        handleDateChange={handleDateChange}
                        options={field.options || []}
                    />
                </div>
            ))}
            <div className="button-container">
                <Button  className="search-button" onClick={handleSearch} disabled={!isSearchEnabled}>
                    Search
                </Button>
                <Button  className="clear-button " onClick={handleClear}>
                    Clear
                </Button>
            </div>
        </div>
    );
}
