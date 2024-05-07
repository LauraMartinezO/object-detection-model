import Divider from "@mui/material/Divider";
import Card from "@mui/material/Card";
import PropTypes from "prop-types";

interface CardComponentProps {
  title: string;
  height: number;
  children: React.ReactNode;
}

const CardComponent = ({ title, height, children }: CardComponentProps) => {
  return (
    <Card sx={{ width: 1400, height: height }}>
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
