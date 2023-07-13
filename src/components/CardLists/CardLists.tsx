import { Card } from "../Card";

const CardLists = ({ benefits }) => {
  return (
    <div>
      {benefits.map((benefit, index) => (
        <Card key={index} benefit={benefit} index={index} />
      ))}
    </div>
  );
};

export { CardLists };
export default CardLists;
