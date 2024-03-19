import React from "react";
import Button from "@mui/material/Button";
import { Typography } from "@mui/material";
import "./RowDetailsPanel.scss";
import { chunkArray } from "../../../../utils/globalMethods";

export default function RowDetailsPanel(props) {
  const { data, expandedRowDetailPanelJson } = props;

  const renderRowDetailsPanelHeader = () => {
    return expandedRowDetailPanelJson?.expandedRowDetailPanelHeader?.timeDetails?.map(
      (detail) => (
        <div key={detail.uniqueKey}>
          <div className="data-label">{detail.label}:</div>
          <div className="data-value">{data[detail.uniqueKey]}</div>
        </div>
      )
    );
  };

  const renderRowDetailsPanelBody = () => {
    const maxColumns = 3;
    const numRows = Math.ceil(
      (expandedRowDetailPanelJson?.expandedRowDetailPanelBody
        ?.rowDetailPanelBodyTable?.length || 0) / maxColumns
    );

    const dynamicDataChunks = chunkArray(
      expandedRowDetailPanelJson?.expandedRowDetailPanelBody
        ?.rowDetailPanelBodyTable,
      numRows
    );

    return (
      <div className="body">
        {dynamicDataChunks?.length &&
          dynamicDataChunks.map((chunk, index) => (
            <>
              <div key={index} className="body-column">
                {chunk.map((detail) => (
                  <div key={detail.uniqueKey} className="data-row">
                    <div className="data-label">{detail.label}</div>
                    <div className="data-value">{data[detail.uniqueKey]}</div>
                  </div>
                ))}
              </div>
              {index !== dynamicDataChunks?.length - 1 && (
                <div className="vertical-line"></div>
              )}
            </>
          ))}
      </div>
    );
  };

  const renderRowDetailsPanelFooter = () => {
    const footerTableColumns = expandedRowDetailPanelJson?.expandedRowDetailPanelFooter?.numColumnBlocks || 2;
    const footerTableDataChunks = chunkArray(
      expandedRowDetailPanelJson?.expandedRowDetailPanelFooter
        ?.rowDetailPanelFooterTable || [],
      footerTableColumns
    );

    return (
      <div className="footer">
        <div className="footer-left">
          {footerTableDataChunks.map((chunk, index) => (
            <div key={index} className="footer-block">
              {chunk.map((row) => (
                <div key={row.uniqueKey} className="footer-row">
                  <Typography variant="body2" className="footer-label">
                    {row.label}
                  </Typography>
                  <Typography variant="body2" className="footer-value">
                    {data[row.uniqueKey]}
                  </Typography>
                </div>
              ))}
            </div>
          ))}
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
    );
  };

  return (
    <div className="expanded-row-details-panel">
      <div className="top-right">{renderRowDetailsPanelHeader()}</div>
      <div className="row-details-panel-body-footer-container">
        {renderRowDetailsPanelBody()}
        {renderRowDetailsPanelFooter()}
      </div>
    </div>
  );
}
