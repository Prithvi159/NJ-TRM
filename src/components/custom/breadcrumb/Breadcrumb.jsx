import React from "react";
import { NavLink, useLocation } from "react-router-dom";
import { Breadcrumbs, Typography } from "@mui/material";
import NavigateNextIcon from "@mui/icons-material/NavigateNext";

const breadcrumbSpecialRoutes = {
  'polled-data': 'data-browse',
};

export default function Breadcrumb (props){
  const { excludeLinks } = props;

  const location = useLocation();


  const renderBreadcrumbItems = () => {
    const pathnames = location.pathname.split("/").filter((x) => x);
    // Filter links excluded
    const filteredPathnames = pathnames.filter((pathname) => !excludeLinks.includes(pathname));

    return (
      filteredPathnames?.length && filteredPathnames.map((pathname, index) => {
        let routeTo = `./${filteredPathnames.slice(0, index + 1).join("/")}`;
        console.log("pathname",pathname)
        const isLast = index === filteredPathnames.length - 1;

        if (!isLast && breadcrumbSpecialRoutes[pathname]) {
          const nextPathname = breadcrumbSpecialRoutes[pathname];
          routeTo += `/${nextPathname}`;
        }

        return (
          <div key={pathname}>
            {isLast ? (
              <Typography color="textPrimary">{pathname}</Typography>
            ) : (
              <NavLink
                color="inherit"
                to={routeTo}
              >
                {pathname}
              </NavLink>
            )}
          </div>
        );
      })
    );
  };

  return (
    <Breadcrumbs
      separator={<NavigateNextIcon fontSize="small" />}
      aria-label="breadcrumb"
    >
      {renderBreadcrumbItems()}
    </Breadcrumbs>
  );
};
