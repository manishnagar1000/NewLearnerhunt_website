import React from "react";
import Styles from "/styles/trash.module.css";

const TrashCategoryCard = ({ id, type, icon, handleModalOpen }) => (
  <div className="col-md-2">
    <div className={Styles.card}>
      <div className={Styles.icon}>{icon}</div>
      <h5 onClick={(e) => handleModalOpen(e, id)}>{type}</h5>
    </div>
  </div>
);

export default TrashCategoryCard;
