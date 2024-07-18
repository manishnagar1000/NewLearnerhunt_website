import React from "react";
import Styles from "/styles/trash.module.css";

const TrashCategoryCard = ({ id, type, icon, handleModalOpen }) => (
  <div className="col-md-2">
    <div className={Styles.card} onClick={(e) => handleModalOpen(e, id)}>
      <img src={icon} alt={icon}  />
      <p>{type}</p>
    </div>
  </div>
);

export default TrashCategoryCard;
