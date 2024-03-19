import { Button } from "@mui/material";
import "./RowDetailsPanel.scss";

import React from "react";

export default function RowDetailsPanel(props) {

    const { data, expandedRowDetailPanelJson } = props

  const chunkArray = (arr, size) => {
    const chunks = [];
    for (let i = 0; i < arr.length; i += size) {
      chunks.push(arr.slice(i, i + size));
    }
    return chunks;
  };

  const maxColumns = 3;
  const numRows = Math.ceil(
    (expandedRowDetailPanelJson?.expandedRowDetailPanelBody
      ?.userTransportDetails?.length || 0) / maxColumns
  );

  const dynamicDataChunks = chunkArray(
    expandedRowDetailPanelJson?.expandedRowDetailPanelBody
      ?.userTransportDetails,
    numRows
  );

  return (
    <div className="expanded-row-details-panel">
      <div className="top-right">
        {expandedRowDetailPanelJson?.expandedRowDetailPanelHeader?.timeDetails?.map(
          (detail) => (
            <div key={detail.uniqueKey}>
              <div className="data-label">{detail.label}:</div>
              <div className="data-value">{data[detail.uniqueKey]}</div>
            </div>
          )
        )}
      </div>
      <div className="row-details-panel-body-footer-container">
      <div className="body">
        {dynamicDataChunks?.length && dynamicDataChunks.map((chunk, index) => (
        <>
          <div key={index} className="body-column">
            {chunk.map((detail) => (
              <div key={detail.uniqueKey} className="data-row">
                <div className="data-label">{detail.label}:</div>
                <div className="data-value">{data[detail.uniqueKey]}</div>
              </div>
            ))}
          </div>
          {(index !== (dynamicDataChunks?.length - 1)) && <div className="vertical-line"></div>}
        </>
        ))}
      </div>
      <div className="footer">
        <div className="footer-left">
          {expandedRowDetailPanelJson?.expandedRowDetailPanelFooter?.userClosingDetails?.map(
            (detail) => (
              <div key={detail.uniqueKey} className="data-row">
                <div className="data-label">{detail.label}:</div>
                <div className="data-value">{data[detail.uniqueKey]}</div>
              </div>
            )
          )}
        </div>
        <div className="footer-right">
          {expandedRowDetailPanelJson?.expandedRowDetailPanelFooter?.buttons?.map(
            (button, index) => (
              <Button key={index} className={button.className}>
                {button.label}
              </Button>
            )
          )}
        </div>
      </div>
      </div>
    </div>
  );
}
