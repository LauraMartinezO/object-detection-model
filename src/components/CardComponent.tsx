import Divider from "@mui/material/Divider";
import Card from "@mui/material/Card";
import PropTypes from "prop-types";

const CardComponent = ({ title, children  }) => {
  return (
    <Card sx={{ width: 1400, height: 200 }}>
      <h2 className="container__title">{title}</h2>
      <Divider />
      <div>{children}</div>
    </Card>
  );
};

CardComponent.propTypes = {
  title: PropTypes.string.isRequired,
};

export default CardComponent;
