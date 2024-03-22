import React, { useEffect, useState } from "react";
import { Button } from "@mui/material";
import { Input } from "../fields/Input";
import "./SearchContainer.scss";
import { formatDate } from "../../../utils/globalMethods";

export default function SearchContainer(props) {
  const { SearchContainerJson } = props;

  const [searchData, setSearchData] = useState({});
  const [isSearchEnabled, setIsSearchEnabled] = useState(false);

  useEffect(() => {
    // setIsSearchEnabled(
    //   SearchContainerJson.fields.every((field) => {
    //     const value = searchData[field.name];
    //     if (field.required) {
    //       if (field.type === "date") {
    //         return (
    //           value instanceof Date ||
    //           (typeof value === "string" && Boolean(value.trim()))
    //         );
    //       } else if (field.type === "checkbox" || field.type === "radio") {
    //         return value != null;
    //       } else if (typeof value === "string") {
    //         return Boolean(value.trim());
    //       }
    //       return false;
    //     }
    //     return true;
    //   })
    // );

    const isAnyFieldEmpty = SearchContainerJson.fields.some((field) => {
      const value = searchData[field.name];
      return field.required && (!value || value.trim() === "");
    });
    setIsSearchEnabled(!isAnyFieldEmpty);
  }, [searchData]);

  const handleInputChange = (event) => {
    const { name, value, type, checked } = event.target;
    const newValue = type === "checkbox" ? checked : value;
    setSearchData((prev) => ({ ...prev, [name]: newValue }));
  };

  const handleDateChange = (name, newValue) => {
    setSearchData((prev) => ({ ...prev, [name]: formatDate(newValue) }));
  };

  const handleSearch = () => {
    console.log("Search:", searchData);
  };

  const handleClear = () => {
    setSearchData({});
  };

  const handleButtonClick = (buttonId) => {
    if (buttonId === "search") {
      handleSearch();
    } else if (buttonId === "clear") {
      handleClear();
    }
  };

  const isButtonDisabled = (buttonId) => {
    if (buttonId === "search") {
      return !isSearchEnabled;
    }
    return false;
  };

  const renderFields = () => {
    return (
      SearchContainerJson?.fields?.length &&
      SearchContainerJson?.fields.map((field) => (
        <div key={field.id} className="input-field">
          <Input
            type={field.type}
            name={field.name}
            label={field.label}
            value={searchData[field.name] || ""}
            handleInputChange={handleInputChange}
            handleDateChange={handleDateChange}
            options={field.options || []}
          />
        </div>
      ))
    );
  };

  const renderButtons = () => {
    return (
      SearchContainerJson?.buttons?.length &&
      SearchContainerJson?.buttons.map((button) => (
        <Button
          key={button.id}
          onClick={() => handleButtonClick(button.id)}
          disabled={isButtonDisabled(button.id)}
          className={button.className}
        >
          {button.label}
        </Button>
      ))
    );
  };

  return (
    <div className="search-container">
      {renderFields()}
      <div className="button-container">{renderButtons()}</div>
    </div>
  );
}
